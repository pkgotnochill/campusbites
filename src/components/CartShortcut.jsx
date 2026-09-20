import { formatPrice } from '../utils/currency.js'
import Icon from './Icon.jsx'

export default function CartShortcut({ totalItems, totalMinor, onOpenCart }) {
  return (
    <div className="cart-shortcut">
      <button
        type="button"
        aria-haspopup="dialog"
        aria-controls="cart-drawer"
        onClick={onOpenCart}
        aria-label={`View cart, ${totalItems} ${totalItems === 1 ? 'item' : 'items'}, ${formatPrice(totalMinor)}`}
      >
        <span className="shortcut-count">{totalItems}</span>
        <span>View cart</span>
        <strong>{formatPrice(totalMinor)}</strong>
        <Icon name="arrow" />
      </button>
    </div>
  )
}
