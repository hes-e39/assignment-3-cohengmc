import { useContext, useEffect, useState } from 'react';
import { TimerContext } from '../contexts/context';
import TimerDisplay from '../generic/TimerDisplay';

interface TimerProps {
    time: number;
}

const Countdown = ({ time }: TimerProps) => {
    const globalTimerData = useContext(TimerContext);
    const [seconds, setSeconds] = useState(-1);
    const [cacheChecked, setCacheChecked] = useState(false);

    useEffect(() => {
        if (globalTimerData.hardReset) {
            setSeconds(time);
        }
        if (globalTimerData.timerComplete) {
            setSeconds(time);
        }
        if (globalTimerData.newTimer) {
            setSeconds(time);
            globalTimerData.setNewTimer(false);
        }
        if (seconds === -1) {
            const lS = Number(localStorage.getItem('seconds'));
            if (lS === -1) {
                setSeconds(time);
            } else {
                setSeconds(Number(localStorage.getItem('seconds')));
            }
        }
        setCacheChecked(true);
    }, [globalTimerData, time, seconds]);

    useEffect(() => {
        if (cacheChecked) {
            let interval = null;
            localStorage.setItem('seconds', seconds.toString());
            globalTimerData.setSeconds(seconds);

            if (globalTimerData.isRunning && !globalTimerData.timerComplete) {
                if (seconds === 0) {
                    globalTimerData.setTimerComplete(true);
                    setSeconds(-1);
                }
                interval = setTimeout(() => {
                    setSeconds(prevseconds => prevseconds - 1);
                }, 1000);
            } else if (!globalTimerData.isRunning && seconds !== 0 && interval != null) {
                clearTimeout(interval);
            }
            if (interval != null) {
                return () => clearTimeout(interval);
            }
        }
    }, [globalTimerData, seconds, cacheChecked]);

    return (
        <div className="clockContainer">
            <TimerDisplay seconds={seconds} />
        </div>
    );
};
export default Countdown;
