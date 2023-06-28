import { FC, useCallback, useState, Suspense, lazy } from 'react'

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import type { PanelPropsType } from './types'
import { parserDate, getMonths } from './core'
import styles from '../../styles/panel.module.scss'
import { useTitle } from './hook'

import { DateContext } from './context'

const CalendarCore = lazy(() => import('./CalendarCore'))
const Slider = lazy(() => import('react-slick'))

export const CalendarPanel: FC<PanelPropsType> = (props) => {
  const { value = new Date() } = props

  const { year: parseYear, month: parseMonth, day } = parserDate(value)

  const initMonths = getMonths()

  const [dateState, setDateState] = useState({
    year: parseYear,
    month: parseMonth,
    day: day
  })

  const { year, month } = useTitle({ year: Number(dateState.year), month: Number(dateState.month) })

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
        <Suspense fallback={<div className={styles.loading}>loading...</div>}>
          <Slider dots={false} arrows={false} touchThreshold={7} infinite={false}>
            {
              initMonths.map(v => <CalendarCore key={v.month} month={v.month} year={v.year} />)
            }
          </Slider>
        </Suspense>
      </DateContext.Provider>
    </div>
  )
}

export default CalendarPanel
