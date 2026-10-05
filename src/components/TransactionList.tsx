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
    <div className="table-wrapper">
      <table className="transactions">
        <thead>
          <tr>
            <th className="date">Date</th>
            <th>Category</th>
            <th className="note">Note</th>
            <th className="amount">Amount</th>
            <th className="actions">Actions</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction.id}>
              <td className="date">{transaction.date}</td>
              <td>
                {transaction.category}
                {/* On phones the Date column is hidden, so the date is shown here instead */}
                <span className="mobile-only date">{transaction.date}</span>
              </td>
              <td className="note">{transaction.note}</td>
              <td className={`amount ${transaction.type}`}>
                {transaction.type === 'expense' ? '−' : '+'}
                {formatMoney(transaction.amount, transaction.currency)}
              </td>
              <td className="actions">
                <button
                  type="button"
                  className="button-small"
                  onClick={() => onEdit(transaction)}
                >
                  Edit
                </button>
                <button
                  type="button"
                  className="button-small button-danger"
                  onClick={() => onDelete(transaction.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default TransactionList
