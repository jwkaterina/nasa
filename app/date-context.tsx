import { createContext } from "react";

interface DateContextProps {
    currentDate: string,
    setCurrentDate: (date: string) => void
}

export const DateContext = createContext<DateContextProps>({
    currentDate: '',
    setCurrentDate: () => { },
});