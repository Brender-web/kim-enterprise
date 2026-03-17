'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Package, Truck, CheckCircle2, Clock, MapPin, ChevronRight, ShoppingBag } from 'lucide-react'
import { Badge, Card, Button } from '@/components/ui'
import Link from 'next/link'
import { cn } from '@/utils/cn'

interface OrderItem {
  id: string
  quantity: number
  price: number
  product: {
    name: string
    images: string[]
  }
}

interface Order {
  id: string
  status: 'PENDING' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED'
  total: number
  currency: string
  createdAt: string
  paymentStatus: string
  items: OrderItem[]
}

const statusConfig = {
  PENDING: { icon: Clock, color: 'text-amber-500', bg: 'bg-amber-50', label: 'Processing' },
  PROCESSING: { icon: Package, color: 'text-blue-500', bg: 'bg-blue-50', label: 'Preparing' },
  SHIPPED: { icon: Truck, color: 'text-purple-500', bg: 'bg-purple-50', label: 'In Transit' },
  DELIVERED: { icon: CheckCircle2, color: 'text-green-500', bg: 'bg-green-50', label: 'Delivered' },
  CANCELLED: { icon: CheckCircle2, color: 'text-red-500', bg: 'bg-red-50', label: 'Cancelled' },
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/orders')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setOrders(data)
      })
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 flex justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent" />
      </div>
    )
  }

  if (orders.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <ShoppingBag className="w-10 h-10 text-slate-400" />
        </div>
        <h1 className="text-3xl font-black text-slate-900 mb-4">No Orders Yet</h1>
        <p className="text-slate-500 font-medium mb-8">Start shopping and track your premium orders here.</p>
        <Button asChild rounded="full" className="px-8 shadow-xl shadow-blue-200">
          <Link href="/products">Explore Products</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-4xl font-black text-slate-900 tracking-tighter uppercase mb-12">Track Your Orders</h1>

      <div className="space-y-8">
        {orders.map((order, index) => {
          const status = statusConfig[order.status] || statusConfig.PENDING
          return (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="overflow-hidden border-slate-100 bg-white hover:border-slate-200 transition-all group">
                <div className="p-6 md:p-8">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 pb-8 border-b border-slate-50">
                    <div className="flex items-center space-x-6">
                      <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center", status.bg)}>
                        <status.icon className={cn("w-7 h-7", status.color)} />
                      </div>
                      <div>
                        <div className="flex items-center space-x-3 mb-1">
                          <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Order ID</span>
                          <span className="text-sm font-black text-slate-900">#{order.id.slice(-8)}</span>
                        </div>
                        <h2 className="text-xl font-black text-slate-900 tracking-tight">{status.label}</h2>
                      </div>
                    </div>
                    
                    <div className="flex flex-col md:items-end">
                      <span className="text-2xl font-black text-slate-900 mb-1">{order.currency} {order.total.toLocaleString()}</span>
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                        {new Date(order.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-6">
                    {order.items.map((item) => (
                      <div key={item.id} className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="w-16 h-16 bg-slate-50 rounded-xl overflow-hidden flex-shrink-0 relative">
                            {item.product.images?.[0] && (
                              <img src={item.product.images[0]} className="object-cover w-full h-full" alt="" />
                            )}
                          </div>
                          <div>
                            <h4 className="font-bold text-slate-900 line-clamp-1">{item.product.name}</h4>
                            <p className="text-xs font-black text-slate-400 uppercase tracking-widest mt-1">
                              Quantity: {item.quantity}
                            </p>
                          </div>
                        </div>
                        <span className="font-black text-slate-900 text-sm">
                          KES {(item.price * item.quantity).toLocaleString()}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-10 pt-8 border-t border-slate-50 flex flex-col sm:flex-row items-center justify-between gap-6">
                    <div className="flex items-center text-sm font-bold text-slate-500">
                      <MapPin className="w-4 h-4 mr-2 text-blue-600" />
                      Track delivery in real-time
                    </div>
                    <Button variant="outline" rounded="xl" className="w-full sm:w-auto px-8 font-black uppercase tracking-widest text-xs border-slate-200">
                      View Details
                      <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
