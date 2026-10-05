import { CATEGORIES } from '../categories'
import { ALL, formatMonth } from '../filters'
import type { Filters } from '../filters'

interface TransactionFiltersProps {
  filters: Filters
  months: string[]
  onChange: (filters: Filters) => void
}

function TransactionFilters({ filters, months, onChange }: TransactionFiltersProps) {
  return (
    <div className="filters">
      <label>
        Month
        <select
          value={filters.month}
          onChange={(event) => onChange({ ...filters, month: event.target.value })}
        >
          <option value={ALL}>All months</option>
          {months.map((month) => (
            <option key={month} value={month}>
              {formatMonth(month)}
            </option>
          ))}
        </select>
      </label>

      <label>
        Category
        <select
          value={filters.category}
          onChange={(event) => onChange({ ...filters, category: event.target.value })}
        >
          <option value={ALL}>All categories</option>
          {CATEGORIES.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </label>
    </div>
  )
}

export default TransactionFilters
