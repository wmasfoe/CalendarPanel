export const useMonthDay = (date: {year: any; month: any}) => {
  const firstDayOfMonth = new Date(date.year, Number(date.month) - 1, 1);
  // 获取当月第一天对应的是星期几
  const week = firstDayOfMonth.getDay();
  // 获取42天中的第一天对应的Date对象，即每月1号对应的时间减去week天
  const startDay = firstDayOfMonth as unknown as number - week * 60 * 60 * 1000 * 24; 
  const days = [];
  for (let i= 0; i< 42; i++) { // 循环出42天
    days.push(new Date(startDay + i * 60 * 60 * 1000 * 24));
  }
  return days;
}
