import { formatTime } from '../../utils/helpers';

const TimerDisplay = ({ seconds }: {seconds: number}) => {
    return (
        <div>
            <h1 className="clockStyle">{formatTime(seconds)}</h1>
        </div>
    );
};
export default TimerDisplay;
