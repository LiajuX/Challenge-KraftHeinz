import styled, { css } from 'styled-components'

export const FooterContainer = styled.div`
  width: 100%;

  padding: 3rem;

  color: ${({ theme }) => theme.white};
  background: ${({ theme }) => theme['gradient-dark-blue']};

  font-size: 0.8125rem;
  font-weight: 600;
`

export const ContentWrapper = styled.footer`
  display: flex;
  align-items: center;
  justify-content: space-between;

  max-width: 1120px;

  margin: 0 auto;

  ul {
    display: flex;
    gap: 0.75rem;

    list-style: none;

    li {
      & + li {
        padding-left: 0.75rem;
        border-left: 1px solid ${({ theme }) => theme.white};
      }

      &:hover {
        text-decoration: underline;
      }
    }
  }
`

export const PoweredBy = styled.div`
  display: flex;
  align-items: center;
  gap: 0.375rem;

  img {
    width: 55px;
  }
`

export const Copyright = styled.div`
  display: flex;
  align-items: center;
  gap: 1.75rem;
`
