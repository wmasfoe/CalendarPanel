import { FC, memo } from 'react'
import type { PanelPropsType, PanelDayBlockPropsType } from './types'
import { getMonthDay, parserDate } from './core'
import styles from '../../styles/panel.module.scss'
import { WEEK_DAY } from './constants'
import { useTitle, useCurrentDate } from './hook'

const DayBlock = memo(({ value, date, index, click }: PanelDayBlockPropsType) => {
  const day = value.getDate()
  const { currentYear, currentMonth, currentDay } = date || {}
  // 当前日期块的年份、月份
  const { year, month } = parserDate(value)
  // 当前时间面板的年份、月份
  const disable = +currentYear !== +year || +currentMonth !== +month
  // 计算今天
  const isToday = +currentMonth === +month && +currentDay === +day
  // 是否展示剩下的日期（超过本月，并且换行）
  const isHiddenNextDay = index && +currentMonth < +month && index > 34 // map index 从0开始
  return <>
    {
      isHiddenNextDay ?
        null :
        <div
          className={`${styles['no-select']} ${styles['day-block']} ${disable ? styles.disable : ''} ${isToday ? styles.active : '' }`}
          onClick={() => click?.({year: currentYear, month: currentMonth, day})}
        >
          {day}
        </div>
    }
  </>
})

export const CalendarPanel: FC<PanelPropsType> = (props) => {
  const { value = new Date() } = props

  const { year: parseYear, month: parseMonth, day } = parserDate(value)

  const { year, month } = useTitle({ year: Number(parseYear), month: Number(parseMonth) })

  const monthDay = getMonthDay({year: parseYear, month: parseMonth})

  const { handleChangeDate, dayBlockDateProps } = useCurrentDate(value)

  return (
    <div className={styles.panel}>
      <div className={styles.title}>
        <span className={styles.month}>{month}</span>
        <span className={styles.year}>{year}</span>
      </div>
      <div className={styles.main}>
        {WEEK_DAY.map(v => <div key={v} className={`${styles['no-select']} ${styles.week}`}>{v}</div>)}
        {monthDay.map((v, index) => <DayBlock key={v.toLocaleDateString()} value={v} date={dayBlockDateProps} index={index} click={handleChangeDate} />)}
      </div>
    </div>
  )
}

export default CalendarPanel
