import Link from 'next/link'
import { Button } from '@/components/ui/button'

export function Hero() {
  return (
    <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Trusted Elderly Caregivers
            <span className="block text-yellow-300">for Your Children</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Find background-checked elderly couples who provide loving, experienced care for children ages 1-10. 
            Safe, reliable, and affordable childcare when you need it most.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/caregivers">
              <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold">
                Find Caregivers
              </Button>
            </Link>
            <Link href="/auth/signup?role=CAREGIVER">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-black">
                Become a Caregiver
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
