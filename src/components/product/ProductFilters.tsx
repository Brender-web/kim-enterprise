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
    <div className="flex flex-wrap gap-2 mb-8">
      {CATEGORIES.map((category) => (
        <button
          key={category}
          onClick={() => onCategoryChange(category)}
          className="transition-all"
        >
          <Badge
            variant={activeCategory === category ? "default" : "secondary"}
            className={cn(
              "px-4 py-2 cursor-pointer hover:bg-blue-500 hover:text-white transition-colors",
              activeCategory === category && "bg-blue-600 text-white"
            )}
          >
            {category.charAt(0) + category.slice(1).toLowerCase()}
          </Badge>
        </button>
      ))}
    </div>
  )
}
