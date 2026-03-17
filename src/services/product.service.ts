import type { Prisma } from "@prisma/client"

export type ProductWithReviews = Prisma.ProductGetPayload<{
  include: {
    reviews: {
      select: { rating: true }
    }
  }
}>

export const ProductService = {
  formatProductWithRating(product: ProductWithReviews) {
    const reviews = product.reviews || []
    const reviewCount = reviews.length
    const averageRating = reviewCount > 0
      ? reviews.reduce((acc: number, r: { rating: number }) => acc + (r.rating || 0), 0) / reviewCount
      : 0

    return {
      ...product,
      averageRating,
      reviewCount
    }
  },

  formatProductsWithRating(products: ProductWithReviews[]) {
    return products.map(p => this.formatProductWithRating(p))
  }
}
