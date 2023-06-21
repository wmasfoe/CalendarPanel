import { FC } from 'react'
import type { PanelPropsType, PanelDayBlockPropsType } from './types'
import { getMonthDay, calendarTitle, parserDate } from './core'
import styles from './styles/panel.module.scss'
import { WEEK_DAY } from './constants'

function DayBlock({ value, date }: PanelDayBlockPropsType) {
  const day = value.getDate()
  const { currentYear, currentMonth, currentDay } = date || {}
  // 当前日期块的年份、月份
  const { year, month } = parserDate(value)
  // 当前时间面板的年份、月份
  const disable = +currentYear !== +year || +currentMonth !== +month
  // 计算今天
  const isToday = +currentMonth === +month && +currentDay === +day
  return (
    <div className={`${styles['no-select']} ${styles['day-block']} ${disable ? styles.disable : ''} ${isToday ? styles.active : '' }`}>
      {day}
    </div>
  )
}

export const CalendarPanel: FC<PanelPropsType> = (props) => {
  const { value = new Date() } = props

  const { year, month } = calendarTitle(value)
  const { year: numberYear, month: numberMonth, day } = parserDate(value)

  const monthDay = getMonthDay({year: numberYear, month: numberMonth})

  const dayBlockDateProps = {
    currentYear: numberYear,
    currentMonth: numberMonth,
    currentDay: day
  }

  return (
    <div className={styles.panel}>
      <div className={styles.title}>
        <span className={styles.month}>{month}</span>
        <span className={styles.year}>{year}</span>
      </div>
      <div className={styles.main}>
        {WEEK_DAY.map(v => <div key={v} className={`${styles['no-select']} ${styles.week}`}>{v}</div>)}
        {monthDay.map(v => <DayBlock key={v} value={v} date={dayBlockDateProps} />)}
      </div>
    </div>
  )
}

export default CalendarPanel
