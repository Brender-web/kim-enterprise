'use client'

import { use, useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Star, ShoppingCart, ArrowLeft, ShieldCheck, Truck, RefreshCcw, MessageSquare, Send } from 'lucide-react'
import { useCart } from '@/hooks/useCart'
import { Button, Badge, Card } from '@/components/ui'
import { cn } from '@/utils/cn'

interface Product {
  id: string
  name: string
  description: string
  price: number
  currency: string
  images: string[]
  category: string
  averageRating: number
  reviewCount: number
  stock: number
  reviews: Array<{
    id: string
    rating: number
    comment: string
    createdAt: string
    user: { name: string }
  }>
}

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [activeImage, setActiveImage] = useState(0)
  const { addItem } = useCart()

  useEffect(() => {
    setLoading(true)
    fetch(`/api/products/${id}`)
      .then(res => res.json())
      .then(data => {
        if (data.id) {
          setProduct(data)
        }
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false))
  }, [id])

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 flex justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent" />
      </div>
    )
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h2 className="text-3xl font-black text-slate-900 mb-4">Product Not Found</h2>
        <Button asChild rounded="full">
          <Link href="/products">Back to Shopping</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link 
        href="/products" 
        className="inline-flex items-center text-sm font-bold text-slate-500 hover:text-slate-900 transition-colors mb-10 group"
      >
        <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
        Back to Collection
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Images */}
        <div className="space-y-6">
          <div className="relative aspect-square bg-slate-50 rounded-3xl overflow-hidden border border-slate-100">
            <Image
              src={product.images[activeImage] || '/placeholder.png'}
              alt={product.name}
              fill
              className="object-cover"
              unoptimized
            />
          </div>
          
          {product.images.length > 1 && (
            <div className="grid grid-cols-4 gap-4">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(i)}
                  className={cn(
                    "relative aspect-square rounded-xl overflow-hidden border-2 transition-all",
                    activeImage === i ? "border-blue-600 shadow-lg" : "border-transparent opacity-60 hover:opacity-100"
                  )}
                >
                  <Image src={img} alt="" fill className="object-cover" unoptimized />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex flex-col">
          <Badge className="w-fit mb-4 bg-blue-50 text-blue-700 font-black tracking-widest uppercase py-1.5 px-3">
            {product.category}
          </Badge>
          
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter mb-4 leading-tight">
            {product.name}
          </h1>

          <div className="flex items-center mb-8 pb-8 border-b border-slate-100">
            <div className="flex items-center text-amber-400 mr-3">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  className={cn(
                    "w-5 h-5",
                    i < Math.round(product.averageRating) ? "fill-current" : "text-slate-200"
                  )}
                />
              ))}
            </div>
            <span className="text-sm font-black text-slate-400">
              {product.reviewCount} Reviews
            </span>
            <span className="mx-4 text-slate-200">|</span>
            <span className={cn(
              "text-sm font-black uppercase tracking-widest",
              product.stock > 0 ? "text-green-600" : "text-red-500"
            )}>
              {product.stock > 0 ? `In Stock (${product.stock})` : 'Out of Stock'}
            </span>
          </div>

          <div className="text-3xl font-black text-slate-900 mb-8">
            {product.currency} {product.price.toLocaleString()}
          </div>

          <p className="text-lg text-slate-500 leading-relaxed font-medium mb-10">
            {product.description}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <Button 
              size="lg" 
              rounded="2xl" 
              className="flex-grow shadow-2xl shadow-blue-200"
              onClick={() => addItem(product)}
            >
              <ShoppingCart className="w-6 h-6 mr-3" />
              Add to Shopping Cart
            </Button>
            <Button size="lg" rounded="2xl" variant="outline" className="border-slate-200 font-black">
              Proceed to Checkout
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-10 border-t border-slate-100">
            <div className="flex items-center space-x-3 text-slate-600">
              <Truck className="w-5 h-5 text-blue-600" />
              <span className="text-xs font-black uppercase tracking-wider">Free Shipping</span>
            </div>
            <div className="flex items-center space-x-3 text-slate-600">
              <ShieldCheck className="w-5 h-5 text-blue-600" />
              <span className="text-xs font-black uppercase tracking-wider">Secure Checkout</span>
            </div>
            <div className="flex items-center space-x-3 text-slate-600">
              <RefreshCcw className="w-5 h-5 text-blue-600" />
              <span className="text-xs font-black uppercase tracking-wider">30-Day Returns</span>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="mt-32 pt-16 border-t border-slate-100">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-16">
          <div>
            <h2 className="text-4xl font-black text-slate-900 tracking-tighter uppercase mb-4">Customer Reviews</h2>
            <div className="flex items-center space-x-4">
               <div className="flex items-center text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={cn("w-5 h-5", i < Math.round(product.averageRating) ? "fill-current" : "text-slate-200")} />
                ))}
              </div>
              <span className="text-lg font-black text-slate-900">{product.averageRating.toFixed(1)} / 5.0</span>
              <span className="text-slate-400 font-bold">({product.reviewCount} total reviews)</span>
            </div>
          </div>
          <Button variant="outline" rounded="xl" className="font-black uppercase tracking-widest text-xs py-6 px-10 border-slate-200">
            Write a Review
          </Button>
        </div>

        <div className="grid lg:grid-cols-3 gap-16">
          {/* Review List */}
          <div className="lg:col-span-2 space-y-8">
            {product.reviews?.length > 0 ? (
              product.reviews.map((review) => (
                <Card key={review.id} className="p-8 border-slate-50 bg-slate-50/30 rounded-3xl">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h4 className="font-black text-slate-900">{review.user.name}</h4>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">
                        {new Date(review.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex items-center text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={cn("w-3 h-3", i < review.rating ? "fill-current" : "text-slate-200")} />
                      ))}
                    </div>
                  </div>
                  <p className="text-slate-600 font-medium leading-relaxed">
                    {review.comment}
                  </p>
                </Card>
              ))
            ) : (
              <div className="py-20 text-center bg-slate-50 rounded-[3rem] border border-dashed border-slate-200">
                <MessageSquare className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                <p className="text-slate-500 font-black uppercase tracking-widest text-xs">No reviews for this product yet</p>
              </div>
            )}
          </div>

          {/* Review Stats / Call to Action */}
          <div className="lg:col-span-1">
            <Card className="p-8 border-slate-100 rounded-3xl sticky top-24">
              <h3 className="text-xl font-black text-slate-900 mb-6">Leave Feedback</h3>
              <div className="space-y-6">
                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 block">Rating</label>
                  <div className="flex space-x-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button key={star} className="text-slate-200 hover:text-amber-400 transition-colors">
                        <Star className="w-6 h-6" />
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 block">Comment</label>
                  <textarea 
                    rows={4} 
                    className="w-full bg-slate-50 border-none rounded-2xl p-4 text-sm font-medium focus:ring-2 focus:ring-blue-500 outline-none" 
                    placeholder="Share your experience..."
                  />
                </div>
                <Button className="w-full py-4 rounded-xl font-black uppercase tracking-widest text-xs">
                  <Send className="w-4 h-4 mr-2" />
                  Submit Review
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
