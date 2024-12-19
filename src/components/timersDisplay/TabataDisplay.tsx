import { useContext, useEffect, useState } from 'react';
import { TimerContext } from '../contexts/context';
import TimerDisplay from '../generic/TimerDisplay';

interface TimerProps {
    work: number;
    rest: number;
    rounds: number;
}

const Tabata = ({ work, rest, rounds }: TimerProps) => {
    const globalTimerData = useContext(TimerContext);
    const [seconds, setSeconds] = useState(work);
    const [roundsRemaining, setRoundsRemaining] = useState(rounds);
    const [isWorking, setIsWorking] = useState(true);
    const [cacheChecked, setCacheChecked] = useState(false);

    useEffect(() => {
        if (globalTimerData.hardReset) {
            setSeconds(work);
            setRoundsRemaining(rounds - 1);
            setIsWorking(true);
        }
        if (globalTimerData.timerComplete) {
            setSeconds(work);
            setRoundsRemaining(rounds - 1);
            setIsWorking(true);
        }
        if (globalTimerData.newTimer) {
            setSeconds(work);
            setRoundsRemaining(rounds - 1);
            setIsWorking(true);
            globalTimerData.setNewTimer(false);
        }
        if (
            localStorage.getItem('seconds') !== '-1' &&
            localStorage.getItem('seconds') !== '0' &&
            !globalTimerData.hardReset &&
            !globalTimerData.newTimer &&
            !globalTimerData.timerComplete &&
            Number(localStorage.getItem('seconds')) !== work
        ) {
            setSeconds(Number(localStorage.getItem('seconds')));
        }
        if (localStorage.getItem('roundsRemaining') !== '-1' && !globalTimerData.hardReset) {
            setRoundsRemaining(Number(localStorage.getItem('roundsRemaining')));
        }
        if (localStorage.getItem('isWorking') !== '-1' && !globalTimerData.hardReset) {
            if (localStorage.getItem('isWorking') === 'false') setIsWorking(false);
            else setIsWorking(true);
        }
        setCacheChecked(true);
    }, [globalTimerData, work, rounds]);

    useEffect(() => {
        if (cacheChecked) {
            let interval = null;
            localStorage.setItem('seconds', seconds.toString());
            localStorage.setItem('roundsRemaining', roundsRemaining.toString());
            localStorage.setItem('isWorking', isWorking.toString());
            globalTimerData.setSeconds(seconds);

            if (globalTimerData.isRunning && !globalTimerData.timerComplete) {
                if (roundsRemaining === rounds) {
                    setRoundsRemaining(roundsRemaining - 1);
                }
                if (roundsRemaining === -1) {
                    globalTimerData.setTimerComplete(true);
                    setSeconds(-1);
                    setRoundsRemaining(-2);
                } else {
                    if (seconds === 0) {
                        if (isWorking) {
                            setSeconds(rest);
                            setIsWorking(false);
                        } else {
                            setRoundsRemaining(roundsRemaining - 1);
                            setSeconds(work);
                            setIsWorking(true);
                        }
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
    }, [globalTimerData, isWorking, seconds, roundsRemaining, rounds, work, rest, cacheChecked]);

    return (
        <div className="clockContainer">
            <div className="supportingText tabataInfo">
                <div>Rounds Remaining: {roundsRemaining}</div>
                <div className={`supportingText ${isWorking ? 'activeText' : ''}`}>{isWorking ? 'Active' : 'Rest'}</div>
            </div>
            <TimerDisplay seconds={seconds} />
        </div>
    );
};
export default Tabata;
