import styled from 'styled-components'

export const SignInContainer = styled.div`
  position: relative;

  main {
    max-width: 1120px;
    width: 100vw;
    height: 100vh;

    margin: 4rem auto 0;

    h1 {
      margin-bottom: 3.125rem;
    }
  }
`

export const Header = styled.header`
  width: 100vw;
  max-width: 1120px;

  margin: 0 auto;
  padding: 3.375rem 0 1.5rem;
`

export const ContentWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;

  form {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;

    width: 100%;
    max-width: 34rem;

    .input-container {
      display: flex;
      flex-direction: column;

      label {
        margin-bottom: 0.625rem;
      }
    }

    .buttons-container {
      display: flex;
      justify-content: space-between;
    }
  }

  img {
    margin-top: -5rem;
  }
`
