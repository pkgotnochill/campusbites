import { useId } from 'react'
import { categories } from '../data/menu.js'
import { formatPrice } from '../utils/currency.js'
import FoodImage from './FoodImage.jsx'
import Icon from './Icon.jsx'
import DietIndicator from './DietIndicator.jsx'
import QuantityControl from './QuantityControl.jsx'

export default function FoodCard({ food, quantity = 0, onAction }) {
  const headingId = useId()
  return (
    <article className="food-card" aria-labelledby={headingId}>
      <div className="food-image-wrap">
        <FoodImage src={food.image} alt={food.imageAlt} />
        <DietIndicator diet={food.diet} />
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
        <h3 id={headingId}>{food.name}</h3>
        <p>{food.description}</p>
        <div className="food-card-bottom">
          <span className="food-price">{formatPrice(food.priceMinor)}</span>
          <QuantityControl
            name={food.name}
            quantity={quantity}
            allowAdd
            onIncrease={() => onAction(quantity ? 'increase' : 'add', food.id)}
            onDecrease={() => onAction('decrease', food.id)}
          />
        </div>
      </div>
    </article>
  )
}
