import { describe, expect, it } from 'vitest'
import { cartReducer, getCartSummary } from './cart.js'
import { menu } from '../data/menu.js'
import { MAX_QUANTITY } from '../config.js'
import { formatPrice } from '../utils/currency.js'

const pizza = 'pizza-margherita'
const drink = 'drink-lemonade'
const act = (cart, type, foodId = pizza) => cartReducer(cart, { type, foodId })

describe('cart behaviour', () => {
  it('clears all items without mutating the previous cart', () => {
    const previous = Object.freeze([
      { foodId: pizza, quantity: 2 },
      { foodId: drink, quantity: 1 },
    ])
    expect(cartReducer(previous, { type: 'clear' })).toEqual([])
    expect(previous).toHaveLength(2)
    const empty = []
    expect(cartReducer(empty, { type: 'clear' })).toBe(empty)
  })
  it('adds one row, then increments that row without duplicating it', () => {
    const once = act([], 'add')
    expect(once).toEqual([{ foodId: pizza, quantity: 1 }])
    expect(act(once, 'add')).toEqual([{ foodId: pizza, quantity: 2 }])
  })

  it('preserves previous state and unrelated items', () => {
    const untouched = Object.freeze({ foodId: drink, quantity: 1 })
    const previous = Object.freeze([Object.freeze({ foodId: pizza, quantity: 1 }), untouched])
    const next = act(previous, 'increase')
    expect(previous[0].quantity).toBe(1)
    expect(next[0].quantity).toBe(2)
    expect(next[1]).toBe(untouched)
  })

  it('decreases to one and requires explicit removal', () => {
    const two = [{ foodId: pizza, quantity: 2 }]
    const one = act(two, 'decrease')
    expect(one[0].quantity).toBe(1)
    expect(act(one, 'decrease')).toBe(one)
    expect(act(one, 'remove')).toEqual([])
  })

  it('caps both add and increase at 99, including a rapid action sequence', () => {
    const full = Array.from({ length: 150 }).reduce((cart) => act(cart, 'add'), [])
    expect(full).toEqual([{ foodId: pizza, quantity: MAX_QUANTITY }])
    expect(act(full, 'increase')).toBe(full)
    expect(act(full, 'add')).toBe(full)
  })

  it.each(['unknown-food', '__proto__', 'constructor', undefined])(
    'ignores invalid ID %s',
    (foodId) => {
      const original = [{ foodId: pizza, quantity: 1 }]
      expect(cartReducer(original, { type: 'add', foodId })).toBe(original)
    },
  )

  it('ignores unsupported actions and quantity changes for absent rows', () => {
    const empty = []
    for (const type of ['increase', 'decrease', 'remove', 'unknown'])
      expect(act(empty, type)).toBe(empty)
  })
})

describe('derived INR totals', () => {
  it('has a zero total and count for an empty cart', () => {
    expect(getCartSummary([])).toEqual({ items: [], totalItems: 0, totalMinor: 0 })
    expect(formatPrice(0)).toBe('₹0.00')
  })

  it('calculates two ₹249 pizzas and one ₹79 lemonade as ₹577', () => {
    const cart = [
      { foodId: pizza, quantity: 2 },
      { foodId: drink, quantity: 1 },
    ]
    const summary = getCartSummary(cart)
    expect(summary.totalItems).toBe(3)
    expect(summary.items.map((item) => item.lineTotalMinor)).toEqual([49800, 7900])
    expect(summary.totalMinor).toBe(57700)
    expect(formatPrice(summary.totalMinor)).toBe('₹577.00')
    expect(getCartSummary(act(cart, 'decrease')).totalMinor).toBe(32800)
    expect(getCartSummary(act(cart, 'remove', drink)).totalMinor).toBe(49800)
  })

  it('preserves fractional rupees exactly before formatting', () => {
    const catalogue = { a: { id: 'a', priceMinor: 10 }, b: { id: 'b', priceMinor: 20 } }
    const summary = getCartSummary(
      [
        { foodId: 'a', quantity: 1 },
        { foodId: 'b', quantity: 1 },
      ],
      catalogue,
    )
    expect(summary.totalMinor).toBe(30)
    expect(formatPrice(summary.totalMinor)).toBe('₹0.30')
    expect(formatPrice(12345678)).toBe('₹1,23,456.78')
  })

  it('keeps totals finite and exact when every dish is at its limit', () => {
    const cart = menu.map((food) => ({ foodId: food.id, quantity: MAX_QUANTITY }))
    const summary = getCartSummary(cart)
    expect(summary.totalItems).toBe(1188)
    expect(summary.totalMinor).toBe(
      menu.reduce((sum, food) => sum + food.priceMinor, 0) * MAX_QUANTITY,
    )
    expect(Number.isSafeInteger(summary.totalMinor)).toBe(true)
  })
})
