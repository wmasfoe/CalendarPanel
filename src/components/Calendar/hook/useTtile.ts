import { useEffect, useState } from 'react';
import { numMonth2ZhHansMap } from './../enums'
import { _parserDate } from './../core'

export type useTitleParams = {
  date?: Date;
  year?: number;
  month?: number;
}

export const useTitle = ({
  date,
  year,
  month
}: useTitleParams) => {

  // month 需要-1，JS内部日期从0开始;如果没有传date，可以穿 year month 手动生成 Date 对象
  const paramsDate = date || new Date(year as number, (month as number) - 1, 1);
  const [stateYear, setYear] = useState<number>()
  const [stateMonth, setMonth] = useState<number>()

  let { year: parseYear, month: parseMonth } = _parserDate(paramsDate)

  useEffect(() => {
    setYear(parseYear)
    setMonth(parseMonth + 1)
  }, [])

  return {
    // @ts-ignore
    month: numMonth2ZhHansMap[stateMonth],
    realMonth: stateMonth,
    year: stateYear
  }
}