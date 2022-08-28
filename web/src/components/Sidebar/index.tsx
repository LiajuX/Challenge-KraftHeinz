import { NavLink, useLocation } from 'react-router-dom'
import { FiHome, FiSettings } from 'react-icons/fi'
import { HiOutlinePresentationChartLine } from 'react-icons/hi'
import { GrGroup } from 'react-icons/gr'
import { BiLike } from 'react-icons/bi'

import * as S from './styles'

export function Sidebar() {
  const location = useLocation()
  const { pathname } = location

  const isManager = false

  return (
    <S.SidebarContainer>
      <S.NavContainer>
        <ul>
          <S.NavButtonContainer isActive={pathname === '/'}>
            <S.NavButton to="/" isActive={pathname === '/'}>
              <FiHome size={26} />
            </S.NavButton>
          </S.NavButtonContainer>

          {isManager ? (
            <S.NavButtonContainer isActive={pathname === '/history'}>
              <S.NavButton to="/history" isActive={pathname === '/history'}>
                <BiLike size={26} />
              </S.NavButton>
            </S.NavButtonContainer>
          ) : (
            <S.NavButtonContainer isActive={pathname === '/dashboard'}>
              <S.NavButton to="/dashboard" isActive={pathname === '/dashboard'}>
                <HiOutlinePresentationChartLine size={28} />
              </S.NavButton>
            </S.NavButtonContainer>
          )}

          <S.NavButtonContainer isActive={pathname === '/teams'}>
            <S.NavButton to="/teams" isActive={pathname === '/teams'}>
              <GrGroup size={26} />
            </S.NavButton>
          </S.NavButtonContainer>
        </ul>
      </S.NavContainer>

      <NavLink to="/settings">
        <a>
          <FiSettings size={26} />
        </a>
      </NavLink>
    </S.SidebarContainer>
  )
}
