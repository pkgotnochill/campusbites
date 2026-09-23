export default function DietIndicator({ diet, decorative = false }) {
  return (
    <span className={'diet-indicator ' + diet} aria-hidden={decorative || undefined}>
      {!decorative && (
        <span className="sr-only">{diet === 'veg' ? 'Vegetarian' : 'Non-vegetarian'}</span>
      )}
    </span>
  )
}
