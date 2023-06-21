import type { ParserDateReturnValue } from './types'
import { numMonth2ZhHansMap } from './enums'

function _parserDate(date: Date) {
  const year = date.getFullYear();
  let month = date.getMonth();
  let day = date.getDate();
  return {
    year,
    month,
    day,
  }
}

/**
 * Returns an object containing the year, month, and day as strings of the provided Date object.
 *
 * @param {Date} date - the Date object to be parsed
 * @return {ParserDateReturnValue} an object with year, month, and day as strings
 */
export function parserDate(date: Date): ParserDateReturnValue {
  let { year, month, day } = _parserDate(date);

  month = month + 1;

  if (+month < 10) {
    (month as unknown as string) = `0${month}`;
  }
  if (+day < 10) {
    (day as unknown as string) = `0${day}`
  }

  return {
    year: year + '',
    month: month + '',
    day: day + '',
  }
}

export const calendarTitle = (date: Date) => {
  let { year, month } = _parserDate(date)

  month = month + 1;

  return {
    // @ts-ignore
    month: numMonth2ZhHansMap[month],
    realMonth: month,
    year
  }
}

// 获取当前月的日期
export const getMonthDay = (date: {year: any; month: any}) => {
  const firstDayOfMonth = new Date(date.year, Number(date.month) - 1, 1);
  // 获取当月第一天对应的是星期几
  const week = firstDayOfMonth.getDay();
  // 获取42天中的第一天对应的Date对象，即每月1号对应的时间减去week天
  const startDay = firstDayOfMonth - week * 60 * 60 * 1000 * 24; 
  const days = [];
  for (let i= 0; i< 42; i++) { // 循环出42天
    days.push(new Date(startDay + i * 60 * 60 * 1000 * 24));
  }
  return days;
}
