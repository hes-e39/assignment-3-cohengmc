interface BtnProps {
    name: string;
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}


const TextBtn = ({ name, onClick }: BtnProps) => {
    return (
        <div>
            <button onClick={onClick} className="btn">
                <p className="txtBtn">{name}</p>
            </button>
        </div>
    );
};
export default TextBtn;
