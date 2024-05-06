import { useState, useEffect } from 'react';

import './timer.css';

type Props = {
    position: 'left' | 'right';
    isPause: boolean;
    reset: boolean;
    onTimerFinish: () => void;
};

const Timer = ({ position, isPause, reset, onTimerFinish }: Props) => {
    const [seconds, setSeconds] = useState(600);

    useEffect(() => {
        if (reset) {
            setSeconds(600);
        }
    }, [reset]);

    useEffect(() => {
        if (seconds === 0) {
            onTimerFinish();
        }

        if (!isPause && seconds > 0) {
            const intervalId = setInterval(() => {
                setSeconds(seconds - 1);
            }, 1000);

            return () => clearInterval(intervalId);
        }
    }, [seconds, isPause, onTimerFinish]);

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    return (
        <div
            role="timer"
            tabIndex={0}
            className="timer"
            style={position === 'left' ? { marginRight: 'auto' } : { marginLeft: 'auto' }}
        >
            <span>
                {minutes.toString().padStart(2, '0')}:
                {remainingSeconds.toString().padStart(2, '0')}
            </span>
        </div>
    );
};

export default Timer;
