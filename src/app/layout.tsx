import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { Providers } from '@/components/layout/Providers'


const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'KIM-ENTERPRISE LIMITED | Premium Shopping',
  description: 'Your trusted e-commerce destination in Kenya and beyond',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Navbar />
          <main className="min-h-screen bg-white">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  )
}