interface RouteProps {
  title: string
  icon: 'home' | 'charts' | 'like' | 'group'
  path: string
}

export const routes: RouteProps[] = [
  {
    title: 'Home',
    icon: 'home',
    path: '/',
  },
  {
    title: 'Dashboard',
    icon: 'charts',
    path: '/dashboard',
  },
  {
    title: '/Teams',
    icon: 'group',
    path: '/teams',
  },
]

export const managerRoutes: RouteProps[] = [
  {
    title: 'Home',
    icon: 'home',
    path: '/',
  },
  {
    title: 'History',
    icon: 'like',
    path: '/history',
  },
  {
    title: 'Teams',
    icon: 'group',
    path: '/teams',
  },
]
