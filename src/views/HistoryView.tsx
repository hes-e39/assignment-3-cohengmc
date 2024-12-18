import { useNavigate, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import TextBtn from '../components/generic/TextBtn';
import TimerSnapshot from '../components/generic/TimerSnapshot';

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

const HistoryView = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const timerData = searchParams.get('timerData');

    const handleGoToHistory = () => {
        const searchParams = new URLSearchParams();
        searchParams.set('timerData', timerData !== null ? timerData : '');
        navigate(`/?${searchParams.toString()}`);
    };

    const workoutHistory = JSON.parse(localStorage.getItem('workoutHistory'));

    return (
        <div>
            <Timers>
                {workoutHistory.map((workout: Array<TimerData>, index1: number) => (
                    <div key={`workoutSnapshot${index1}`} style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                        {workout.map((timer: TimerData, index: number) => (
                            <TimerSnapshot key={`timerSnapshot${index}`} timer={timer} index={index} isWorkoutDone={true} currentTimerID={0} />
                        ))}
                    </div>
                ))}

                <TextBtn onClick={handleGoToHistory} key={`homeButton`} name={'Return to Workout'} />
            </Timers>
        </div>
    );
};

export default HistoryView;
