'use client'

import { useState } from 'react'
import { useCart } from '@/hooks/useCart'
import { motion, AnimatePresence } from 'framer-motion'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { 
  CreditCard, 
  MapPin, 
  Phone, 
  ShieldCheck, 
  ChevronRight, 
  Smartphone,
  CheckCircle2
} from 'lucide-react'
import { Button, Card, Badge } from '@/components/ui'
import Link from 'next/link'
import { cn } from '@/utils/cn'

export default function CheckoutPage() {
  const router = useRouter()
  const { items, totalPrice, clearCart } = useCart()
  const [paymentMethod, setPaymentMethod] = useState<'MPESA' | 'PAYPAL'>('MPESA')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  
  // Form State
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    address: '',
    city: '',
    postalCode: ''
  })

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    try {
      const payload = {
        items: items.map(item => ({
          productId: item.id,
          quantity: item.quantity,
          price: item.price
        })),
        total: totalPrice,
        paymentMethod,
        shippingAddress: {
          name: `${formData.firstName} ${formData.lastName}`,
          address: formData.address,
          city: formData.city,
          postalCode: formData.postalCode
        },
        phoneNumber: formData.phone
      }

      await axios.post('/api/orders', payload)
      setSuccess(true)
      clearCart()
      setTimeout(() => router.push('/orders'), 3000)
    } catch (error: any) {
      alert(error.response?.data?.error || "Order failed")
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center bg-white px-4">
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center">
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8">
            <CheckCircle2 className="w-12 h-12 text-green-600" />
          </div>
          <h1 className="text-4xl font-black text-slate-900 mb-4 uppercase tracking-tighter">Order Placed!</h1>
          <p className="text-slate-500 font-medium mb-10">We've received your order. Redirecting to tracking...</p>
          <div className="flex justify-center">
             <div className="w-12 h-1 bg-slate-100 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-blue-600" 
                  initial={{ width: 0 }} 
                  animate={{ width: "100%" }} 
                  transition={{ duration: 3 }} 
                />
             </div>
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-center justify-between mb-12">
        <h1 className="text-4xl font-black text-slate-900 tracking-tighter uppercase">Secure Checkout</h1>
      </div>

      <form onSubmit={handleCheckout} className="grid lg:grid-cols-3 gap-12">
        {/* Left Column: Forms */}
        <div className="lg:col-span-2 space-y-8">
          {/* Shipping Address */}
          <section>
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center text-white">
                <MapPin className="w-4 h-4" />
              </div>
              <h2 className="text-xl font-bold text-slate-900">Shipping Information</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input 
                required
                placeholder="First Name" 
                value={formData.firstName}
                onChange={e => setFormData({...formData, firstName: e.target.value})}
                className="w-full px-5 py-4 bg-white border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all font-medium text-slate-900"
              />
              <input 
                required
                placeholder="Last Name" 
                value={formData.lastName}
                onChange={e => setFormData({...formData, lastName: e.target.value})}
                className="w-full px-5 py-4 bg-white border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all font-medium text-slate-900"
              />
              <div className="md:col-span-2 flex relative">
                <Smartphone className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input 
                  required
                  placeholder="Phone Number (e.g. 254712...)" 
                  value={formData.phone}
                  onChange={e => setFormData({...formData, phone: e.target.value})}
                  className="w-full pl-14 pr-5 py-4 bg-white border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all font-medium text-slate-900"
                />
              </div>
              <input 
                required
                placeholder="Shipping Address / Apartment" 
                value={formData.address}
                onChange={e => setFormData({...formData, address: e.target.value})}
                className="md:col-span-2 w-full px-5 py-4 bg-white border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all font-medium text-slate-900"
              />
              <input 
                required
                placeholder="City" 
                value={formData.city}
                onChange={e => setFormData({...formData, city: e.target.value})}
                className="w-full px-5 py-4 bg-white border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all font-medium text-slate-900"
              />
              <input 
                required
                placeholder="Postal Code" 
                value={formData.postalCode}
                onChange={e => setFormData({...formData, postalCode: e.target.value})}
                className="w-full px-5 py-4 bg-white border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all font-medium text-slate-900"
              />
            </div>
          </section>

          {/* Payment Method */}
          <section>
            <div className="flex items-center space-x-3 mb-6 pt-8 border-t border-slate-100">
              <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center text-white">
                <CreditCard className="w-4 h-4" />
              </div>
              <h2 className="text-xl font-bold text-slate-900">Payment Method</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button 
                onClick={() => setPaymentMethod('MPESA')}
                className={cn(
                  "flex items-center justify-between p-6 rounded-3xl border-2 transition-all text-left group",
                  paymentMethod === 'MPESA' ? "border-green-500 bg-green-50/30" : "border-slate-100 bg-white hover:border-slate-200"
                )}
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center font-black text-green-600 text-xs">
                    M-Pesa
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900">M-Pesa</h3>
                    <p className="text-xs text-slate-500 font-bold">Fast & Local</p>
                  </div>
                </div>
                {paymentMethod === 'MPESA' && <CheckCircle2 className="w-6 h-6 text-green-500" />}
              </button>

              <button 
                onClick={() => setPaymentMethod('PAYPAL')}
                className={cn(
                  "flex items-center justify-between p-6 rounded-3xl border-2 transition-all text-left group",
                  paymentMethod === 'PAYPAL' ? "border-blue-500 bg-blue-50/30" : "border-slate-100 bg-white hover:border-slate-200"
                )}
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center font-black text-blue-600 text-xs">
                    PayPal
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900">PayPal</h3>
                    <p className="text-xs text-slate-500 font-bold">International Cards</p>
                  </div>
                </div>
                {paymentMethod === 'PAYPAL' && <CheckCircle2 className="w-6 h-6 text-blue-500" />}
              </button>
            </div>
          </section>
        </div>

        {/* Right Column: Order Summary */}
        <div className="lg:sticky lg:top-24 h-fit">
          <Card className="p-8 border-slate-100 shadow-2xl shadow-slate-200/50 bg-white rounded-[2rem]">
            <h3 className="text-xl font-black text-slate-900 tracking-tight mb-6">Order Summary</h3>
            
            <div className="space-y-4 mb-8">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between items-center text-sm">
                  <div className="flex items-center space-x-3">
                    <span className="font-black text-slate-400">{item.quantity}x</span>
                    <span className="font-bold text-slate-900 line-clamp-1">{item.name}</span>
                  </div>
                  <span className="font-black text-slate-900">KES {(item.price * item.quantity).toLocaleString()}</span>
                </div>
              ))}
            </div>

            <div className="space-y-4 py-6 border-t border-slate-100">
              <div className="flex justify-between text-slate-500 font-bold">
                <span>Subtotal</span>
                <span>KES {totalPrice.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-slate-500 font-bold">
                <span>Shipping</span>
                <span className="text-green-600 font-black">Free</span>
              </div>
              <div className="flex justify-between text-2xl font-black text-slate-900 pt-4">
                <span>Total</span>
                <span>KES {totalPrice.toLocaleString()}</span>
              </div>
            </div>

            <Button 
              type="submit"
              size="lg" 
              rounded="2xl" 
              className="w-full py-8 text-lg font-black uppercase tracking-widest shadow-2xl shadow-blue-200 mb-6"
              disabled={loading || items.length === 0}
            >
              {loading ? "Processing..." : `Pay with ${paymentMethod}`}
            </Button>

            <div className="flex items-center justify-center space-x-2 text-slate-400 text-xs font-black uppercase tracking-widest">
              <ShieldCheck className="w-4 h-4 text-green-500" />
              <span>Secure Encrypted Payment</span>
            </div>
          </Card>

          <Link 
            href="/cart" 
            className="block text-center mt-6 text-sm font-black text-slate-400 hover:text-slate-900 transition-colors uppercase tracking-widest"
          >
            Review Cart
          </Link>
        </div>
      </form>
    </div>
  )
}
