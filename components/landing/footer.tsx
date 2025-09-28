import Link from 'next/link'

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold mb-4">GrandCare Connect</h3>
            <p className="text-gray-400 mb-4 max-w-md">
              Connecting families with trusted elderly caregivers for safe, reliable childcare. 
              Background-checked couples ready to care for your children.
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">For Parents</h4>
            <ul className="space-y-2">
              <li><Link href="/caregivers" className="text-gray-400 hover:text-white">Find Caregivers</Link></li>
              <li><Link href="/how-it-works" className="text-gray-400 hover:text-white">How It Works</Link></li>
              <li><Link href="/pricing" className="text-gray-400 hover:text-white">Pricing</Link></li>
              <li><Link href="/safety" className="text-gray-400 hover:text-white">Safety</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">For Caregivers</h4>
            <ul className="space-y-2">
              <li><Link href="/auth/signup?role=CAREGIVER" className="text-gray-400 hover:text-white">Become a Caregiver</Link></li>
              <li><Link href="/caregiver-benefits" className="text-gray-400 hover:text-white">Benefits</Link></li>
              <li><Link href="/requirements" className="text-gray-400 hover:text-white">Requirements</Link></li>
              <li><Link href="/support" className="text-gray-400 hover:text-white">Support</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2024 GrandCare Connect. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="/legal/terms" className="text-gray-400 hover:text-white text-sm">
                Terms of Service
              </Link>
              <Link href="/legal/privacy" className="text-gray-400 hover:text-white text-sm">
                Privacy Policy
              </Link>
              <Link href="/contact" className="text-gray-400 hover:text-white text-sm">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
