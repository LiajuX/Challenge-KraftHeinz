import styled from 'styled-components'

export const TeamsContainer = styled.div`
  width: 100vw;
  max-width: 1120px;

  margin: 0 auto;
  padding: 3.25rem 0 8rem;

  h1 {
    margin: 7.125rem 0 3.125rem;
  }
`

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
`

export const ContentWrapperHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;

  margin-right: 6rem;
`

export const TeamContainer = styled.div`
  margin: 0;
  padding: 0;
  border: 0;

  background: transparent;

  &:not(:first-child) {
    margin-bottom: 4rem;
  }

  h3 {
    margin-bottom: 2.375rem;

    color: ${({ theme }) => theme['grey-300']};

    font-size: 1.25rem;
  }
`

export const TeamMemberCardContainer = styled.div`
  &:not(:first-child) {
    margin-bottom: 0.8125rem;
  }
`

export const EvaluationTimeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.25rem;

  span {
    color: ${({ theme }) => theme['grey-300']};

    &:first-child {
      color: ${({ theme }) => theme.black};
    }
  }
`

export const DisabledButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 10rem;
  height: 3rem;

  color: ${({ theme }) => theme['grey-200']};

  font-size: 0.8125rem;
  font-weight: 600;
  text-transform: uppercase;
  text-decoration-line: line-through;

  cursor: not-allowed;
`
