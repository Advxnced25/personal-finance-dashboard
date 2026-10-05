import { getMonths } from './filters'
import { calculateSummary } from './summary'
import type { Currency, Transaction } from './types'

export interface CategoryTotal {
  category: string
  amount: number // cents
}

export interface MonthTotal {
  month: string // 'YYYY-MM'
  income: number // cents
  expenses: number // cents
}

// Expenses per category in one currency, biggest first
export function getExpensesByCategory(
  transactions: Transaction[],
  currency: Currency,
): CategoryTotal[] {
  // A Map stores "key → value" pairs: category → total in cents
  const totals = new Map<string, number>()

  for (const transaction of transactions) {
    if (transaction.type !== 'expense' || transaction.currency !== currency) {
      continue
    }
    const current = totals.get(transaction.category) ?? 0
    totals.set(transaction.category, current + transaction.amount)
  }

  return [...totals]
    .map(([category, amount]) => ({ category, amount }))
    .toSorted((a, b) => b.amount - a.amount)
}

// Income and expenses per month in one currency, oldest first (time goes left to right)
export function getMonthlyTotals(transactions: Transaction[], currency: Currency): MonthTotal[] {
  return getMonths(transactions)
    .toReversed()
    .map((month) => {
      const inMonth = transactions.filter((transaction) => transaction.date.startsWith(month))
      const { income, expenses } = calculateSummary(inMonth, currency)
      return { month, income, expenses }
    })
}
