import type { Metadata } from 'next'
import { Outfit } from 'next/font/google'
import './globals.css'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { Providers } from '@/components/layout/Providers'


const outfit = Outfit({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'KIM-ENTERPRISE LIMITED | Premium Global Marketplace',
  description: 'Connect with sellers globally. Secure payments via M-Pesa and PayPal.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={outfit.className}>
        <Providers>
          <Navbar />
          <main className="min-h-screen bg-white">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  )
}