import { useState, useEffect } from 'react';

type Props = {
    position: 'left' | 'right';
    isPause: boolean;
    reset: boolean;
    onTimerFinish: () => void;
};

export const Timer = ({ position, isPause, reset, onTimerFinish }: Props) => {
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
        <div style={{ textAlign: position }} className="my-4">
            <span className="border-white border-2 p-2">
                {minutes.toString().padStart(2, '0')}:
                {remainingSeconds.toString().padStart(2, '0')}
            </span>
        </div>
    );
};
