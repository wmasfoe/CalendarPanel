export type PanelPropsType = {
  value?: Date
}

export type PanelCorePropsType = {
  year: string|number;
  month: string|number;
  nextMonth?: (...args: any[]) => any;
  prevMonth?: (...args: any[]) => any;
}

export type ParserDateReturnValue = {
  year: string;
  month: string;
  day: string;
}

export type PanelDayBlockPropsType = {
  value: Date;
  date: {
    currentYear: string | number;
    currentMonth: string | number;
    currentDay?: string | number;
  };
  index?: number;
  click?: (params: {year: string|number; month: string|number; day: string|number}) => void;
  updateMonth?: (args: {type: 'next' | 'prev', month?: number}) => void;
}
