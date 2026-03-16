import React from 'react';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-slate-900 border-t border-slate-800 pt-16 pb-8 text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="text-2xl font-black text-white tracking-tighter">
              KIM-ENTERPRISE
            </Link>
            <p className="mt-4 leading-relaxed">
              Your trusted partner for premium electronics and lifestyle essentials in Kenya. Quality guaranteed.
            </p>
          </div>
          
          <div>
            <h3 className="text-white font-bold mb-6">Shop</h3>
            <ul className="space-y-4">
              <li><Link href="/products" className="hover:text-white transition-colors">All Products</Link></li>
              <li><Link href="/categories" className="hover:text-white transition-colors">Categories</Link></li>
              <li><Link href="/products?featured=true" className="hover:text-white transition-colors">Featured</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-bold mb-6">Support</h3>
            <ul className="space-y-4">
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
              <li><Link href="/faq" className="hover:text-white transition-colors">Shipping FAQ</Link></li>
              <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-bold mb-6">Location</h3>
            <p className="leading-relaxed">
              Nairobi, Kenya<br />
              Central Business District<br />
              support@kim-enterprise.com
            </p>
          </div>
        </div>
        
        <div className="pt-8 border-t border-slate-800 text-center">
          <p className="text-sm">© {new Date().getFullYear()} KIM-ENTERPRISE LIMITED. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}