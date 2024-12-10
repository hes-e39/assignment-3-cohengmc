import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { TimerContext } from '../components/contexts/context';
import HomeBtns from '../components/generic/HomeBtns';
import TextBtn from '../components/generic/TextBtn';
import TimerSnapshot from '../components/generic/TimerSnapshot';
import CurrentTimer from '../components/timersDisplay/CurrentTimer';
import { getTotalTime } from '../utils/helpers';

const Timers = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1em
`;

interface TimerData {
    type: string;
    time: number;
    rounds: number;
    work: number;
    rest: number;
}

const TimersView = () => {
    const navigate = useNavigate();
    const [isRunning, setIsRunning] = useState(false);
    const [timerComplete, setTimerComplete] = useState(false);
    const [currentTimerID, setCurrentTimerID] = useState(0);
    const [isWorkoutDone, setIsWorkoutDone] = useState(false);
    const [hardReset, setHardReset] = useState(false);

    const cacheTimerData = localStorage.getItem('timerData');
    if (cacheTimerData === null) {
        localStorage.setItem('timerData', JSON.stringify([{ type: '', time: 0, rounds: 0, work: 0, rest: 0 }]));
    }
    const parsedTimerData = cacheTimerData !== null && JSON.parse(cacheTimerData);
    const isAtLeastOneTimer = parsedTimerData[0].type !== '';
    const currentTimerData = parsedTimerData[currentTimerID];

    const url = new URL(window.location.href);
    const params = new URLSearchParams(url.search);
    const encodedParam = params.get('timerData');

    console.log(url);

    if (encodedParam) {
        const decodedString = decodeURIComponent(encodedParam);
        console.log(decodedString); // Output: Hello, World! @#&=
    }

    if (timerComplete) {
        if (currentTimerID + 1 === parsedTimerData.length) {
            setIsWorkoutDone(true);
            setIsRunning(false);
            setTimerComplete(false);
        } else {
            setTimerComplete(false);
            setCurrentTimerID(currentTimerID + 1);
        }
    }

    // const handleInputBtnClick = () => {};

    const timeChange = () => {
        //pause and play
        setHardReset(false);
        if (!isWorkoutDone && isAtLeastOneTimer) {
            setIsRunning(!isRunning);
        }
    };
    const handleReset = () => {
        // reset back to the begining, should double check with user
        if (currentTimerID === 0) {
            setHardReset(true);
        }
        setTimerComplete(false);
        setCurrentTimerID(0);
        setIsWorkoutDone(false);
        setIsRunning(false);
    };

    const handleFF = () => {
        if (currentTimerID + 1 === parsedTimerData.length && isAtLeastOneTimer) {
            setIsWorkoutDone(true);
            setTimerComplete(false);
            setIsRunning(false);
        } else {
            setTimerComplete(false);
            setCurrentTimerID(currentTimerID + 1);
        }
    };
    const handleGoToEdit = () => {
        navigate('/add');
    };

    return (
        <TimerContext.Provider value={{ isRunning, timerComplete, setTimerComplete, hardReset }}>
            <Timers>
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                    {parsedTimerData.map((timer: TimerData, index: number) =>
                        isAtLeastOneTimer ? <TimerSnapshot key={`timerSnapshot${index}`} timer={timer} index={index} isWorkoutDone={isWorkoutDone} currentTimerID={currentTimerID} /> : '',
                    )}
                    <p
                        style={{
                            alignSelf: 'center',
                            userSelect: 'none',
                        }}
                    >
                        Total Workout Time: {getTotalTime()}
                    </p>
                </div>
                {isWorkoutDone ? (
                    <div className="clockContainer">
                        <h1 className="clockStyle">DO:NE</h1>
                    </div>
                ) : (
                    ''
                )}
                {isAtLeastOneTimer && !isWorkoutDone ? <CurrentTimer timerData={currentTimerData} /> : ''}

                {isAtLeastOneTimer ? <HomeBtns timeChange={timeChange} handleReset={handleReset} handleFF={handleFF} isRunning={isRunning} /> : ''}

                <TextBtn onClick={handleGoToEdit} key={`editButton`} name={'Edit Workout'} />
            </Timers>
        </TimerContext.Provider>
    );
};

export default TimersView;
