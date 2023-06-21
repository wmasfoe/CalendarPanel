import { FC } from 'react'
import type { PanelPropsType, PanelDayBlockPropsType } from './types'
import { getMonthDay, calendarTitle, parserDate } from './core'
import styles from './styles/panel.module.scss'
import { WEEK_DAY } from './constants'

function DayBlock({ value, currentMonth, currentYear }: PanelDayBlockPropsType) {
  const day = value.getDate()
  // 当前日期块的年份、月份
  const { year, month } = parserDate(value)
  // 当前时间面板的年份、月份
  const disable = +currentYear !== +year || +currentMonth !== +month
  return (
    <div className={`${styles['no-select']} ${styles['day-block']} ${disable ? styles.disable : ''}`}>
      {day}
    </div>
  )
}

export const CalendarPanel: FC<PanelPropsType> = (props) => {
  const { value = new Date() } = props

  const { year, month, realMonth } = calendarTitle(value)

  const monthDay = getMonthDay({year: '2023', month: '6'})

  return (
    <div className={styles.panel}>
      <div className={styles.title}>
        <span className={styles.month}>{month}</span>
        <span className={styles.year}>{year}</span>
      </div>
      <div className={styles.main}>
        {WEEK_DAY.map(v => <div key={v} className={`${styles['no-select']} ${styles.week}`}>{v}</div>)}
        {monthDay.map(v => <DayBlock key={v} value={v} currentMonth={6} currentYear={year} />)}
      </div>
    </div>
  )
}

export default CalendarPanel
