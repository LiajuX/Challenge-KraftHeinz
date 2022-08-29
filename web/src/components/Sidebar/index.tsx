import { NavLink, useLocation } from 'react-router-dom'
import { FiSettings } from 'react-icons/fi'

import { managerRoutes, routes } from '../../utils/sidebarData'

import { RouteIcon } from './RouteIcon'

import * as S from './styles'

export function Sidebar() {
  const isManager = false

  const currentRoute = useLocation()
  const { pathname } = currentRoute

  return (
    <S.SidebarContainer>
      <S.NavContainer>
        {!isManager &&
          routes.map((route, index) => (
            <S.NavItem
              key={route.title}
              index={index}
              isActive={pathname === route.path}
            >
              <NavLink to={route.path}>
                <RouteIcon
                  isActive={pathname === route.path}
                  icon={route.icon}
                />
              </NavLink>
            </S.NavItem>
          ))}

        {isManager &&
          managerRoutes.map((route, index) => (
            <S.NavItem
              key={route.title}
              index={index}
              isActive={pathname === route.path}
            >
              <NavLink to={route.path}>
                <RouteIcon
                  isActive={pathname === route.path}
                  icon={route.icon}
                />
              </NavLink>
            </S.NavItem>
          ))}
      </S.NavContainer>

      <NavLink to="/settings">
        <FiSettings size={24} />
      </NavLink>
    </S.SidebarContainer>
  )
}
