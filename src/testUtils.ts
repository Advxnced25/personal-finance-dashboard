import type { Transaction } from './types'

let nextId = 1

// Creates a transaction for tests: only the fields that matter need to be given
export function makeTransaction(fields: Partial<Transaction> = {}): Transaction {
  return {
    id: String(nextId++),
    type: 'expense',
    amount: 1000,
    currency: 'EUR',
    category: 'Other',
    date: '2026-10-01',
    ...fields,
  }
}
