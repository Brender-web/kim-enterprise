'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  ArrowLeft, 
  Upload, 
  Plus, 
  Minus, 
  Info,
  DollarSign,
  Package,
  Layers,
  CheckCircle2,
  AlertCircle
} from 'lucide-react'
import { Button, Card, Badge } from '@/components/ui'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { cn } from '@/utils/cn'

export default function NewProductPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: 'ELECTRONICS',
    stock: '1',
    images: ['']
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const payload = {
        ...formData,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock),
        images: formData.images.filter(img => img.trim() !== '')
      }

      await axios.post('/api/products', payload)
      setSuccess(true)
      setTimeout(() => router.push('/seller/products'), 2000)
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to create product')
      setLoading(false)
    }
  }

  const addImageField = () => setFormData({ ...formData, images: [...formData.images, ''] })
  const removeImageField = (index: number) => {
    const newImages = formData.images.filter((_, i) => i !== index)
    setFormData({ ...formData, images: newImages.length ? newImages : [''] })
  }

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white px-4">
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10 text-green-600" />
          </div>
          <h1 className="text-3xl font-black text-slate-900 mb-2">Product Published!</h1>
          <p className="text-slate-500 font-medium">Your product is now live on the marketplace.</p>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pb-32">
      <Link href="/seller/products" className="text-sm font-black text-slate-400 hover:text-slate-900 flex items-center mb-10 uppercase tracking-widest transition-colors group">
        <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
        Back to Products
      </Link>

      <div className="mb-12">
        <h1 className="text-4xl font-black text-slate-900 tracking-tighter uppercase mb-4">List New Product</h1>
        <p className="text-slate-500 font-medium">Fill in the details below to showcase your product to global buyers.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-10">
        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-2xl flex items-center space-x-3 border border-red-100 animate-shake">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <p className="text-sm font-black uppercase tracking-tight">{error}</p>
          </div>
        )}

        {/* Basic Info */}
        <section className="space-y-6">
          <div className="flex items-center space-x-3 mb-2">
            <Info className="w-5 h-5 text-blue-600" />
            <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight">General Information</h2>
          </div>
          
          <Card className="p-8 border-slate-100 bg-white space-y-6 rounded-[2.5rem]">
            <div className="space-y-2">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Product Title</label>
              <input 
                required
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
                placeholder="e.g. Premium Leather Men's Watch"
                className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all font-bold text-slate-900"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Description</label>
              <textarea 
                required
                value={formData.description}
                onChange={e => setFormData({...formData, description: e.target.value})}
                rows={5}
                placeholder="Describe your product's highlights, materials, and benefits..."
                className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all font-medium text-slate-600"
              />
            </div>
          </Card>
        </section>

        {/* Pricing & Inventory */}
        <div className="grid md:grid-cols-2 gap-10">
          <section className="space-y-6">
            <div className="flex items-center space-x-3 mb-2">
              <DollarSign className="w-5 h-5 text-green-600" />
              <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight">Pricing</h2>
            </div>
            <Card className="p-8 border-slate-100 bg-white rounded-[2.5rem]">
              <div className="space-y-2 relative">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Price (KES)</label>
                <div className="relative">
                  <span className="absolute left-6 top-1/2 -translate-y-1/2 font-black text-slate-400">KES</span>
                  <input 
                    required
                    type="number"
                    value={formData.price}
                    onChange={e => setFormData({...formData, price: e.target.value})}
                    placeholder="2500"
                    className="w-full pl-16 pr-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all font-black text-slate-900"
                  />
                </div>
              </div>
            </Card>
          </section>

          <section className="space-y-6">
            <div className="flex items-center space-x-3 mb-2">
              <Package className="w-5 h-5 text-amber-600" />
              <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight">Inventory</h2>
            </div>
            <Card className="p-8 border-slate-100 bg-white rounded-[2.5rem]">
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Initial Stock</label>
                <input 
                  required
                  type="number"
                  value={formData.stock}
                  onChange={e => setFormData({...formData, stock: e.target.value})}
                  className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all font-black text-slate-900"
                />
              </div>
            </Card>
          </section>
        </div>

        {/* Categories & Images */}
        <section className="space-y-6">
          <div className="flex items-center space-x-3 mb-2">
            <Layers className="w-5 h-5 text-purple-600" />
            <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight">Organization & Media</h2>
          </div>
          <Card className="p-8 border-slate-100 bg-white space-y-8 rounded-[2.5rem]">
            <div className="space-y-2">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Category</label>
              <select 
                value={formData.category}
                onChange={e => setFormData({...formData, category: e.target.value})}
                className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all font-bold text-slate-900 appearance-none"
              >
                <option value="ELECTRONICS">Electronics</option>
                <option value="FASHION">Fashion</option>
                <option value="HOME">Home & Living</option>
                <option value="BEAUTY">Beauty & Health</option>
                <option value="ACCESSORIES">Accessories</option>
              </select>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Project Images (URLs)</label>
                <Button 
                  type="button" 
                  variant="ghost" 
                  size="sm" 
                  onClick={addImageField}
                  className="text-blue-600 font-black text-[10px] uppercase p-0 h-auto hover:bg-transparent"
                >
                  <Plus className="w-3 h-3 mr-1" /> Add Image
                </Button>
              </div>
              
              <div className="space-y-3">
                {formData.images.map((img, index) => (
                  <div key={index} className="flex gap-2">
                    <input 
                      required={index === 0}
                      value={img}
                      onChange={e => {
                        const newImages = [...formData.images]
                        newImages[index] = e.target.value
                        setFormData({...formData, images: newImages})
                      }}
                      placeholder="https://example.com/image.jpg"
                      className="flex-grow px-6 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all font-medium text-xs text-slate-500"
                    />
                    {formData.images.length > 1 && (
                      <Button 
                        type="button" 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => removeImageField(index)}
                        className="rounded-xl text-red-500 hover:bg-red-50"
                      >
                        <Minus className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-2">
                * Note: In production, we integrate with AWS S3 for direct file uploads.
              </p>
            </div>
          </Card>
        </section>

        {/* Actions */}
        <div className="pt-10 flex flex-col sm:flex-row gap-4">
          <Button 
            type="submit" 
            size="lg" 
            rounded="2xl" 
            className="flex-grow py-8 text-lg font-black uppercase tracking-widest shadow-2xl shadow-blue-200"
            disabled={loading}
          >
            {loading ? "Publishing..." : "Launch Product"}
          </Button>
          <Button 
            type="button"
            variant="outline" 
            size="lg" 
            rounded="2xl" 
            className="px-8 border-slate-200 font-black uppercase tracking-widest text-slate-400"
            asChild
          >
            <Link href="/seller/products">Discard</Link>
          </Button>
        </div>
      </form>
    </div>
  )
}
