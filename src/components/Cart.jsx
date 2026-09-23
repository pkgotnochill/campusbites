import { useRef } from 'react'
import { formatPrice } from '../utils/currency.js'
import CartItem from './CartItem.jsx'
import Icon from './Icon.jsx'

export default function Cart({ items, totalItems, totalMinor, onAction, onBrowse, onCheckout }) {
  const removeButtons = useRef(new Map())
  const heading = useRef(null)

  function removeItem(item, index) {
    // Move focus before removing the button the keyboard user was operating.
    const neighbour = items[index + 1] || items[index - 1]
    if (neighbour) removeButtons.current.get(neighbour.id)?.focus()
    else heading.current?.focus()
    onAction('remove', item.id)
  }

  return (
    <aside className="cart-panel" aria-labelledby="cart">
      <div className="cart-heading">
        <div>
          <Icon name="bag" />
          <h2 id="cart" tabIndex={-1} ref={heading}>
            Your cart
          </h2>
        </div>
        <span className="cart-item-count">
          {totalItems} {totalItems === 1 ? 'item' : 'items'}
        </span>
      </div>
      {items.length ? (
        <ul className="cart-items" aria-label="Items in your cart">
          {items.map((item, index) => (
            <CartItem
              key={item.id}
              item={item}
              onIncrease={() => onAction('increase', item.id)}
              onDecrease={() =>
                item.quantity === 1 ? removeItem(item, index) : onAction('decrease', item.id)
              }
              onRemove={() => removeItem(item, index)}
              removeButtonRef={(node) => {
                if (node) removeButtons.current.set(item.id, node)
                else removeButtons.current.delete(item.id)
              }}
            />
          ))}
        </ul>
      ) : (
        <div className="empty-cart">
          <div className="empty-cart-art" aria-hidden="true">
            <Icon name="bag" />
            <span className="empty-spark">✳</span>
          </div>
          <h3>A little empty in here</h3>
          <p>
            Your next favourite is waiting.
            <br />
            Add a dish and make it a meal.
          </p>
          <button type="button" className="browse-menu" onClick={onBrowse}>
            Let’s find you something <Icon name="arrow" />
          </button>
        </div>
      )}
      <div className="cart-summary">
        <div className="cart-total">
          <span>Total</span>
          <output aria-label="Cart total" aria-live="off">
            {formatPrice(totalMinor)}
          </output>
        </div>
        <p>Just your favourites. No extra charges.</p>
        <button
          type="button"
          className="button order-primary"
          onClick={onCheckout}
          disabled={!items.length}
        >
          Place Order <Icon name="arrow" />
        </button>
      </div>
      <div className="cart-note">
        <Icon name="heart" />
        <span>Good food is better together.</span>
      </div>
    </aside>
  )
}
