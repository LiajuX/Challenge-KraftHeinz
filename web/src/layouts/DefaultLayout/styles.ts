import styled from 'styled-components'

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

  width: 100%;
  height: 100vh;
`
