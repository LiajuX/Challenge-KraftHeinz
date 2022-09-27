import styled from 'styled-components'

export const HistoryContainer = styled.div`
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
  justify-content: space-between;

  margin: 0 6rem 2.375rem 0;

  h3 {
    color: ${({ theme }) => theme['grey-300']};

    font-size: 1.25rem;
  }
`

export const TeamMemberButton = styled.button`
  margin: 0;
  padding: 0;
  border: 0;

  background: transparent;

  &:not(:first-child) {
    margin-bottom: 0.8125rem;
  }
`

export const SearchBarContainer = styled.div`
  width: 19.75rem;
`
