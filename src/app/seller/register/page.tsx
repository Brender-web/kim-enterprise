'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ShieldCheck, Store, ChevronRight, CheckCircle2, DollarSign, Globe } from 'lucide-react'
import { Button, Card, Badge } from '@/components/ui'
import { useRouter } from 'next/navigation'
import axios from 'axios'

const benefits = [
  { icon: Globe, title: 'Global Reach', description: 'Sell to customers in Kenya and across the world.' },
  { icon: DollarSign, title: 'Low Commission', description: 'Keep more of your profits with our competitive rates.' },
  { icon: Store, title: 'Seller Tools', description: 'Advanced dashboard to manage products and orders.' },
]

export default function SellerRegistration() {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const router = useRouter()

  const handleBecomeSeller = async () => {
    setLoading(true)
    try {
      await axios.post('/api/user/become-seller')
      setSuccess(true)
      setTimeout(() => router.push('/seller/dashboard'), 2000)
    } catch (error) {
      alert('Failed to update role. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white px-4">
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10 text-green-600" />
          </div>
          <h1 className="text-3xl font-black text-slate-900 mb-2">Welcome, Partner!</h1>
          <p className="text-slate-500 font-medium">Redirecting to your dashboard...</p>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <Badge className="bg-blue-50 text-blue-700 font-black tracking-widest uppercase py-1.5 px-3 mb-6">
            Partner with us
          </Badge>
          <h1 className="text-5xl md:text-6xl font-black text-slate-900 tracking-tighter mb-6 leading-tight uppercase">
            Start Selling <br /> on KIM-ENT.
          </h1>
          <p className="text-xl text-slate-500 font-medium leading-relaxed mb-10 max-w-xl">
            Join thousands of vendors and reach millions of customers globally. We handle the payments and logistics so you can focus on your craft.
          </p>

          <div className="space-y-6 mb-12">
            {benefits.map((benefit) => (
              <div key={benefit.title} className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-slate-900 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <benefit.icon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">{benefit.title}</h3>
                  <p className="text-sm text-slate-500 font-medium">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>

          <Button 
            size="lg" 
            rounded="2xl" 
            className="px-10 py-8 text-lg font-black uppercase tracking-widest shadow-2xl shadow-blue-200"
            onClick={handleBecomeSeller}
            disabled={loading}
          >
            {loading ? "Processing..." : "Open Your Store Now"}
            <ChevronRight className="ml-2 w-5 h-5" />
          </Button>
        </div>

        <div className="relative">
          <div className="aspect-square bg-slate-50 rounded-[3rem] overflow-hidden border border-slate-100 relative">
             {/* Abstract design elements instead of image for stability */}
             <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent" />
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-slate-200">
               <Store className="w-40 h-40" />
             </div>
          </div>
          <Card className="absolute -bottom-10 -left-10 p-8 border-slate-100 shadow-2xl bg-white rounded-3xl max-w-xs">
            <div className="flex items-center space-x-3 mb-2">
              <ShieldCheck className="w-6 h-6 text-green-500" />
              <span className="font-black text-slate-900 uppercase tracking-tighter">Verified Seller</span>
            </div>
            <p className="text-xs text-slate-500 font-bold leading-relaxed">
              KIM Enterprise ensures every transaction is secure and backed by our seller protection program.
            </p>
          </Card>
        </div>
      </div>
    </div>
  )
}
