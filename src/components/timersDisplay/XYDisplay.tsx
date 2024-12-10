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

    useEffect(() => {
        if (globalTimerData.hardReset) {
            setSeconds(work);
            setRoundsRemaining(rounds);
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
    }, [globalTimerData, seconds, roundsRemaining, rounds, work]);

    return (
        <div className="clockContainer">
            <p className="supportingText tabataInfo">Rounds Remaining: {roundsRemaining}</p>
            <TimerDisplay seconds={seconds} />
        </div>
    );
};
export default XY;
