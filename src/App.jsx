import { useReducer, useState } from 'react'
import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import CategoryFilter from './components/CategoryFilter.jsx'
import DietFilter from './components/DietFilter.jsx'
import FoodGrid from './components/FoodGrid.jsx'
import Cart from './components/Cart.jsx'
import CartDrawer from './components/CartDrawer.jsx'
import CartShortcut from './components/CartShortcut.jsx'
import CheckoutForm from './components/CheckoutForm.jsx'
import OrderSuccess from './components/OrderSuccess.jsx'
import Footer from './components/Footer.jsx'
import { filterMenu, menuById, popularFoods } from './data/menu.js'
import { cartReducer, getCartSummary } from './state/cart.js'

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedDiet, setSelectedDiet] = useState('all')
  const [cart, dispatch] = useReducer(cartReducer, [])
  const [isCartOpen, setCartOpen] = useState(false)
  const [orderStep, setOrderStep] = useState('cart')
  const [placedOrder, setPlacedOrder] = useState(null)
  const [notice, setNotice] = useState({
    id: 0,
    message: 'Made for your cravings. Pick something delicious.',
  })
  const foods = filterMenu(selectedCategory, selectedDiet)
  const filteredPopularFoods = popularFoods.filter(
    (food) => selectedDiet === 'all' || food.diet === selectedDiet,
  )
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
    const removingLast =
      type === 'decrease' && cart.find((item) => item.foodId === foodId)?.quantity === 1
    dispatch({ type, foodId })
    const messages = {
      add: 'added to your cart',
      increase: 'quantity increased',
      decrease: 'quantity decreased',
      remove: 'removed from your cart',
    }
    setNotice((previous) => ({
      id: previous.id + 1,
      message: `${menuById[foodId].name} ${messages[removingLast ? 'remove' : type]}.`,
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
        <section className="popular-section" aria-labelledby="popular">
          <div className="section-heading">
            <div>
              <p className="eyebrow">A FEW CROWD FAVOURITES</p>
              <h2 id="popular">Popular Picks</h2>
            </div>
            <span className="result-count">Your next favourite starts here</span>
          </div>
          <FoodGrid
            foods={filteredPopularFoods}
            cart={cart}
            onAction={handleAction}
            label="Popular picks"
          />
        </section>
        <div className="menu-layout">
          <section className="menu-section" aria-labelledby="menu">
            <div className="section-heading">
              <div>
                <p className="eyebrow">FIND YOUR FAVOURITE</p>
                <h2 id="menu" tabIndex={-1}>
                  What sounds good?
                </h2>
              </div>
              <div className="menu-tools">
                <DietFilter selectedDiet={selectedDiet} onSelect={setSelectedDiet} />
                <span className="result-count" aria-live="polite">
                  {foods.length} {foods.length === 1 ? 'dish' : 'dishes'} to love
                </span>
              </div>
            </div>
            <CategoryFilter selectedCategory={selectedCategory} onSelect={setSelectedCategory} />
            <p className="menu-feedback" role="status" aria-label="Cart update" aria-atomic="true">
              <span key={notice.id}>{notice.message}</span>
            </p>
            <FoodGrid foods={foods} cart={cart} onAction={handleAction} />
          </section>
        </div>
      </main>
      <Footer onNavigate={navigateTo} />
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
