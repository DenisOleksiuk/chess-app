import { useState, useCallback, useEffect } from 'react';

type TimerProps = {
    isPaused: boolean;
};

export const useTimer = ({ isPaused: isDefaultPaused }: TimerProps) => {
    const [isPaused, setIsPaused] = useState(isDefaultPaused);
    const [reset, setReset] = useState(false);

    const togglePause = useCallback(() => {
        setIsPaused((prevIsPaused) => !prevIsPaused);
    }, []);

    const resetTimer = useCallback(({ isPaused }: { isPaused: boolean }) => {
        setReset(true);
        setIsPaused(isPaused);
    }, []);

    useEffect(() => {
        if (reset) {
            setReset(false);
        }
    }, [reset]);

    return { isPaused, reset, togglePause, resetTimer };
};
