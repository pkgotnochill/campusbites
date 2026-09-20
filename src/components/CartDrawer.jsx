import { useEffect, useRef } from 'react'
import Icon from './Icon.jsx'

export default function CartDrawer({ isOpen, onClose, notice, children, step = 'cart' }) {
  const dialogRef = useRef(null)
  const closeButtonRef = useRef(null)
  const startedOnBackdrop = useRef(false)
  const previousStep = useRef(step)
  const headingId = {
    cart: 'cart',
    checkout: 'checkout-heading',
    success: 'order-success-heading',
  }[step]

  useEffect(() => {
    if (!isOpen) return
    const dialog = dialogRef.current
    const opener = document.activeElement
    const previousOverflow = document.body.style.overflow

    dialog.showModal()
    closeButtonRef.current.focus()
    document.body.style.overflow = 'hidden'

    return () => {
      dialog.close()
      document.body.style.overflow = previousOverflow
      if (opener instanceof HTMLElement && opener.isConnected) {
        opener.focus({ preventScroll: true })
      }
    }
  }, [isOpen])

  useEffect(() => {
    if (isOpen && previousStep.current !== step) {
      dialogRef.current.querySelector(`#${headingId}`)?.focus()
    }
    previousStep.current = step
  }, [isOpen, step, headingId])

  return (
    // Native dialog handles keyboard dismissal through onCancel; pointer handlers
    // only provide the additional backdrop gesture, not an interactive control.
    /* eslint-disable jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions */
    <dialog
      ref={dialogRef}
      id="cart-drawer"
      className="cart-drawer"
      aria-labelledby={headingId}
      aria-describedby="cart-drawer-hint"
      aria-modal="true"
      onCancel={(event) => {
        event.preventDefault()
        onClose()
      }}
      onPointerDown={(event) => {
        startedOnBackdrop.current = event.target === event.currentTarget
      }}
      onClick={(event) => {
        if (startedOnBackdrop.current && event.target === event.currentTarget) onClose()
      }}
    >
      <div className="drawer-content">
        <div className="drawer-toolbar">
          <p className="eyebrow">YOUR NEXT GOOD BITE</p>
          <button
            ref={closeButtonRef}
            type="button"
            className="drawer-close"
            onClick={onClose}
            aria-label="Close cart"
          >
            <Icon name="close" />
          </button>
        </div>
        <p id="cart-drawer-hint" className="drawer-hint">
          Your favourites, all in one place.
        </p>
        {children}
        <button type="button" className="button drawer-continue" onClick={onClose}>
          {step === 'success' ? 'Back to menu' : 'Continue browsing'} <Icon name="arrow" />
        </button>
        <p className="sr-only" role="status" aria-label="Cart panel update" aria-atomic="true">
          <span key={notice.id}>{notice.message}</span>
        </p>
      </div>
    </dialog>
  )
}
