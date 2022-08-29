import styled from 'styled-components'

export const RoundButtonContainer = styled.button`
  position: fixed;
  bottom: 4rem;
  right: 4rem;

  display: flex;
  align-items: center;
  justify-content: center;

  width: 4rem;
  height: 4rem;

  border-radius: 50%;

  background: ${({ theme }) => theme['gradient-red-orange']};
`
