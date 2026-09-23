import FoodCard from './FoodCard.jsx'

export default function FoodGrid({ foods, cart = [], onAction, label = 'Menu dishes' }) {
  if (!foods.length)
    return (
      <p className="no-results">
        No dishes in this category match your food preference. Select All in Food preference or
        try another category.
      </p>
    )
  return (
    <ul className="food-grid" aria-label={label}>
      {foods.map((food) => (
        <li key={food.id}>
          <FoodCard
            food={food}
            quantity={cart.find((item) => item.foodId === food.id)?.quantity ?? 0}
            onAction={onAction}
          />
        </li>
      ))}
    </ul>
  )
}
