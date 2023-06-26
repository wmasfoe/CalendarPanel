import { FC, useCallback, useState } from 'react'
import type { PanelPropsType } from './types'
import { parserDate, getMonths } from './core'
import styles from '../../styles/panel.module.scss'
import { useTitle } from './hook'

import CalendarCore from './CalendarCore';
import { DateContext } from './context'

export const CalendarPanel: FC<PanelPropsType> = (props) => {
  const { value = new Date() } = props

  const { year: parseYear, month: parseMonth, day } = parserDate(value)

  const initMonths = getMonths()

  const { year, month } = useTitle({ year: Number(parseYear), month: Number(parseMonth) })

  const [dateState, setDateState] = useState({
    year: parseYear,
    month: parseMonth,
    day: day
  })

  const updateState = useCallback((args: any) => {
    setDateState(args)
  }, [])

  return (
    <div className={styles.panel}>
      <div className={styles.title}>
        <span className={styles.month}>{month}</span>
        <span className={styles.year}>{year}</span>
      </div>
      <DateContext.Provider value={{
        state: dateState,
        update: updateState
      }}>
        {
          initMonths.map(v => <CalendarCore month={v.month} year={v.year} />)
        }
      </DateContext.Provider>
    </div>
  )
}

export default CalendarPanel
