import type { Currency } from './types'

// Turns cents into a readable string: formatMoney(1250, 'EUR') → '€12.50'
export function formatMoney(cents: number, currency: Currency): string {
  return new Intl.NumberFormat('en-IE', {
    style: 'currency',
    currency,
  }).format(cents / 100)
}
