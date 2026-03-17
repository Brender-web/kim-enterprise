import { Hero } from '@/components/product/Hero'
import { FeaturedProducts } from '@/components/product/FeaturedProducts'
import { Categories } from '@/components/product/Categories'
import { Features } from '@/components/ui/Features'


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