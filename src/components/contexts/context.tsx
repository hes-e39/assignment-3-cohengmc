import { createContext } from 'react';

export const TimerContext = createContext({
    isRunning: false,
    timerComplete: false,
    setTimerComplete: (timerComplete: boolean) => {
        timerComplete;
    },
    hardReset: false,
});

export default TimerContext;
