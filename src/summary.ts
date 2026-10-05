import type { Currency, Transaction } from './types'

export interface Summary {
  income: number
  expenses: number
  balance: number
}

// Totals in cents for one currency. Amounts in different currencies
// must never be added together, so other currencies are skipped.
export function calculateSummary(transactions: Transaction[], currency: Currency): Summary {
  let income = 0
  let expenses = 0

  for (const transaction of transactions) {
    if (transaction.currency !== currency) {
      continue
    }

    if (transaction.type === 'income') {
      income += transaction.amount
    } else {
      expenses += transaction.amount
    }
  }

  return { income, expenses, balance: income - expenses }
}
