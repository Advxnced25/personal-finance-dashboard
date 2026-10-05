import { describe, expect, test } from 'vitest'
import { ALL, filterTransactions, formatMonth, getMonths, sortByDateNewestFirst } from './filters'
import { makeTransaction } from './testUtils'

// 'c' and 'b' share a date; 'c' comes first in the list because it was added later
const a = makeTransaction({ id: 'a', date: '2026-09-15', category: 'Rent' })
const c = makeTransaction({ id: 'c', date: '2026-10-03', category: 'Groceries' })
const b = makeTransaction({ id: 'b', date: '2026-10-03', category: 'Rent' })
const d = makeTransaction({ id: 'd', date: '2025-12-31', category: 'Groceries' })
const transactions = [a, c, b, d]

const ids = (list: { id: string }[]) => list.map((transaction) => transaction.id)

describe('sortByDateNewestFirst', () => {
  test('puts the newest date first and keeps the order of equal dates', () => {
    expect(ids(sortByDateNewestFirst(transactions))).toEqual(['c', 'b', 'a', 'd'])
  })

  test('does not change the original list', () => {
    sortByDateNewestFirst(transactions)
    expect(ids(transactions)).toEqual(['a', 'c', 'b', 'd'])
  })
})

describe('getMonths', () => {
  test('returns each month once, newest first', () => {
    expect(getMonths(transactions)).toEqual(['2026-10', '2026-09', '2025-12'])
  })

  test('returns an empty list when there are no transactions', () => {
    expect(getMonths([])).toEqual([])
  })
})

describe('filterTransactions', () => {
  test('ALL keeps everything', () => {
    expect(ids(filterTransactions(transactions, { month: ALL, category: ALL }))).toEqual([
      'a',
      'c',
      'b',
      'd',
    ])
  })

  test('filters by month', () => {
    expect(ids(filterTransactions(transactions, { month: '2026-10', category: ALL }))).toEqual([
      'c',
      'b',
    ])
  })

  test('filters by category', () => {
    expect(
      ids(filterTransactions(transactions, { month: ALL, category: 'Groceries' })),
    ).toEqual(['c', 'd'])
  })

  test('combines month and category', () => {
    expect(
      ids(filterTransactions(transactions, { month: '2026-10', category: 'Rent' })),
    ).toEqual(['b'])
  })

  test('returns an empty list when nothing matches', () => {
    expect(filterTransactions(transactions, { month: '2026-09', category: 'Groceries' })).toEqual(
      [],
    )
  })
})

describe('formatMonth', () => {
  test('long and short month names', () => {
    expect(formatMonth('2026-10')).toBe('October 2026')
    expect(formatMonth('2025-01')).toBe('January 2025')
    expect(formatMonth('2026-10', 'short')).toBe('Oct 2026')
  })
})
