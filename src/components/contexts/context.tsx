import { createContext } from 'react';

export const TimerContext = createContext({
    isRunning: false,
    timerComplete: false,
    setTimerComplete: (timerComplete: boolean) => {
        timerComplete;
    },
    hardReset: false,
});

interface TimerData {
    type: string;
    time: number;
    rounds: number;
    work: number;
    rest: number;
}

export const TimerDataContext = createContext({
    timerData: [{ type: '', time: 0, rounds: 0, work: 0, rest: 0 }],
    setTimerData: (timerData: TimerData[]) => {
        timerData;
    },
});

export default { TimerContext, TimerDataContext };
