import LogoBtn from '../generic/LogoBtn';

interface BtnProps {
    isRunning: boolean;
    timeChange: (event: React.MouseEvent<HTMLButtonElement>) => void;
    handleReset: (event: React.MouseEvent<HTMLButtonElement>) => void;
    handleFF: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const HomeBtns = ({ timeChange, handleReset, handleFF, isRunning }: BtnProps) => {
    return (
        <div>
            <div className="btnContainer">
                <LogoBtn onClick={handleReset} name="reset" />
                <LogoBtn onClick={timeChange} name={!isRunning ? 'play' : 'pause'} />
                <LogoBtn onClick={handleFF} name="ff" />
            </div>
        </div>
    );
};
export default HomeBtns;
