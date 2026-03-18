'use client'

import { useCart } from '@/hooks/useCart'
import Link from 'next/link'
import { Trash2, Plus, Minus, ArrowLeft, ShoppingBag } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, Button, Badge } from '@/components/ui'
import { cn } from '@/utils/cn'

export default function CartPage() {
  const { items, removeItem, updateQuantity, totalPrice, totalItems } = useCart()

  if (totalItems === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 flex flex-col items-center justify-center text-center">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }} 
          animate={{ scale: 1, opacity: 1 }}
          className="w-32 h-32 bg-slate-50 rounded-[2.5rem] flex items-center justify-center mb-10 border border-slate-100 shadow-inner"
        >
          <ShoppingBag className="w-12 h-12 text-slate-300" />
        </motion.div>
        <h1 className="text-5xl font-black text-slate-900 mb-6 uppercase tracking-tighter">Your cart is empty</h1>
        <p className="text-slate-500 mb-12 max-w-md font-medium text-lg leading-relaxed">
          The ultimate collection is just a click away. Start building your premium wardrobe today.
        </p>
        <Button asChild size="lg" rounded="2xl" className="px-12 py-8 text-lg font-black uppercase tracking-widest shadow-2xl shadow-blue-200">
          <Link href="/products">Explore Marketplace</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
        <div>
          <Link href="/products" className="text-xs font-black text-slate-400 hover:text-slate-900 flex items-center mb-6 uppercase tracking-widest transition-colors group">
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Continue Shopping
          </Link>
          <h1 className="text-5xl font-black text-slate-900 tracking-tighter uppercase">Shopping Bag</h1>
        </div>
        <div className="flex items-center space-x-2">
          <Badge className="bg-slate-900 text-white font-black px-4 py-1.5 rounded-lg uppercase tracking-widest text-[10px]">
             {totalItems} Items
          </Badge>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-16">
        <div className="lg:col-span-2 space-y-6">
          <AnimatePresence mode="popLayout">
            {items.map((item, idx) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: idx * 0.05 }}
              >
                <Card className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-8 p-8 bg-white rounded-[2rem] border-slate-50 group hover:border-slate-200 transition-all shadow-sm">
                  <div className="w-32 h-32 bg-slate-50 rounded-2xl overflow-hidden flex-shrink-0 relative">
                    {item.image ? (
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-200">
                        <ShoppingBag className="w-10 h-10" />
                      </div>
                    )}
                  </div>

                  <div className="flex-grow text-center sm:text-left">
                    <h3 className="text-xl font-black text-slate-900 tracking-tight leading-tight">{item.name}</h3>
                    <p className="text-blue-600 font-black mt-2 text-sm uppercase tracking-widest">KES {item.price.toLocaleString()}</p>
                    
                    <div className="flex flex-wrap items-center justify-center sm:justify-start gap-6 mt-6">
                      <div className="flex items-center bg-slate-50 rounded-xl overflow-hidden border border-slate-100 p-1">
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-2 hover:bg-white rounded-lg transition text-slate-400 hover:text-slate-900"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-10 text-center font-black text-slate-900 text-sm">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-2 hover:bg-white rounded-lg transition text-slate-400 hover:text-slate-900"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      
                      <button 
                        onClick={() => removeItem(item.id)}
                        className="text-slate-300 hover:text-red-500 transition-colors flex items-center space-x-2"
                      >
                        <Trash2 className="w-4 h-4" />
                        <span className="text-[10px] font-black uppercase tracking-widest">Remove</span>
                      </button>
                    </div>
                  </div>

                  <div className="text-right hidden sm:block">
                    <p className="text-xl font-black text-slate-900">
                      KES {(item.price * item.quantity).toLocaleString()}
                    </p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <div className="lg:sticky lg:top-24 h-fit">
          <Card className="bg-slate-900 rounded-[2.5rem] p-10 border-none shadow-2xl text-white overflow-hidden relative">
            {/* Background design element */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/20 blur-3xl -mr-16 -mt-16" />
            
            <h2 className="text-2xl font-black tracking-tight mb-8">Summary</h2>
            
            <div className="space-y-6 mb-10">
              <div className="flex justify-between items-center text-slate-400 font-bold uppercase tracking-widest text-xs">
                <span>Subtotal</span>
                <span className="text-white">KES {totalPrice.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center text-slate-400 font-bold uppercase tracking-widest text-xs">
                <span>Shipping</span>
                <span className="text-green-400 font-black">Free</span>
              </div>
              <div className="pt-8 border-t border-white/10">
                <div className="flex justify-between items-end">
                   <div>
                     <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">Total Balance</p>
                     <p className="text-3xl font-black tracking-tight">KES {totalPrice.toLocaleString()}</p>
                   </div>
                </div>
              </div>
            </div>

            <Link href="/checkout">
              <Button size="lg" rounded="2xl" className="w-full py-8 text-lg font-black uppercase tracking-widest shadow-2xl shadow-blue-500/20 bg-blue-600 hover:bg-blue-500 border-none">
                Proceed to Checkout
              </Button>
            </Link>
            
            <div className="mt-8 flex items-center justify-center space-x-3 opacity-50">
               <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-[10px] font-black">SA</div>
               <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-[10px] font-black">PP</div>
               <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-[10px] font-black">MS</div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
