import styled from 'styled-components';

import Countdown from '../deprecatedTimers/Countdown';
import Stopwatch from '../deprecatedTimers/Stopwatch';
import Tabata from '../deprecatedTimers/Tabata';
import XY from '../deprecatedTimers/XY';

const Timers = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Timer = styled.div`
  border: 1px solid gray;
  padding: 20px;
  margin: 10px;
  font-size: 1.5rem;
`;

const TimerTitle = styled.div``;

const TimersView = () => {
    const timers = [
        { title: 'Stopwatch', C: <Stopwatch /> },
        { title: 'Countdown', C: <Countdown /> },
        { title: 'XY', C: <XY timerID={0} /> },
        { title: 'Tabata', C: <Tabata timerID={0} /> },
    ];

    return (
        <Timers>
            {timers.map(timer => (
                <Timer key={`timer-${timer.title}`}>
                    <TimerTitle>{timer.title}</TimerTitle>
                    {timer.C}
                </Timer>
            ))}
        </Timers>
    );
};

export default TimersView;
