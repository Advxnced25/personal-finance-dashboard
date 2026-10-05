import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import type { MonthTotal } from '../chartData'
import { formatMonth } from '../filters'
import { formatMoney, formatMoneyCompact } from '../money'
import type { Currency } from '../types'

// Keep legend and tooltip in the same order as the bars (Recharts sorts alphabetically by default)
const seriesOrder = (item: { dataKey?: unknown }) => (item.dataKey === 'income' ? 0 : 1)

interface MonthlyChartProps {
  data: MonthTotal[]
  currency: Currency
}

function MonthlyChart({ data, currency }: MonthlyChartProps) {
  if (data.length === 0) {
    return <p className="empty">No transactions yet.</p>
  }

  return (
    <ResponsiveContainer width="100%" height={280}>
      <BarChart data={data} barGap={2} margin={{ top: 8, right: 8, bottom: 0, left: 0 }}>
        <CartesianGrid vertical={false} stroke="var(--chart-grid)" />
        <XAxis
          dataKey="month"
          tickFormatter={(month: string) => formatMonth(month, 'short')}
          stroke="var(--chart-axis)"
          tickLine={false}
        />
        <YAxis
          tickFormatter={(value: number) => formatMoneyCompact(value, currency)}
          stroke="var(--chart-axis)"
          tickLine={false}
          axisLine={false}
          width={64}
          tickCount={6}
        />
        <Tooltip
          cursor={{ fill: 'var(--chart-grid)' }}
          labelFormatter={(month) => formatMonth(String(month))}
          formatter={(value) => formatMoney(Number(value), currency)}
          itemSorter={seriesOrder}
        />
        <Legend itemSorter={seriesOrder} />
        <Bar
          dataKey="income"
          name="Income"
          fill="var(--chart-income)"
          radius={[4, 4, 0, 0]}
          maxBarSize={32}
        />
        <Bar
          dataKey="expenses"
          name="Expenses"
          fill="var(--chart-expense)"
          radius={[4, 4, 0, 0]}
          maxBarSize={32}
        />
      </BarChart>
    </ResponsiveContainer>
  )
}

export default MonthlyChart
