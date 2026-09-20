import { useState } from 'react'
import placeholder from '../assets/images/food-placeholder.svg'

export default function FoodImage({
  src,
  alt,
  className = '',
  width = 600,
  height = 420,
  loading = 'lazy',
  fetchPriority,
}) {
  const [failed, setFailed] = useState(false)
  return (
    <img
      className={className}
      src={failed ? placeholder : src}
      alt={failed && alt ? `Image unavailable: ${alt}` : alt}
      width={width}
      height={height}
      loading={loading}
      fetchPriority={fetchPriority}
      decoding="async"
      onError={failed ? undefined : () => setFailed(true)}
    />
  )
}
