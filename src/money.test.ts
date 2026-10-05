import { describe, expect, test } from 'vitest'
import { centsToInputValue, formatMoney, formatMoneyCompact, parseMoneyToCents } from './money'

describe('parseMoneyToCents', () => {
  test.each([
    ['12.50', 1250],
    ['12.5', 1250],
    ['12', 1200],
    ['0.01', 1],
    ['2500', 250000],
  ])('parses %s as %i cents', (input, expected) => {
    expect(parseMoneyToCents(input)).toBe(expected)
  })

  test('accepts a comma as the decimal separator', () => {
    expect(parseMoneyToCents('12,50')).toBe(1250)
  })

  test('ignores spaces around the number', () => {
    expect(parseMoneyToCents(' 7.05 ')).toBe(705)
  })

  test('has no floating point error (1.15 * 100 would give 114.99999999999999)', () => {
    expect(parseMoneyToCents('1.15')).toBe(115)
  })

  test.each(['0', '0.00', '-5', 'abc', '1.234', '', '12.', '.5'])(
    'rejects invalid input %j',
    (input) => {
      expect(parseMoneyToCents(input)).toBeNull()
    },
  )
})

describe('centsToInputValue', () => {
  test.each([
    [1250, '12.50'],
    [5, '0.05'],
    [100, '1.00'],
    [250000, '2500.00'],
  ])('formats %i cents as %s', (cents, expected) => {
    expect(centsToInputValue(cents)).toBe(expected)
  })

  test('round trip cents → text → cents keeps every amount up to €1000', () => {
    for (let cents = 1; cents <= 100000; cents++) {
      expect(parseMoneyToCents(centsToInputValue(cents))).toBe(cents)
    }
  })
})

describe('formatMoney', () => {
  test('formats cents as euros', () => {
    expect(formatMoney(250000, 'EUR')).toBe('€2,500.00')
    expect(formatMoney(1250, 'EUR')).toBe('€12.50')
  })

  test('formats a negative amount', () => {
    expect(formatMoney(-95000, 'EUR')).toBe('-€950.00')
  })

  test('short form for chart axes', () => {
    expect(formatMoneyCompact(250000, 'EUR')).toBe('€2.5K')
  })
})
