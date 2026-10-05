import type { Currency } from './types'

// Main currency of the app. New transactions and totals use it.
export const BASE_CURRENCY: Currency = 'EUR'

// Turns cents into a readable string: formatMoney(1250, 'EUR') → '€12.50'
export function formatMoney(cents: number, currency: Currency): string {
  return new Intl.NumberFormat('en-IE', {
    style: 'currency',
    currency,
  }).format(cents / 100)
}

// Short form for chart axes: formatMoneyCompact(250000, 'EUR') → '€2.5K'
export function formatMoneyCompact(cents: number, currency: Currency): string {
  return new Intl.NumberFormat('en-IE', {
    style: 'currency',
    currency,
    notation: 'compact',
  }).format(cents / 100)
}

// Turns cents into a plain string for an input field: 1250 → '12.50'
export function centsToInputValue(cents: number): string {
  const whole = Math.floor(cents / 100)
  const fraction = String(cents % 100).padStart(2, '0')
  return `${whole}.${fraction}`
}

// Turns user input into cents without floating point math: '12.50' → 1250
// Returns null if the input is not a valid positive amount.
export function parseMoneyToCents(input: string): number | null {
  const normalized = input.trim().replace(',', '.')

  // One or more digits, optionally followed by a dot and 1–2 digits
  if (!/^\d+(\.\d{1,2})?$/.test(normalized)) {
    return null
  }

  const [whole, fraction = ''] = normalized.split('.')
  const cents = Number(whole) * 100 + Number(fraction.padEnd(2, '0'))

  return cents > 0 ? cents : null
}
