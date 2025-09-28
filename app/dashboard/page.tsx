import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { ParentDashboard } from '@/components/dashboard/parent-dashboard'
import { CaregiverDashboard } from '@/components/dashboard/caregiver-dashboard'
import { AdminDashboard } from '@/components/dashboard/admin-dashboard'

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)
  
  if (!session?.user) {
    redirect('/auth/signin')
  }

  const { role } = session.user

  if (role === 'PARENT') {
    return <ParentDashboard />
  } else if (role === 'CAREGIVER') {
    return <CaregiverDashboard />
  } else if (role === 'ADMIN') {
    return <AdminDashboard />
  }

  return <div>Invalid role</div>
}
