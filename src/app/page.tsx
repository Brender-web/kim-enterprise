import { Hero } from '@/components/Hero'
import { FeaturedProducts } from '@/components/FeaturedProducts'
import { Categories } from '@/components/Categories'
import { Features } from '@/components/Features'

export default function Home() {
  return (
    <div className="space-y-16 pb-16">
      <Hero />
      <Categories />
      <FeaturedProducts />
      <Features />
    </div>
  )
}