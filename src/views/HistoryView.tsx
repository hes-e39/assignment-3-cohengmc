import { useNavigate, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import Summary from '../components/generic/Summary';
import TextBtn from '../components/generic/TextBtn';
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
    description: string;
}

const HistoryView = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const timerData = searchParams.get('timerData');

    const handleGoToHistory = () => {
        localStorage.setItem('currentTimerID', '0');
        localStorage.setItem('seconds', '-1');
        localStorage.setItem('roundsRemaining', '-1');
        localStorage.setItem('isWorking', '-1');
        localStorage.setItem('isWorkoutDone', 'false');
        localStorage.setItem('isRunning', 'false');
        const searchParams = new URLSearchParams();
        searchParams.set('timerData', timerData !== null ? timerData : '');
        navigate(`/?${searchParams.toString()}`);
    };
    const wH = localStorage.getItem('workoutHistory');
    const workoutHistory = wH === null ? null : JSON.parse(wH);

    function workoutInHistory() {
        return workoutHistory[0][0].type === ''
            ? 'No Workouts Complete Yet'
            : workoutHistory.map((workout: Array<TimerData>, index1: number) => (
                  <div
                      key={`workoutSnapshot${index1}`}
                      style={{
                          display: 'flex',
                          gap: '1rem',
                          flexWrap: 'wrap',
                          justifyContent: 'center',
                          alignItems: 'center',
                          border: '2px solid black',
                          width: '90vw',
                          padding: '1rem',
                          borderRadius: '8px',
                      }}
                  >
                      <p>Workout #{index1 + 1}</p>

                      <Summary key={`timerSnapshot${index1}`} isWorkoutDone={true} currentTimerID={0} isAtLeastOneTimer={true} parsedTimerData={workout} />
                      <p
                          style={{
                              alignSelf: 'center',
                              userSelect: 'none',
                          }}
                      >
                          Workout Duration: {getTotalTime(workout)}
                      </p>
                  </div>
              ));
    }

    return (
        <div>
            <Timers>
                {workoutHistory === null || workoutHistory === false ? 'No Workouts Complete Yet' : workoutInHistory()}

                <TextBtn onClick={handleGoToHistory} key={`homeButton`} name={'Return to Workout'} />
            </Timers>
        </div>
    );
};

export default HistoryView;
