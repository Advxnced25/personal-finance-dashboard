import { useState } from 'react'
import TransactionForm from './components/TransactionForm'
import TransactionList from './components/TransactionList'
import { mockTransactions } from './mockTransactions'
import type { Transaction } from './types'

function App() {
  const [transactions, setTransactions] = useState<Transaction[]>(mockTransactions)

  function handleAdd(transaction: Transaction) {
    // Create a new array (never change state directly): newest first
    setTransactions([transaction, ...transactions])
  }

  return (
    <main>
      <h1>Personal Finance Dashboard</h1>
      <p>Track your income and expenses in one place.</p>

      <h2>Add transaction</h2>
      <TransactionForm onAdd={handleAdd} />

      <h2>Transactions</h2>
      <TransactionList transactions={transactions} />
    </main>
  )
}

export default App
