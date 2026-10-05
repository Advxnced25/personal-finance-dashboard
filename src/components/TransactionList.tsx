import type { Transaction } from '../types'
import { formatMoney } from '../money'

interface TransactionListProps {
  transactions: Transaction[]
}

function TransactionList({ transactions }: TransactionListProps) {
  return (
    <table className="transactions">
      <thead>
        <tr>
          <th>Date</th>
          <th>Category</th>
          <th>Note</th>
          <th className="amount">Amount</th>
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
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default TransactionList
