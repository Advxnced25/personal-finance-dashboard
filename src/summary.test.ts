import { describe, expect, test } from 'vitest'
import { calculateSummary } from './summary'
import { makeTransaction } from './testUtils'

describe('calculateSummary', () => {
  test('adds up income and expenses and calculates the balance', () => {
    const transactions = [
      makeTransaction({ type: 'income', amount: 250000 }),
      makeTransaction({ type: 'expense', amount: 95000 }),
      makeTransaction({ type: 'expense', amount: 6745 }),
    ]

    expect(calculateSummary(transactions, 'EUR')).toEqual({
      income: 250000,
      expenses: 101745,
      balance: 148255,
    })
  })

  test('returns zeros for an empty list', () => {
    expect(calculateSummary([], 'EUR')).toEqual({ income: 0, expenses: 0, balance: 0 })
  })

  test('balance can be negative', () => {
    const transactions = [makeTransaction({ type: 'expense', amount: 95000 })]

    expect(calculateSummary(transactions, 'EUR').balance).toBe(-95000)
  })

  test('never adds amounts in a different currency', () => {
    const transactions = [
      makeTransaction({ type: 'income', amount: 1000 }),
      // 'USD' is not a supported currency yet, so we tell TypeScript to allow it here
      makeTransaction({ type: 'income', amount: 99999, currency: 'USD' as 'EUR' }),
    ]

    expect(calculateSummary(transactions, 'EUR').income).toBe(1000)
  })
})
