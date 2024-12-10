import LogoBtn from './LogoBtn';

interface BtnProps {
    inputSet: boolean;
    handleDeleteBtn: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const DeleteSetDisplay = ({ inputSet, handleDeleteBtn }: BtnProps) => {
    return (
        <div className="setContainer">
            <LogoBtn onClick={handleDeleteBtn} name="trash" />
            {inputSet ? <p className="setText">Set</p> : <p className="notSetText">Not Set</p>}
        </div>
    );
};
export default DeleteSetDisplay;
