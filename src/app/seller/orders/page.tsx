'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Package, 
  Truck, 
  CheckCircle2, 
  Clock, 
  Search,
  ChevronRight,
  Filter,
  MoreVertical,
  Eye
} from 'lucide-react'
import { Card, Button, Badge } from '@/components/ui'
import Link from 'next/link'
import axios from 'axios'
import { cn } from '@/utils/cn'

interface Order {
  id: string
  status: 'PENDING' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED'
  total: number
  currency: string
  createdAt: string
  customerName: string
  paymentStatus: string
}

const statusConfig = {
  PENDING: { label: 'Pending', color: 'bg-amber-100 text-amber-700' },
  PROCESSING: { label: 'Processing', color: 'bg-blue-100 text-blue-700' },
  SHIPPED: { label: 'Shipped', color: 'bg-purple-100 text-purple-700' },
  DELIVERED: { label: 'Delivered', color: 'bg-green-100 text-green-700' },
  CANCELLED: { label: 'Cancelled', color: 'bg-red-100 text-red-700' },
}

export default function SellerOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Placeholder fetching logic
    setTimeout(() => {
      setOrders([
        { id: 'ORD-12345', status: 'PROCESSING', total: 4500, currency: 'KES', createdAt: new Date().toISOString(), customerName: 'John Doe', paymentStatus: 'COMPLETED' },
        { id: 'ORD-12346', status: 'PENDING', total: 1200, currency: 'KES', createdAt: new Date().toISOString(), customerName: 'Jane Smith', paymentStatus: 'PENDING' },
      ])
      setLoading(false)
    }, 1000)
  }, [])

  const updateStatus = async (orderId: string, newStatus: string) => {
    try {
      await axios.patch(`/api/orders/${orderId}/status`, { status: newStatus })
      setOrders(orders.map(o => o.id === orderId ? { ...o, status: newStatus as any } : o))
    } catch (error) {
      alert("Failed to update order status")
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tighter uppercase">Vendor Orders</h1>
          <p className="text-slate-500 font-medium">Fulfill orders and manage shipping statuses for your customers.</p>
        </div>
      </div>

      <Card className="border-slate-100 bg-white shadow-sm overflow-hidden rounded-3xl">
        <div className="p-6 border-b border-slate-50 bg-slate-50/30 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="relative flex-grow max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              placeholder="Search by Order ID or Customer..." 
              className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all font-medium text-sm"
            />
          </div>
          <div className="flex items-center gap-3">
             <Button variant="outline" size="sm" rounded="xl" className="border-slate-200 bg-white font-bold text-xs uppercase tracking-widest">
               Export CSV
             </Button>
          </div>
        </div>

        {loading ? (
          <div className="p-20 flex justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-4 border-blue-600 border-t-transparent" />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-50/30 border-b border-slate-50 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                <tr>
                  <th className="px-8 py-4">Order ID</th>
                  <th className="px-8 py-4">Customer</th>
                  <th className="px-8 py-4">Date</th>
                  <th className="px-8 py-4">Status</th>
                  <th className="px-8 py-4">Payment</th>
                  <th className="px-8 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 text-sm">
                {orders.map((order) => (
                  <tr key={order.id} className="hover:bg-slate-50/30 transition-colors group">
                    <td className="px-8 py-5 font-black text-slate-900 tracking-tight">#{order.id}</td>
                    <td className="px-8 py-5 font-bold text-slate-600">{order.customerName}</td>
                    <td className="px-8 py-5 text-slate-400 font-medium whitespace-nowrap">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-8 py-5">
                      <select 
                        value={order.status}
                        onChange={(e) => updateStatus(order.id, e.target.value)}
                        className={cn(
                          "px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider outline-none border-none",
                          statusConfig[order.status]?.color
                        )}
                      >
                        {Object.keys(statusConfig).map(s => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </td>
                    <td className="px-8 py-5">
                      <Badge variant="secondary" className={cn(
                        "font-black tracking-widest text-[9px] uppercase py-1",
                        order.paymentStatus === 'COMPLETED' ? "bg-green-50 text-green-600" : "bg-amber-50 text-amber-600"
                      )}>
                        {order.paymentStatus}
                      </Badge>
                    </td>
                    <td className="px-8 py-5 text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <Button size="icon" variant="ghost" className="rounded-lg hover:bg-slate-100">
                          <Eye className="w-4 h-4 text-slate-500" />
                        </Button>
                        <Button size="icon" variant="ghost" className="rounded-lg hover:bg-slate-100">
                          <MoreVertical className="w-4 h-4 text-slate-500" />
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
      
      <div className="mt-8 flex items-center justify-between text-xs font-bold text-slate-400 uppercase tracking-widest">
        <span>Showing {orders.length} orders</span>
        <div className="flex items-center space-x-4">
          <button className="hover:text-slate-900">Previous</button>
          <div className="flex items-center space-x-2">
            <span className="w-8 h-8 rounded-lg bg-slate-900 text-white flex items-center justify-center">1</span>
          </div>
          <button className="hover:text-slate-900">Next</button>
        </div>
      </div>
    </div>
  )
}
