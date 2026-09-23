import { describe, expect, it } from 'vitest'
import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App.jsx'
import { categories } from './data/menu.js'

const menuList = () => within(screen.getByRole('list', { name: 'Menu dishes' }))
const popularList = () => within(screen.getByRole('list', { name: 'Popular picks' }))

describe('expanded menu and synchronized quantities', () => {
  it('filters by food preference with the keyboard while preserving the cart', async () => {
    const user = userEvent.setup()
    render(<App />)
    await user.click(menuList().getByRole('button', { name: 'Add Crispy Chicken to cart' }))
    const all = screen.getByRole('radio', { name: 'All', exact: true })
    all.focus()
    await user.keyboard('{ArrowRight}')
    const veg = screen.getByRole('radio', { name: 'Veg', exact: true })
    expect(veg.checked).toBe(true)
    expect(document.activeElement).toBe(veg)
    for (const card of screen.getAllByRole('article')) {
      expect(within(card).getByText('Vegetarian', { exact: true })).toBeTruthy()
    }
    expect(popularList().getAllByRole('article')).toHaveLength(1)
    await user.click(screen.getByRole('button', { name: 'Burgers', exact: true }))
    expect(menuList().getAllByRole('article')).toHaveLength(2)
    await user.click(screen.getByRole('button', { name: 'Your cart, 1 item' }))
    const drawer = within(screen.getByRole('dialog'))
    expect(drawer.getByRole('heading', { name: 'Crispy Chicken' })).toBeTruthy()
    expect(drawer.getByLabelText('Cart total').textContent).toBe('₹219.00')
    await user.click(drawer.getByRole('button', { name: 'Close cart' }))
    await user.click(all)
    expect(menuList().getByLabelText('1 selected')).toBeTruthy()
    expect(menuList().getAllByRole('article')).toHaveLength(4)
  })

  it('shows a useful empty state for combined filters and recovers with All', async () => {
    const user = userEvent.setup()
    render(<App />)
    await user.click(screen.getByRole('radio', { name: 'Non-veg', exact: true }))
    for (const card of screen.getAllByRole('article')) {
      expect(within(card).getByText('Non-vegetarian', { exact: true })).toBeTruthy()
    }
    await user.click(screen.getByRole('button', { name: 'Desserts', exact: true }))
    expect(screen.queryByRole('list', { name: 'Menu dishes' })).toBeNull()
    expect(screen.getByText(/Select All in Food preference/)).toBeTruthy()
    expect(screen.getByText('0 dishes to love')).toBeTruthy()
    await user.click(screen.getByRole('radio', { name: 'All', exact: true }))
    expect(menuList().getAllByRole('article')).toHaveLength(4)
    expect(screen.getByRole('button', { name: 'Desserts', exact: true }).getAttribute('aria-pressed')).toBe('true')
  })

  it('shows four dishes in every category while keeping popular picks available', async () => {
    const user = userEvent.setup()
    render(<App />)
    for (const category of categories) {
      await user.click(screen.getByRole('button', { name: category.label, exact: true }))
      expect(menuList().getAllByRole('article')).toHaveLength(4)
      expect(popularList().getAllByRole('article')).toHaveLength(4)
    }
    await user.click(screen.getByRole('button', { name: 'All dishes' }))
    expect(menuList().getAllByRole('article')).toHaveLength(36)
    const ids = Array.from(document.querySelectorAll('[id]'), (node) => node.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('synchronizes popular picks, menu and drawer, and removes at one from either view', async () => {
    const user = userEvent.setup()
    render(<App />)
    const name = 'Classic Cheeseburger'
    await user.click(popularList().getByRole('button', { name: `Add ${name} to cart` }))
    expect(menuList().getByLabelText('1 selected')).toBeTruthy()
    await user.click(menuList().getByRole('button', { name: `Increase ${name} quantity` }))
    expect(popularList().getByLabelText('2 selected')).toBeTruthy()
    await user.click(screen.getByRole('button', { name: 'Your cart, 2 items' }))
    const drawer = within(screen.getByRole('dialog'))
    expect(drawer.getByLabelText('Cart total').textContent).toBe('₹398.00')
    await user.click(drawer.getByRole('button', { name: `Decrease ${name} quantity` }))
    await user.click(drawer.getByRole('button', { name: `Decrease ${name} quantity` }))
    expect(drawer.getByLabelText('Cart total').textContent).toBe('₹0.00')
    expect(drawer.getByRole('button', { name: 'Place Order' }).disabled).toBe(true)
    expect(document.activeElement).toBe(drawer.getByRole('heading', { name: 'Your cart' }))
    await user.click(drawer.getByRole('button', { name: 'Close cart' }))
    await user.click(menuList().getByRole('button', { name: `Add ${name} to cart` }))
    const minus = popularList().getByRole('button', {
      name: `Decrease ${name} quantity`,
    })
    minus.focus()
    await user.keyboard('{Enter}')
    expect(document.activeElement).toBe(
      popularList().getByRole('button', { name: `Add ${name} to cart` }),
    )
    expect(menuList().getByRole('button', { name: `Add ${name} to cart` })).toBeTruthy()
    expect(screen.getByRole('status', { name: 'Cart update' }).textContent).toContain(
      'removed from your cart',
    )
    expect(screen.getByRole('button', { name: 'Your cart, 0 items' })).toBeTruthy()
  })

  it('moves focus to a remaining cart item when minus removes its neighbour', async () => {
    const user = userEvent.setup()
    render(<App />)
    for (const name of ['Classic Margherita', 'Fresh Lemonade']) {
      await user.click(menuList().getByRole('button', { name: `Add ${name} to cart` }))
    }
    await user.click(screen.getByRole('button', { name: 'Your cart, 2 items' }))
    const drawer = within(screen.getByRole('dialog'))
    await user.click(
      drawer.getByRole('button', {
        name: 'Decrease Classic Margherita quantity',
      }),
    )
    expect(document.activeElement).toBe(
      drawer.getByRole('button', { name: 'Remove Fresh Lemonade from cart' }),
    )
    expect(drawer.getByLabelText('Cart total').textContent).toBe('₹79.00')
  })

  it('labels every dietary marker and includes the Chennai footer', () => {
    render(<App />)
    const pizza = within(menuList().getByRole('article', { name: 'Classic Margherita' }))
    const chicken = within(menuList().getByRole('article', { name: 'Crispy Chicken' }))
    expect(pizza.getByText('Vegetarian')).toBeTruthy()
    expect(chicken.getByText('Non-vegetarian')).toBeTruthy()
    for (const card of screen.getAllByRole('article')) {
      expect(within(card).getByText(/^(Vegetarian|Non-vegetarian)$/)).toBeTruthy()
    }
    expect(
      within(screen.getByRole('contentinfo')).getByText(/Chennai, Tamil Nadu 600006/),
    ).toBeTruthy()
  })
})
