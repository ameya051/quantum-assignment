import { useRouteContext } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { UsersTable } from '@/components/UsersTable';

function IndexPage() {
  const { auth } = useRouteContext({ from: '/' })
  console.log('Auth Data:', auth);

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    window.location.href = '/login'
  }

  return (
    <div className="bg-white text-black h-[100vh] p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <Button onClick={handleLogout} variant="outline">
            Logout
          </Button>
        </div>

        <div className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Welcome back!</h2>
          {auth && (
            <div className="space-y-2">
              <p><strong>Email:</strong> {auth.user.email}</p>
              <p><strong>Name:</strong> {auth.user.name}</p>
            </div>
          )}
        </div>

        <div className="mt-8">
          <UsersTable />
        </div>
      </div>
    </div>
  )
}

export default IndexPage
