import { createRootRoute, Outlet } from '@tanstack/react-router'
import { getAuthData } from '@/lib/utils'

export const Route = createRootRoute({
  beforeLoad: () => ({
    auth: getAuthData(),
  }),
  component: () => (
      <Outlet />
  ),
})
