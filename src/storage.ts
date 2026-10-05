import type { Transaction } from './types'

// The version in the key lets us change the data format later without breaking old data
const STORAGE_KEY = 'pfd-transactions-v1'

// Returns saved transactions, or null if nothing is saved (or the data can't be read)
export function loadTransactions(): Transaction[] | null {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved === null) {
      return null
    }

    const data = JSON.parse(saved)
    return Array.isArray(data) ? data : null
  } catch {
    return null
  }
}

export function saveTransactions(transactions: Transaction[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions))
  } catch {
    // Storage is full or blocked by the browser — the app keeps working without saving
  }
}
