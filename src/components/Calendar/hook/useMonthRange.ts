import { useEffect, useState } from 'react';
import { _parserDate } from '../core'

export const useMonthRange = (params?: {year: number; month: number}) => {
  const { year, month } = params || {}
  const { year: parseYear, month: parseMonth } = _parserDate(new Date())
  const resDate = {
    year: year || parseYear,
    month: month || parseMonth + 1, // parse 需要+1
  }

  const [res, setRes] = useState<{ year: number; month: number}[]>([
    {
      year: resDate.month === 1 ? resDate.year - 1 : resDate.year,
      month: resDate.month === 1 ? 12 : resDate.month - 1
    },
    {
      year: resDate.year,
      month: resDate.month
    },
    {
      year: resDate.month === 12 ? resDate.year + 1 : resDate.year,
      month: resDate.month === 12 ? 1 : resDate.month + 1
    }
  ])

  // useEffect(() => {
  //   setRes()
  // }, [])

  return res
}
