import IndexPage from '@/pages/Index'
import { createFileRoute } from '@tanstack/react-router'
import { requireAuth } from '@/lib/utils'

export const Route = createFileRoute('/')({
  beforeLoad: ({ context }) => {
    requireAuth(context)
  },
  component: IndexPage,
})
