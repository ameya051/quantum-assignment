import { createFileRoute } from '@tanstack/react-router'
import Login from '../pages/Login'
import { redirectIfAuthenticated } from '@/lib/utils'

export const Route = createFileRoute('/login')({
  beforeLoad: ({ context }) => {
    redirectIfAuthenticated(context)
  },
  component: Login,
})