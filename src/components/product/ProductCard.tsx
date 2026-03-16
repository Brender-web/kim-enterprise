'use client'

import { motion } from 'framer-motion'
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
      <Card className="group overflow-hidden border-gray-100 hover:shadow-xl transition-all duration-300">
        <div className="relative aspect-square bg-gray-50 overflow-hidden">
          {product.images[0] ? (
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
              className="object-cover group-hover:scale-110 transition-transform duration-500"
              unoptimized // Temporary until domains are configured
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              No Image
            </div>
          )}
          <Button
            size="icon"
            rounded="full"
            className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={() => addItem(product)}
            aria-label={`Add ${product.name} to cart`}
          >
            <ShoppingCart className="w-5 h-5" />
          </Button>
        </div>
        
        <div className="p-4">
          <div className="flex justify-between items-start mb-1">
            <Badge variant="secondary" className="text-[10px] uppercase tracking-wide">
              {product.category}
            </Badge>
          </div>
          
          <h3 className="text-lg font-semibold text-gray-900 line-clamp-1 group-hover:text-blue-600 transition-colors">
            {product.name}
          </h3>
          
          <div className="mt-2 flex items-center">
            <div className="flex items-center text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  className={cn(
                    "w-4 h-4",
                    i < Math.round(product.averageRating) ? "fill-current" : "text-gray-200"
                  )}
                />
              ))}
            </div>
            <span className="ml-2 text-sm text-gray-500">({product.reviewCount})</span>
          </div>
          
          <div className="mt-4 flex items-center justify-between">
            <span className="text-xl font-bold text-gray-900">
              {product.currency} {product.price.toLocaleString()}
            </span>
            <Button variant="outline" size="sm" rounded="full" asChild>
              <a href={`/products/${product.id}`}>Details</a>
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}
