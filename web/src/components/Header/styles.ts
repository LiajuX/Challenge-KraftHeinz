import styled from 'styled-components'

export const HeaderContainer = styled.header`
  display: flex;
  justify-content: center;

  position: fixed;

  width: 100%;

  background: ${({ theme }) => theme.white};

  margin: 0 auto;
  padding: 3.375rem 0 1.5rem;
`

export const ContentWrapper = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;

  max-width: 1120px;
`
