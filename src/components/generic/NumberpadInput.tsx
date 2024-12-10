import TextBtn from './TextBtn';

interface BtnProps {
    handleInputBtnClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const NumberpadInput = ({ handleInputBtnClick }: BtnProps) => {
    const numberBtns = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

    return (
        <div className="btnContainer">
            <div className="btnContainer">
                {numberBtns.map(btn => (
                    <TextBtn onClick={handleInputBtnClick} key={`numBtn${btn}`} name={btn.toString()} />
                ))}
            </div>
            <div className="btnContainer">
                <TextBtn onClick={handleInputBtnClick} key={`set`} name={'Set'} />
                <TextBtn onClick={handleInputBtnClick} key={`clear`} name={'Clear'} />
            </div>
        </div>
    );
};
export default NumberpadInput;
