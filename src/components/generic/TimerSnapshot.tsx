import { formatTime } from '../../utils/helpers';

interface TimerData {
    type: string;
    time: number;
    rounds: number;
    work: number;
    rest: number;
}

interface SnapshotProps {
    timer: TimerData;
    index: number;
    currentTimerID: number;
    isWorkoutDone: boolean;
}

const TimerSnapshot = ({ timer, index, currentTimerID, isWorkoutDone }: SnapshotProps) => {
    return (
        <div
            className={`${index < currentTimerID || isWorkoutDone ? 'complete' : 'notStarted'} ${index === currentTimerID && !isWorkoutDone ? 'active' : ''} `}
            style={{
                border: '1px solid black',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '.3em',
                justifyContent: 'start',
                userSelect: 'none',
                minHeight: '5lh',
                borderRadius: '8px',
            }}
        >
            <p>
                #{index + 1}: {timer.type}
            </p>
            {timer.type === 'Stopwatch' || timer.type === 'Countdown' ? (
                <div style={{ paddingTop: '1lh' }}>
                    <p className="miniClock">{formatTime(timer.time)}</p>
                </div>
            ) : (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '.1em' }}>
                    <p>Rounds: {timer.rounds}</p>
                    {timer.type === 'XY' ? (
                        <p className="miniClock">{formatTime(timer.work)}</p>
                    ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '.1em' }}>
                            <p className="miniClock activeText">{formatTime(timer.work)}</p>
                            <p className="miniClock">{formatTime(timer.rest)}</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};
export default TimerSnapshot;
