import { useCallback } from 'react';
import { wait } from '@/utils';
import { useTimer } from './useTimer';

export const useMakeMove = (
    makeRandomMove: () => void,
    player1Timer: ReturnType<typeof useTimer>,
    player2Timer: ReturnType<typeof useTimer>
) => {
    const makeMove = useCallback(() => {
        wait(2000).then(() => {
            makeRandomMove();
            player1Timer.togglePause();
            player2Timer.togglePause();
        });
    }, [makeRandomMove, player1Timer, player2Timer]);

    return makeMove;
};
