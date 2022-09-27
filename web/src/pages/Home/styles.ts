import styled from 'styled-components'

export const HomeContainer = styled.div`
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
  align-items: flex-start;
  justify-content: space-between;
  gap: 3.125rem;

  section {
    flex: 1;

    h3 {
      margin-bottom: 1.875rem;

      color: ${({ theme }) => theme['grey-300']};

      font-size: 1.25rem;
    }
  }
`

export const ChartContainer = styled.div`
  margin-top: 4.25rem;
`
