import HomeBtns from '../generic/HomeBtns';
import LogoBtn from './LogoBtn';

interface BtnProps {
    isRunning: boolean;
    timeChange: (event: React.MouseEvent<HTMLButtonElement>) => void;
    handleReset: (event: React.MouseEvent<HTMLButtonElement>) => void;
    handleBackBtn: (event: React.MouseEvent<HTMLButtonElement>) => void;
    handleFF: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const HomeBtnsWithBack = ({ timeChange, handleReset, handleBackBtn, handleFF, isRunning }: BtnProps) => {
    return (
        <div>
            <div className="btnContainer">
                <LogoBtn onClick={handleBackBtn} name="back" />
                <HomeBtns timeChange={timeChange} handleReset={handleReset} isRunning={isRunning} handleFF={handleFF} />
            </div>
        </div>
    );
};
export default HomeBtnsWithBack;
