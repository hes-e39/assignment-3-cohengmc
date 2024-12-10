interface BtnProps {
    name: string;
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const LogoBtn = ({ name, onClick }: BtnProps) => {
    return (
        <div>
            <button onClick={onClick} className="btn">
                {name === 'play' ? (
                    <img src={'./images/play-svgrepo-com.svg'} alt="play logo" className="btnLogo" />
                ) : name === 'pause' ? (
                    <img src={'./images/pause-alt-svgrepo-com.svg'} alt="pause logo" className="btnLogo" />
                ) : name === 'reset' ? (
                    <img src="./images/reset-svgrepo-com.svg" alt="reset logo" className="btnLogo" />
                ) : name === 'back' ? (
                    <img src="./images/left-arrow-svgrepo-com.svg" alt="back logo" className="btnLogo" />
                ) : name === 'ff' ? (
                    <img src="./images/fast-forward-svgrepo-com.svg" alt="ff logo" className="btnLogo" />
                ) : name === 'trash' ? (
                    <img src="./images/trash.svg" alt="trash logo" className="btnLogo" />
                ) : (
                    <img src="./images/alert-error-svgrepo-com.svg" alt="reset logo" className="btnLogo" />
                )}
            </button>
        </div>
    );
};
export default LogoBtn;
