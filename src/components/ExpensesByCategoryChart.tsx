import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import type { CategoryTotal } from '../chartData'
import { formatMoney, formatMoneyCompact } from '../money'
import type { Currency } from '../types'

interface ExpensesByCategoryChartProps {
  data: CategoryTotal[]
  currency: Currency
}

const ROW_HEIGHT = 36
const AXIS_HEIGHT = 30

function ExpensesByCategoryChart({ data, currency }: ExpensesByCategoryChartProps) {
  if (data.length === 0) {
    return <p className="empty">No expenses for this period.</p>
  }

  return (
    // Height grows with the number of categories, including room for the axis
    <ResponsiveContainer width="100%" height={data.length * ROW_HEIGHT + AXIS_HEIGHT}>
      <BarChart data={data} layout="vertical" margin={{ top: 0, right: 80, bottom: 0, left: 0 }}>
        <CartesianGrid horizontal={false} stroke="var(--chart-grid)" />
        <XAxis
          type="number"
          tickFormatter={(value: number) => formatMoneyCompact(value, currency)}
          stroke="var(--chart-axis)"
          tickLine={false}
        />
        <YAxis
          type="category"
          dataKey="category"
          width={100}
          stroke="var(--chart-axis)"
          tickLine={false}
        />
        <Tooltip
          cursor={{ fill: 'var(--chart-grid)' }}
          formatter={(value) => formatMoney(Number(value), currency)}
        />
        <Bar
          dataKey="amount"
          name="Expenses"
          fill="var(--chart-expense)"
          radius={[0, 4, 4, 0]}
          barSize={16}
        >
          <LabelList
            dataKey="amount"
            position="right"
            className="chart-label"
            formatter={(value) => formatMoney(Number(value), currency)}
          />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}

export default ExpensesByCategoryChart
