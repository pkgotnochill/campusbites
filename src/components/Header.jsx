import { BRAND_NAME } from '../config.js'
import Icon from './Icon.jsx'

export default function Header({ totalItems = 0, onNavigate, onOpenCart }) {
  const [brandStart, ...brandEnd] = BRAND_NAME.toLowerCase().split(' ')
  return (
    <header className="site-header">
      <div className="container header-inner">
        <a className="brand" href="#top" aria-label={`${BRAND_NAME}, back to top`}>
          <span className="brand-mark">
            <Icon name="plate" />
          </span>
          <span>
            {brandStart}
            <span className="brand-accent">{brandEnd.join(' ')}</span>
            <span className="brand-dot">.</span>
          </span>
        </a>
        <nav aria-label="Main navigation">
          <a className="nav-menu" href="#menu" onClick={(event) => onNavigate?.(event, 'menu')}>
            The menu
          </a>
          <button
            className="header-cart"
            type="button"
            aria-haspopup="dialog"
            aria-controls="cart-drawer"
            aria-label={`Your cart, ${totalItems} ${totalItems === 1 ? 'item' : 'items'}`}
            onClick={onOpenCart}
          >
            <Icon name="bag" />
            <span>Your cart</span>
            <span className="count-badge">{totalItems}</span>
          </button>
        </nav>
      </div>
    </header>
  )
}
