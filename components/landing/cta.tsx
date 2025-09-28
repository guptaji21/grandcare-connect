import Link from 'next/link'
import { Button } from '@/components/ui/button'

export function CTA() {
  return (
    <section className="py-24 bg-primary text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Ready to Find Your Perfect Caregivers?
        </h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          Join thousands of families who trust GrandCare Connect for safe, reliable childcare.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/auth/signup?role=PARENT">
            <Button size="lg" className="bg-white text-primary hover:bg-gray-100 font-semibold">
              Find Caregivers Now
            </Button>
          </Link>
          <Link href="/caregivers">
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
              Browse Caregivers
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
