import { useContext, useEffect, useState } from 'react';
import { TimerDataContext } from '../contexts/context';

interface Props {
    currentTimer: number;
}

const TimerDescription = ({ currentTimer }: Props) => {
    const timerData = useContext(TimerDataContext);
    const [text, setText] = useState(''); // State to hold the text
    const [savedText, setSavedText] = useState(''); // State to hold saved text

    useEffect(() => {
        setSavedText(timerData.timerData[currentTimer].description);
        setText('');
    }, [timerData, currentTimer]);

    const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.value.length <= 50) {
            setText(e.target.value);
        }
    };

    const handleSave = () => {
        setSavedText(text);
        // biome-ignore lint/style/useConst: <it does change>
        let newTimerData = [...timerData.timerData];
        newTimerData[currentTimer].description = text;
        timerData.setTimerData(newTimerData);
    };

    return (
        <div style={{ maxWidth: '400px', margin: '0 auto', textAlign: 'center' }}>
            <input
                type="text"
                value={text}
                onChange={handleTextChange}
                placeholder="Enter up to 50 character description"
                style={{
                    padding: '8px',
                    width: 'calc(100% - 90px)', // Adjust for button width
                    marginRight: '10px',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                }}
            />
            <button
                onClick={handleSave}
                disabled={!text.trim()}
                style={{
                    padding: '8px 12px',
                    backgroundColor: '#007BFF',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: text.trim() ? 'pointer' : 'not-allowed',
                }}
            >
                Save
            </button>
            {savedText && (
                <div style={{ marginTop: '10px', color: '#333' }}>
                    <strong>Saved Description:</strong> {savedText}
                </div>
            )}
        </div>
    );
};
export default TimerDescription;
