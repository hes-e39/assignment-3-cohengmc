import TimerSnapshot from './TimerSnapshot';

interface Props {
    parsedTimerData: [
        {
            type: string;
            time: number;
            rounds: number;
            work: number;
            rest: number;
        },
    ];
    isAtLeastOneTimer: boolean;
    isWorkoutDone: boolean;
    currentTimerID: number;
}

interface TimerData {
    type: string;
    time: number;
    rounds: number;
    work: number;
    rest: number;
}

const Summary = ({ parsedTimerData, isAtLeastOneTimer, isWorkoutDone, currentTimerID }: Props) => {
    return (
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            {parsedTimerData.map((timer: TimerData, index: number) =>
                isAtLeastOneTimer ? <TimerSnapshot key={`timerSnapshot${index}`} timer={timer} index={index} isWorkoutDone={isWorkoutDone} currentTimerID={currentTimerID} /> : '',
            )}
        </div>
    );
};
export default Summary;
