import { MAX_QUANTITY } from '../config.js'
import Icon from './Icon.jsx'

export default function QuantityControl({ name, quantity, onIncrease, onDecrease }) {
  return (
    <div className="quantity-control" role="group" aria-label={`Quantity for ${name}`}>
      <button
        type="button"
        aria-label={`Decrease ${name} quantity`}
        disabled={quantity <= 1}
        onClick={onDecrease}
      >
        <Icon name="minus" />
      </button>
      <span aria-label={`${quantity} selected`}>{quantity}</span>
      <button
        type="button"
        aria-label={`Increase ${name} quantity`}
        disabled={quantity >= MAX_QUANTITY}
        onClick={onIncrease}
      >
        <Icon name="plus" />
      </button>
    </div>
  )
}
