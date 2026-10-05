import { useEffect, useState } from 'react'
import { getExpensesByCategory, getMonthlyTotals } from './chartData'
import ExpensesByCategoryChart from './components/ExpensesByCategoryChart'
import MonthlyChart from './components/MonthlyChart'
import SummaryCards from './components/SummaryCards'
import TransactionFilters from './components/TransactionFilters'
import TransactionForm from './components/TransactionForm'
import TransactionList from './components/TransactionList'
import { ALL, filterTransactions, getMonths, sortByDateNewestFirst } from './filters'
import type { Filters } from './filters'
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
  const [filters, setFilters] = useState<Filters>({ month: ALL, category: ALL })

  // Save to the browser every time the list changes
  useEffect(() => {
    saveTransactions(transactions)
  }, [transactions])

  // Derived data: recalculated from state on every render, never stored in state
  const months = getMonths(transactions)
  // If the selected month has no transactions anymore (e.g. after a delete), show all months
  const activeFilters: Filters = months.includes(filters.month)
    ? filters
    : { ...filters, month: ALL }
  const visibleTransactions = sortByDateNewestFirst(
    filterTransactions(transactions, activeFilters),
  )
  const summary = calculateSummary(visibleTransactions, BASE_CURRENCY)

  // Each chart ignores the filter for the dimension it shows:
  // the category chart would shrink to one bar, the monthly chart to one month
  const categoryChartData = getExpensesByCategory(
    filterTransactions(transactions, { ...activeFilters, category: ALL }),
    BASE_CURRENCY,
  )
  const monthlyChartData = getMonthlyTotals(
    filterTransactions(transactions, { ...activeFilters, month: ALL }),
    BASE_CURRENCY,
  )

  function handleSave(saved: Transaction) {
    if (editingTransaction) {
      // Replace the old version with the edited one, keep the rest as is
      setTransactions(
        transactions.map((transaction) => (transaction.id === saved.id ? saved : transaction)),
      )
      setEditingTransaction(null)
    } else {
      // Create a new array (never change state directly). Adding to the front keeps
      // the latest entry on top among transactions with the same date.
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

      <TransactionFilters filters={activeFilters} months={months} onChange={setFilters} />
      <SummaryCards summary={summary} currency={BASE_CURRENCY} />

      <div className="charts">
        <section className="card">
          <h3>Expenses by category</h3>
          <ExpensesByCategoryChart data={categoryChartData} currency={BASE_CURRENCY} />
        </section>
        <section className="card">
          <h3>Income vs expenses by month</h3>
          <MonthlyChart data={monthlyChartData} currency={BASE_CURRENCY} />
        </section>
      </div>

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
        transactions={visibleTransactions}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </main>
  )
}

export default App
