import styled from 'styled-components'

export const CreateNewTeamModalContainer = styled.div`
  padding: 1.75rem 4.875rem;

  strong {
    color: ${({ theme }) => theme['grey-300']};

    font-size: 1rem;
  }
`

export const TeamMembersContainer = styled.div`
  height: 20rem;

  margin: 0.75rem 0 3.25rem;

  overflow-y: scroll;

  ::-webkit-scrollbar {
    width: 0px;
  }
`

export const TitleInput = styled.input`
  display: block;

  width: 100%;

  margin: 1.0625rem 0 1.5rem;
  border: 0;

  color: ${({ theme }) => theme['blue-800']};

  font-weight: bold;
  font-size: 1.25rem;

  ::placeholder {
    color: ${({ theme }) => theme['blue-800']};
  }
`

export const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  margin-top: 3rem;
`
