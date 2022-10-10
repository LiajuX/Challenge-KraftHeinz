import { ChangeEvent, useCallback, useEffect, useState } from 'react'
import { doc, setDoc, getDoc, Timestamp, updateDoc } from 'firebase/firestore'

import { useAuth } from '../../../../hooks/useAuth'

import { database } from '../../../../services/firebase'
import { api } from '../../../../services/api'

import {
  evaluationQuestions,
  questionCriterias,
} from '../../../../utils/questions'

import { TeamMember } from '../..'
import { Button } from '../../../../components/Button'
import { Slider } from '../../../../components/Form/Slider'
import { Attribute, Multiselect } from '../../../../components/Multiselect'

import * as S from './styles'

export interface Question {
  criteria: string
  question: string
  type: string
}

interface Answer {
  criteria: string
  type: string
  value: number | boolean | string
  sentiment?: {
    score: number
    magnitude: number
  }
}

interface CriteriaEvaluation {
  criteria_id: string
  ponctuation: number
}

export interface TeamMemberEvaluation {
  evaluator: string
  last_evaluation: Date
  bias: number
  evaluations: [date: Date, criterias: CriteriaEvaluation[]]
}

interface TeamMemberEvaluationModalProps {
  onCloseModal: () => void
  member: TeamMember
}

