import { createContext } from 'react';

export const TimerContext = createContext({
    isRunning: false,
    timerComplete: false,
    setTimerComplete: (timerComplete: boolean) => {
        timerComplete;
    },
    hardReset: false,
    newTimer: true,
    setNewTimer: (timerComplete: boolean) => {
        timerComplete;
    },
    setSeconds: (seconds: number) => {
        seconds;
    },
});

interface TimerData {
    type: string;
    time: number;
    rounds: number;
    work: number;
    rest: number;
    description: string;
}

export const TimerDataContext = createContext({
    timerData: [{ type: '', time: 0, rounds: 0, work: 0, rest: 0, description: '' }],
    setTimerData: (timerData: TimerData[]) => {
        timerData;
    },
});

export default { TimerContext, TimerDataContext };
