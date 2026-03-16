import React from 'react';
import { Card, CardContent } from '@/components/ui';
import { Laptop, Shirt, Home, Sparkles } from 'lucide-react';
import Link from 'next/link';

const QUICK_CATEGORIES = [
  { name: 'Electronics', slug: 'ELECTRONICS', icon: Laptop, color: 'text-blue-500' },
  { name: 'Fashion', slug: 'FASHION', icon: Shirt, color: 'text-purple-500' },
  { name: 'Home', slug: 'HOME', icon: Home, color: 'text-orange-500' },
  { name: 'Beauty', slug: 'BEAUTY', icon: Sparkles, color: 'text-pink-500' },
];

export function Categories() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Shop by Category</h2>
          <p className="mt-2 text-gray-600">Find exactly what you're looking for</p>
        </div>
        <Link href="/categories" className="text-blue-600 hover:text-blue-700 font-medium">
          See All →
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {QUICK_CATEGORIES.map((cat) => (
          <Link key={cat.slug} href={`/products?category=${cat.slug}`}>
            <Card className="hover:border-blue-500 transition-all cursor-pointer group">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <cat.icon className={`w-10 h-10 mb-4 ${cat.color} group-hover:scale-110 transition-transform`} />
                <span className="font-bold text-gray-900">{cat.name}</span>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}