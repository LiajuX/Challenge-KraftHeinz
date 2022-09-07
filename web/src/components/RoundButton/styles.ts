import styled, { css, keyframes } from 'styled-components'

interface RoundButtonProps {
  isMenuOpen: boolean
}

const openMenu = keyframes`
  from {
    bottom: 4rem; 
    opacity: 0;
  }
  to {
    bottom: 9.125rem; 
    opacity: 1;
  }
`

export const RoundButtonContainer = styled.button<RoundButtonProps>`
  position: fixed;
  bottom: 4rem;
  right: 4rem;

  display: flex;
  align-items: center;
  justify-content: center;

  width: 4rem;
  height: 4rem;

  border-radius: 50%;

  ${({ isMenuOpen, theme }) =>
    isMenuOpen
      ? css`
          transform: rotateY(0deg) rotate(45deg);
          transition: transform 0.2s ease-out;
          background: ${theme['grey-300']};
        `
      : css`
          background: ${theme['gradient-red-orange']};
          transform: rotateY(0deg) rotate(0deg);
          transition: transform 0.2s ease-out;
        `}

  &:hover {
    filter: brightness(0.95);
  }
`

export const ButtonsContainer = styled.div<RoundButtonProps>`
  position: fixed;
  bottom: 9.125rem;
  right: 4rem;

  display: ${({ isMenuOpen }) => (isMenuOpen ? 'flex' : 'none')};
  flex-direction: column;
  gap: 1.125rem;

  ${({ isMenuOpen }) =>
    isMenuOpen &&
    css`
      animation: ${openMenu} 0.2s ease-out forwards;
    `};
`
