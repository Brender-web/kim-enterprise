'use client'

import { Badge } from "@/components/ui"
import { cn } from "@/utils/cn"

const CATEGORIES = [
  "ALL",
  "ELECTRONICS",
  "FASHION",
  "HOME",
  "BEAUTY",
  "ACCESSORIES",
  "SPORTS",
  "FOOD",
  "BOOKS",
  "AUTOMOTIVE"
]

interface ProductFiltersProps {
  activeCategory: string
  onCategoryChange: (category: string) => void
  sortBy: string
  onSortChange: (sort: string) => void
}

export function ProductFilters({ 
  activeCategory, 
  onCategoryChange, 
  sortBy, 
  onSortChange 
}: ProductFiltersProps) {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
      <div className="flex flex-wrap gap-2">
        {CATEGORIES.map((category) => (
          <button
            key={category}
            onClick={() => onCategoryChange(category)}
            className="transition-all"
          >
            <Badge
              variant={activeCategory === category ? "default" : "secondary"}
              className={cn(
                "px-4 py-2 cursor-pointer transition-all font-bold text-[10px] uppercase tracking-widest border border-transparent",
                activeCategory === category 
                  ? "bg-slate-900 text-white shadow-lg shadow-slate-900/10" 
                  : "bg-white text-slate-500 border-slate-200 hover:border-slate-400 hover:text-slate-900"
              )}
            >
              {category}
            </Badge>
          </button>
        ))}
      </div>

      <div className="flex items-center space-x-4">
        <select 
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          className="bg-white border border-slate-200 rounded-xl px-4 py-2 text-xs font-black uppercase tracking-widest text-slate-600 outline-none focus:ring-2 focus:ring-blue-500 transition-all appearance-none cursor-pointer"
        >
          <option value="DEFAULT">Latest Arrivals</option>
          <option value="PRICE_ASC">Price: Low to High</option>
          <option value="PRICE_DESC">Price: High to Low</option>
          <option value="RATING">Highest Rated</option>
        </select>
      </div>
    </div>
  )
}
