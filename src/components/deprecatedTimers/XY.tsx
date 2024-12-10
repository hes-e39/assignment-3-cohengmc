import { useEffect, useState } from 'react';
import { userInputCleanup } from '../../utils/helpers';
import HomeBtnsWithBack from '../generic/HomeBtnsWithBack';
import NumberpadInput from '../generic/NumberpadInput';
import TimerDisplay from '../generic/TimerDisplay';

interface TimerProps {
    timerID: number;
}

const XY = ({ timerID }: TimerProps) => {
    const [seconds, setSeconds] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [isInputSet, setIsInputSet] = useState(false);
    const [isDone, setIsDone] = useState(false);
    const [roundsRemaining, setRoundsRemaining] = useState(0);
    const [roundDurationInput, setRoundDurationInput] = useState('0000');
    const [roundAmountInput, setRoundAmountInput] = useState('00');
    const [userSelect, setUserSelect] = useState('');

    useEffect(() => {
        let interval = null;

        if (isRunning) {
            if (roundsRemaining === Number(roundAmountInput)) {
                setRoundsRemaining(roundsRemaining - 1);
            }
            if (seconds === 0) {
                if (roundsRemaining === 0) {
                    setIsRunning(false);
                    setIsDone(true);
                } else {
                    setRoundsRemaining(roundsRemaining - 1);
                    setSeconds(userInputCleanup(roundDurationInput));
                }
            }
            interval = setTimeout(() => {
                setSeconds(prevseconds => prevseconds - 1);
            }, 1000);
        } else if (!isRunning && seconds !== 0 && interval != null) {
            clearInterval(interval);
        }
        if (interval != null) {
            return () => clearTimeout(interval);
        }
    }, [isRunning, seconds, roundsRemaining, roundDurationInput, roundAmountInput]);

    const timeChange = () => {
        setIsRunning(!isRunning);
    };
    const handleReset = () => {
        setIsDone(false);
        setSeconds(userInputCleanup(roundDurationInput));
        setRoundsRemaining(Number(roundAmountInput));
        setIsRunning(false);
    };

    const handleInputBtnClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        const target = event.target as HTMLElement;
        if (target.innerText === 'Set') {
            setSeconds(userInputCleanup(roundDurationInput));
            setRoundsRemaining(Number(roundAmountInput));
            if (userInputCleanup(roundDurationInput) > 0 && Number(roundAmountInput) > 0) {
                setIsInputSet(true);
            }
        } else if (target.innerText === 'Clear') {
            setRoundDurationInput('0000');
            setRoundAmountInput('00');
        } else {
            if (userSelect === 'Time') {
                setRoundDurationInput(roundDurationInput.slice(1) + target.innerText);
            } else if (userSelect === 'Rounds') {
                setRoundAmountInput(roundAmountInput.slice(1) + target.innerText);
            }
        }
    };
    const handleBackBtn = () => {
        setIsRunning(false);
        setRoundDurationInput('0000');
        setRoundAmountInput('00');
        setUserSelect('');
        setIsInputSet(false);
        setIsDone(false);
    };
    const radioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const eventValue = event.target.value;
        setUserSelect(eventValue);
    };
    const handleFF = () => {
        setRoundsRemaining(0);
        setIsDone(true);
    };

    return (
        <div className="clockContainer">
            <div>
                {isInputSet ? <p className="supportingText">Rounds Remaining: {roundsRemaining}</p> : <p className="supportingText">Rounds: {roundAmountInput}</p>}
                {isDone ? (
                    <h1 className="clockStyle">DO:NE</h1>
                ) : isInputSet ? (
                    <TimerDisplay seconds={seconds} />
                ) : (
                    <p className="supportingText">Time per Round: {`${roundDurationInput.slice(0, 2)}:${roundDurationInput.slice(2, 4)}`}</p>
                )}
            </div>

            {isInputSet ? (
                ''
            ) : (
                <div className="button-group">
                    <input type="radio" id={`roundsXY${timerID}`} name={`XY${timerID}`} value="Rounds" onChange={radioChange} />
                    <label htmlFor={`roundsXY${timerID}`}>Rounds</label>

                    <input type="radio" id={`timeXY${timerID}`} name={`XY${timerID}`} value="Time" onChange={radioChange} />
                    <label htmlFor={`timeXY${timerID}`}>Time</label>
                </div>
            )}

            {isInputSet ? (
                <HomeBtnsWithBack timeChange={timeChange} handleReset={handleReset} handleBackBtn={handleBackBtn} handleFF={handleFF} isRunning={isRunning} />
            ) : (
                <NumberpadInput handleInputBtnClick={handleInputBtnClick} />
            )}
        </div>
    );
};
export default XY;
