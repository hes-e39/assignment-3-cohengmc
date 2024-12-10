import { useEffect, useState } from 'react';
import { userInputCleanup } from '../../utils/helpers';
import HomeBtnsWithBack from '../generic/HomeBtnsWithBack';
import NumberpadInput from '../generic/NumberpadInput';
import TimerDisplay from '../generic/TimerDisplay';

interface TimerProps {
    timerID: number;
}

const Tabata = ({ timerID }: TimerProps) => {
    const [seconds, setSeconds] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [isWorking, setIsWorking] = useState(false);
    const [isDone, setIsDone] = useState(false);
    const [roundsRemaining, setRoundsRemaining] = useState(0);
    const [isInputSet, setIsInputSet] = useState(false);
    const [userData, setUserData] = useState({
        roundWorkDurationInput: '0000',
        roundRestDurationInput: '0000',
        roundAmountInput: '00',
        userSelect: '',
    });

    useEffect(() => {
        let interval = null;

        if (isRunning) {
            if (roundsRemaining === Number(userData.roundAmountInput)) {
                setRoundsRemaining(roundsRemaining - 1);
            }
            if (seconds === 0) {
                if (roundsRemaining === 0) {
                    setIsRunning(false);
                    setIsDone(true);
                } else {
                    if (isWorking) {
                        setSeconds(userInputCleanup(userData.roundRestDurationInput));
                        setIsWorking(false);
                    } else {
                        setRoundsRemaining(roundsRemaining - 1);
                        setSeconds(userInputCleanup(userData.roundWorkDurationInput));
                        setIsWorking(true);
                    }
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
    }, [isRunning, isWorking, seconds, roundsRemaining, userData]);

    const timeChange = () => {
        setIsRunning(!isRunning);
    };
    const handleReset = () => {
        setIsDone(false);
        setSeconds(userInputCleanup(userData.roundWorkDurationInput));
        setRoundsRemaining(Number(userData.roundAmountInput));
        setIsWorking(true);
        setIsRunning(false);
    };

    const handleInputBtnClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        const target = event.target as HTMLElement;
        if (target.innerText === 'Set') {
            setSeconds(userInputCleanup(userData.roundWorkDurationInput));
            setIsWorking(true);
            setRoundsRemaining(Number(userData.roundAmountInput));
            if (userInputCleanup(userData.roundWorkDurationInput) > 0 && Number(userData.roundAmountInput) > 0) {
                setIsInputSet(true);
            }
        } else if (target.innerText === 'Clear') {
            setUserData({ ...userData, roundWorkDurationInput: '0000', roundRestDurationInput: '0000', roundAmountInput: '00' });
        } else {
            if (userData.userSelect === 'Work') {
                setUserData({ ...userData, roundWorkDurationInput: userData.roundWorkDurationInput.slice(1) + target.innerText });
            } else if (userData.userSelect === 'Rounds') {
                setUserData({ ...userData, roundAmountInput: userData.roundAmountInput.slice(1) + target.innerText });
            } else if (userData.userSelect === 'Rest') {
                setUserData({ ...userData, roundRestDurationInput: userData.roundRestDurationInput.slice(1) + target.innerText });
            }
        }
    };
    const handleBackBtn = () => {
        setIsDone(false);
        setIsRunning(false);
        setIsInputSet(false);
        setUserData({ ...userData, roundAmountInput: '00', roundWorkDurationInput: '0000', roundRestDurationInput: '0000', userSelect: '' });
    };
    const radioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const eventValue = event.target.value;
        setUserData({ ...userData, userSelect: eventValue });
    };
    const handleFF = () => {
        setRoundsRemaining(0);
        setIsDone(true);
    };

    return (
        <div className="clockContainer">
            <div>
                {isInputSet ? (
                    <div className="tabataInfo">
                        <p className="supportingText">Rounds Remaining: {roundsRemaining}</p>
                        <p className={`supportingText ${isWorking ? 'activeText' : ''}`}>{isWorking ? 'Active' : 'Rest'}</p>
                    </div>
                ) : (
                    <p className="supportingText">Rounds: {userData.roundAmountInput}</p>
                )}
                {isDone ? (
                    <h1 className="clockStyle">DO:NE</h1>
                ) : isInputSet ? (
                    <TimerDisplay seconds={seconds} />
                ) : (
                    <div>
                        <p className="supportingText">Work: {`${userData.roundWorkDurationInput.slice(0, 2)}:${userData.roundWorkDurationInput.slice(2, 4)}`}</p>
                        <p className="supportingText">Rest: {`${userData.roundRestDurationInput.slice(0, 2)}:${userData.roundRestDurationInput.slice(2, 4)}`}</p>
                    </div>
                )}
            </div>

            {isInputSet ? (
                ''
            ) : (
                <div className="button-group">
                    <input type="radio" id={`roundsTabata${timerID}`} name={`Tabata${timerID}`} value="Rounds" onChange={radioChange} />
                    <label htmlFor={`roundsTabata${timerID}`}>Rounds</label>

                    <input type="radio" id={`workTabata${timerID}`} name={`Tabata${timerID}`} value="Work" onChange={radioChange} />
                    <label htmlFor={`workTabata${timerID}`}>Work</label>

                    <input type="radio" id={`restTabata${timerID}`} name={`Tabata${timerID}`} value="Rest" onChange={radioChange} />
                    <label htmlFor={`restTabata${timerID}`}>Rest</label>
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
export default Tabata;
