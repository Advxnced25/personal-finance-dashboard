import { useEffect, useState } from 'react'
import SummaryCards from './components/SummaryCards'
import TransactionForm from './components/TransactionForm'
import TransactionList from './components/TransactionList'
import { mockTransactions } from './mockTransactions'
import { BASE_CURRENCY } from './money'
import { loadTransactions, saveTransactions } from './storage'
import { calculateSummary } from './summary'
import type { Transaction } from './types'

function App() {
  // Load saved data once on start; show sample data on the very first visit
  const [transactions, setTransactions] = useState<Transaction[]>(
    () => loadTransactions() ?? mockTransactions,
  )
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null)

  // Save to the browser every time the list changes
  useEffect(() => {
    saveTransactions(transactions)
  }, [transactions])

  // Derived data: recalculated from transactions on every render, never stored in state
  const summary = calculateSummary(transactions, BASE_CURRENCY)

  function handleSave(saved: Transaction) {
    if (editingTransaction) {
      // Replace the old version with the edited one, keep the rest as is
      setTransactions(
        transactions.map((transaction) => (transaction.id === saved.id ? saved : transaction)),
      )
      setEditingTransaction(null)
    } else {
      // Create a new array (never change state directly): newest first
      setTransactions([saved, ...transactions])
    }
  }

  function handleEdit(transaction: Transaction) {
    setEditingTransaction(transaction)
    // The form is above the list — scroll up so the user sees it
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function handleDelete(id: string) {
    if (!window.confirm('Delete this transaction? This cannot be undone.')) {
      return
    }
    // Keep every transaction except the one with this id
    setTransactions(transactions.filter((transaction) => transaction.id !== id))

    // Don't keep editing a transaction that no longer exists
    if (editingTransaction?.id === id) {
      setEditingTransaction(null)
    }
  }

  return (
    <main>
      <h1>Personal Finance Dashboard</h1>
      <p>Track your income and expenses in one place.</p>

      <SummaryCards summary={summary} currency={BASE_CURRENCY} />

      <h2>{editingTransaction ? 'Edit transaction' : 'Add transaction'}</h2>
      {/* A new key re-creates the form, so its fields are filled with fresh values */}
      <TransactionForm
        key={editingTransaction?.id ?? 'new'}
        editingTransaction={editingTransaction}
        onSave={handleSave}
        onCancel={() => setEditingTransaction(null)}
      />

      <h2>Transactions</h2>
      <TransactionList
        transactions={transactions}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </main>
  )
}

export default App
