import React from 'react';

export function Features() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl font-bold text-gray-900 mb-6">Why Shop With Us?</h2>
      <ul className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <li className="p-4 bg-white rounded-lg shadow">
          <h3 className="text-xl font-semibold">Fast Delivery</h3>
          <p className="mt-2 text-gray-600">Get your orders delivered quickly across Kenya and beyond.</p>
        </li>
        <li className="p-4 bg-white rounded-lg shadow">
          <h3 className="text-xl font-semibold">Secure Payments</h3>
          <p className="mt-2 text-gray-600">We use top‑tier security for all transactions.</p>
        </li>
        <li className="p-4 bg-white rounded-lg shadow">
          <h3 className="text-xl font-semibold">24/7 Support</h3>
          <p className="mt-2 text-gray-600">Our customer service team is always ready to help.</p>
        </li>
      </ul>
    </section>
  );
}