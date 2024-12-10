import { useContext, useState } from 'react';
import { formatTime, userInputCleanup } from '../../utils/helpers';
import { TimerDataContext } from '../../views/AddView';
import DeleteSetDisplay from '../generic/DeleteSetDisplay';
import LogoBtn from '../generic/LogoBtn';
import NumberpadInput from '../generic/NumberpadInput';

interface TimerProps {
    timerID: number;
}

const XY = ({ timerID }: TimerProps) => {
    const timerData = useContext(TimerDataContext);
    const [userData, setUserData] = useState({
        roundWorkDurationInput: '0000',
        roundAmountInput: '00',
        userSelect: '',
    });

    const inputSet = timerData.timerData[timerID].work !== 0;
    const cacheTimerData = localStorage.getItem('timerData');
    const parsedTimerData = cacheTimerData !== null && JSON.parse(cacheTimerData);

    const handleInputBtnClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        const target = event.target as HTMLElement;
        if (target.innerText === 'Set') {
            if (userInputCleanup(userData.roundWorkDurationInput) > 0 && Number(userData.roundAmountInput) > 0) {
                const currentTimerData = {
                    type: 'XY',
                    time: 0,
                    rounds: Number(userData.roundAmountInput),
                    work: userInputCleanup(userData.roundWorkDurationInput),
                    rest: 0,
                };
                // biome-ignore lint/style/useConst: <it does change>
                let newTimerData = [...timerData.timerData];
                newTimerData[timerID] = currentTimerData;
                timerData.setTimerData(newTimerData);
            }
        } else if (target.innerText === 'Clear') {
            setUserData({ ...userData, roundWorkDurationInput: '0000', roundAmountInput: '00' });
        } else {
            if (userData.userSelect === 'Time') {
                setUserData({ ...userData, roundWorkDurationInput: userData.roundWorkDurationInput.slice(1) + target.innerText });
            } else if (userData.userSelect === 'Rounds') {
                setUserData({ ...userData, roundAmountInput: userData.roundAmountInput.slice(1) + target.innerText });
            }
        }
    };
    const handleBackBtn = () => {
        setUserData({ ...userData, roundAmountInput: '00', roundWorkDurationInput: '0000', userSelect: '' });
        const currentTimerData = { type: 'XY', time: 0, rounds: 0, work: 0, rest: 0 };
        // biome-ignore lint/style/useConst: <it does change>
        let newTimerData = [...timerData.timerData];
        newTimerData[timerID] = currentTimerData;
        timerData.setTimerData(newTimerData);
    };

    const handleDeleteBtn = () => {
        // biome-ignore lint/style/useConst: <it does change>
        let newTimerData = [...timerData.timerData];
        newTimerData.splice(timerID, 1);
        timerData.setTimerData(newTimerData);
    };

    const radioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const eventValue = event.target.value;
        setUserData({ ...userData, userSelect: eventValue });
    };

    return (
        <div className="clockContainer">
            <div>
                <p className="supportingText clockLabel">XY</p>
                <p className="supportingText">Rounds: {inputSet ? parsedTimerData[timerID].rounds : userData.roundAmountInput}</p>
                <p className="supportingText">
                    Round Time: {inputSet ? formatTime(parsedTimerData[timerID].work) : `${userData.roundWorkDurationInput.slice(0, 2)}:${userData.roundWorkDurationInput.slice(2, 4)}`}
                </p>
            </div>

            {inputSet ? (
                ''
            ) : (
                <div className="button-group">
                    <input type="radio" id={`roundsXY${timerID}`} name={`XY${timerID}`} value="Rounds" onChange={radioChange} />
                    <label htmlFor={`roundsXY${timerID}`}>Rounds</label>

                    <input type="radio" id={`timeXY${timerID}`} name={`XY${timerID}`} value="Time" onChange={radioChange} />
                    <label htmlFor={`timeXY${timerID}`}>Time</label>
                </div>
            )}

            {inputSet ? <LogoBtn onClick={handleBackBtn} name="back" /> : <NumberpadInput handleInputBtnClick={handleInputBtnClick} />}
            <DeleteSetDisplay inputSet={inputSet} handleDeleteBtn={handleDeleteBtn} />
        </div>
    );
};
export default XY;
