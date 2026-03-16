'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Star, ShoppingCart } from 'lucide-react'
import { useCart } from '@/hooks/useCart'


interface Product {
  id: string
  name: string
  price: number
  currency: string
  images: string[]
  category: string
  averageRating: number
  reviewCount: number
}

export function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const { addItem } = useCart()


  useEffect(() => {
    fetch('/api/products?featured=true')
      .then(res => res.json())
      .then(data => setProducts(data))
  }, [])

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Featured Products</h2>
          <p className="mt-2 text-gray-600">Handpicked items just for you</p>
        </div>
        <Link href="/products" className="text-blue-600 hover:text-blue-700 font-medium">
          View All →
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
          >
            <div className="relative aspect-square bg-gray-100 overflow-hidden">
              {product.images[0] ? (
                <img 
                  src={product.images[0]} 
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  No Image
                </div>
              )}
              <button 
                onClick={() => addItem(product)}
                className="absolute bottom-4 right-4 p-3 bg-white rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-blue-600 hover:text-white"
                aria-label={`Add ${product.name} to cart`}
              >
                <ShoppingCart className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-4">
              <div className="text-xs font-medium text-blue-600 uppercase tracking-wide">
                {product.category}
              </div>
              <h3 className="mt-1 text-lg font-semibold text-gray-900 line-clamp-1">
                {product.name}
              </h3>
              
              <div className="mt-2 flex items-center">
                <div className="flex items-center text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-4 h-4 ${i < Math.round(product.averageRating) ? 'fill-current' : 'text-gray-300'}`}
                    />
                  ))}
                </div>
                <span className="ml-2 text-sm text-gray-500">({product.reviewCount})</span>
              </div>
              
              <div className="mt-3 flex items-center justify-between">
                <span className="text-xl font-bold text-gray-900">
                  {product.currency} {product.price.toLocaleString()}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}