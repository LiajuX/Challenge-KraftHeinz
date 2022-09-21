import styled, { keyframes } from 'styled-components'

const rotate = keyframes`
  from {
    transform: rotate(0deg)
  }
  to {
    transform: rotate(360deg)
  }
`

interface LoadingContainerProps {
  color?: string
}

export const LoadingContainer = styled.div<LoadingContainerProps>`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 100%;

  svg {
    color: ${({ theme, color }) => color || theme['blue-500']};
    animation: ${rotate} 2.5s linear infinite;
  }
`
