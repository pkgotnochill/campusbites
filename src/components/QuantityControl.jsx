import { MAX_QUANTITY } from '../config.js'
import Icon from './Icon.jsx'

export default function QuantityControl({
  name,
  quantity,
  onIncrease,
  onDecrease,
  allowAdd = false,
}) {
  return (
    <div
      className={`quantity-control${allowAdd && !quantity ? ' quantity-empty' : ''}`}
      role="group"
      aria-label={`Quantity for ${name}`}
    >
      <button
        type="button"
        aria-label={`Decrease ${name} quantity`}
        disabled={quantity <= 0}
        hidden={allowAdd && !quantity}
        onClick={(event) => {
          // At zero the minus button disappears; keep focus on the stable plus button.
          if (allowAdd && quantity === 1) event.currentTarget.parentElement.lastElementChild.focus()
          onDecrease()
        }}
      >
        <Icon name="minus" />
      </button>
      <span hidden={allowAdd && !quantity} aria-label={`${quantity} selected`}>
        {quantity}
      </span>
      <button
        type="button"
        aria-label={allowAdd && !quantity ? `Add ${name} to cart` : `Increase ${name} quantity`}
        disabled={quantity >= MAX_QUANTITY}
        onClick={onIncrease}
      >
        <Icon name="plus" />
        {allowAdd && !quantity && <span>Add</span>}
      </button>
    </div>
  )
}
