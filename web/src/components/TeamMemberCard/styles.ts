import styled, { css } from 'styled-components'

export const TeamMemberCardContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 3fr;

  padding: 0.3125rem 1.5rem 0.3125rem 0.3125rem;
  border-radius: 100px 9px 9px 100px;

  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.1);

  img {
    width: 4.5rem;
    height: 4.5rem;

    border-radius: 50%;
  }

  span {
    font-size: 0.75rem;
  }
`

interface UserInfoProps {
  role: string
}

export const UserInfo = styled.div<UserInfoProps>`
  display: flex;
  align-items: center;

  div {
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    margin-left: 0.5625rem;
  }

  strong {
    font-size: 0.9375rem;
  }

  span {
    ${({ theme, role }) =>
      role === 'manager'
        ? css`
            background: ${theme['gradient-dark-blue']};
          `
        : role === 'design'
        ? css`
            background: ${theme['gradient-light-blue']};
          `
        : role === 'dev'
        ? css`
            background: ${theme['gradient-green-yellow']};
          `
        : role === 'it'
        ? css`
            background: ${theme['gradient-orange-yellow']};
          `
        : css`
            background: ${theme['gradient-red-purple']};
          `}

    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-fill-color: transparent;

    font-weight: bold;
  }
`

export const ContentWrapper = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
`
