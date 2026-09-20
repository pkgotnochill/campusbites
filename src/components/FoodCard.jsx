import { MAX_QUANTITY } from '../config.js'
import { categories } from '../data/menu.js'
import { formatPrice } from '../utils/currency.js'
import FoodImage from './FoodImage.jsx'
import Icon from './Icon.jsx'

export default function FoodCard({ food, quantity = 0, onAdd }) {
  const atLimit = quantity >= MAX_QUANTITY
  return (
    <article className="food-card" aria-labelledby={`food-${food.id}`}>
      <div className="food-image-wrap">
        <FoodImage src={food.image} alt={food.imageAlt} />
        {quantity > 0 && (
          <span className="in-cart-badge">
            <Icon name="check" />
            {quantity} in cart
          </span>
        )}
      </div>
      <div className="food-card-content">
        <span className="food-category">
          {categories.find((category) => category.id === food.categoryId)?.label}
        </span>
        <h3 id={`food-${food.id}`}>{food.name}</h3>
        <p>{food.description}</p>
        <div className="food-card-bottom">
          <span className="food-price">{formatPrice(food.priceMinor)}</span>
          <button
            className="add-button"
            type="button"
            aria-label={`Add ${food.name} to cart`}
            onClick={() => onAdd(food.id)}
            disabled={atLimit}
          >
            <Icon name={atLimit ? 'check' : 'plus'} />
            {atLimit ? 'Max 99' : 'Add'}
          </button>
        </div>
      </div>
    </article>
  )
}
