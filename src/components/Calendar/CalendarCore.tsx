import { FC, memo, useContext } from 'react'
import type { PanelCorePropsType, PanelDayBlockPropsType } from './types'
import { getMonthDay, parserDate } from './core'
import styles from '../../styles/panel.module.scss'
import { WEEK_DAY } from './constants'
import { DateContext } from './context'

const DayBlock = memo(({ value, date, index, click }: PanelDayBlockPropsType) => {
  const day = value.getDate()
  const { currentYear, currentMonth } = date || {}
  // 当前日期块的年份、月份
  const { year, month } = parserDate(value)

  const {
    state,
    update
  } = useContext(DateContext)

  // 当前时间面板的年份、月份
  const disable = +currentYear !== +year || +currentMonth !== +month
  // 计算今天
  const isToday = +year === +state.year && +month === +state.month && +day === +state.day
  // 是否展示剩下的日期（超过本月，并且换行）
  const isHiddenNextDay = index && +currentMonth < +month && index > 34 // map index 从0开始

  const handleClick = () => {
    // TODO 如果当前点击的为 disable 态，应该切换当前月
    update({year, month, day})
  }

  return <>
    {
      isHiddenNextDay ?
        null :
        <div
          className={`${styles['no-select']} ${styles['day-block']} ${disable ? styles.disable : ''} ${isToday ? styles.active : '' }`}
          onMouseUp={handleClick}
        >
          {day}
        </div>
    }
  </>
})

export const CalendarPanel: FC<PanelCorePropsType> = (props) => {
  const { year, month } = props
  const monthDay = getMonthDay({ year, month })
  
  const dayBlockDateProps = {
    currentYear: year,
    currentMonth: month
  }

  const {
    state,
    update
  } = useContext(DateContext)

  return (
    <div className={styles.main}>
      {WEEK_DAY.map(v => <div key={v} className={`${styles['no-select']} ${styles.week}`}>{v}</div>)}
      {monthDay.map((v, index) => <DayBlock key={v.toLocaleDateString()} value={v} date={dayBlockDateProps} index={index} click={update} />)}
    </div>
  )
}

export default CalendarPanel
