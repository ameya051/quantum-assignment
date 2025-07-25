import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { getAuthData } from '@/lib/utils'

export const Route = createRootRoute({
  beforeLoad: () => ({
    auth: getAuthData(),
  }),
  component: () => (
    <>
      <Outlet />
      <TanStackRouterDevtools />
    </>
  ),
})
