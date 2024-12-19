import { useContext, useEffect, useState } from 'react';
import { TimerContext } from '../contexts/context';
import TimerDisplay from '../generic/TimerDisplay';

interface TimerProps {
    time: number;
}

const Stopwatch = ({ time }: TimerProps) => {
    const globalTimerData = useContext(TimerContext);
    const [seconds, setSeconds] = useState(-1);
    const [cacheChecked, setCacheChecked] = useState(false);

    useEffect(() => {
        if (globalTimerData.hardReset) {
            setSeconds(0);
        }
        if (globalTimerData.timerComplete) {
            setSeconds(0);
        }
        if (globalTimerData.newTimer) {
            setSeconds(0);
            globalTimerData.setNewTimer(false);
        }
        if (seconds === -1) {
            const lS = Number(localStorage.getItem('seconds'));
            if (lS === -1) {
                setSeconds(0);
            } else {
                setSeconds(Number(localStorage.getItem('seconds')));
            }
        }
        setCacheChecked(true);
    }, [globalTimerData, seconds]);

    useEffect(() => {
        if (cacheChecked) {
            let interval = null;
            localStorage.setItem('seconds', seconds.toString());
            globalTimerData.setSeconds(seconds);

            if (globalTimerData.isRunning && !globalTimerData.timerComplete) {
                if (seconds === time) {
                    globalTimerData.setTimerComplete(true);
                    setSeconds(-1);
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
        }
    }, [globalTimerData, seconds, time, cacheChecked]);

    return (
        <div className="clockContainer">
            <TimerDisplay seconds={seconds} />
        </div>
    );
};
export default Stopwatch;
