'use client'

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

interface ProductGridProps {
  products: Product[]
}

export function ProductGrid({ products }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="text-center py-20">
        <h3 className="text-xl font-semibold text-gray-900">No products found</h3>
        <p className="text-gray-500 mt-2">Try adjusting your filters or search terms.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product, index) => (
        <ProductCard key={product.id} product={product} index={index} />
      ))}
    </div>
  )
}
