import styled, { css, keyframes } from 'styled-components'

const BUTTON_COLORS = {
  primary: 'red-500',
  secondary: 'green-500',
  tertiary: 'white',
} as const

const BUTTON_HOVER_COLORS = {
  primary: 'red-700',
  secondary: 'green-700',
  tertiary: 'grey-200',
} as const

interface ButtonContainerProps {
  buttonStyle: keyof typeof BUTTON_COLORS
}

export const ButtonContainer = styled.button<ButtonContainerProps>`
  width: 10rem;
  height: 3rem;

  border-radius: 3px;
  ${({ theme, buttonStyle }) =>
    buttonStyle === 'tertiary' &&
    css`
      border: 1px solid ${theme['grey-200']};
    `};

  background: ${({ theme, buttonStyle }) => theme[BUTTON_COLORS[buttonStyle]]};
  color: ${({ theme, buttonStyle }) =>
    buttonStyle === 'tertiary' ? theme['grey-200'] : theme.white};

  font-size: 0.8125rem;
  font-weight: 600;
  text-transform: uppercase;

  transition: all 0.2s;

  &:not(:disabled):hover {
    background: ${({ theme, buttonStyle }) =>
      theme[BUTTON_HOVER_COLORS[buttonStyle]]};

    ${({ theme, buttonStyle }) =>
      buttonStyle === 'tertiary' &&
      css`
        color: ${theme.white};
      `};
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.8;
  }
`
