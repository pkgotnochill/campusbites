import Icon from './Icon.jsx'
import OrderSummary from './OrderSummary.jsx'

export default function OrderSuccess({ order }) {
  return (
    <section className="order-panel order-success" aria-labelledby="order-success-heading">
      <div className="order-success-icon" aria-hidden="true">
        <Icon name="check" />
      </div>
      <h2 id="order-success-heading" tabIndex={-1}>
        Order placed successfully!
      </h2>
      <div className="order-receipt">
        <p>
          Order ID <strong>{order.reference}</strong>
        </p>
        <p>
          {order.customerName} · Table {order.tableNumber}
        </p>
      </div>
      <OrderSummary items={order.items} totalMinor={order.totalMinor} />
      <p className="order-demo">Your cart is cleared. Ready for another little break?</p>
    </section>
  )
}
