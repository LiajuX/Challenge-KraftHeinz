import styled, { css } from 'styled-components'

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
`

interface QuoteProps {
  isFocused: boolean
}

export const Quote = styled.div<QuoteProps>`
  textarea {
    width: 26.25rem;
    height: 3.85rem;

    padding: 0.3rem 0.5625rem;
    border: 0;
    border-radius: 6px;

    color: ${({ theme }) => theme.black};
    background: transparent;

    font-size: 0.75rem;

    resize: none;

    ::-webkit-scrollbar {
      width: 0px;
    }

    ${({ isFocused }) =>
      isFocused &&
      css`
        border: 1.5px solid ${({ theme }) => theme['green-500']};

        box-shadow: none;
      `}
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
`

export const ExpectationsCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  height: 13.625rem;
`

export const PonctuationCardContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`

export const PonctuationMessageContainer = styled.div`
  width: 54%;

  padding: 4.5rem 0;

  font-size: 0.75rem;

  strong {
    display: block;
  }

  p {
    width: 100%;
    text-align: left;

    margin-bottom: 0.875rem;
  }
`

export const RatingStarsContainer = styled.div`
  display: flex;

  width: 100%;

  margin: 1.5rem 0;
`
