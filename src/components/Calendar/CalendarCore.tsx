import { FC, memo, useCallback, useContext, useRef } from 'react'
import { throttle } from 'lodash-es'
import type { PanelCorePropsType, PanelDayBlockPropsType } from './types'
import { getMonthDay, parserDate } from './core'
import styles from '../../styles/panel.module.scss'
import { WEEK_DAY } from './constants'
import { DateContext } from './context'

const DayBlock = memo(({ value, date, index, click, updateMonth }: PanelDayBlockPropsType) => {
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
  const isPrev = +currentMonth > +month || +currentYear > +year
  const isNext = +currentMonth < +month || +currentYear < +year
  // 计算今天
  const isToday = +year === +state.year && +month === +state.month && +day === +state.day
  // 是否展示剩下的日期（超过本月，并且换行）
  const isHiddenNextDay = index && +currentMonth < +month && index > 34 // map index 从0开始

  // 鼠标/手指移动，不响应mouseup事件
  const isMouseMoved = useRef(false)
  // 鼠标按下，响应mousemove事件
  const isMouseDown = useRef(false)
  const handleMouseUp = () => {
    isMouseDown.current = false
    if(!isMouseMoved.current) {
      // 如果当前点击的为 disable 态，切换当前月
      if(typeof updateMonth !== 'undefined' && disable) {
        updateMonth({ type: isNext ? 'next' : 'prev' })
      }
      update({year, month, day})
    }
    isMouseMoved.current = false
  }

  const handleMouseMove = throttle(() => {
    if(isMouseDown.current) {
      isMouseMoved.current = true
    }
  }, 50)
  const handleMouseDown = () => {
    isMouseDown.current = true
  }

  return <>
    {
      isHiddenNextDay ?
        null :
        <div
          className={`${styles['no-select']} ${styles['day-block']} ${disable ? styles.disable : ''} ${isToday ? styles.active : '' }`}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          onMouseDown={handleMouseDown}
        >
          {day}
        </div>
    }
  </>
})

export const CalendarPanel: FC<PanelCorePropsType> = (props) => {
  const { year, month, nextMonth, prevMonth } = props
  const monthDay = getMonthDay({ year, month })
  
  const dayBlockDateProps = {
    currentYear: year,
    currentMonth: month
  }

  const updateMonth = (params: {
    type: 'next' | 'prev',
    month: number
  }) => {
    if(params.type === 'next' && typeof nextMonth !== 'undefined') {
      nextMonth()
    } else if(params.type === 'prev' && typeof prevMonth !== 'undefined') {
      prevMonth()
    }
  }

  const {
    state,
    update
  } = useContext(DateContext)

  return (
    <div className={styles.main}>
      {WEEK_DAY.map(v => <div key={v} className={`${styles['no-select']} ${styles.week}`}>{v}</div>)}
      {monthDay.map((v, index) => <DayBlock key={v.toLocaleDateString()} value={v} date={dayBlockDateProps} index={index} click={update} updateMonth={updateMonth} />)}
    </div>
  )
}

export default CalendarPanel
