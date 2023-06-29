import { FC, useCallback, useState, Suspense, lazy, useRef } from 'react'

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

  const [monthIndex, setMonthIndex] = useState(1)
  const { year, month } = useTitle({ year: Number(initMonths[monthIndex].year), month: Number(initMonths[monthIndex].month) })

  const updateState = useCallback((args?: any) => {
    setDateState(args)
  }, [])

  // TODO InstanceType<typeof Slider> 报错 Slider 不是抽象类，有待排查
  const SliderInstance = useRef<any>()

  const handlePrev = () => {
    SliderInstance.current?.slickPrev?.()
  }
  const handleNext = () => {
    SliderInstance.current?.slickNext?.()
  }

  const onMonthChange = (_: number, index: number) => {
    if(monthIndex === index) return
    setMonthIndex(index)
  }

  return (
    <div className={styles.panel}>
      <div>{dateState.year} - {dateState.month} - {dateState.day}</div>
      <div className={styles.title}>
        <span className={styles.month}>{month}</span>
        <span className={styles.year}>{year}</span>
      </div>
      <DateContext.Provider value={{
        state: dateState,
        update: updateState
      }}>
        <Suspense fallback={<div className={styles.loading}>loading...</div>}>
          <Slider ref={SliderInstance} adaptiveHeight={true} dots={false} arrows={false} touchThreshold={7} infinite={false} initialSlide={1} lazyLoad="progressive" beforeChange={onMonthChange}>
            {
              // TODO 到达临界值直接改变 initMonths 就可以，状态会保存
              initMonths.map(v =>
                <CalendarCore
                  key={v.month}
                  month={v.month}
                  year={v.year}
                  nextMonth={handleNext}
                  prevMonth={handlePrev}
                />
              )
            }
          </Slider>
        </Suspense>
      </DateContext.Provider>
    </div>
  )
}

export default CalendarPanel
