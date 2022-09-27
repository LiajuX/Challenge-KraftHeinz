import styled, { css } from 'styled-components'

export const NewTaskContainer = styled.div`
  padding: 1.75rem 4.875rem 2.375rem;

  header {
    display: flex;
    align-items: center;
    justify-content: space-between;
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

  textarea {
    width: 100%;
    min-height: 6.125rem;

    margin: 1.0625rem 0 2.125rem;
    border: 0;

    font-size: 1rem;

    resize: none;

    ::placeholder {
      color: ${({ theme }) => theme.black};
    }

    ::-webkit-scrollbar {
      width: 5px;
    }

    ::-webkit-scrollbar-track {
      margin: 0.5rem;
      border-radius: 2.5rem;

      background: ${(props) => props.theme['grey-100']};
    }

    ::-webkit-scrollbar-thumb {
      border-radius: 2.5rem;

      background: ${(props) => props.theme['grey-200']};
    }
  }
`

export const DueDate = styled.div`
  display: flex;
  align-items: center;
  align-self: flex-end;
  gap: 0.625rem;

  color: ${({ theme }) => theme['green-500']};

  font-size: 1rem;
  font-weight: bold;

  input {
    width: 8.75rem;
    border: 0;

    color: ${({ theme }) => theme['green-500']};

    font-size: 1rem;
    font-weight: bold;

    ::placeholder {
      color: ${({ theme }) => theme['green-500']};
    }

    ::-webkit-inner-spin-button,
    ::-webkit-calendar-picker-indicator {
      cursor: pointer;
    }
  }

  time {
    margin-bottom: 0.0625rem;
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

  ::placeholder {
    color: ${({ theme }) => theme['blue-800']};
  }
`

export const FilesContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;

  margin: 1.0625rem 0 2.125rem;
`

interface CheckboxProps {
  isActive: boolean
}

export const CheckboxContainer = styled.div<CheckboxProps>`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 0.5rem;

  margin: 1.0625rem 0 2.125rem;

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

export const SubtaskButton = styled.button`
  width: 100%;

  margin-bottom: 1rem;
  padding: 0.75rem 2rem 2rem 0.875rem;
  border-radius: 9px;

  background: ${({ theme }) => theme.white};

  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.25);

  text-align: left;

  &:first-child {
    margin-top: 1rem;
  }

  span {
    margin-bottom: 1.0625rem;
  }

  textarea {
    margin: 0;
  }
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

export const ImagesContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 0.75rem;

  margin: 1.0625rem 0 2.125rem;
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
