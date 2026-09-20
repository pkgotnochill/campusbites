import { afterEach, beforeEach, vi } from 'vitest'
import { cleanup } from '@testing-library/react'

afterEach(cleanup)

beforeEach(() => {
  // jsdom has no layout engine; navigation focus is still checked in tests.
  Element.prototype.scrollIntoView = vi.fn()
  // jsdom lacks native modal behavior. Browser checks cover trapping and Escape.
  HTMLDialogElement.prototype.showModal = vi.fn(function () {
    this.setAttribute('open', '')
  })
  HTMLDialogElement.prototype.close = vi.fn(function () {
    this.removeAttribute('open')
  })
})
