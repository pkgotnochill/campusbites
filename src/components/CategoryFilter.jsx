import { categories } from '../data/menu.js'
import Icon from './Icon.jsx'

export default function CategoryFilter({ selectedCategory, onSelect }) {
  const filters = [{ id: 'all', label: 'All dishes', icon: 'grid' }, ...categories]
  return (
    <div className="category-filters" role="group" aria-label="Filter menu by category">
      {filters.map((category) => (
        <button
          type="button"
          className="category-button"
          key={category.id}
          aria-pressed={selectedCategory === category.id}
          onClick={() => onSelect(category.id)}
        >
          <Icon name={category.icon} />
          {category.label}
        </button>
      ))}
    </div>
  )
}
