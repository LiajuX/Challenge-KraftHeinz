import { useEffect, useState } from 'react'
import { useTheme } from 'styled-components'

import { SatisfactionEmoji } from '../../SatisfactionEmoji'

import * as S from './styles'

interface SliderProps {
  currentValue: number
  setCurrentValue: (value: number) => void
}

export function Slider({ currentValue, setCurrentValue }: SliderProps) {
  const colors = useTheme()

  const [currentStatusColor, setCurrentStatusColor] = useState(
    colors['grey-100'],
  )

  useEffect(() => {
    switch (currentValue) {
      case 0:
        setCurrentStatusColor(colors['red-700'])
        break

      case 1:
        setCurrentStatusColor(colors['red-500'])
        break

      case 2:
        setCurrentStatusColor(colors['orange-500'])
        break

      case 3:
        setCurrentStatusColor(colors['green-500'])
        break

      case 4:
        setCurrentStatusColor(colors['green-700'])
        break
    }
  }, [colors, currentValue])

  function getBackgroundSize() {
    const max = 4

    const backgroundSize = (currentValue * 100) / max

    return backgroundSize
  }

  return (
    <>
      <S.LabelsContainer>
        <button onClick={() => setCurrentValue(0)}>
          <SatisfactionEmoji
            type="terrible"
            color={currentValue === 0 ? currentStatusColor : ''}
          />
        </button>

        <button onClick={() => setCurrentValue(1)}>
          <SatisfactionEmoji
            type="bad"
            color={currentValue === 1 ? currentStatusColor : ''}
          />
        </button>

        <button onClick={() => setCurrentValue(2)}>
          <SatisfactionEmoji
            type="regular"
            color={currentValue === 2 ? currentStatusColor : ''}
          />
        </button>

        <button onClick={() => setCurrentValue(3)}>
          <SatisfactionEmoji
            type="good"
            color={currentValue === 3 ? currentStatusColor : ''}
          />
        </button>

        <button onClick={() => setCurrentValue(4)}>
          <SatisfactionEmoji
            type="great"
            color={currentValue === 4 ? currentStatusColor : ''}
          />
        </button>
      </S.LabelsContainer>

      <S.SliderContainer>
        <S.SliderMarks>
          <S.SliderMark
            active={currentValue >= 0}
            onClick={() => setCurrentValue(0)}
            currentStatusColor={currentStatusColor}
          />
          <S.SliderMark
            active={currentValue >= 1}
            onClick={() => setCurrentValue(1)}
            currentStatusColor={currentStatusColor}
          />
          <S.SliderMark
            active={currentValue >= 2}
            onClick={() => setCurrentValue(2)}
            currentStatusColor={currentStatusColor}
          />
          <S.SliderMark
            active={currentValue >= 3}
            onClick={() => setCurrentValue(3)}
            currentStatusColor={currentStatusColor}
          />
          <S.SliderMark
            active={currentValue >= 4}
            onClick={() => setCurrentValue(4)}
            currentStatusColor={currentStatusColor}
          />
        </S.SliderMarks>

        <S.Slider
          id="slider"
          type="range"
          min={0}
          max={4}
          step={1}
          value={currentValue}
          onChange={(e) => setCurrentValue(Number(e.target.value))}
          currentStatusColor={currentStatusColor}
          backgroundSize={getBackgroundSize}
        />
      </S.SliderContainer>
    </>
  )
}
