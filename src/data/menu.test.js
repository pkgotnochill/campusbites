import { describe, expect, it } from 'vitest'
import { categories, filterMenu, menu, menuById } from './menu.js'

describe('menu integrity and filtering', () => {
  it('contains twelve unique, complete foods in four unique categories', () => {
    expect(menu).toHaveLength(12)
    expect(new Set(menu.map((food) => food.id)).size).toBe(menu.length)
    expect(new Set(categories.map((category) => category.id)).size).toBe(4)
    for (const food of menu) {
      expect(categories.some((category) => category.id === food.categoryId)).toBe(true)
      expect(Number.isInteger(food.priceMinor) && food.priceMinor > 0).toBe(true)
      for (const field of ['name', 'description', 'image', 'imageAlt'])
        expect(food[field].length).toBeGreaterThan(0)
      expect(menuById[food.id]).toBe(food)
    }
  })

  it.each(categories)('filters $label without changing the full menu', (category) => {
    const filtered = filterMenu(category.id)
    expect(filtered).toHaveLength(3)
    expect(filtered.every((food) => food.categoryId === category.id)).toBe(true)
    expect(filterMenu('all')).toHaveLength(12)
  })

  it('returns an empty result for an unavailable category', () => {
    expect(filterMenu('sandwiches')).toEqual([])
  })
})
