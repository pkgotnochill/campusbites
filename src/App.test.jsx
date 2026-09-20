import { describe, expect, it, vi } from 'vitest'
import { fireEvent, render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App.jsx'
import FoodImage from './components/FoodImage.jsx'
import FoodGrid from './components/FoodGrid.jsx'
import FoodCard from './components/FoodCard.jsx'
import QuantityControl from './components/QuantityControl.jsx'
import { menu } from './data/menu.js'
import placeholder from './assets/images/food-placeholder.svg'

const addPizza = () => screen.getByRole('button', { name: 'Add Classic Margherita to cart' })
const cartRegion = () => screen.getByRole('complementary', { name: 'Your cart' })
const total = () => screen.getByLabelText('Cart total').textContent
const openCart = (user) => user.click(screen.getByRole('button', { name: /^Your cart,/ }))

describe('ordering interface', () => {
  it('starts with the full menu and a closed, empty cart with INR prices', async () => {
    const user = userEvent.setup()
    render(<App />)
    expect(screen.getAllByRole('article')).toHaveLength(12)
    expect(screen.queryByRole('dialog')).toBeNull()
    await openCart(user)
    expect(screen.getByText('A little empty in here')).toBeTruthy()
    expect(total()).toBe('₹0.00')
    expect(screen.getByRole('button', { name: 'All dishes' }).getAttribute('aria-pressed')).toBe(
      'true',
    )
  })

  it('supports a complete order across categories and recalculates after changes', async () => {
    const user = userEvent.setup()
    render(<App />)
    await user.click(addPizza())
    await user.click(addPizza())
    await user.click(screen.getByRole('button', { name: 'Drinks', exact: true }))
    expect(screen.getAllByRole('article')).toHaveLength(3)
    expect(screen.queryByRole('article', { name: 'Classic Margherita' })).toBeNull()
    await user.click(screen.getByRole('button', { name: 'Add Fresh Lemonade to cart' }))
    await openCart(user)
    expect(within(cartRegion()).getByText('Classic Margherita')).toBeTruthy()
    expect(total()).toBe('₹577.00')
    expect(within(cartRegion()).getAllByRole('listitem')).toHaveLength(2)
    expect(screen.getByRole('status', { name: 'Cart update' }).textContent).toContain(
      'Fresh Lemonade added',
    )
    await user.click(screen.getByRole('button', { name: 'Decrease Classic Margherita quantity' }))
    expect(total()).toBe('₹328.00')
    expect(
      screen.getByRole('button', { name: 'Decrease Classic Margherita quantity' }).disabled,
    ).toBe(true)
    await user.click(screen.getByRole('button', { name: 'Increase Classic Margherita quantity' }))
    expect(total()).toBe('₹577.00')
    await user.click(screen.getByRole('button', { name: 'Remove Fresh Lemonade from cart' }))
    expect(total()).toBe('₹498.00')
    await user.click(screen.getByRole('button', { name: 'Remove Classic Margherita from cart' }))
    expect(total()).toBe('₹0.00')
    expect(screen.getByText('A little empty in here')).toBeTruthy()
    expect(document.activeElement).toBe(screen.getByRole('heading', { name: 'Your cart' }))
  })

  it('moves focus to the next remove button, then previous, then the heading', async () => {
    const user = userEvent.setup()
    render(<App />)
    for (const name of ['Classic Margherita', 'Pepperoni Please', 'Garden Party']) {
      await user.click(screen.getByRole('button', { name: `Add ${name} to cart` }))
    }
    await openCart(user)
    await user.click(screen.getByRole('button', { name: 'Remove Classic Margherita from cart' }))
    expect(document.activeElement).toBe(
      screen.getByRole('button', { name: 'Remove Pepperoni Please from cart' }),
    )
    await user.click(screen.getByRole('button', { name: 'Remove Garden Party from cart' }))
    expect(document.activeElement).toBe(
      screen.getByRole('button', { name: 'Remove Pepperoni Please from cart' }),
    )
    await user.keyboard('{Enter}')
    expect(document.activeElement).toBe(screen.getByRole('heading', { name: 'Your cart' }))
  })

  it('keeps keyboard focus on filters and restores all dishes', async () => {
    const user = userEvent.setup()
    render(<App />)
    const desserts = screen.getByRole('button', { name: 'Desserts', exact: true })
    desserts.focus()
    await user.keyboard('{Enter}')
    expect(document.activeElement).toBe(desserts)
    expect(desserts.getAttribute('aria-pressed')).toBe('true')
    expect(screen.getAllByRole('article')).toHaveLength(3)
    await user.click(screen.getByRole('button', { name: 'All dishes' }))
    expect(screen.getAllByRole('article')).toHaveLength(12)
  })

  it('provides a working skip link and cart navigation with focus', async () => {
    const user = userEvent.setup()
    render(<App />)
    await user.tab()
    expect(document.activeElement).toBe(screen.getByRole('link', { name: 'Skip to menu' }))
    await user.keyboard('{Enter}')
    expect(document.activeElement).toBe(screen.getByRole('heading', { name: 'What sounds good?' }))
    const shortcut = screen.getByRole('button', { name: 'View cart, 0 items, ₹0.00' })
    await user.click(shortcut)
    expect(document.activeElement).toBe(screen.getByRole('button', { name: 'Close cart' }))
    await user.click(screen.getByRole('button', { name: 'Close cart' }))
    expect(document.activeElement).toBe(shortcut)
  })

  it('starts a new empty cart on a fresh mount', async () => {
    const user = userEvent.setup()
    const view = render(<App />)
    await user.click(addPizza())
    await openCart(user)
    expect(total()).toBe('₹249.00')
    view.unmount()
    render(<App />)
    await openCart(user)
    expect(total()).toBe('₹0.00')
  })

  it('preserves cart contents when closing and reopening, and restores scroll and focus', async () => {
    const user = userEvent.setup()
    render(<App />)
    await user.click(addPizza())
    const opener = screen.getByRole('button', { name: /^Your cart,/ })
    await user.click(opener)
    expect(document.body.style.overflow).toBe('hidden')
    await user.click(screen.getByRole('button', { name: 'Continue browsing' }))
    expect(screen.queryByRole('dialog')).toBeNull()
    expect(document.body.style.overflow).toBe('')
    expect(document.activeElement).toBe(opener)
    await openCart(user)
    expect(total()).toBe('₹249.00')
  })

  it('closes on native cancel and a backdrop click, but not a click inside', async () => {
    const user = userEvent.setup()
    render(<App />)
    await openCart(user)
    await user.click(screen.getByRole('heading', { name: 'Your cart' }))
    expect(screen.getByRole('dialog')).toBeTruthy()
    fireEvent(screen.getByRole('dialog'), new Event('cancel', { cancelable: true }))
    expect(screen.queryByRole('dialog')).toBeNull()
    await openCart(user)
    const dialog = screen.getByRole('dialog')
    fireEvent.pointerDown(dialog)
    fireEvent.click(dialog)
    expect(screen.queryByRole('dialog')).toBeNull()
  })

  it('restores scrolling when unmounted with the cart open', async () => {
    const user = userEvent.setup()
    const view = render(<App />)
    await openCart(user)
    view.unmount()
    expect(document.body.style.overflow).toBe('')
  })
})

describe('edge states', () => {
  it('disables both entry points for increasing an item at the limit', async () => {
    const user = userEvent.setup()
    const onAdd = vi.fn()
    const onIncrease = vi.fn()
    render(
      <>
        <FoodCard food={menu[0]} quantity={99} onAdd={onAdd} />
        <QuantityControl
          name={menu[0].name}
          quantity={99}
          onIncrease={onIncrease}
          onDecrease={vi.fn()}
        />
      </>,
    )
    expect(addPizza().disabled).toBe(true)
    const increase = screen.getByRole('button', { name: 'Increase Classic Margherita quantity' })
    expect(increase.disabled).toBe(true)
    await user.click(addPizza())
    await user.click(increase)
    expect(onAdd).not.toHaveBeenCalled()
    expect(onIncrease).not.toHaveBeenCalled()
  })

  it('shows a useful no-results state', () => {
    render(<FoodGrid foods={[]} onAdd={vi.fn()} />)
    expect(screen.getByText(/No dishes in this category/)).toBeTruthy()
  })

  it('falls back once when an image fails, without retrying the placeholder', () => {
    render(<FoodImage src="/missing.webp" alt="A pizza" />)
    const image = screen.getByRole('img', { name: 'A pizza' })
    fireEvent.error(image)
    expect(image.getAttribute('src')).toBe(placeholder)
    expect(image.alt).toBe('Image unavailable: A pizza')
    const fallback = image.src
    fireEvent.error(image)
    expect(image.src).toBe(fallback)
  })

  it('keeps decorative failed images out of the accessibility tree', () => {
    const { container } = render(<FoodImage src="/missing.webp" alt="" />)
    fireEvent.error(container.querySelector('img'))
    expect(screen.queryByRole('img')).toBeNull()
  })
})
