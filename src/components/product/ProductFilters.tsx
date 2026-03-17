'use client'

import { Badge } from "@/components/ui"
import { cn } from "@/utils/cn"

const CATEGORIES = [
  "ALL",
  "ELECTRONICS",
  "FASHION",
  "HOME",
  "BEAUTY",
  "SPORTS",
  "FOOD",
  "BOOKS",
  "AUTOMOTIVE"
]

interface ProductFiltersProps {
  activeCategory: string
  onCategoryChange: (category: string) => void
}

export function ProductFilters({ activeCategory, onCategoryChange }: ProductFiltersProps) {
  return (
    <div className="flex flex-wrap gap-3 mb-12">
      {CATEGORIES.map((category) => (
        <button
          key={category}
          onClick={() => onCategoryChange(category)}
          className="transition-all"
        >
          <Badge
            variant={activeCategory === category ? "default" : "secondary"}
            className={cn(
              "px-5 py-2.5 cursor-pointer transition-all font-bold text-xs uppercase tracking-widest border border-transparent",
              activeCategory === category 
                ? "bg-slate-900 text-white shadow-lg shadow-slate-900/10 scale-105" 
                : "bg-white text-slate-500 border-slate-200 hover:border-slate-400 hover:text-slate-900 hover:bg-slate-50"
            )}
          >
            {category}
          </Badge>
        </button>
      ))}
    </div>
  )
}
