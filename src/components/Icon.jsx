const paths = {
  bag: 'M5 7h14l1 14H4L5 7Zm3 0V5a4 4 0 0 1 8 0v2',
  arrow: 'M4 12h15m-6-6 6 6-6 6',
  plus: 'M12 5v14M5 12h14',
  minus: 'M5 12h14',
  close: 'm6 6 12 12M6 18 18 6',
  check: 'm5 12 4 4L19 6',
  grid: 'M3 3h6v6H3zM15 3h6v6h-6zM3 15h6v6H3zM15 15h6v6h-6z',
  pizza: 'm3 21 6-18a21 21 0 0 1 12 12L3 21ZM8 6a18 18 0 0 1 10 10M10 11h.01M8 16h.01M14 14h.01',
  burger:
    'M4 9a8 7 0 0 1 16 0H4Zm-1 4h18M4 17h16v1a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3v-1ZM9 5h.01M14 5h.01',
  cup: 'M5 7h14l-2 14H7L5 7ZM13 7l2-5h4M4 7h16M9 12h6',
  cake: 'M4 12h16v9H4v-9Zm0 4c3 3 5-3 8 0s5-3 8 0M7 12V8h10v4M12 8V5m0-3v1',
  leaf: 'M20 3C9 1 2 7 5 15c7 5 15-1 15-12ZM4 21l11-12',
  plate: 'M6 20V4M3 4v6h6V4M18 20V4c-5 3-5 8 0 9',
  heart:
    'M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z',
  trash: 'M3 6h18M9 6V3h6v3M5 6l1 15h12l1-15M10 10v7M14 10v7',
}

export default function Icon({ name, className = '' }) {
  return (
    <svg
      className={`icon ${className}`}
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={paths[name] || paths.plate} />
    </svg>
  )
}
