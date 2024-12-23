// Convert seconds to timer display output string
function formatTime(seconds: number) {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);

    const formattedTime =
        hrs > 0
            ? [hrs > 0 ? hrs.toString().padStart(2, '0') : '', mins.toString().padStart(2, '0'), secs.toString().padStart(2, '0')].join(':')
            : [mins.toString().padStart(2, '0'), secs.toString().padStart(2, '0')].join(':');

    return formattedTime;
}

// Convert user input string to seconds
function userInputCleanup(userInput: string) {
    let totalTime = 0;

    if (userInput.length === 6) {
        // Extract hours, minutes, and seconds from the padded string
        const hours = Number.parseInt(userInput.slice(0, 2), 10);
        const minutes = Number.parseInt(userInput.slice(2, 4), 10);
        const seconds = Number.parseInt(userInput.slice(4, 6), 10);

        // Convert to total seconds
        totalTime = hours * 3600 + minutes * 60 + seconds;
    } else if (userInput.length === 4) {
        // Extract minutes, and seconds from the padded string
        const minutes = Number.parseInt(userInput.slice(0, 2), 10);
        const seconds = Number.parseInt(userInput.slice(2, 4), 10);

        // Convert to total seconds
        totalTime = minutes * 60 + seconds;
    }

    return totalTime;
}

const getTimeRemaining = (
    parsedTimerData: [
        {
            type: string;
            time: number;
            rounds: number;
            work: number;
            rest: number;
        },
    ],
    seconds: number,
    currentTimerID: number,
) => {
    const isAtLeastOneTimer = parsedTimerData[0].type !== '';

    if (isAtLeastOneTimer) {
        let totalTime = 0;

        for (let i = 0; i < parsedTimerData.length; i++) {
            const timer = parsedTimerData[i];

            if (currentTimerID === i) {
                if (timer.type === 'Stopwatch') {
                    totalTime = totalTime + timer.time - seconds;
                }

                if (timer.type === 'Countdown') {
                    totalTime = totalTime + seconds;
                }
                if (timer.type === 'XY') {
                    totalTime = totalTime + timer.work * Number(localStorage.getItem('roundsRemaining')) + seconds;
                }

                if (timer.type === 'Tabata') {
                    if (localStorage.getItem('isWorking') === 'true' || localStorage.getItem('isWorking') === '-1') {
                        totalTime = totalTime + seconds + (timer.work + timer.rest) * Number(localStorage.getItem('roundsRemaining')) + timer.rest;
                    } else {
                        totalTime = totalTime + seconds + (timer.work + timer.rest) * Number(localStorage.getItem('roundsRemaining'));
                    }
                }
            }
            if (i > currentTimerID) {
                if (timer.type === 'Stopwatch') {
                    totalTime = totalTime + timer.time;
                }

                if (timer.type === 'Countdown') {
                    totalTime = totalTime + timer.time;
                }

                if (timer.type === 'XY') {
                    totalTime = totalTime + timer.work * timer.rounds;
                }

                if (timer.type === 'Tabata') {
                    totalTime = totalTime + (timer.work + timer.rest) * timer.rounds;
                }
            }
        }
        if (totalTime < 0) totalTime = 0;
        return formatTime(totalTime);
    }
    return formatTime(0);
};

interface TimerData {
    type: string;
    time: number;
    rounds: number;
    work: number;
    rest: number;
    description: string;
}

function getTotalTime(parsedTimerData: TimerData[]) {
    const isAtLeastOneTimer = parsedTimerData[0].type !== '';

    if (isAtLeastOneTimer) {
        let totalTime = 0;

        for (let i = 0; i < parsedTimerData.length; i++) {
            const timer = parsedTimerData[i];
            if (timer.type === 'Stopwatch' || timer.type === 'Countdown') {
                totalTime = totalTime + timer.time;
            }

            if (timer.type === 'XY') {
                totalTime = totalTime + timer.work * timer.rounds;
            }

            if (timer.type === 'Tabata') {
                totalTime = totalTime + (timer.work + timer.rest) * timer.rounds;
            }
        }

        return formatTime(totalTime);
    }

    return formatTime(0);
}

export { formatTime, userInputCleanup, getTotalTime, getTimeRemaining };