export function TeamMemberEvaluationModal({
  onCloseModal,
  member,
}: TeamMemberEvaluationModalProps) {
  const [questionList, setQuestionList] = useState<Question[]>([])
  const [currentQuestion, setCurrenQuestion] = useState({} as Question)
  const [currentPosition, setCurrentPosition] = useState(0)
  const [selectedAttributes, setSelectedAttributes] = useState<Attribute[]>([])
  const [sliderValue, setSliderValue] = useState(2)
  const [binaryValue, setBinaryValue] = useState('')
  const [comment, setComment] = useState('')
  const [isCurrentQuestionAnswered, setIsCurrentQuestionAnswered] =
    useState(false)
  const [answers, setAnswers] = useState<Answer[]>([])
  const [amountOfPositiveAnswers, setAmountOfPositiveAnswers] = useState(0)
  const [isLoading, setIsLoading] = useState(false)

  const { user } = useAuth()

  const handleGoToNextEvaluationQuestion = useCallback(async () => {
    if (currentQuestion?.type === 'comment') {
      setIsLoading(true)

      const { data: commentSentiment } = await api.post('comment', {
        comment,
      })

      if (commentSentiment.score > 0.25 && commentSentiment.score < 1) {
        setAmountOfPositiveAnswers((oldValue) => oldValue + 1)
      }

      setIsLoading(false)
    }

    if (currentQuestion?.type === 'scale') {
      const data = {
        criteria: currentQuestion?.criteria,
        type: currentQuestion?.type,
        value: sliderValue + 1,
      }

      setAnswers((oldAnswers) => [...oldAnswers, data])
    }

    setCurrentPosition(currentPosition + 1)
    setIsCurrentQuestionAnswered(false)
    setComment('')
    setBinaryValue('')
    setSliderValue(2)
  }, [
    comment,
    currentPosition,
    currentQuestion?.criteria,
    currentQuestion?.type,
    sliderValue,
  ])

  const handleCompleteTeamMemberEvaluation = useCallback(async () => {
    setIsLoading(true)

    if (currentQuestion?.type === 'comment') {
      const { data: commentSentiment } = await api.post('comment', {
        comment,
      })

      if (commentSentiment.score > 0.25 && commentSentiment.score < 1) {
        setAmountOfPositiveAnswers((oldValue) => oldValue + 1)
      }
    }

    const groupAnswersByCriteria = answers.reduce((group: any, answer) => {
      const { criteria } = answer

      group[criteria] = group[criteria] ?? []
      group[criteria].push(answer)

      return group
    }, {})

    const currentTeamMemberEvaluationData: CriteriaEvaluation[] = []

    questionCriterias.forEach((criteria) => {
      const { value } = groupAnswersByCriteria[criteria].find(
        (answer: Answer) => typeof answer.value === 'number',
      )

      const evaluationByCriteria = {
        criteria_id: criteria,
        ponctuation: value,
      }

      currentTeamMemberEvaluationData.push(evaluationByCriteria)
    })

    const userRef = doc(database, 'users', member.id)

    const userDocSnap = await getDoc(userRef)

    if (userDocSnap.exists()) {
      const userOldTeamEvaluations = userDocSnap.data().team_evaluations

      const teamMemberEvaluations = []

      const userEvaluationsOfOtherTeamMembers = userOldTeamEvaluations?.find(
        (evaluation: TeamMemberEvaluation) => evaluation.evaluator !== user?.id,
      )

      if (userEvaluationsOfOtherTeamMembers) {
        teamMemberEvaluations.push(userEvaluationsOfOtherTeamMembers)
      }

      const oldEvaluationsOfTheCurrentTeamMember = userOldTeamEvaluations?.find(
        (evaluation: TeamMemberEvaluation) => evaluation.evaluator === user?.id,
      )

      const updatedEvalutionsOfTheCurrentTeamMember = []

      if (oldEvaluationsOfTheCurrentTeamMember) {
        updatedEvalutionsOfTheCurrentTeamMember.push(
          ...oldEvaluationsOfTheCurrentTeamMember.evaluations,
        )
      }

      const currentTeamMemberEvaluation = {
        date: Timestamp.fromDate(new Date()),
        criterias: currentTeamMemberEvaluationData,
      }

      updatedEvalutionsOfTheCurrentTeamMember.push(currentTeamMemberEvaluation)

      teamMemberEvaluations.push({
        evaluator: user!.id,
        bias: amountOfPositiveAnswers - 4,
        last_evaluation: Timestamp.fromDate(new Date()),
        evaluations: updatedEvalutionsOfTheCurrentTeamMember,
      })

      const emptyAttributeList = {
        dedication: { amount: 0 },
        friendly: { amount: 0 },
        open_mind: { amount: 0 },
        organization: { amount: 0 },
        perception: { amount: 0 },
      }

      const userOldAttributes = userDocSnap.data().attributes

      const userUpdatedAttributes: typeof emptyAttributeList =
        userOldAttributes || emptyAttributeList

      selectedAttributes.forEach((attribute) => {
        let currentValue =
          userUpdatedAttributes[
            attribute.category as keyof typeof emptyAttributeList
          ].amount

        if (currentValue > 0 && attribute.action > 0) {
          currentValue += attribute.action
        }

        userUpdatedAttributes[
          attribute.category as keyof typeof emptyAttributeList
        ].amount = currentValue
      })

      await updateDoc(userRef, {
        attributes: userUpdatedAttributes,
        team_evaluations: teamMemberEvaluations,
      })

      user!.is_manager &&
        (await updateDoc(userRef, {
          manager_bias: amountOfPositiveAnswers - 4,
        }))
    }

    setIsLoading(false)
    onCloseModal()
  }, [
    amountOfPositiveAnswers,
    answers,
    comment,
    currentQuestion?.type,
    member.id,
    onCloseModal,
    selectedAttributes,
    user,
  ])

  function handleCommentChange(event: ChangeEvent<HTMLTextAreaElement>) {
    setComment(event.target.value)
    setIsCurrentQuestionAnswered(true)
  }

  function handleAttributeSelection(selectedAttribute: Attribute) {
    const isThisAttributeAlreadySelected = selectedAttributes.find(
      (attribute) => attribute.title === selectedAttribute.title,
    )

    if (isThisAttributeAlreadySelected) {
      const filteredAtributes = selectedAttributes.filter(
        (attribute) => attribute.title !== selectedAttribute.title,
      )

      setSelectedAttributes(filteredAtributes)
    }

    if (!isThisAttributeAlreadySelected) {
      setSelectedAttributes((oldState) => [...oldState, selectedAttribute])
    }
  }

  function handleBinaryAnswerSelection(buttonText: string) {
    setBinaryValue(buttonText)

    const data = {
      criteria: currentQuestion?.criteria,
      type: currentQuestion?.type,
      value: buttonText === 'sim',
    }

    setAnswers((oldAnswers) => [...oldAnswers, data])
    setIsCurrentQuestionAnswered(true)
  }

  useEffect(() => {
    const listOfQuestions: Question[] = []

    evaluationQuestions.forEach((criteria) => {
      const scaleQuestions = criteria.list.filter(
        (question) => question.type === 'scale',
      )

      const binaryQuestions = criteria.list.filter(
        (question) => question.type === 'binary',
      )

      const shuffledBinaryQuestions = binaryQuestions.sort(
        () => 0.5 - Math.random(),
      )

      const binaryQuestionsByCriteria = shuffledBinaryQuestions.slice(0, 2)

      scaleQuestions.forEach((question) => {
        listOfQuestions.push(question)
      })

      binaryQuestionsByCriteria.forEach((question) => {
        listOfQuestions.push(question)
      })
    })

    const listOfQuestionsShuffled = listOfQuestions.sort(
      () => 0.5 - Math.random(),
    )

    const behaviorMultiselectQuestion = {
      criteria: 'overall',
      question:
        'Selecione as opções que melhor descrevem o comportamento dessa pessoa:',
      type: 'multiselect',
    }

    listOfQuestionsShuffled.push(behaviorMultiselectQuestion)

    setQuestionList(listOfQuestionsShuffled)
  }, [])

  useEffect(() => {
    setCurrenQuestion(questionList[currentPosition])
  }, [currentPosition, questionList])

  useEffect(() => {
    if (currentPosition + 1 === 25) {
      const groupAnswersByCriteria = answers.reduce((group: any, answer) => {
        const { criteria } = answer

        group[criteria] = group[criteria] ?? []
        group[criteria].push(answer)

        return group
      }, {})

      questionCriterias.forEach((criteria) => {
        const answerValues: Array<string | number | boolean> = []

        groupAnswersByCriteria[criteria].forEach((answer: Answer) =>
          answerValues.push(answer.value),
        )

        answerValues.sort()

        const scaleAnswer = answerValues[0]
        const firstBinaryAnswer = answerValues[1]
        const secondBinaryAnswer = answerValues[2]

        if (scaleAnswer > 3 && firstBinaryAnswer && secondBinaryAnswer) {
          setAmountOfPositiveAnswers((oldValue) => oldValue + 1)
        }

        if (scaleAnswer < 3 && !firstBinaryAnswer && !secondBinaryAnswer) {
          setAmountOfPositiveAnswers((oldValue) => oldValue - 1)
        }

        if (
          (scaleAnswer > 3 && !firstBinaryAnswer) ||
          (scaleAnswer > 3 && !secondBinaryAnswer) ||
          (scaleAnswer < 3 && firstBinaryAnswer) ||
          (scaleAnswer < 3 && secondBinaryAnswer) ||
          scaleAnswer === 3
        ) {
          const commentQuestion = evaluationQuestions
            .find(
              (criteriaQuestions) => criteriaQuestions.criteria === criteria,
            )
            ?.list.find((question) => question.type === 'comment')

          commentQuestion &&
            setQuestionList((oldQuestions) => [
              ...oldQuestions,
              commentQuestion,
            ])
        }
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPosition])

  useEffect(() => {
    if (selectedAttributes.length > 0) {
      setIsCurrentQuestionAnswered(true)
    } else {
      setIsCurrentQuestionAnswered(false)
    }
  }, [selectedAttributes.length])

  useEffect(() => {
    if (currentQuestion?.type === 'scale') {
      setIsCurrentQuestionAnswered(true)
    }
  }, [currentQuestion])

  return (
    <S.TeamMemberEvaluationModalContainer>
      <strong>Avaliação 360</strong>

      <S.UserInfo>
        <img src={member.avatar_url} alt={member.name} />
        <h3>{member.name}</h3>
      </S.UserInfo>

      <span>Como efetuar essa avaliação?</span>

      <p>A avaliação 360 é uma forma de avaliar a equipe como um todo.</p>

      <hr />

      <strong>
        Pergunta {currentPosition + 1} / {questionList.length}
      </strong>

      <h3>Avalie a sua satisfação em relação a esse colaborador</h3>

      {currentQuestion?.type === 'comment' && (
        <>
          <label htmlFor="workstation-comment">
            {currentQuestion.question}
          </label>

          <S.TextareaComponent
            id="workstation-comment"
            value={comment}
            onChange={(e) => handleCommentChange(e)}
            placeholder="Digite seu comentário aqui"
          />
        </>
      )}

      {currentQuestion?.type === 'scale' && (
        <>
          <span>{currentQuestion.question}</span>

          <S.SliderContainer>
            <Slider
              currentValue={sliderValue}
              setCurrentValue={setSliderValue}
            />
          </S.SliderContainer>
        </>
      )}

      {currentQuestion?.type === 'binary' && (
        <>
          <p>{currentQuestion.question}</p>

          <S.BinaryButtons>
            <S.BinaryButton
              isActive={binaryValue === 'sim'}
              onClick={() => handleBinaryAnswerSelection('sim')}
            >
              Sim
            </S.BinaryButton>

            <S.BinaryButton
              isActive={binaryValue === 'não'}
              onClick={() => handleBinaryAnswerSelection('não')}
            >
              Não
            </S.BinaryButton>
          </S.BinaryButtons>
        </>
      )}

      {currentQuestion?.type === 'multiselect' && (
        <>
          <span>{currentQuestion.question}</span>

          <Multiselect
            category="behavior"
            selectedAttributes={selectedAttributes}
            handleAttributeSelection={handleAttributeSelection}
          />
        </>
      )}

      <S.ButtonContainer>
        <Button
          title={
            currentPosition === questionList.length - 1 ? 'concluir' : 'próxima'
          }
          buttonStyle="secondary"
          onClick={
            currentPosition === questionList.length - 1
              ? handleCompleteTeamMemberEvaluation
              : handleGoToNextEvaluationQuestion
          }
          disabled={!isCurrentQuestionAnswered}
          isLoading={isLoading}
        />
      </S.ButtonContainer>
    </S.TeamMemberEvaluationModalContainer>
  )
}
