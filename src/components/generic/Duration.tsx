import { getTimeRemaining, getTotalTime } from '../../utils/helpers';

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
}

const Duration = ({ parsedTimerData }: Props) => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <p
                style={{
                    alignSelf: 'center',
                    userSelect: 'none',
                }}
            >
                Time Remaining: {getTimeRemaining(parsedTimerData)}
            </p>
            <p
                style={{
                    alignSelf: 'center',
                    userSelect: 'none',
                }}
            >
                Total Workout Duration: {getTotalTime(parsedTimerData)}
            </p>
        </div>
    );
};
export default Duration;
