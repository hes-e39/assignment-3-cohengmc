import Countdown from './CountdownDisplay';
import Stopwatch from './StopwatchDisplay';
import Tabata from './TabataDisplay';
import XY from './XYDisplay';

interface TimerData {
    type: string;
    time: number;
    rounds: number;
    work: number;
    rest: number;
}

interface props {
    timerData: TimerData;
}

const CurrentTimer = ({ timerData }: props) => {
    if (timerData.type === 'Stopwatch') {
        return <Stopwatch time={timerData.time} />;
    }
    if (timerData.type === 'Countdown') {
        return <Countdown time={timerData.time} />;
    }
    if (timerData.type === 'XY') {
        return <XY work={timerData.work} rounds={timerData.rounds} />;
    }
    if (timerData.type === 'Tabata') {
        return <Tabata work={timerData.work} rest={timerData.rest} rounds={timerData.rounds} />;
    }
};

export default CurrentTimer;
