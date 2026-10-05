import { useState } from 'react'
import SummaryCards from './components/SummaryCards'
import TransactionForm from './components/TransactionForm'
import TransactionList from './components/TransactionList'
import { mockTransactions } from './mockTransactions'
import { BASE_CURRENCY } from './money'
import { calculateSummary } from './summary'
import type { Transaction } from './types'

function App() {
  const [transactions, setTransactions] = useState<Transaction[]>(mockTransactions)

  // Derived data: recalculated from transactions on every render, never stored in state
  const summary = calculateSummary(transactions, BASE_CURRENCY)

  function handleAdd(transaction: Transaction) {
    // Create a new array (never change state directly): newest first
    setTransactions([transaction, ...transactions])
  }

  return (
    <main>
      <h1>Personal Finance Dashboard</h1>
      <p>Track your income and expenses in one place.</p>

      <SummaryCards summary={summary} currency={BASE_CURRENCY} />

      <h2>Add transaction</h2>
      <TransactionForm onAdd={handleAdd} />

      <h2>Transactions</h2>
      <TransactionList transactions={transactions} />
    </main>
  )
}

export default App
