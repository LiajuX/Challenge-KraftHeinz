import styled from 'styled-components'

interface SelectButtonProps {
  isActive: boolean
}

export const SelectButtonContainer = styled.button<SelectButtonProps>`
  height: 1.875rem;

  border: 1px solid
    ${({ theme, isActive }) =>
      isActive ? theme['grey-300'] : theme['grey-200']};
  border-radius: 100px;

  color: ${({ theme, isActive }) =>
    isActive ? theme['grey-300'] : theme['grey-200']};
  background: transparent;

  font-size: 0.75rem;

  transition: all 0.2s;

  &:hover {
    border: 1px solid ${({ theme }) => theme['grey-300']};

    color: ${({ theme }) => theme['grey-300']};
  }
`
