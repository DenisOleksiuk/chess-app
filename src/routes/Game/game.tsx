import { useCallback, useEffect, useState } from 'react';
import { Square } from 'chess.js';
import { Chessboard } from 'react-chessboard';
import { BoardOrientation } from 'react-chessboard/dist/chessboard/types';

import Timer from '@/components/Timer';
import { useChess } from '@/hooks/useChess';
import { useTimer } from '@/hooks/useTimer';
import { useIsMobile } from '@/hooks/useIsMobile';
import { wait } from '@/utils';

import { OrientationModal } from './_components/OrientationModal';
import { ResultModal } from './_components/ResultModal';
import { ButtonsContainer } from './_components/ButtonsContainer/ButtonsContainer';

import './game.css';

export default function Game() {
    const {
        chess,
        fen,
        makeAMove,
        makeRandomMove,
        reset,
        undo,
        isGameOver,
        winner,
        setWinner
    } = useChess();
    const isMobile = useIsMobile();
    const [isResultModalOpen, setIsResultModalOpen] = useState(false);
    const [orientation, setOrientation] = useState<BoardOrientation>();

    const player1Timer = useTimer({ isPaused: true });
    const player2Timer = useTimer({ isPaused: true });

    const makeARandomMove = useCallback(() => {
        wait(500).then(() => {
            makeRandomMove();
            player1Timer.togglePause();
            player2Timer.togglePause();
        });
    }, [makeRandomMove, player1Timer, player2Timer]);

    function onDrop(sourceSquare: Square, targetSquare: Square) {
        if (
            (orientation === 'white' && chess.turn() === 'b') ||
            (orientation === 'black' && chess.turn() === 'w')
        ) {
            return false;
        }

        const move = makeAMove({
            from: sourceSquare,
            to: targetSquare,
            promotion: 'q'
        });

        if (move === null) {
            return false;
        }

        player1Timer.togglePause();
        player2Timer.togglePause();

        makeARandomMove();

        return true;
    }

    const handleNewGame = () => {
        reset();

        if (orientation === 'black') {
            makeARandomMove();

            player1Timer.resetTimer({ isPaused: false });
            player2Timer.resetTimer({ isPaused: true });

            return;
        }

        player1Timer.resetTimer({ isPaused: true });
        player2Timer.resetTimer({ isPaused: false });
    };

    const onCloseResultModal = () => {
        setIsResultModalOpen(false);
        handleNewGame();
    };

    const onFinishTimer = (winner: string) => {
        setIsResultModalOpen(true);
        setWinner(winner);
        player1Timer.resetTimer({ isPaused: true });
        player2Timer.resetTimer({ isPaused: true });
    };

    useEffect(() => {
        if (isGameOver) {
            setIsResultModalOpen(true);
        }
    }, [isGameOver]);

    if (!orientation) {
        return (
            <OrientationModal
                isOpen={!orientation}
                setOrientation={setOrientation}
                player1Timer={player1Timer}
                player2Timer={player2Timer}
                makeARandomMove={makeARandomMove}
            />
        );
    }

    return (
        <div style={{ width: isMobile ? 320 : 560 }}>
            <div className="board-container">
                <Timer
                    position={'left'}
                    isPause={player1Timer.isPaused}
                    reset={player1Timer.reset}
                    onTimerFinish={() => onFinishTimer('Black')}
                />
                <Chessboard
                    position={fen}
                    onPieceDrop={onDrop}
                    boardOrientation={orientation}
                />
                <Timer
                    position={'right'}
                    isPause={player2Timer.isPaused}
                    reset={player2Timer.reset}
                    onTimerFinish={() => onFinishTimer('White')}
                />
            </div>

            <ButtonsContainer newGame={handleNewGame} undo={undo} />

            <ResultModal
                isOpen={isResultModalOpen}
                onClose={onCloseResultModal}
                winner={winner}
            />
        </div>
    );
}
