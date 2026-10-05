import type { Currency } from '../types'
import type { Summary } from '../summary'
import { formatMoney } from '../money'

interface SummaryCardsProps {
  summary: Summary
  currency: Currency
}

function SummaryCards({ summary, currency }: SummaryCardsProps) {
  return (
    <div className="summary-cards">
      <section className="card">
        <h3>Income</h3>
        <p className="card-value income">{formatMoney(summary.income, currency)}</p>
      </section>

      <section className="card">
        <h3>Expenses</h3>
        <p className="card-value expense">{formatMoney(summary.expenses, currency)}</p>
      </section>

      <section className="card">
        <h3>Balance</h3>
        <p className={`card-value ${summary.balance < 0 ? 'expense' : ''}`}>
          {formatMoney(summary.balance, currency)}
        </p>
      </section>
    </div>
  )
}

export default SummaryCards
