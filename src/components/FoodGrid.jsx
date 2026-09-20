import FoodCard from './FoodCard.jsx'

export default function FoodGrid({ foods, cart = [], onAdd }) {
  if (!foods.length)
    return (
      <p className="no-results">
        No dishes in this category yet. Try All dishes to find something delicious.
      </p>
    )
  return (
    <ul className="food-grid" aria-label="Menu dishes">
      {foods.map((food) => (
        <li key={food.id}>
          <FoodCard
            food={food}
            quantity={cart.find((item) => item.foodId === food.id)?.quantity ?? 0}
            onAdd={onAdd}
          />
        </li>
      ))}
    </ul>
  )
}
