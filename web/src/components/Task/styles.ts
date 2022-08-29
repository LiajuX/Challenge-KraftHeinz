import styled, { css } from 'styled-components'

export const TaskContainer = styled.div`
  display: flex;
  align-items: flex-start;

  margin-bottom: 0.625rem;
  padding: 2rem;
  border-radius: 9px;

  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.1);

  cursor: pointer;
`

const ICON_COLORS = {
  report: { primary: 'red-500', secondary: 'yellow-500' },
  camera: { primary: 'red-500', secondary: 'purple-500' },
  video: { primary: 'green-400', secondary: 'yellow-500' },
} as const

interface IconContainerProps {
  iconStyle: keyof typeof ICON_COLORS
}

export const IconContainer = styled.div<IconContainerProps>`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 4.125rem;
  height: 4.125rem;

  margin-right: 0.75rem;
  border-radius: 50%;

  ${({ theme, iconStyle }) => css`
    background: linear-gradient(
      135deg,
      ${theme[ICON_COLORS[iconStyle].primary]} 0%,
      ${theme[ICON_COLORS[iconStyle].secondary]} 100%
    );
  `}
`

export const TaskDetails = styled.div`
  flex: 1;
  margin-right: 2.125rem;

  strong {
    display: block;

    width: 15.5rem;

    font-size: 1rem;
  }

  p {
    margin-top: 1rem;
    font-size: 0.75rem;
  }
`

interface DueDateProps {
  color: string
}

export const DueDate = styled.div<DueDateProps>`
  display: flex;
  align-items: center;
  gap: 0.625rem;

  color: ${({ color }) => color};

  time {
    margin-bottom: 0.0625rem;

    font-size: 1rem;
    font-weight: bold;
  }
`
