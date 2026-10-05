import type { Transaction } from '../types'
import { formatMoney } from '../money'

interface TransactionListProps {
  transactions: Transaction[]
  onEdit: (transaction: Transaction) => void
  onDelete: (id: string) => void
}

function TransactionList({ transactions, onEdit, onDelete }: TransactionListProps) {
  if (transactions.length === 0) {
    return <p className="empty">No transactions found.</p>
  }

  return (
    <table className="transactions">
      <thead>
        <tr>
          <th>Date</th>
          <th>Category</th>
          <th>Note</th>
          <th className="amount">Amount</th>
          <th className="actions">Actions</th>
        </tr>
      </thead>
      <tbody>
        {transactions.map((transaction) => (
          <tr key={transaction.id}>
            <td>{transaction.date}</td>
            <td>{transaction.category}</td>
            <td>{transaction.note}</td>
            <td className={`amount ${transaction.type}`}>
              {transaction.type === 'expense' ? '−' : '+'}
              {formatMoney(transaction.amount, transaction.currency)}
            </td>
            <td className="actions">
              <button type="button" onClick={() => onEdit(transaction)}>
                Edit
              </button>
              <button type="button" onClick={() => onDelete(transaction.id)}>
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default TransactionList
