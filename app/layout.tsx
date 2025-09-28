import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from '@/components/providers'
import { Toaster } from '@/components/ui/toaster'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'GrandCare Connect - Trusted Elderly Caregivers for Your Children',
  description: 'Find and book background-checked elderly couples for childcare. Safe, reliable, and experienced caregivers for children ages 1-10.',
  keywords: ['childcare', 'elderly caregivers', 'babysitting', 'child care', 'family care'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  )
}
