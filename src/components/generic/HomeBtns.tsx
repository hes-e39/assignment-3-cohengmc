import LogoBtn from '../generic/LogoBtn';

interface BtnProps {
    isRunning: boolean;
    isWorkoutDone: boolean;
    timeChange: (event: React.MouseEvent<HTMLButtonElement>) => void;
    handleReset: (event: React.MouseEvent<HTMLButtonElement>) => void;
    handleFF: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const HomeBtns = ({ timeChange, handleReset, handleFF, isRunning, isWorkoutDone }: BtnProps) => {
    return (
        <div>
            <div className="btnContainer">
                <LogoBtn onClick={handleReset} name="reset" />
                {isWorkoutDone ? (
                    ''
                ) : (
                    <div className="btnContainer">
                        <LogoBtn onClick={timeChange} name={!isRunning ? 'play' : 'pause'} />
                        <LogoBtn onClick={handleFF} name="ff" />
                    </div>
                )}
            </div>
        </div>
    );
};
export default HomeBtns;
