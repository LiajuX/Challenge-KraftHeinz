import styled, { keyframes } from 'styled-components'

const rotate = keyframes`
  from {
    transform: rotate(0deg)
  }
  to {
    transform: rotate(360deg)
  }
`

export const DefaultLayoutContainer = styled.div`
  display: flex;

  main {
    position: relative;

    flex: 1;
    width: 100vw;
  }
`

export const EmptyLayoutContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100vw;
  height: 100vh;

  svg {
    color: ${({ theme }) => theme['blue-500']};
    animation: ${rotate} 2.5s linear infinite;
  }
`
