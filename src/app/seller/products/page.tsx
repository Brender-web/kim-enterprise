'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Plus, 
  Search, 
  Filter, 
  MoreHorizontal, 
  Edit, 
  Trash2, 
  ExternalLink,
  Package,
  ArrowLeft
} from 'lucide-react'
import { Card, Button, Badge } from '@/components/ui'
import Link from 'next/link'
import { cn } from '@/utils/cn'

interface Product {
  id: string
  name: string
  price: number
  category: string
  stock: number
  status: 'ACTIVE' | 'DRAFT' | 'OUT_OF_STOCK'
  createdAt: string
}

export default function SellerProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Placeholder for actual fetch filtered by seller session
    setLoading(true)
    fetch('/api/products') // In real scenario, would be /api/seller/products
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setProducts(data)
      })
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div>
          <Link href="/seller/dashboard" className="text-sm font-black text-slate-400 hover:text-slate-900 flex items-center mb-4 uppercase tracking-widest transition-colors group">
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Dashboard
          </Link>
          <h1 className="text-4xl font-black text-slate-900 tracking-tighter uppercase">My Products</h1>
        </div>
        <Button rounded="xl" className="font-bold shadow-xl shadow-blue-200 py-6 px-8" asChild>
          <Link href="/seller/products/new">
            <Plus className="w-5 h-5 mr-3" />
            Add New Product
          </Link>
        </Button>
      </div>

      <Card className="border-slate-100 bg-white shadow-sm overflow-hidden rounded-3xl">
        {/* Toolbar */}
        <div className="p-6 border-b border-slate-50 bg-slate-50/30 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="relative flex-grow max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              placeholder="Search products..." 
              className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all font-medium text-sm"
            />
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" rounded="xl" className="border-slate-200 bg-white font-bold">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
          </div>
        </div>

        {loading ? (
          <div className="p-20 flex justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-4 border-blue-600 border-t-transparent" />
          </div>
        ) : products.length === 0 ? (
          <div className="p-20 text-center">
            <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Package className="w-8 h-8 text-slate-300" />
            </div>
            <h3 className="text-lg font-black text-slate-900 mb-2">No Products Published</h3>
            <p className="text-slate-500 font-medium mb-8">Ready to start selling? Add your first product now.</p>
            <Button asChild rounded="xl">
               <Link href="/seller/products/new">Get Started</Link>
            </Button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-50/30 border-b border-slate-50">
                <tr>
                  <th className="px-8 py-4 text-xs font-black text-slate-400 uppercase tracking-widest">Product</th>
                  <th className="px-8 py-4 text-xs font-black text-slate-400 uppercase tracking-widest">Category</th>
                  <th className="px-8 py-4 text-xs font-black text-slate-400 uppercase tracking-widest">Price</th>
                  <th className="px-8 py-4 text-xs font-black text-slate-400 uppercase tracking-widest">Stock</th>
                  <th className="px-8 py-4 text-xs font-black text-slate-400 uppercase tracking-widest">Status</th>
                  <th className="px-8 py-4 text-xs font-black text-slate-400 uppercase tracking-widest text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 text-sm">
                {products.map((product) => (
                  <tr key={product.id} className="hover:bg-slate-50/30 transition-colors group">
                    <td className="px-8 py-5">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-slate-100 rounded-xl overflow-hidden flex-shrink-0" />
                        <div>
                          <h4 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{product.name}</h4>
                          <span className="text-[10px] font-black text-slate-400 uppercase">ID: {product.id.slice(-6)}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <Badge variant="secondary" className="bg-slate-100 text-slate-500 font-black text-[10px] uppercase px-2 py-0.5 tracking-wider">
                        {product.category}
                      </Badge>
                    </td>
                    <td className="px-8 py-5 font-black text-slate-900">KES {product.price.toLocaleString()}</td>
                    <td className="px-8 py-5 font-bold text-slate-600">{product.stock || 0}</td>
                    <td className="px-8 py-5">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 rounded-full bg-green-500" />
                        <span className="text-xs font-black text-slate-900 uppercase tracking-widest text-[9px]">Active</span>
                      </div>
                    </td>
                    <td className="px-8 py-5 text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <Button size="icon" variant="ghost" rounded="lg" className="hover:bg-slate-100">
                          <Edit className="w-4 h-4 text-slate-500" />
                        </Button>
                        <Button size="icon" variant="ghost" rounded="lg" className="hover:bg-slate-100">
                          <Trash2 className="w-4 h-4 text-red-400" />
                        </Button>
                        <Button size="icon" variant="ghost" rounded="lg" className="hover:bg-slate-100" asChild>
                           <Link href={`/products/${product.id}`} target="_blank">
                             <ExternalLink className="w-4 h-4 text-slate-500" />
                           </Link>
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  )
}
