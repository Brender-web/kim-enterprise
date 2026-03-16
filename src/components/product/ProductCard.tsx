'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Star, ShoppingCart } from 'lucide-react'

import Image from 'next/image'
import { useCart } from '@/hooks/useCart'
import { Card, Button, Badge } from '@/components/ui'
import { cn } from '@/utils/cn'

interface ProductProps {
  product: {
    id: string
    name: string
    price: number
    currency: string
    images: string[]
    category: string
    averageRating: number
    reviewCount: number
  }
  index?: number
}

export function ProductCard({ product, index = 0 }: ProductProps) {
  const { addItem } = useCart()

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <Card className="group overflow-hidden border-slate-100 bg-white hover:border-slate-200 transition-all duration-300">
        <div className="relative aspect-square bg-slate-50 overflow-hidden">
          {product.images[0] ? (
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
              className="object-cover group-hover:scale-105 transition-transform duration-700"
              unoptimized
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-slate-300">
              No Image
            </div>
          )}
          <Button
            size="icon"
            rounded="full"
            variant="primary"
            className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0 shadow-xl"
            onClick={() => addItem(product)}
            aria-label={`Add ${product.name} to cart`}
          >
            <ShoppingCart className="w-5 h-5" />
          </Button>
        </div>
        
        <div className="p-5">
          <Badge variant="secondary" className="mb-2 text-[10px] font-black uppercase tracking-widest text-slate-500 bg-slate-100">
            {product.category}
          </Badge>
          
          <h3 className="text-lg font-bold text-slate-900 line-clamp-1 group-hover:text-blue-600 transition-colors tracking-tight">
            {product.name}
          </h3>
          
          <div className="mt-2 flex items-center">
            <div className="flex items-center text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  className={cn(
                    "w-3.5 h-3.5",
                    i < Math.round(product.averageRating) ? "fill-current" : "text-slate-200"
                  )}
                />
              ))}
            </div>
            <span className="ml-2 text-xs font-bold text-slate-400">({product.reviewCount})</span>
          </div>
          
          <div className="mt-5 flex items-center justify-between pt-4 border-t border-slate-50">
            <span className="text-xl font-black text-slate-900 tracking-tighter">
              {product.currency} {product.price.toLocaleString()}
            </span>
            <Button variant="outline" size="sm" rounded="full" asChild className="text-[10px] font-black uppercase tracking-widest px-4 border-slate-200">
              <Link href={`/products/${product.id}`}>Details</Link>
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}

