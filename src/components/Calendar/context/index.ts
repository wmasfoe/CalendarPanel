import { createContext } from 'react'
export const DateContext = createContext<{
  state: {
    year: string|number;
    month: string|number;
    day: string|number;
  };
  update: (args: {year: string|number; month: string|number; day: string|number;}) => void;
}>({
  state: {},
  update: (args: {year: string|number; month: string|number; day: string|number;}) => {}
})