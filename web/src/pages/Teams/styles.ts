import styled from 'styled-components'

export const TeamsContainer = styled.div`
  width: 100vw;
  max-width: 1120px;
  min-height: 100vh;

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
    max-width: 60%;

    margin-bottom: 2.375rem;

    color: ${({ theme }) => theme['grey-300']};

    font-size: 1.25rem;

    &:first-child {
      margin-top: -1.5625rem;
    }
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

export const DeleteButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 10rem;
  height: 3rem;

  color: ${({ theme }) => theme['red-500']};
  background: transparent;

  font-size: 0.8125rem;
  font-weight: 600;
  text-transform: uppercase;

  transition: all 0.2s;

  &:hover {
    color: ${({ theme }) => theme['red-700']};
  }
`

export const AddNewMemberButton = styled.button`
  width: 100%;
  height: 5rem;

  margin-bottom: 2.125rem;
  border: 2px solid ${({ theme }) => theme['grey-100']};
  border-radius: 100px 9px 9px 100px;

  color: ${({ theme }) => theme['grey-200']};
  background: ${({ theme }) => theme.white};

  transition: all 0.2s;

  &:hover {
    border-color: ${({ theme }) => theme['grey-200']};

    color: ${({ theme }) => theme['grey-300']};
  }
`

export const SearchBarContainer = styled.div`
  width: 19.75rem;
`
