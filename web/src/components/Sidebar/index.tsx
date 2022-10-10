import { NavLink, useLocation } from 'react-router-dom'
import { FiSettings } from 'react-icons/fi'

import { useAuth } from '../../hooks/useAuth'

import { managerRoutes, routes } from '../../utils/sidebarData'

import { Icon } from '../Icon'

import * as S from './styles'

export function Sidebar() {
  const { user } = useAuth()

  const currentRoute = useLocation()
  const { pathname } = currentRoute

  return (
    <S.SidebarContainer>
      <S.NavContainer>
        {!user?.is_manager &&
          routes.map((route, index) => (
            <S.NavItem
              key={route.title}
              index={index}
              isActive={pathname === route.path}
            >
              <NavLink to={route.path}>
                <Icon isActive={pathname === route.path} icon={route.icon} />
              </NavLink>
            </S.NavItem>
          ))}

        {user?.is_manager &&
          managerRoutes.map((route, index) => (
            <S.NavItem
              key={route.title}
              index={index}
              isActive={pathname === route.path}
            >
              <NavLink to={route.path}>
                <Icon isActive={pathname === route.path} icon={route.icon} />
              </NavLink>
            </S.NavItem>
          ))}
      </S.NavContainer>

      <NavLink to="/">
        <FiSettings size={24} />
      </NavLink>
    </S.SidebarContainer>
  )
}
