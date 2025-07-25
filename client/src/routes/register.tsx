import Register from '@/pages/Register'
import { createFileRoute } from '@tanstack/react-router'
import { redirectIfAuthenticated } from '@/lib/utils'

export const Route = createFileRoute('/register')({
  beforeLoad: ({ context }) => {
    redirectIfAuthenticated(context)
  },
  component: Register,
})
