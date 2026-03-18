'use client'

import { useEffect, useState } from 'react'
import { ProductGrid } from '@/components/product/ProductGrid'
import { ProductFilters } from '@/components/product/ProductFilters'
import { Search } from 'lucide-react'

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

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [category, setCategory] = useState('ALL')
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const [sortBy, setSortBy] = useState('DEFAULT')
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000000])

  useEffect(() => {
    setLoading(true)
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setProducts(data)
          setFilteredProducts(data)
        } else {
          console.error('Products Fetch Error:', data)
          setProducts([])
          setFilteredProducts([])
        }
      })
      .catch(err => {
        console.error('Fetch error:', err)
        setProducts([])
        setFilteredProducts([])
      })
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => {
    let result = [...products]
    
    // Category Filter
    if (category !== 'ALL') {
      result = result.filter((p: any) => p.category === category)
    }
    
    // Search Filter
    if (search) {
      result = result.filter((p: any) => 
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.description?.toLowerCase().includes(search.toLowerCase())
      )
    }

    // Price Filter
    result = result.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1])

    // Sorting
    if (sortBy === 'PRICE_ASC') {
      result.sort((a, b) => a.price - b.price)
    } else if (sortBy === 'PRICE_DESC') {
      result.sort((a, b) => b.price - a.price)
    } else if (sortBy === 'RATING') {
      result.sort((a, b) => b.averageRating - a.averageRating)
    }
    
    setFilteredProducts(result)
  }, [category, search, products, sortBy, priceRange])

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
        <div>
          <h1 className="text-5xl font-black text-slate-900 tracking-tighter uppercase">Our Collection</h1>
          <p className="mt-3 text-lg text-slate-500 max-w-xl leading-relaxed">
            Curated premium products for those who value quality and style. Browse our latest arrivals.
          </p>
        </div>
        
        <div className="relative w-full md:w-96 group">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
          <input
            type="text"
            placeholder="Search our catalog..."
            className="w-full pl-14 pr-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-100 focus:bg-white focus:border-blue-500 transition-all font-bold text-slate-900 placeholder:text-slate-400 border-none shadow-sm"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <ProductFilters 
        activeCategory={category} 
        onCategoryChange={setCategory} 
        sortBy={sortBy}
        onSortChange={setSortBy}
      />

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
