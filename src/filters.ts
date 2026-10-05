import type { Transaction } from './types'

// Special value that means "don't filter by this field"
export const ALL = 'all'

export interface Filters {
  month: string // 'YYYY-MM' or ALL
  category: string // category name or ALL
}

// Newest first. ISO dates ('YYYY-MM-DD') sort correctly as plain text.
// toSorted() returns a new array and keeps the original untouched.
export function sortByDateNewestFirst(transactions: Transaction[]): Transaction[] {
  return transactions.toSorted((a, b) => b.date.localeCompare(a.date))
}

// Months that have at least one transaction, newest first: ['2026-10', '2026-09']
export function getMonths(transactions: Transaction[]): string[] {
  // A Set keeps each value only once, so duplicates disappear
  const months = new Set(transactions.map((transaction) => transaction.date.slice(0, 7)))
  return [...months].toSorted().toReversed()
}

export function filterTransactions(transactions: Transaction[], filters: Filters): Transaction[] {
  return transactions.filter(
    (transaction) =>
      (filters.month === ALL || transaction.date.startsWith(filters.month)) &&
      (filters.category === ALL || transaction.category === filters.category),
  )
}

// '2026-10' → 'October 2026' (long) or 'Oct 2026' (short)
export function formatMonth(month: string, style: 'long' | 'short' = 'long'): string {
  const [year, monthNumber] = month.split('-').map(Number)
  return new Intl.DateTimeFormat('en-IE', { month: style, year: 'numeric' }).format(
    new Date(year, monthNumber - 1),
  )
}
