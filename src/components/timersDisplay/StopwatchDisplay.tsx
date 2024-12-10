import { useContext, useEffect, useState } from 'react';
import { TimerContext } from '../contexts/context';
import TimerDisplay from '../generic/TimerDisplay';

interface TimerProps {
    time: number;
}

const Stopwatch = ({ time }: TimerProps) => {
    const globalTimerData = useContext(TimerContext);
    const [seconds, setSeconds] = useState(0);

    useEffect(() => {
        if (globalTimerData.hardReset) {
            setSeconds(0);
        }
    }, [globalTimerData]);

    useEffect(() => {
        let interval = null;

        if (globalTimerData.isRunning && !globalTimerData.timerComplete) {
            if (seconds === time) {
                globalTimerData.setTimerComplete(true);
                setSeconds(0);
            } else if (seconds < time) {
                interval = setTimeout(() => {
                    setSeconds(prevseconds => prevseconds + 1);
                }, 1000);
            }
        } else if (!globalTimerData.isRunning && seconds !== 0 && interval != null) {
            clearTimeout(interval);
        }
        if (interval != null) {
            return () => clearTimeout(interval);
        }
    }, [globalTimerData, seconds, time]);

    return (
        <div className="clockContainer">
            <TimerDisplay seconds={seconds} />
        </div>
    );
};
export default Stopwatch;
