import { MAX_QUANTITY } from '../config.js'
import { menuById } from '../data/menu.js'

export function cartReducer(cart, action) {
  if (action.type === 'clear') return cart.length ? [] : cart
  // Only known menu IDs can enter state, including when called outside the UI.
  if (!Object.hasOwn(menuById, action.foodId)) return cart
  const existing = cart.find((item) => item.foodId === action.foodId)

  switch (action.type) {
    case 'add':
      if (!existing) return [...cart, { foodId: action.foodId, quantity: 1 }]
      if (existing.quantity >= MAX_QUANTITY) return cart
      return cart.map((item) =>
        item.foodId === action.foodId ? { ...item, quantity: item.quantity + 1 } : item,
      )
    case 'increase':
      if (!existing || existing.quantity >= MAX_QUANTITY) return cart
      return cart.map((item) =>
        item.foodId === action.foodId ? { ...item, quantity: item.quantity + 1 } : item,
      )
    case 'decrease':
      if (!existing || existing.quantity <= 1) return cart
      return cart.map((item) =>
        item.foodId === action.foodId ? { ...item, quantity: item.quantity - 1 } : item,
      )
    case 'remove':
      return existing ? cart.filter((item) => item.foodId !== action.foodId) : cart
    default:
      return cart
  }
}

// Product details and totals are derived, never duplicated in React state.
export function getCartSummary(cart, catalogue = menuById) {
  const items = cart.map(({ foodId, quantity }) => ({
    ...catalogue[foodId],
    quantity,
    lineTotalMinor: catalogue[foodId].priceMinor * quantity,
  }))
  return {
    items,
    totalItems: items.reduce((sum, item) => sum + item.quantity, 0),
    totalMinor: items.reduce((sum, item) => sum + item.lineTotalMinor, 0),
  }
}
