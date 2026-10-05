import { describe, expect, test } from 'vitest'
import { getExpensesByCategory, getMonthlyTotals } from './chartData'
import { makeTransaction } from './testUtils'

const transactions = [
  makeTransaction({ type: 'income', amount: 250000, category: 'Salary', date: '2026-10-01' }),
  makeTransaction({ amount: 95000, category: 'Rent', date: '2026-10-02' }),
  makeTransaction({ amount: 6745, category: 'Groceries', date: '2026-10-03' }),
  makeTransaction({ amount: 3255, category: 'Groceries', date: '2026-10-10' }),
  makeTransaction({ amount: 1250, category: 'Transport', date: '2026-10-04' }),
  makeTransaction({ amount: 95000, category: 'Rent', date: '2026-09-02' }),
  makeTransaction({ type: 'income', amount: 40000, category: 'Freelance', date: '2026-09-20' }),
  // A different currency must never be mixed into the totals
  makeTransaction({ amount: 99999, category: 'Rent', date: '2026-09-05', currency: 'USD' as 'EUR' }),
]

describe('getExpensesByCategory', () => {
  test('sums expenses per category, biggest first, ignoring income and other currencies', () => {
    expect(getExpensesByCategory(transactions, 'EUR')).toEqual([
      { category: 'Rent', amount: 190000 },
      { category: 'Groceries', amount: 10000 },
      { category: 'Transport', amount: 1250 },
    ])
  })

  test('returns an empty list when there are no expenses', () => {
    expect(getExpensesByCategory([transactions[0]], 'EUR')).toEqual([])
  })
})

describe('getMonthlyTotals', () => {
  test('returns income and expenses per month, oldest first', () => {
    expect(getMonthlyTotals(transactions, 'EUR')).toEqual([
      { month: '2026-09', income: 40000, expenses: 95000 },
      { month: '2026-10', income: 250000, expenses: 106250 },
    ])
  })

  test('returns an empty list when there are no transactions', () => {
    expect(getMonthlyTotals([], 'EUR')).toEqual([])
  })
})
