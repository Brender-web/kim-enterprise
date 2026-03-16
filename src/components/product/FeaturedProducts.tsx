'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ProductCard } from './ProductCard'

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

  useEffect(() => {
    fetch('/api/products?featured=true')
      .then(res => res.json())
      .then(data => setProducts(data))
  }, [])

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-end mb-10">
        <div>
          <h2 className="text-4xl font-black text-slate-900 tracking-tighter uppercase">Featured Products</h2>
          <p className="mt-2 text-lg text-slate-500 font-medium">Handpicked items just for you</p>
        </div>
        <Link href="/products" className="text-blue-600 hover:text-blue-700 font-bold uppercase tracking-widest text-xs border-b-2 border-blue-600 pb-1 translate-y-[-4px]">
          View Full Catalog
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product, index) => (
          <ProductCard key={product.id} product={product} index={index} />
        ))}
      </div>
    </section>
  )
}