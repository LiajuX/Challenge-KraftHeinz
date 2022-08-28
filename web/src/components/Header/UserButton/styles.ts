import styled from 'styled-components'

export const UserButtonContainer = styled.div`
  border-radius: 25px;

  background: ${({ theme }) => theme.white};

  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 0.5625rem 1.625rem 0.5625rem 0.5625rem;
  border-radius: 100px;

  img {
    width: 34px;
    height: 34px;

    border-radius: 50%;
  }

  span {
    flex: 1;
    margin: 0 1.875rem 0 0.625rem;

    color: ${({ theme }) => theme['grey-400']};

    font-size: 1.25rem;
    font-weight: bold;
  }

  button {
    background: transparent;
  }

  svg {
    margin-top: 0.25rem;

    color: ${({ theme }) => theme['blue-500']};

    transition: all 0.2s;

    &:hover {
      color: ${({ theme }) => theme.black};
    }
  }
`
