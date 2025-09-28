import { CaregiverSearch } from '@/components/caregivers/caregiver-search'
import { CaregiverFilters } from '@/components/caregivers/caregiver-filters'
import { CaregiverList } from '@/components/caregivers/caregiver-list'

export default function CaregiversPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Find Your Perfect Caregivers</h1>
          <p className="mt-2 text-lg text-gray-600">
            Discover experienced elderly couples ready to care for your children
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <CaregiverFilters />
          </div>
          <div className="lg:col-span-3">
            <CaregiverSearch />
            <CaregiverList />
          </div>
        </div>
      </div>
    </div>
  )
}
