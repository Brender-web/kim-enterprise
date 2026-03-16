import { useCartStore } from '@/store/cart'

export const useCart = () => {
  const cart = useCartStore()
  
  const totalItems = cart.items.reduce((sum, item) => sum + item.quantity, 0)
  const totalPrice = cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return {
    ...cart,
    totalItems,
    totalPrice,
  }
}
