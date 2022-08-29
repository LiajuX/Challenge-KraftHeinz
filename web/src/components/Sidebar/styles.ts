import styled, { css } from 'styled-components'

interface NavButtonProps {
  isActive: boolean
  index: number
}

export const SidebarContainer = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  width: 4.125rem;
  height: 100%;

  padding-bottom: 4.125rem;

  color: ${({ theme }) => theme.white};

  z-index: 5;

  background: ${({ theme }) => theme['gradient-sidebar']};
`

export const NavContainer = styled.nav`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.25rem;

  width: 100%;

  margin-top: 10.5rem;
  padding-left: 0.375rem;

  svg {
    margin-left: -0.375rem;
    height: 1.5rem;
    width: 1.5rem;
  }
`

export const NavItem = styled.div<NavButtonProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 3.25rem;

  padding-top: 0.25rem;
  border-radius: 9px 0 0 9px;

  background: ${({ theme, isActive }) =>
    isActive ? theme.white : 'transparent'};

  cursor: pointer;
`
