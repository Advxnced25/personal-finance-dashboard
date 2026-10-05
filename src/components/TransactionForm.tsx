import { useState } from 'react'
import type { SubmitEvent } from 'react'
import type { Transaction, TransactionType } from '../types'
import { BASE_CURRENCY, parseMoneyToCents } from '../money'

const CATEGORIES = [
  'Salary',
  'Freelance',
  'Rent',
  'Groceries',
  'Transport',
  'Entertainment',
  'Health',
  'Other',
]

// Today's date in the user's local timezone, as 'YYYY-MM-DD'
function getToday(): string {
  const now = new Date()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const day = String(now.getDate()).padStart(2, '0')
  return `${now.getFullYear()}-${month}-${day}`
}

interface TransactionFormProps {
  onAdd: (transaction: Transaction) => void
}

function TransactionForm({ onAdd }: TransactionFormProps) {
  const [type, setType] = useState<TransactionType>('expense')
  const [amount, setAmount] = useState('')
  const [category, setCategory] = useState(CATEGORIES[0])
  const [date, setDate] = useState(getToday())
  const [note, setNote] = useState('')
  const [error, setError] = useState('')

  function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    // Stop the browser from reloading the page
    event.preventDefault()

    const cents = parseMoneyToCents(amount)
    if (cents === null) {
      setError('Enter a positive amount, e.g. 12.50')
      return
    }

    onAdd({
      id: crypto.randomUUID(),
      type,
      amount: cents,
      currency: BASE_CURRENCY,
      category,
      date,
      note: note.trim() || undefined,
    })

    // Clear the fields for the next entry
    setAmount('')
    setNote('')
    setError('')
  }

  return (
    <form className="transaction-form" onSubmit={handleSubmit}>
      <label>
        Type
        <select
          value={type}
          onChange={(event) => setType(event.target.value as TransactionType)}
        >
          <option value="expense">Expense</option>
          <option value="income">Income</option>
        </select>
      </label>

      <label>
        Amount (€)
        <input
          type="text"
          inputMode="decimal"
          placeholder="0.00"
          value={amount}
          onChange={(event) => setAmount(event.target.value)}
        />
      </label>

      <label>
        Category
        <select value={category} onChange={(event) => setCategory(event.target.value)}>
          {CATEGORIES.map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>
      </label>

      <label>
        Date
        <input
          type="date"
          required
          value={date}
          onChange={(event) => setDate(event.target.value)}
        />
      </label>

      <label>
        Note
        <input
          type="text"
          placeholder="Optional"
          value={note}
          onChange={(event) => setNote(event.target.value)}
        />
      </label>

      <button type="submit">Add</button>

      {error && <p className="form-error">{error}</p>}
    </form>
  )
}

export default TransactionForm
