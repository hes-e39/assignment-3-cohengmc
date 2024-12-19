import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import { TimerContext } from '../components/contexts/context';
import Duration from '../components/generic/Duration';
import HomeBtns from '../components/generic/HomeBtns';
import Summary from '../components/generic/Summary';
import TextBtn from '../components/generic/TextBtn';
import CurrentTimer from '../components/timersDisplay/CurrentTimer';

const Timers = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1em
`;

const blankHistory = [[{ type: '', time: 0, rounds: 0, work: 0, rest: 0, description: '' }]];

const TimersView = () => {
    const navigate = useNavigate();
    const [isRunning, setIsRunning] = useState(false);
    const [timerComplete, setTimerComplete] = useState(false);
    const [newTimer, setNewTimer] = useState(true);
    const [currentTimerID, setCurrentTimerID] = useState(0);
    const [isWorkoutDone, setIsWorkoutDone] = useState(false);
    const [hardReset, setHardReset] = useState(false);
    const [searchParams] = useSearchParams();
    const [cacheChecked, setCacheChecked] = useState(false);
    const [workoutHistory, setWorkoutHistory] = useState(blankHistory);
    const [seconds, setSeconds] = useState(0);

    useEffect(() => {
        if (localStorage.getItem('isWorkoutDone') === 'true') {
            setIsWorkoutDone(true);
        }
        if (localStorage.getItem('isRunning') === 'true') {
            setIsRunning(true);
        }
        const wH = localStorage.getItem('workoutHistory');
        setWorkoutHistory(wH !== null && JSON.parse(wH));
        if (wH === 'false') {
            setWorkoutHistory(blankHistory);
        }
        setCurrentTimerID(Number(localStorage.getItem('currentTimerID')));
        setCacheChecked(true);
    }, []);

    useEffect(() => {
        if (cacheChecked) {
            localStorage.setItem('isWorkoutDone', isWorkoutDone.toString());
            localStorage.setItem('isRunning', isRunning.toString());
            localStorage.setItem('currentTimerID', currentTimerID.toString());
            localStorage.setItem('workoutHistory', JSON.stringify(workoutHistory));
        }
    }, [isWorkoutDone, isRunning, currentTimerID, cacheChecked, workoutHistory]);

    const cacheTimerData = localStorage.getItem('timerData');
    if (cacheTimerData === null) {
        localStorage.setItem('timerData', JSON.stringify([{ type: '', time: 0, rounds: 0, work: 0, rest: 0, description: '' }]));
    }
    const timerData = searchParams.get('timerData');
    let parsedTimerData = [];
    if (timerData === null) {
        parsedTimerData = [{ type: '', time: 0, rounds: 0, work: 0, rest: 0, description: '' }];
    } else {
        parsedTimerData = timerData !== null && JSON.parse(decodeURIComponent(timerData));
    }
    const isAtLeastOneTimer = parsedTimerData[0].type !== '';
    const currentTimerData = parsedTimerData[currentTimerID];

    if (isWorkoutDone) {
        //Check if last item in workout history is parsedTimerdata
        //if no, add parsedTimerData to workoutHistory

        if (workoutHistory === null || workoutHistory[0][0].type === '') {
            if (isWorkoutDone) {
                setWorkoutHistory([parsedTimerData]);
            }
        } else if (JSON.stringify(workoutHistory[workoutHistory.length - 1]) !== JSON.stringify(parsedTimerData)) {
            if (isWorkoutDone) {
                setWorkoutHistory([...workoutHistory, parsedTimerData]);
            }
        }
    }

    if (timerComplete) {
        if (currentTimerID + 1 === parsedTimerData.length) {
            setIsWorkoutDone(true);
            setIsRunning(false);
            setTimerComplete(false);
            localStorage.setItem('seconds', '-1');
            localStorage.setItem('roundsRemaining', '-1');
            localStorage.setItem('isWorking', '-1');
        } else {
            setTimerComplete(false);
            setCurrentTimerID(currentTimerID + 1);
            setNewTimer(true);
            localStorage.setItem('seconds', '-1');
            localStorage.setItem('roundsRemaining', '-1');
            localStorage.setItem('isWorking', '-1');
        }
    }

    const timeChange = () => {
        //pause and play
        setHardReset(false);
        if (!isWorkoutDone && isAtLeastOneTimer) {
            setIsRunning(!isRunning);
        }
    };
    const handleReset = () => {
        // reset back to the begining, should double check with user
        localStorage.setItem('seconds', '-1');
        localStorage.setItem('roundsRemaining', '-1');
        localStorage.setItem('isWorking', '-1');
        setSeconds(-1);
        if (currentTimerID === 0) {
            setHardReset(true);
        }
        setTimerComplete(false);
        setCurrentTimerID(0);
        setIsWorkoutDone(false);
        setIsRunning(false);
        setNewTimer(true);
    };

    const handleFF = () => {
        localStorage.setItem('seconds', '-1');
        localStorage.setItem('roundsRemaining', '-1');
        localStorage.setItem('isWorking', '-1');
        setSeconds(-1);
        if (currentTimerID + 1 === parsedTimerData.length && isAtLeastOneTimer) {
            setIsWorkoutDone(true);
            setTimerComplete(false);
            setIsRunning(false);
        } else {
            setTimerComplete(false);
            setCurrentTimerID(currentTimerID + 1);
            setNewTimer(true);
        }
    };
    const handleGoToEdit = () => {
        const searchParams = new URLSearchParams();
        searchParams.set('timerData', encodeURIComponent(JSON.stringify(parsedTimerData)));
        navigate(`/add?${searchParams.toString()}`);
    };

    const handleGoToHistory = () => {
        const searchParams = new URLSearchParams();
        searchParams.set('timerData', encodeURIComponent(JSON.stringify(parsedTimerData)));
        navigate(`/history?${searchParams.toString()}`);
    };

    return (
        <TimerContext.Provider value={{ isRunning, timerComplete, setTimerComplete, hardReset, newTimer, setNewTimer, setSeconds }}>
            <Timers>
                {isAtLeastOneTimer ? (
                    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                        <Summary isWorkoutDone={isWorkoutDone} currentTimerID={currentTimerID} isAtLeastOneTimer={isAtLeastOneTimer} parsedTimerData={parsedTimerData} />
                        <Duration parsedTimerData={parsedTimerData} seconds={seconds} currentTimerID={currentTimerID} />
                    </div>
                ) : (
                    ''
                )}
                {isWorkoutDone ? (
                    <div className="clockContainer">
                        <h1 className="clockStyle">DO:NE</h1>
                    </div>
                ) : (
                    ''
                )}
                {isAtLeastOneTimer && !isWorkoutDone ? <CurrentTimer timerData={currentTimerData} /> : ''}
                {isAtLeastOneTimer ? <HomeBtns timeChange={timeChange} handleReset={handleReset} handleFF={handleFF} isRunning={isRunning} isWorkoutDone={isWorkoutDone} /> : ''}

                <TextBtn onClick={handleGoToEdit} key={`editButton`} name={'Edit Workout'} />
                <TextBtn onClick={handleGoToHistory} key={`historyButton`} name={'Workout History'} />
            </Timers>
        </TimerContext.Provider>
    );
};

export default TimersView;
