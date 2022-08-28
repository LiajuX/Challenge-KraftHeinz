import { NavLink } from 'react-router-dom'
import styled, { css } from 'styled-components'

const ACTIVE_LINK_COLORS = {
  primary: 'red-500',
  secondary: 'green-500',
  tertiary: 'white',
} as const

const ACTIVE_LINK_HOVER_COLORS = {
  primary: 'red-700',
  secondary: 'green-700',
  tertiary: 'grey-200',
} as const

interface ActiveLinkContainerProps {
  linkStyle: keyof typeof ACTIVE_LINK_COLORS
}

export const ActiveLinkContainer = styled(NavLink)<ActiveLinkContainerProps>`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 10rem;
  height: 3rem;

  border-radius: 3px;
  ${({ theme, linkStyle }) =>
    linkStyle === 'tertiary' &&
    css`
      border: 1px solid ${theme['grey-200']};
    `};

  background: ${({ theme, linkStyle }) => theme[ACTIVE_LINK_COLORS[linkStyle]]};
  color: ${({ theme, linkStyle }) =>
    linkStyle === 'tertiary' ? theme['grey-200'] : theme.white};

  font-size: 0.8125rem;
  font-weight: 600;
  text-transform: uppercase;

  cursor: pointer;
  transition: all 0.2s;

  &:not(:disabled):hover {
    background: ${({ theme, linkStyle }) =>
      theme[ACTIVE_LINK_HOVER_COLORS[linkStyle]]};

    ${({ theme, linkStyle }) =>
      linkStyle === 'tertiary' &&
      css`
        color: ${theme.white};
      `};
  }
`
