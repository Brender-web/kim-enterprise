'use client'

import { motion } from 'framer-motion'
import { 
  BarChart3, 
  Package, 
  DollarSign, 
  Users, 
  ArrowUpRight, 
  Plus, 
  Settings,
  MoreVertical,
  ExternalLink
} from 'lucide-react'
import { Card, Button, Badge } from '@/components/ui'
import Link from 'next/link'

const stats = [
  { label: 'Total Sales', value: 'KES 142,500', icon: DollarSign, trend: '+12.5%', color: 'text-green-600', bg: 'bg-green-50' },
  { label: 'Active Products', value: '24', icon: Package, trend: '+2', color: 'text-blue-600', bg: 'bg-blue-50' },
  { label: 'Total Orders', value: '156', icon: BarChart3, trend: '+18.2%', color: 'text-purple-600', bg: 'bg-purple-50' },
  { label: 'Avg. Rating', value: '4.8', icon: Users, trend: 'Stable', color: 'text-amber-600', bg: 'bg-amber-50' },
]

export default function SellerDashboard() {
  return (
    <div className="min-h-screen bg-slate-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tighter uppercase mb-2">Seller Dashboard</h1>
            <p className="text-slate-500 font-medium">Manage your products and track your global sales performance.</p>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" rounded="xl" className="font-bold border-slate-200 bg-white">
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Button>
            <Button rounded="xl" className="font-bold shadow-xl shadow-blue-200" asChild>
              <Link href="/seller/products/new">
                <Plus className="w-4 h-4 mr-2" />
                Add Product
              </Link>
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="p-6 border-slate-100 bg-white hover:border-slate-200 transition-all shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${stat.bg}`}>
                    <stat.icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                  <Badge variant="secondary" className="bg-slate-50 text-slate-500 font-bold">
                    {stat.trend}
                  </Badge>
                </div>
                <h3 className="text-sm font-bold text-slate-500 mb-1">{stat.label}</h3>
                <p className="text-2xl font-black text-slate-900">{stat.value}</p>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Recent Orders Table */}
          <div className="lg:col-span-2">
            <Card className="border-slate-100 bg-white shadow-sm overflow-hidden rounded-3xl">
              <div className="p-8 border-b border-slate-50 flex items-center justify-between">
                <h2 className="text-xl font-black text-slate-900 tracking-tight">Recent Orders</h2>
                <Button variant="ghost" size="sm" className="font-bold text-blue-600">View All</Button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-slate-50/50 border-b border-slate-50">
                    <tr>
                      <th className="px-8 py-4 text-xs font-black text-slate-400 uppercase tracking-widest">Order</th>
                      <th className="px-8 py-4 text-xs font-black text-slate-400 uppercase tracking-widest">Customer</th>
                      <th className="px-8 py-4 text-xs font-black text-slate-400 uppercase tracking-widest">Status</th>
                      <th className="px-8 py-4 text-xs font-black text-slate-400 uppercase tracking-widest text-right">Amount</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50 text-sm">
                    {[1, 2, 3, 4, 5].map((item) => (
                      <tr key={item} className="hover:bg-slate-50/30 transition-colors">
                        <td className="px-8 py-5 font-bold text-slate-900">#ORD-29{item}</td>
                        <td className="px-8 py-5 text-slate-600 font-medium">Customer {item}</td>
                        <td className="px-8 py-5">
                          <Badge className="bg-green-50 text-green-600 font-black tracking-widest text-[10px] uppercase py-1">Success</Badge>
                        </td>
                        <td className="px-8 py-5 font-black text-slate-900 text-right">KES 4,500</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>

          {/* Top Products */}
          <div className="lg:col-span-1">
            <Card className="border-slate-100 bg-white shadow-sm rounded-3xl">
              <div className="p-8 border-b border-slate-50 flex items-center justify-between">
                <h2 className="text-xl font-black text-slate-900 tracking-tight">Best Sellers</h2>
                <ExternalLink className="w-4 h-4 text-slate-400" />
              </div>
              <div className="p-8 space-y-6">
                {[1, 2, 3].map((item) => (
                  <div key={item} className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-slate-100 rounded-xl overflow-hidden flex-shrink-0" />
                    <div className="flex-grow">
                      <h4 className="font-bold text-slate-900 leading-none mb-1">Premium Product {item}</h4>
                      <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">124 Sales</p>
                    </div>
                    <span className="font-black text-slate-900 text-sm">KES {4500 * item}</span>
                  </div>
                ))}
              </div>
              <div className="p-8 pt-0">
                <Button variant="outline" className="w-full rounded-xl border-slate-200 font-bold text-slate-600">
                  Manage Inventory
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
