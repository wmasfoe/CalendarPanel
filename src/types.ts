export type PanelPropsType = {
  value?: Date
}

export type ParserDateReturnValue = {
  year: string;
  month: string;
  day: string;
}

export type PanelDayBlockPropsType = {
  value: Date;
  currentYear: string | number;
  currentMonth: string | number;
  date?: {
    currentYear: string | number;
    currentMonth: string | number;
    currentDay: string | number;
  }
}
