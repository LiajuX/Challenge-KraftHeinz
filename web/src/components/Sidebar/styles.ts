import { NavLink } from 'react-router-dom'
import styled, { css } from 'styled-components'

interface NavButtonProps {
  isActive: boolean
}

export const SidebarContainer = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  height: 100%;

  padding-bottom: 4.125rem;

  color: ${({ theme }) => theme.white};

  z-index: 5;

  background: ${({ theme }) => theme['gradient-sidebar']};
`

export const NavContainer = styled.nav`
  display: flex;
  align-items: center;

  width: 100%;

  padding-top: 10.375rem;

  ul {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;

    overflow: hidden;
  }
`

export const NavButtonContainer = styled.li<NavButtonProps>`
  position: relative;

  list-style: none;
`

export const NavButton = styled(NavLink)<NavButtonProps>`
  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 9px 0 0 9px;

  cursor: pointer;
  transition: all 0.2s;

  ${({ isActive, theme }) =>
    isActive &&
    css`
      margin-left: 0.5rem;
      padding: 0.95rem;

      color: ${theme['blue-500']};
      background: ${theme.white};
    `}
`
