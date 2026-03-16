'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Truck, Shield, Clock } from 'lucide-react'
import { Button } from '@/components/ui'


export function Hero() {
  return (
    <section className="relative overflow-hidden bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-sm font-semibold mb-6 border border-blue-100">
              New: International Shipping Available
            </div>
            <h1 className="text-5xl lg:text-7xl font-extrabold text-slate-900 leading-[1.1] tracking-tight">
              Quality Products. <br />
              <span className="text-blue-600">Reliable Delivery.</span>
            </h1>
            <p className="mt-8 text-xl text-slate-600 leading-relaxed max-w-lg">
              Empowering your lifestyle with premium electronics, fashion, and home essentials across East Africa.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Button size="lg" rounded="full" asChild className="px-10 h-14 text-base shadow-lg shadow-blue-500/20">
                <Link href="/products">
                  Shop Catalog
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" rounded="full" asChild className="px-10 h-14 text-base bg-white border-slate-200 hover:bg-slate-50 text-slate-900">
                <Link href="/categories">
                  Our Categories
                </Link>
              </Button>
            </div>
            
            <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 pt-12 border-t border-slate-100">
              <div className="flex items-center text-sm font-medium text-slate-700">
                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center mr-3">
                  <Truck className="w-5 h-5 text-blue-600" />
                </div>
                Fast Delivery
              </div>
              <div className="flex items-center text-sm font-medium text-slate-700">
                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center mr-3">
                  <Shield className="w-5 h-5 text-blue-600" />
                </div>
                Secure Pay
              </div>
              <div className="flex items-center text-sm font-medium text-slate-700">
                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center mr-3">
                  <Clock className="w-5 h-5 text-blue-600" />
                </div>
                24/7 Support
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative hidden lg:block"
          >
            <div className="relative rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white bg-slate-100 aspect-square">
               <div className="absolute inset-0 bg-slate-900 flex flex-col items-center justify-center p-12 text-center">
                  <div className="text-8xl mb-8">📦</div>
                  <h2 className="text-4xl font-black text-white mb-2">KIM-ENTERPRISE</h2>
                  <p className="text-slate-400 text-lg">THE GOLD STANDARD IN RETAIL</p>
               </div>
            </div>
            
            <motion.div 
              animate={{ y: [0, -12, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="absolute -top-6 -right-6 bg-white p-6 rounded-3xl shadow-xl border border-slate-100"
            >
              <div className="text-3xl font-black text-slate-900">50K+</div>
              <div className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-1">Customers</div>
            </motion.div>

            <motion.div 
              animate={{ y: [0, 12, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", delay: 1 }}
              className="absolute -bottom-6 -left-6 bg-white p-6 rounded-3xl shadow-xl border border-slate-100"
            >
              <div className="flex items-center gap-1 text-yellow-400 mb-1">
                {[...Array(5)].map((_, i) => <div key={i} className="w-4 h-4 bg-yellow-400 rounded-full" />)}
              </div>
              <div className="text-xs font-bold text-slate-500 uppercase tracking-widest">Top Rated</div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}