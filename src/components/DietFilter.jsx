import DietIndicator from './DietIndicator.jsx'

const options = [
  { id: 'all', label: 'All' },
  { id: 'veg', label: 'Veg' },
  { id: 'nonveg', label: 'Non-veg' },
]

export default function DietFilter({ selectedDiet, onSelect }) {
  return (
    <fieldset className="diet-filter">
      <legend>Food preference</legend>
      <div className="diet-options">
        {options.map(({ id, label }) => (
          <label className="diet-option" key={id}>
            <input
              className="sr-only"
              type="radio"
              name="food-preference"
              value={id}
              checked={selectedDiet === id}
              onChange={() => onSelect(id)}
            />
            <span className="diet-segment">
              {id !== 'all' && <DietIndicator diet={id} decorative />}
              {label}
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  )
}
