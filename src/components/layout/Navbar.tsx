'use client'

import Link from 'next/link'
import { useSession, signIn, signOut } from 'next-auth/react'
import { ShoppingCart, User, Menu, X, Search } from 'lucide-react'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useCart } from '@/hooks/useCart'


export function Navbar() {
  const { data: session } = useSession()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { totalItems } = useCart()


  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2.5 group">
            <div className="w-9 h-9 bg-slate-900 rounded-xl flex items-center justify-center transition-transform group-hover:scale-105">
              <span className="text-white font-black text-xl">K</span>
            </div>
            <span className="text-xl font-black text-slate-900 tracking-tighter uppercase">
              KIM-ENTERPRISE
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-10">
            <Link href="/products" className="text-sm font-bold text-slate-600 hover:text-slate-900 transition-colors tracking-wide">
              SHOP
            </Link>
            <Link href="/categories" className="text-sm font-bold text-slate-600 hover:text-slate-900 transition-colors tracking-wide">
              CATEGORIES
            </Link>
            <Link href="/deals" className="text-sm font-bold text-slate-600 hover:text-slate-900 transition-colors tracking-wide">
              DEALS
            </Link>
            <Link href="/about" className="text-sm font-bold text-slate-600 hover:text-slate-900 transition-colors tracking-wide">
              ABOUT
            </Link>
          </div>

          {/* Actions */}
          <div className="hidden md:flex items-center space-x-6">
            <button className="p-2.5 hover:bg-slate-50 rounded-xl transition-colors border border-transparent hover:border-slate-100">
              <Search className="w-5 h-5 text-slate-600" />
            </button>
            
            <Link href="/cart" className="p-2.5 hover:bg-slate-50 rounded-xl transition-colors border border-transparent hover:border-slate-100 relative">
              <ShoppingCart className="w-5 h-5 text-slate-600" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-slate-900 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>

            {session ? (
              <div className="flex items-center space-x-4 pl-4 border-l border-slate-100">
                <span className="text-sm font-bold text-slate-900">{session.user?.name}</span>
                <button 
                  onClick={() => signOut()}
                  className="px-4 py-2 text-xs font-black uppercase tracking-widest text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <button 
                onClick={() => signIn()}
                className="flex items-center space-x-2 px-5 py-2.5 text-xs font-black uppercase tracking-widest text-white bg-blue-600 rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20"
              >
                <User className="w-4 h-4" />
                <span>Sign In</span>
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t"
          >
            <div className="px-4 py-4 space-y-4">
              <Link href="/products" className="block text-gray-700">Shop</Link>
              <Link href="/categories" className="block text-gray-700">Categories</Link>
              <Link href="/cart" className="block text-gray-700">Cart</Link>
              {session ? (
                <button onClick={() => signOut()} className="block text-red-500">Sign Out</button>
              ) : (
                <button onClick={() => signIn()} className="block text-blue-600">Sign In</button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}