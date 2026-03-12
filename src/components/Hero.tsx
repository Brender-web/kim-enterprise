'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Truck, Shield, Clock } from 'lucide-react'

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 leading-tight">
              Premium Shopping for <span className="text-blue-600">Kenya</span> & Beyond
            </h1>
            <p className="mt-6 text-xl text-gray-600 max-w-lg">
              Discover quality products with fast delivery across East Africa and international shipping.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link 
                href="/products"
                className="inline-flex items-center px-8 py-4 text-lg font-semibold text-white bg-blue-600 rounded-full hover:bg-blue-700 transition transform hover:scale-105"
              >
                Shop Now
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <Link 
                href="/categories"
                className="inline-flex items-center px-8 py-4 text-lg font-semibold text-blue-600 bg-white border-2 border-blue-600 rounded-full hover:bg-blue-50 transition"
              >
                Browse Categories
              </Link>
            </div>
            
            <div className="mt-12 flex items-center space-x-8 text-sm text-gray-500">
              <div className="flex items-center">
                <Truck className="w-5 h-5 mr-2 text-green-500" />
                Free Delivery in Nairobi
              </div>
              <div className="flex items-center">
                <Shield className="w-5 h-5 mr-2 text-blue-500" />
                Secure Payments
              </div>
              <div className="flex items-center">
                <Clock className="w-5 h-5 mr-2 text-purple-500" />
                24/7 Support
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <div className="aspect-square bg-gradient-to-br from-blue-400 to-purple-600 flex items-center justify-center">
                <div className="text-white text-center p-8">
                  <div className="text-6xl mb-4">🛍️</div>
                  <div className="text-2xl font-bold">KIM-ENTERPRISE</div>
                  <div className="text-lg opacity-90">Quality You Can Trust</div>
                </div>
              </div>
            </div>
            {/* Floating badges */}
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 3 }}
              className="absolute -top-4 -right-4 bg-white p-4 rounded-2xl shadow-xl"
            >
              <div className="text-2xl font-bold text-blue-600">50K+</div>
              <div className="text-xs text-gray-500">Happy Customers</div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}