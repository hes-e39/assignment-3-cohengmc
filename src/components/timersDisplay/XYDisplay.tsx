import { useContext, useEffect, useState } from 'react';
import { TimerContext } from '../contexts/context';
import TimerDisplay from '../generic/TimerDisplay';

interface TimerProps {
    work: number;
    rounds: number;
}

const XY = ({ work, rounds }: TimerProps) => {
    const globalTimerData = useContext(TimerContext);
    const [seconds, setSeconds] = useState(work);
    const [roundsRemaining, setRoundsRemaining] = useState(rounds);
    const [cacheChecked, setCacheChecked] = useState(false);

    useEffect(() => {
        setCacheChecked(false);
        if (globalTimerData.hardReset) {
            setSeconds(work);
            setRoundsRemaining(rounds - 1);
        }
        if (globalTimerData.timerComplete) {
            setSeconds(work);
            setRoundsRemaining(rounds - 1);
        }
        if (globalTimerData.newTimer) {
            setSeconds(work);
            setRoundsRemaining(rounds - 1);
            globalTimerData.setNewTimer(false);
        }
        if (
            localStorage.getItem('seconds') !== '-1' &&
            localStorage.getItem('seconds') !== '0' &&
            !globalTimerData.hardReset &&
            !globalTimerData.newTimer &&
            Number(localStorage.getItem('seconds')) !== work
        ) {
            setSeconds(Number(localStorage.getItem('seconds')));
        }
        if (localStorage.getItem('roundsRemaining') !== '-1' && !globalTimerData.hardReset) {
            setRoundsRemaining(Number(localStorage.getItem('roundsRemaining')));
        }
        setCacheChecked(true);
    }, [globalTimerData, work, rounds]);

    useEffect(() => {
        if (cacheChecked) {
            let interval = null;
            localStorage.setItem('seconds', seconds.toString());
            localStorage.setItem('roundsRemaining', roundsRemaining.toString());
            globalTimerData.setSeconds(seconds);

            if (globalTimerData.isRunning && !globalTimerData.timerComplete) {
                if (roundsRemaining === rounds) {
                    setRoundsRemaining(roundsRemaining - 1);
                }
                if (seconds === 0) {
                    if (roundsRemaining === 0) {
                        globalTimerData.setTimerComplete(true);
                        setSeconds(-1);
                    } else {
                        setRoundsRemaining(roundsRemaining - 1);
                        setSeconds(work);
                    }
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
    }, [globalTimerData, seconds, roundsRemaining, rounds, work, cacheChecked]);

    return (
        <div className="clockContainer">
            <p className="supportingText tabataInfo">Rounds Remaining: {roundsRemaining}</p>
            <TimerDisplay seconds={seconds} />
        </div>
    );
};
export default XY;
