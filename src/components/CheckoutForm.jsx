import { useRef, useState } from 'react'
import OrderSummary from './OrderSummary.jsx'

export default function CheckoutForm({ items, totalMinor, onBack, onConfirm }) {
  const [customerName, setCustomerName] = useState('')
  const [tableNumber, setTableNumber] = useState('')
  const [errors, setErrors] = useState({})
  const nameRef = useRef(null)
  const tableRef = useRef(null)
  const submitted = useRef(false)

  function submit(event) {
    event.preventDefault()
    if (submitted.current || !items.length) return
    const name = customerName.trim()
    const table = tableNumber.trim()
    const nextErrors = {}
    if (!name || name.length > 60) nextErrors.name = 'Enter your name (1–60 characters).'
    if (!/^[1-9]\d{0,2}$/.test(table))
      nextErrors.table = 'Enter a whole table number from 1 to 999.'
    setErrors(nextErrors)
    if (nextErrors.name || nextErrors.table) {
      const invalidField = nextErrors.name ? nameRef : tableRef
      invalidField.current.focus()
      return
    }
    submitted.current = true
    onConfirm({ customerName: name, tableNumber: table })
  }

  return (
    <section className="order-panel" aria-labelledby="checkout-heading">
      <p className="eyebrow order-step">ONE LAST LITTLE STEP</p>
      <h2 id="checkout-heading" tabIndex={-1}>
        Make it a meal
      </h2>
      <p className="order-demo" id="checkout-demo">
        Demo only. No real order is sent and no payment is taken.
      </p>
      <form
        onSubmit={submit}
        noValidate
        aria-label="Order details"
        aria-describedby="checkout-demo"
      >
        <div className="order-field">
          <label htmlFor="customer-name">
            Customer name <span>(required)</span>
          </label>
          <input
            ref={nameRef}
            id="customer-name"
            name="customerName"
            autoComplete="name"
            required
            maxLength={60}
            value={customerName}
            onChange={(event) => {
              setCustomerName(event.target.value)
              setErrors((previous) => ({ ...previous, name: undefined }))
            }}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? 'name-error' : undefined}
          />
          {errors.name && (
            <p className="field-error" id="name-error">
              {errors.name}
            </p>
          )}
        </div>
        <div className="order-field">
          <label htmlFor="table-number">
            Table number <span>(required)</span>
          </label>
          <input
            ref={tableRef}
            id="table-number"
            name="tableNumber"
            inputMode="numeric"
            autoComplete="off"
            required
            value={tableNumber}
            onChange={(event) => {
              setTableNumber(event.target.value)
              setErrors((previous) => ({ ...previous, table: undefined }))
            }}
            aria-invalid={Boolean(errors.table)}
            aria-describedby={errors.table ? 'table-hint table-error' : 'table-hint'}
          />
          <p className="field-hint" id="table-hint">
            Use a table number from 1 to 999 for this demo.
          </p>
          {errors.table && (
            <p className="field-error" id="table-error">
              {errors.table}
            </p>
          )}
        </div>
        <OrderSummary items={items} totalMinor={totalMinor} />
        <button className="button order-primary" type="submit" disabled={!items.length}>
          Confirm Order
        </button>
        <button className="button order-back" type="button" onClick={onBack}>
          Back to cart
        </button>
      </form>
    </section>
  )
}
