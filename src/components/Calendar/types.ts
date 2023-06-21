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
  date: {
    currentYear: string | number;
    currentMonth: string | number;
    currentDay: string | number;
  };
  index?: number;
}
