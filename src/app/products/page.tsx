'use client'

import { useEffect, useState } from 'react'
import { ProductGrid } from '@/components/product/ProductGrid'
import { ProductFilters } from '@/components/product/ProductFilters'
import { Search } from 'lucide-react'

export default function ProductsPage() {
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [category, setCategory] = useState('ALL')
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data)
        setFilteredProducts(data)
        setLoading(true)
      })
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => {
    let result = products
    
    if (category !== 'ALL') {
      result = result.filter((p: any) => p.category === category)
    }
    
    if (search) {
      result = result.filter((p: any) => 
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.description?.toLowerCase().includes(search.toLowerCase())
      )
    }
    
    setFilteredProducts(result)
  }, [category, search, products])

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12">
        <div>
          <h1 className="text-4xl font-bold text-gray-900">Our Collection</h1>
          <p className="mt-2 text-gray-600">Premium products curated for quality and style.</p>
        </div>
        
        <div className="relative w-full md:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search products..."
            className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <ProductFilters activeCategory={category} onCategoryChange={setCategory} />

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="animate-pulse bg-gray-100 aspect-square rounded-2xl" />
          ))}
        </div>
      ) : (
        <ProductGrid products={filteredProducts} />
      )}
    </div>
  )
}
