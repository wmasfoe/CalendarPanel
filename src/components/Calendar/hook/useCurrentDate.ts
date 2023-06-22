import { useState } from 'react'
import { parserDate } from '../core'

type useCurrentDateParams = {
  initDate?: Date
  year?: string|number;
  month?: string|number;
  day?: string|number;
  initValue?: boolean;
}

export function useCurrentDate(params: useCurrentDateParams) {
  const { initDate, initValue = false, year, month } = params || {}
  const defaultDate = initDate ?
                      initDate :
                      year && month ?
                      new Date(Number(year), Number(month) -1) :
                      new Date()

  const { year: parseYear, month: parseMonth, day } = parserDate(defaultDate)

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
    dateState,
    ...dateState,
    handleChangeDate,
    dayBlockDateProps
  }
}