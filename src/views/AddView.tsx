import styled from 'styled-components';

import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import TextBtn from '../components/generic/TextBtn';

import { TimerDataContext } from '../components/contexts/context';
import LogoBtn from '../components/generic/LogoBtn';
import TimerDescription from '../components/generic/TimerDescription';
import Countdown from '../components/timersInput/CountdownInput';
import Stopwatch from '../components/timersInput/StopwatchInput';
import Tabata from '../components/timersInput/TabataInput';
import XY from '../components/timersInput/XYInput';

const Timers = styled.div`
  display: flex;
//   flex-direction: column;
flex-wrap: wrap;
justify-content: center;
  align-items: center;
  gap: 1rem;
`;

const AddTimerContainer = styled.div`
  padding: 20px;
  margin: 10px;
  font-size: 1.5rem;
  display: flex;
  justify-content: center;
  gap: 1rem;
`;

const TimerTitle = styled.div``;

const blankTimer = [{ type: '', time: 0, rounds: 0, work: 0, rest: 0, description: '' }];

const AddView = () => {
    const [timerData, setTimerData] = useState(blankTimer);
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    useEffect(() => {
        const timerURLData = searchParams.get('timerData');
        let parsedTimerData = [];
        if (timerURLData === null) {
            parsedTimerData = blankTimer;
        } else {
            parsedTimerData = JSON.parse(decodeURIComponent(timerURLData));
        }
        setTimerData(parsedTimerData);
    }, [searchParams]);

    if (timerData === null || timerData.length === 0) {
        setTimerData(blankTimer);
    } else if (timerData[0].type !== 'reload') {
        localStorage.setItem('timerData', JSON.stringify(timerData));
    }

    const handleAddTimer = (event: React.MouseEvent<HTMLButtonElement>) => {
        const target = event.target as HTMLElement;
        const newTimer = { type: target.innerText, time: 0, rounds: 0, work: 0, rest: 0, description: '' };
        if (timerData.length === 0) {
            // Checking if length is 0 such that no error is thrown when checking timerData[0].type. If the length is 0, this will throw an error because there will be no timer listed yet in the timer data array
            setTimerData([newTimer]);
        } else if (timerData[0].type === '') {
            // If the first timer in the timer data has an empty type '' that means no timer has yet been added to the array of timers
            setTimerData([newTimer]);
        } else if (timerData.length >= 10) {
            alert('Limit of 10 timers reached, please delete timers to add more.');
        } else {
            setTimerData([...timerData, newTimer]);
        }
    };

    function getTimer(timer: string, index: number) {
        if (timer === 'Stopwatch') {
            return <Stopwatch key={`${timer}${index}`} timerID={index} />;
        }
        if (timer === 'Countdown') {
            return <Countdown key={`${timer}${index}`} timerID={index} />;
        }
        if (timer === 'XY') {
            return <XY key={`${timer}${index}`} timerID={index} />;
        }
        if (timer === 'Tabata') {
            return <Tabata key={`${timer}${index}`} timerID={index} />;
        }
    }

    function mover(index: number) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1rem', margin: '.5rem' }}>
                {index !== 0 ? <LogoBtn onClick={() => handleMoveUp(index)} name="up" /> : ''}
                <div>Move Timer</div>
                {index !== timerData.length - 1 ? <LogoBtn onClick={() => handleMoveDown(index)} name="down" /> : ''}
            </div>
        );
    }

    function handleMoveDown(index: number) {
        // biome-ignore lint/style/useConst: <Data get manipulated later>
        let tempData = timerData;
        const tempTimer = timerData[index];
        tempData[index] = tempData[index + 1];
        tempData[index + 1] = tempTimer;
        setTimerData([...tempData]);
    }
    function handleMoveUp(index: number) {
        // biome-ignore lint/style/useConst: <Data get manipulated later>
        let tempData = timerData;
        const tempTimer = timerData[index];
        tempData[index] = tempData[index - 1];
        tempData[index - 1] = tempTimer;
        setTimerData([...tempData]);
    }

    const handleDone = () => {
        let timersSet = 0;
        for (const timer of timerData) {
            if (timer.type === '') {
                navigate('/');
            } else if (timer.type === 'Stopwatch') {
                if (timer.time > 0) {
                    timersSet++;
                }
            } else if (timer.type === 'Countdown') {
                if (timer.time > 0) {
                    timersSet++;
                }
            } else if (timer.type === 'XY') {
                if (timer.work > 0 && timer.rounds > 0) {
                    timersSet++;
                }
            } else if (timer.type === 'Tabata') {
                if (timer.work > 0 && timer.rounds > 0 && timer.rest > 0) {
                    timersSet++;
                }
            }
        }
        if (timersSet === timerData.length) {
            localStorage.setItem('currentTimerID', '0');
            localStorage.setItem('seconds', '-1');
            localStorage.setItem('roundsRemaining', '-1');
            localStorage.setItem('isWorking', '-1');
            localStorage.setItem('isWorkoutDone', 'false');
            localStorage.setItem('isRunning', 'false');
            const searchParams = new URLSearchParams();
            searchParams.set('timerData', encodeURIComponent(JSON.stringify(timerData)));
            navigate(`/?${searchParams.toString()}`);
        } else {
            alert('Make sure all timers are set');
        }
    };

    return (
        <TimerDataContext.Provider value={{ timerData, setTimerData }}>
            <Timers>
                {timerData.map((timer, index) =>
                    timerData[0].type !== '' ? (
                        <div key={`timerBlock${index}`} style={{ textAlign: 'center' }}>
                            <TimerTitle>{`#${index + 1}: ${timer.type}`}</TimerTitle>
                            {timerData.length > 1 ? mover(index) : ''}
                            <TimerDescription currentTimer={index} />
                            {getTimer(timer.type, index)}
                        </div>
                    ) : (
                        ''
                    ),
                )}
            </Timers>
            <AddTimerContainer>
                <TextBtn onClick={handleAddTimer} key={`Stopwatch`} name={'Stopwatch'} />
                <TextBtn onClick={handleAddTimer} key={`Countdown`} name={'Countdown'} />
                <TextBtn onClick={handleAddTimer} key={`XY`} name={'XY'} />
                <TextBtn onClick={handleAddTimer} key={`Tabata`} name={'Tabata'} />
            </AddTimerContainer>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <TextBtn onClick={handleDone} key={`doneButton`} name={'🏠 Save Timers - Return Home'} />
            </div>
        </TimerDataContext.Provider>
    );
};

export default AddView;
