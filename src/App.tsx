import TransactionList from './components/TransactionList'
import { mockTransactions } from './mockTransactions'

function App() {
  return (
    <main>
      <h1>Personal Finance Dashboard</h1>
      <p>Track your income and expenses in one place.</p>

      <h2>Transactions</h2>
      <TransactionList transactions={mockTransactions} />
    </main>
  )
}

export default App
