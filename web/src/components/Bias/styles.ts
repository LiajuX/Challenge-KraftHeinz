import styled, { css } from 'styled-components'

export const BiasContainer = styled.div`
  position: relative;

  display: flex;
  align-items: center;
  justify-content: center;

  width: 3.25rem;
  height: 1.1875rem;

  border-radius: 9.5px;

  background: ${({ theme }) => theme['grey-100']};
`

export const BiasDivider = styled.div`
  width: 0.1875rem;
  height: 1.5rem;

  border-radius: 9.5px;

  background: ${({ theme }) => theme['grey-200']};
`

interface BiasAmountProps {
  value: number
}

export const BiasAmount = styled.div<BiasAmountProps>`
  position: absolute;
  ${({ value }) =>
    value < 0
      ? css`
          right: calc(50% + 0.09375rem);
        `
      : css`
          left: calc(50% + 0.09375rem);
        `};

  ${({ value }) =>
    value === 4
      ? css`
          width: 50%;
          border-radius: 0 9.5px 9.5px 0;
        `
      : value === 3
      ? css`
          width: 30%;
        `
      : value === 2
      ? css`
          width: 20%;
        `
      : css`
          width: 10%;
        `};
  height: 100%;

  background: ${({ value, theme }) =>
    value < 0 ? theme['red-500'] : theme['green-500']};
`
