import { useContext, useState } from 'react';
import { userInputCleanup } from '../../utils/helpers';
import { TimerDataContext } from '../../views/AddView';
import DeleteSetDisplay from '../generic/DeleteSetDisplay';
import LogoBtn from '../generic/LogoBtn';
import NumberpadInput from '../generic/NumberpadInput';
import TimerDisplay from '../generic/TimerDisplay';

interface TimerProps {
    timerID: number;
}

const Stopwatch = ({ timerID }: TimerProps) => {
    const timerData = useContext(TimerDataContext);
    const [timerInput, setTimerInput] = useState('000000');

    const inputSet = timerData.timerData[timerID].time !== 0;
    const cacheTimerData = localStorage.getItem('timerData');
    const parsedTimerData = cacheTimerData !== null && JSON.parse(cacheTimerData);

    const handleInputBtnClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        const target = event.target as HTMLElement;
        if (target.innerText === 'Set') {
            if (userInputCleanup(timerInput) > 0) {
                const currentTimerData = { type: 'Stopwatch', time: userInputCleanup(timerInput), rounds: 0, work: 0, rest: 0 };
                // biome-ignore lint/style/useConst: <it does change>
                let newTimerData = [...timerData.timerData];
                newTimerData[timerID] = currentTimerData;
                timerData.setTimerData(newTimerData);
            }
        } else if (target.innerText === 'Clear') {
            setTimerInput('000000');
        } else {
            setTimerInput(timerInput.slice(1) + target.innerText);
        }
    };
    const handleBackBtn = () => {
        setTimerInput('000000');
        const currentTimerData = { type: 'Stopwatch', time: 0, rounds: 0, work: 0, rest: 0 };
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

    return (
        <div className="clockContainer">
            <p className="supportingText clockLabel">Stopwatch</p>
            {inputSet ? <TimerDisplay seconds={parsedTimerData[timerID].time} /> : <h1 className="clockStyle">{`${timerInput.slice(0, 2)}:${timerInput.slice(2, 4)}:${timerInput.slice(4, 6)}`}</h1>}
            {inputSet ? <LogoBtn onClick={handleBackBtn} name="back" /> : <NumberpadInput handleInputBtnClick={handleInputBtnClick} />}
            <DeleteSetDisplay inputSet={inputSet} handleDeleteBtn={handleDeleteBtn} />
        </div>
    );
};
export default Stopwatch;
