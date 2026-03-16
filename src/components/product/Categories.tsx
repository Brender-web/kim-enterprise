import React from 'react';

export function Categories() {
  const categories = ['Electronics', 'Fashion', 'Home', 'Accessories'];

  return (
    <section>
      <h2 className="text-2xl font-bold mb-4">Shop by Category</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {categories.map((cat) => (
          <div
            key={cat}
            className="p-4 bg-gray-100 text-center rounded hover:bg-gray-200 cursor-pointer"
          >
            {cat}
          </div>
        ))}
      </div>
    </section>
  );
}