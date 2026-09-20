import { useReducer, useState } from 'react'
import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import CategoryFilter from './components/CategoryFilter.jsx'
import FoodGrid from './components/FoodGrid.jsx'
import Cart from './components/Cart.jsx'
import CartDrawer from './components/CartDrawer.jsx'
import CartShortcut from './components/CartShortcut.jsx'
import CheckoutForm from './components/CheckoutForm.jsx'
import OrderSuccess from './components/OrderSuccess.jsx'
import Icon from './components/Icon.jsx'
import { filterMenu, menuById } from './data/menu.js'
import { cartReducer, getCartSummary } from './state/cart.js'
import { BRAND_NAME } from './config.js'

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [cart, dispatch] = useReducer(cartReducer, [])
  const [isCartOpen, setCartOpen] = useState(false)
  const [orderStep, setOrderStep] = useState('cart')
  const [placedOrder, setPlacedOrder] = useState(null)
  const [notice, setNotice] = useState({
    id: 0,
    message: 'Made for your cravings. Pick something delicious.',
  })
  const foods = filterMenu(selectedCategory)
  const { items, totalItems, totalMinor } = getCartSummary(cart)

  function closeCart() {
    setCartOpen(false)
    setOrderStep('cart')
    setPlacedOrder(null)
  }

  function confirmOrder(customer) {
    if (orderStep !== 'checkout' || !items.length) return
    // Keep a receipt snapshot before clearing the live cart. Nothing is sent or saved.
    setPlacedOrder({
      ...customer,
      reference: `CB-${crypto.randomUUID().slice(0, 8).toUpperCase()}`,
      items,
      totalMinor,
    })
    dispatch({ type: 'clear' })
    setOrderStep('success')
    setNotice((previous) => ({
      id: previous.id + 1,
      message: 'Demo order confirmed. Your cart is now empty.',
    }))
  }

  function handleAction(type, foodId) {
    dispatch({ type, foodId })
    const messages = {
      add: 'added to your cart',
      increase: 'quantity increased',
      decrease: 'quantity decreased',
      remove: 'removed from your cart',
    }
    setNotice((previous) => ({
      id: previous.id + 1,
      message: `${menuById[foodId].name} ${messages[type]}.`,
    }))
  }

  function navigateTo(event, id) {
    // Preserve regular browser behavior for modified link clicks.
    if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return
    const target = document.getElementById(id)
    if (!target) return
    event.preventDefault()
    target.focus({ preventScroll: true })
    target.scrollIntoView({ block: 'start' })
  }

  return (
    <div id="top">
      <a className="skip-link" href="#menu" onClick={(event) => navigateTo(event, 'menu')}>
        Skip to menu
      </a>
      <Header
        totalItems={totalItems}
        onNavigate={navigateTo}
        onOpenCart={() => setCartOpen(true)}
      />
      <main className="container">
        <Hero onNavigate={navigateTo} />
        <div className="menu-layout">
          <section className="menu-section" aria-labelledby="menu">
            <div className="section-heading">
              <div>
                <p className="eyebrow">FIND YOUR FAVOURITE</p>
                <h2 id="menu" tabIndex={-1}>
                  What sounds good?
                </h2>
              </div>
              <span className="result-count" aria-live="polite">
                {foods.length} dishes to love
              </span>
            </div>
            <CategoryFilter selectedCategory={selectedCategory} onSelect={setSelectedCategory} />
            <p className="menu-feedback" role="status" aria-label="Cart update" aria-atomic="true">
              <span key={notice.id}>{notice.message}</span>
            </p>
            <FoodGrid foods={foods} cart={cart} onAdd={(foodId) => handleAction('add', foodId)} />
          </section>
        </div>
      </main>
      <footer className="container site-footer">
        <p className="footer-note">
          <Icon name="plate" /> A little break. A great bite.
        </p>
        <p>{BRAND_NAME}</p>
        <a href="#menu" onClick={(event) => navigateTo(event, 'menu')}>
          Back to the menu ↑
        </a>
      </footer>
      <CartShortcut
        totalItems={totalItems}
        totalMinor={totalMinor}
        onOpenCart={() => setCartOpen(true)}
      />
      <CartDrawer isOpen={isCartOpen} onClose={closeCart} notice={notice} step={orderStep}>
        {orderStep === 'cart' && (
          <Cart
            items={items}
            totalItems={totalItems}
            totalMinor={totalMinor}
            onAction={handleAction}
            onBrowse={closeCart}
            onCheckout={() => {
              if (items.length) setOrderStep('checkout')
            }}
          />
        )}
        {orderStep === 'checkout' && (
          <CheckoutForm
            items={items}
            totalMinor={totalMinor}
            onBack={() => setOrderStep('cart')}
            onConfirm={confirmOrder}
          />
        )}
        {orderStep === 'success' && <OrderSuccess order={placedOrder} />}
      </CartDrawer>
    </div>
  )
}
