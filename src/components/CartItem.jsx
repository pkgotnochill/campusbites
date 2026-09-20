import { MAX_QUANTITY } from '../config.js'
import { formatPrice } from '../utils/currency.js'
import FoodImage from './FoodImage.jsx'
import QuantityControl from './QuantityControl.jsx'
import Icon from './Icon.jsx'

export default function CartItem({ item, onIncrease, onDecrease, onRemove, removeButtonRef }) {
  return (
    <li className="cart-item">
      <div className="cart-item-top">
        <FoodImage className="cart-thumbnail" src={item.image} alt="" width={64} height={64} />
        <div className="cart-item-name">
          <h3>{item.name}</h3>
          <p>{formatPrice(item.priceMinor)} each</p>
        </div>
        <button
          ref={removeButtonRef}
          className="remove-button"
          type="button"
          aria-label={`Remove ${item.name} from cart`}
          onClick={onRemove}
        >
          <Icon name="trash" />
        </button>
      </div>
      <div className="cart-item-bottom">
        <QuantityControl
          name={item.name}
          quantity={item.quantity}
          onIncrease={onIncrease}
          onDecrease={onDecrease}
        />
        <strong className="line-total">
          <span className="sr-only">{item.name} line total: </span>
          {formatPrice(item.lineTotalMinor)}
        </strong>
      </div>
      {item.quantity === MAX_QUANTITY && (
        <p className="quantity-limit">Maximum {MAX_QUANTITY} per dish</p>
      )}
    </li>
  )
}
