import { CURRENCY, LOCALE } from '../config.js'

const formatter = new Intl.NumberFormat(LOCALE, { style: 'currency', currency: CURRENCY })

// Calculate with integer paise; convert only at the display boundary.
export function formatPrice(paise) {
  return formatter.format(paise / 100)
}
