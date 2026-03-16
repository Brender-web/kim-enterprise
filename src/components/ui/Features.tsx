import React from 'react';

export function Features() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h2 className="text-4xl font-black text-slate-900 tracking-tighter uppercase mb-12 text-center md:text-left">Why Shop With Us?</h2>
      <ul className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <li className="p-8 bg-white rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
          <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center mb-6">
            <span className="text-2xl">🚀</span>
          </div>
          <h3 className="text-xl font-black text-slate-900 mb-3 tracking-tight">Fast Delivery</h3>
          <p className="leading-relaxed text-slate-500 font-medium">Get your orders delivered quickly across Kenya and beyond with our express network.</p>
        </li>
        <li className="p-8 bg-white rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
          <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center mb-6">
            <span className="text-2xl">🛡️</span>
          </div>
          <h3 className="text-xl font-black text-slate-900 mb-3 tracking-tight">Secure Payments</h3>
          <p className="leading-relaxed text-slate-500 font-medium">We use top-tier encryption and trusted local partners for all your transactions.</p>
        </li>
        <li className="p-8 bg-white rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
          <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center mb-6">
            <span className="text-2xl">💬</span>
          </div>
          <h3 className="text-xl font-black text-slate-900 mb-3 tracking-tight">24/7 Support</h3>
          <p className="leading-relaxed text-slate-500 font-medium">Our customer service team is always ready to help you with any inquiries or issues.</p>
        </li>
      </ul>
    </section>
  );
}