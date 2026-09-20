import { formatPrice } from '../utils/currency.js'

export default function OrderSummary({ items, totalMinor }) {
  return (
    <section className="order-summary" aria-labelledby="order-summary-heading">
      <h3 id="order-summary-heading">Order summary</h3>
      <ul aria-label="Order items">
        {items.map((item) => (
          <li key={item.id}>
            <div>
              <strong>{item.name}</strong>
              <span>
                Qty {item.quantity} × {formatPrice(item.priceMinor)}
              </span>
            </div>
            <span>{formatPrice(item.lineTotalMinor)}</span>
          </li>
        ))}
      </ul>
      <div className="order-summary-total">
        <span>Total</span>
        <strong aria-label="Order total">{formatPrice(totalMinor)}</strong>
      </div>
    </section>
  )
}
