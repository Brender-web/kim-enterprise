'use client'

import Link from 'next/link'
import { Card, CardContent } from '@/components/ui'
import { motion } from 'framer-motion'
import { Laptop, Shirt, Home, Sparkles, Trophy, Pizza, Book, Car } from 'lucide-react'

const CATEGORIES = [
  { name: 'Electronics', slug: 'ELECTRONICS', icon: Laptop, color: 'bg-blue-500', count: '120+ Products' },
  { name: 'Fashion', slug: 'FASHION', icon: Shirt, color: 'bg-purple-500', count: '450+ Products' },
  { name: 'Home', slug: 'HOME', icon: Home, color: 'bg-orange-500', count: '80+ Products' },
  { name: 'Beauty', slug: 'BEAUTY', icon: Sparkles, color: 'bg-pink-500', count: '200+ Products' },
  { name: 'Sports', slug: 'SPORTS', icon: Trophy, color: 'bg-green-500', count: '150+ Products' },
  { name: 'Food', slug: 'FOOD', icon: Pizza, color: 'bg-red-500', count: '300+ Products' },
  { name: 'Books', slug: 'BOOKS', icon: Book, color: 'bg-amber-600', count: '500+ Products' },
  { name: 'Automotive', slug: 'AUTOMOTIVE', icon: Car, color: 'bg-slate-700', count: '50+ Products' },
]

export default function CategoriesPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">Shop by Category</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Explore our wide range of premium products organized by your favorite categories.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {CATEGORIES.map((cat, index) => (
          <motion.div
            key={cat.slug}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
          >
            <Link href={`/products?category=${cat.slug}`}>
              <Card className="group hover:border-blue-500 transition-all duration-300 transform hover:-translate-y-2 cursor-pointer h-full">
                <CardContent className="flex flex-col items-center justify-center p-8">
                  <div className={`w-16 h-16 ${cat.color} rounded-2xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    <cat.icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{cat.name}</h3>
                  <p className="text-gray-500">{cat.count}</p>
                </CardContent>
              </Card>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
