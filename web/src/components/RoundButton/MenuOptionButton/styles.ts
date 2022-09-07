import styled from 'styled-components'

export const MenuOptionButtonContainer = styled.button`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 0.75rem;

  background: transparent;

  font-size: 1.25rem;
  font-weight: bold;

  transition: filter 0.2s;

  &:hover {
    color: ${({ theme }) => theme['grey-400']};
    filter: brightness(0.95);
  }
`

interface IconContainerProps {
  color: string
}

export const IconContainer = styled.div<IconContainerProps>`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 4rem;
  height: 4rem;
  border-radius: 50%;

  background: ${({ color }) => color};
`
