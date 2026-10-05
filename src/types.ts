// Supported currencies. To add a new one later, extend the list: 'EUR' | 'USD'
export type Currency = 'EUR'

export type TransactionType = 'income' | 'expense'

export interface Transaction {
  id: string
  type: TransactionType
  // Amount in cents (whole number) to avoid rounding errors: €12.50 → 1250
  amount: number
  currency: Currency
  category: string
  // Date in ISO format: 'YYYY-MM-DD'
  date: string
  note?: string
}
