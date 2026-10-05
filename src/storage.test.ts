import { beforeEach, describe, expect, test, vi } from 'vitest'
import { loadTransactions, saveTransactions } from './storage'
import { makeTransaction } from './testUtils'

const KEY = 'pfd-transactions-v1'
let store: Map<string, string>

// Tests run outside the browser, so we replace localStorage with a simple fake.
// A fresh, empty fake before each test keeps tests independent from each other.
beforeEach(() => {
  store = new Map()
  vi.stubGlobal('localStorage', {
    getItem: (key: string) => store.get(key) ?? null,
    setItem: (key: string, value: string) => store.set(key, value),
  })
})

describe('storage', () => {
  test('returns null when nothing is saved', () => {
    expect(loadTransactions()).toBeNull()
  })

  test('loads exactly what was saved', () => {
    const transactions = [makeTransaction({ amount: 1250, note: 'Lunch' }), makeTransaction()]

    saveTransactions(transactions)

    expect(loadTransactions()).toEqual(transactions)
  })

  test('returns null for broken data instead of crashing', () => {
    store.set(KEY, '{broken json')
    expect(loadTransactions()).toBeNull()
  })

  test('returns null when the saved data is not a list', () => {
    store.set(KEY, '{"not":"a list"}')
    expect(loadTransactions()).toBeNull()
  })

  test('does not crash when the browser blocks storage', () => {
    vi.stubGlobal('localStorage', {
      getItem: () => {
        throw new Error('blocked')
      },
      setItem: () => {
        throw new Error('blocked')
      },
    })

    expect(() => saveTransactions([makeTransaction()])).not.toThrow()
    expect(loadTransactions()).toBeNull()
  })
})
