import styled, { css } from 'styled-components'

import { Textarea as TextareaComponent } from '../../../../components/Form/Textarea'

export const NewTaskContainer = styled.div`
  padding: 1.75rem 4.875rem 2.375rem;

  header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    margin-bottom: 1.75rem;
  }

  strong {
    color: ${({ theme }) => theme['grey-300']};

    font-size: 1rem;
  }

  span {
    display: block;

    color: ${({ theme }) => theme['grey-300']};

    font-size: 0.75rem;
    font-weight: bold;
  }
`

export const DueDate = styled.div`
  display: flex;
  align-items: flex-start;
  align-self: flex-end;
  gap: 0.625rem;

  color: ${({ theme }) => theme['green-500']};

  font-size: 1rem;
  font-weight: bold;

  input {
    width: 8.7rem;

    border: 0;

    color: ${({ theme }) => theme['green-500']};

    font-size: 1rem;
    font-weight: bold;

    &::placeholder {
      color: ${({ theme }) => theme['green-500']};
    }

    &:not(:placeholder-shown) {
      width: 5rem;
    }
  }
`

export const TitleInput = styled.input`
  display: block;

  width: 100%;

  margin: 1.0625rem 0 2.125rem;
  border: 0;

  color: ${({ theme }) => theme['blue-800']};

  font-weight: bold;
  font-size: 1.25rem;

  &:focus {
    padding-bottom: 0.5rem;
    border-bottom: 2px solid ${({ theme }) => theme['blue-700']};

    box-shadow: none;
  }

  ::placeholder {
    color: ${({ theme }) => theme['blue-800']};
  }
`

export const Textarea = styled(TextareaComponent)`
  margin: 1rem 0;
`

export const FilesContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2.125rem;

  margin: 1rem 0 2.125rem;
`

interface CheckboxProps {
  isActive: boolean
}

export const CheckboxContainer = styled.div<CheckboxProps>`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 0.5rem;

  margin: 1rem 0 2.125rem;

  cursor: pointer;

  div {
    width: 0.625rem;
    height: 0.625rem;

    border: 2px solid ${({ theme }) => theme.black};

    ${({ theme, isActive }) =>
      isActive &&
      css`
        background: ${theme.black};
      `}
  }

  span {
    color: ${({ theme }) => theme.black};

    font-size: 1rem;
    font-weight: normal;
  }
`

export const SubtaskContainer = styled.div`
  width: 100%;

  margin-bottom: 2.125rem;
  padding: 1.5rem;
  border: 2px solid ${({ theme }) => theme['grey-100']};
  border-radius: 9px;

  background: ${({ theme }) => theme.white};

  text-align: left;

  header {
    div {
      display: flex;
      align-items: center;
      justify-content: flex-start;

      span {
        display: inline-block;
        margin: 0 0.5rem;

        color: ${({ theme }) => theme['grey-200']};

        font-size: 1.1875rem;
        font-weight: bold;
      }
    }

    button {
      height: 18px;

      background: transparent;

      svg {
        color: ${({ theme }) => theme['grey-200']};

        transition: all 0.2s;

        &:hover {
          color: ${({ theme }) => theme['grey-300']};
        }
      }
    }
  }

  &:first-child {
    margin-top: 1rem;
  }
`

export const SubtaskDueDateContainer = styled.div`
  margin: 1rem 0;
`

export const AddNewSubtask = styled.button`
  width: 100%;
  height: 6.625rem;

  margin-bottom: 2.125rem;
  border: 2px solid ${({ theme }) => theme['grey-100']};
  border-radius: 9px;

  color: ${({ theme }) => theme['grey-200']};
  background: ${({ theme }) => theme.white};

  transition: all 0.2s;

  &:hover {
    border-color: ${({ theme }) => theme['grey-200']};

    color: ${({ theme }) => theme['grey-300']};
  }
`

interface TeamMembersProps {
  isActive: boolean
}

export const AvatarContainer = styled.button<TeamMembersProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

  width: 4.125rem;
  height: 4.125rem;

  border-radius: 50%;

  background: transparent;

  img {
    width: 4.125rem;
    height: 4.125rem;

    border-radius: 50%;
  }

  ${({ isActive }) =>
    isActive &&
    css`
      opacity: 50%;
    `}

  svg {
    position: absolute;

    color: ${({ theme }) => theme.white};

    opacity: 50%;
  }
`

export const ButtonsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  gap: 0.75rem;

  margin: 1rem 0 2.125rem;
`

const ICON_COLORS = {
  report: { primary: 'red-500', secondary: 'yellow-500' },
  camera: { primary: 'red-500', secondary: 'purple-500' },
  video: { primary: 'green-400', secondary: 'yellow-500' },
} as const

interface IconContainerProps {
  iconStyle: keyof typeof ICON_COLORS
  isActive: boolean
}

export const IconContainer = styled.button<IconContainerProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

  width: 4.125rem;
  height: 4.125rem;

  border-radius: 50%;

  ${({ theme, iconStyle }) => css`
    background: linear-gradient(
      135deg,
      ${theme[ICON_COLORS[iconStyle].primary]} 0%,
      ${theme[ICON_COLORS[iconStyle].secondary]} 100%
    );
  `}

  ${({ isActive }) =>
    isActive &&
    css`
      opacity: 50%;
    `}

  svg {
    position: absolute;

    color: ${({ theme }) => theme.white};

    opacity: 50%;
  }
`

export const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`
