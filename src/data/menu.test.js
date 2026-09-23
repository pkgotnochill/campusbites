import { describe, expect, it } from 'vitest'
import { categories, filterMenu, menu, menuById, popularFoods } from './menu.js'

describe('menu integrity and filtering', () => {
  it('contains 36 unique, complete foods in the nine reference categories', () => {
    expect(menu).toHaveLength(36)
    expect(new Set(menu.map((food) => food.id)).size).toBe(menu.length)
    expect(categories.map((category) => category.label)).toEqual([
      'Signature',
      'Starters',
      'Burgers',
      'Pizza',
      'Indian',
      'Asian',
      'Main Course',
      'Desserts',
      'Beverages',
    ])
    expect(new Set(categories.map((category) => category.id)).size).toBe(9)
    for (const food of menu) {
      expect(categories.some((category) => category.id === food.categoryId)).toBe(true)
      expect(Number.isInteger(food.priceMinor) && food.priceMinor > 0).toBe(true)
      for (const field of ['name', 'description', 'image', 'imageAlt'])
        expect(food[field].length).toBeGreaterThan(0)
      expect(menuById[food.id]).toBe(food)
      expect(['veg', 'nonveg']).toContain(food.diet)
    }
  })

  it.each(categories)('filters $label without changing the full menu', (category) => {
    const filtered = filterMenu(category.id)
    expect(filtered).toHaveLength(4)
    expect(filtered.every((food) => food.categoryId === category.id)).toBe(true)
    expect(filterMenu('all')).toHaveLength(36)
  })

  it('returns an empty result for an unavailable category', () => {
    expect(filterMenu('sandwiches')).toEqual([])
  })
  it('combines dietary and category filters without changing the catalogue', () => {
    for (const category of ['all', ...categories.map((item) => item.id)]) {
      const all = filterMenu(category)
      const veg = filterMenu(category, 'veg')
      const nonveg = filterMenu(category, 'nonveg')
      expect(veg.every((food) => food.diet === 'veg')).toBe(true)
      expect(nonveg.every((food) => food.diet === 'nonveg')).toBe(true)
      expect([...veg, ...nonveg].map((food) => food.id).sort()).toEqual(
        all.map((food) => food.id).sort(),
      )
    }
    expect(menu).toHaveLength(36)
  })
  it('returns no non-vegetarian desserts or beverages', () => {
    expect(filterMenu('desserts', 'nonveg')).toEqual([])
    expect(filterMenu('beverages', 'nonveg')).toEqual([])
  })
  it('reuses four real menu items as popular picks', () => {
    expect(popularFoods).toHaveLength(4)
    for (const food of popularFoods) expect(menuById[food.id]).toBe(food)
  })
})
