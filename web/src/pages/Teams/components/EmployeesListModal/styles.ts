import styled, { css } from 'styled-components'

export const EmployeesListContainer = styled.div`
  padding: 1.75rem 4.875rem 2.375rem;

  strong {
    color: ${({ theme }) => theme['grey-300']};

    font-size: 1rem;
  }

  h3 {
    margin: 1.75rem 0 2rem;

    color: ${({ theme }) => theme['blue-800']};

    font-size: 1.25rem;
  }
`

export const TeamMembersContainer = styled.div`
  margin: 0.75rem 0 3.25rem;
`

export const TeamMemberButton = styled.button`
  display: grid;
  grid-template-columns: 5fr 2fr;

  width: 100%;

  margin-bottom: 0.625rem;
  padding: 0.25rem 0 0.25rem 0.25rem;
  border: 2px solid transparent;
  border-image-slice: 1;
  border-radius: 100px 9px 9px 100px;

  background: transparent;

  transition: all 0.2s;
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.1);

  &:hover {
    border: 2px solid ${({ theme }) => theme['grey-100']};
  }

  img {
    width: 2.875rem;
    height: 2.875rem;

    border-radius: 50%;
  }
`

export const UserInfo = styled.div`
  display: flex;
  align-items: center;

  strong {
    margin-left: 1rem;

    color: ${({ theme }) => theme.black};
  }
`

interface RoleProps {
  role: string
}

export const Role = styled.div<RoleProps>`
  display: flex;
  align-items: center;

  height: 100%;

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

    font-size: 0.75rem;
    font-weight: bold;
    text-fill-color: transparent;
  }
`
