import React from 'react';
import { Card, CardContent } from '@/components/ui';
import { Laptop, Shirt, Home, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/utils/cn';

const QUICK_CATEGORIES = [
  { name: 'Electronics', slug: 'ELECTRONICS', icon: Laptop, color: 'text-slate-700', bg: 'bg-slate-50' },
  { name: 'Fashion', slug: 'FASHION', icon: Shirt, color: 'text-slate-700', bg: 'bg-slate-50' },
  { name: 'Home', slug: 'HOME', icon: Home, color: 'text-slate-700', bg: 'bg-slate-50' },
  { name: 'Beauty', slug: 'BEAUTY', icon: Sparkles, color: 'text-slate-700', bg: 'bg-slate-50' },
];


export function Categories() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-end mb-10">
        <div>
          <h2 className="text-4xl font-black text-slate-900 tracking-tighter uppercase">Shop by Category</h2>
          <p className="mt-2 text-lg text-slate-500 font-medium">Find exactly what you're looking for</p>
        </div>
        <Link href="/categories" className="text-blue-600 hover:text-blue-700 font-bold uppercase tracking-widest text-xs border-b-2 border-blue-600 pb-1">
          See All Categories
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {QUICK_CATEGORIES.map((cat) => (
          <Link key={cat.slug} href={`/products?category=${cat.slug}`}>
            <Card className="hover:border-slate-300 transition-all cursor-pointer group border-slate-100 bg-white shadow-sm hover:shadow-md">
              <CardContent className="p-8 flex flex-col items-center text-center">
                <div className={cn("w-16 h-16 rounded-2xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110", cat.bg)}>
                  <cat.icon className={cn("w-8 h-8", cat.color)} />
                </div>
                <span className="font-bold text-slate-900 text-lg tracking-tight">{cat.name}</span>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}