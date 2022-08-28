import styled from 'styled-components'

export const DashboardContainer = styled.div`
  width: 100vw;
  max-width: 1120px;

  margin: 0 auto;
  padding: 3.25rem 0;

  h1 {
    margin: 7.125rem 0 3.125rem;
  }
`

export const ContentWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-row-gap: 4.25rem;
  grid-column-gap: 2rem;

  h3 {
    margin-bottom: 1.875rem;

    color: ${({ theme }) => theme['grey-300']};

    font-size: 1.25rem;
  }
`

export const Card = styled.div`
  border-radius: 9px;

  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.1);

  p {
    max-width: 25.75rem;

    margin-bottom: 0.4375rem;

    color: ${({ theme }) => theme.black};

    font-size: 0.75rem;

    div {
      margin-left: 0.5625rem;
    }

    span {
      display: block;

      color: ${({ theme }) => theme['grey-200']};

      font-size: 1.25rem;
      font-weight: bold;

      &:last-child {
        transform: rotate(-180deg);
      }
    }
  }
`

export const ExpectationsCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  height: 13.625rem;
`

export const PonctuationCardContainer = styled.div``
