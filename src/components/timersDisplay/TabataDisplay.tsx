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

    useEffect(() => {
        if (globalTimerData.hardReset) {
            setSeconds(work);
            setRoundsRemaining(rounds);
            setIsWorking(true);
        }
    }, [globalTimerData, work, rounds]);

    useEffect(() => {
        let interval = null;

        if (globalTimerData.isRunning && !globalTimerData.timerComplete) {
            if (roundsRemaining === rounds) {
                setRoundsRemaining(roundsRemaining - 1);
            }
            if (seconds === 0) {
                if (roundsRemaining === 0) {
                    globalTimerData.setTimerComplete(true);
                } else {
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
    }, [globalTimerData, isWorking, seconds, roundsRemaining, rounds, work, rest]);

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
