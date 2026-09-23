import { describe, expect, it, vi } from 'vitest'
import { fireEvent, render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App.jsx'
import CheckoutForm from './components/CheckoutForm.jsx'
import { getCartSummary } from './state/cart.js'

async function startCheckout(user) {
  await user.click(screen.getByRole('button', { name: 'Add Classic Margherita to cart' }))
  await user.click(screen.getByRole('button', { name: 'Your cart, 1 item' }))
  await user.click(screen.getByRole('button', { name: 'Place Order' }))
}

describe('demo order placement', () => {
  it('disables Place Order for an empty cart', async () => {
    const user = userEvent.setup()
    render(<App />)
    await user.click(screen.getByRole('button', { name: 'Your cart, 0 items' }))
    const placeOrder = screen.getByRole('button', { name: 'Place Order' })
    expect(placeOrder.disabled).toBe(true)
    await user.click(placeOrder)
    expect(screen.queryByRole('form')).toBeNull()
  })

  it('validates required fields, whitespace and invalid table numbers with focus on the error', async () => {
    const user = userEvent.setup()
    render(<App />)
    await startCheckout(user)
    expect(document.activeElement).toBe(screen.getByRole('heading', { name: 'Make it a meal' }))
    const confirm = screen.getByRole('button', { name: 'Confirm Order' })
    const name = screen.getByRole('textbox', { name: /Customer name/ })
    const table = screen.getByRole('textbox', { name: /Table number/ })
    await user.click(confirm)
    expect(name.getAttribute('aria-invalid')).toBe('true')
    expect(table.getAttribute('aria-invalid')).toBe('true')
    expect(document.activeElement).toBe(name)
    await user.type(name, '   ')
    await user.click(confirm)
    expect(document.activeElement).toBe(name)
    await user.clear(name)
    await user.type(name, 'Asha')
    expect(name.getAttribute('aria-invalid')).toBe('false')
    for (const invalid of ['0', '-1', '1.5', 'abc', '1000']) {
      await user.clear(table)
      await user.type(table, invalid)
      await user.click(confirm)
      expect(table.getAttribute('aria-invalid')).toBe('true')
      expect(document.activeElement).toBe(table)
      expect(screen.queryByRole('heading', { name: 'Order placed successfully!' })).toBeNull()
    }
  })

  it('confirms a mixed INR order by keyboard, retains its receipt and clears the cart', async () => {
    const user = userEvent.setup()
    render(<App />)
    await user.click(screen.getByRole('button', { name: 'Add Classic Margherita to cart' }))
    await user.click(
      screen.getByRole('button', {
        name: 'Increase Classic Margherita quantity',
      }),
    )
    await user.click(screen.getByRole('button', { name: 'Add Fresh Lemonade to cart' }))
    const opener = screen.getByRole('button', { name: 'Your cart, 3 items' })
    await user.click(opener)
    await user.click(screen.getByRole('button', { name: 'Place Order' }))
    expect(screen.getByLabelText('Order total').textContent).toBe('₹577.00')
    const rows = within(screen.getByRole('list', { name: 'Order items' })).getAllByRole('listitem')
    expect(rows[0].textContent).toContain('Qty 2 × ₹249.00')
    expect(rows[1].textContent).toContain('Qty 1 × ₹79.00')
    await user.tab()
    expect(document.activeElement).toBe(screen.getByRole('textbox', { name: /Customer name/ }))
    await user.keyboard('  Asha Rao  {Tab}12{Tab}{Enter}')
    const success = screen.getByRole('heading', {
      name: 'Order placed successfully!',
    })
    expect(document.activeElement).toBe(success)
    expect(screen.getByRole('dialog', { name: 'Order placed successfully!' })).toBeTruthy()
    expect(screen.getByText(/^CB-[A-F0-9]{8}$/)).toBeTruthy()
    expect(screen.getByText('Asha Rao · Table 12')).toBeTruthy()
    expect(screen.queryByText(/Nothing was sent to a restaurant/)).toBeNull()
    expect(screen.getByText('Order ID')).toBeTruthy()
    expect(screen.getByLabelText('Order total').textContent).toBe('₹577.00')
    expect(screen.queryByRole('button', { name: 'Confirm Order' })).toBeNull()
    await user.click(screen.getByRole('button', { name: 'Back to menu' }))
    expect(screen.queryByRole('dialog')).toBeNull()
    expect(document.activeElement).toBe(opener)
    await user.click(screen.getByRole('button', { name: 'Your cart, 0 items' }))
    expect(screen.getByLabelText('Cart total').textContent).toBe('₹0.00')
    expect(screen.getByText('A little empty in here')).toBeTruthy()
    expect(screen.getByRole('button', { name: 'Place Order' }).disabled).toBe(true)
    expect(screen.queryByText('Asha Rao · Table 12')).toBeNull()
  })

  it('allows returning to the cart and closing checkout without placing an order', async () => {
    const user = userEvent.setup()
    render(<App />)
    await startCheckout(user)
    await user.click(screen.getByRole('button', { name: 'Back to cart' }))
    expect(document.activeElement).toBe(screen.getByRole('heading', { name: 'Your cart' }))
    await user.click(
      within(screen.getByRole('dialog')).getByRole('button', {
        name: 'Increase Classic Margherita quantity',
      }),
    )
    await user.click(screen.getByRole('button', { name: 'Place Order' }))
    expect(screen.getByLabelText('Order total').textContent).toBe('₹498.00')
    await user.type(screen.getByRole('textbox', { name: /Customer name/ }), 'Draft Name')
    fireEvent(screen.getByRole('dialog'), new Event('cancel', { cancelable: true }))
    await user.click(screen.getByRole('button', { name: 'Your cart, 2 items' }))
    expect(screen.getByLabelText('Cart total').textContent).toBe('₹498.00')
    await user.click(screen.getByRole('button', { name: 'Place Order' }))
    expect(screen.getByRole('textbox', { name: /Customer name/ }).value).toBe('')
  })

  it('ignores repeated valid submissions', async () => {
    const user = userEvent.setup()
    const onConfirm = vi.fn()
    const summary = getCartSummary([{ foodId: 'pizza-margherita', quantity: 1 }])
    render(<CheckoutForm {...summary} onConfirm={onConfirm} onBack={vi.fn()} />)
    await user.type(screen.getByRole('textbox', { name: /Customer name/ }), 'Asha')
    await user.type(screen.getByRole('textbox', { name: /Table number/ }), '1')
    await user.dblClick(screen.getByRole('button', { name: 'Confirm Order' }))
    expect(onConfirm).toHaveBeenCalledExactlyOnceWith({
      customerName: 'Asha',
      tableNumber: '1',
    })
  })
})
