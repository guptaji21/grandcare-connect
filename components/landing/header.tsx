'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { useSession, signOut } from 'next-auth/react'

export function Header() {
  const { data: session } = useSession()

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-6">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-primary">
              GrandCare Connect
            </Link>
          </div>
          
          <nav className="hidden md:flex space-x-8">
            <Link href="/caregivers" className="text-gray-700 hover:text-primary">
              Find Caregivers
            </Link>
            <Link href="/how-it-works" className="text-gray-700 hover:text-primary">
              How It Works
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-primary">
              About
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            {session ? (
              <div className="flex items-center space-x-4">
                <Link href="/dashboard">
                  <Button variant="outline">Dashboard</Button>
                </Link>
                <Button 
                  variant="ghost" 
                  onClick={() => signOut()}
                >
                  Sign Out
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link href="/auth/signin">
                  <Button variant="ghost">Sign In</Button>
                </Link>
                <Link href="/auth/signup">
                  <Button>Get Started</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
