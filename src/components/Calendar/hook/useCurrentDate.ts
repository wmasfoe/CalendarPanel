import { useState } from 'react'
import { parserDate } from '../core'

export function useCurrentDate(initDate: Date) {

  const { year: parseYear, month: parseMonth, day } = parserDate(initDate)

  const [dateState, setDateState] = useState({
    year: parseYear,
    month: parseMonth,
    day: day
  })

  const dayBlockDateProps = {
    currentYear: dateState.year,
    currentMonth: dateState.month,
    currentDay: dateState.day
  }

  const handleChangeDate = (params: any) => {
    setDateState(params)
  }

  return {
    handleChangeDate,
    dayBlockDateProps
  }
}