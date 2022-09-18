import styled from 'styled-components'

export const LandingContainer = styled.div`
  max-width: 1110px;
  width: 100vw;
  height: 100%;

  margin: 0 auto;

  main {
    height: 100vh;
    display: flex;
    align-items: flex-start;

    padding: 4rem 0 5rem;
  }

  h1 {
    width: 580px;
    margin: 0 -3.8rem 5.5rem 0;

    color: ${({ theme }) => theme['blue-800']};

    font-size: 6.25rem;
    line-height: 5.625rem;
  }
`

export const Header = styled.header`
  width: 100vw;
  max-width: 1120px;

  margin: 0 auto;
  padding: 3.375rem 0 1.5rem;
`
