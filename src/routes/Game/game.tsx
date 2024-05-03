import { useEffect, useState } from 'react';
import { Square } from 'chess.js';

import { Chessboard } from 'react-chessboard';
import { useChess } from '@/hooks/useChess';
import { useTimer } from '@/hooks/useTimer';
import { wait } from '@/utils';
import { Timer } from '@/components/Timer';
import ChessResultModal from '@/components/ChessResultModal';
import useIsMobile from '@/hooks/useIsMobile';

import './game.css';

export default function Game() {
    const { chess, fen, makeAMove, makeRandomMove, reset, undo, isGameOver, winner } =
        useChess();
    const isMobile = useIsMobile();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const player1Timer = useTimer({ isPaused: true });
    const player2Timer = useTimer({ isPaused: false });

    function onDrop(sourceSquare: Square, targetSquare: Square) {
        if (chess.turn() === 'b') {
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

        wait(3000).then(() => {
            player1Timer.togglePause();
            player2Timer.togglePause();

            makeRandomMove();
        });

        return true;
    }

    const newGame = () => {
        reset();
        player1Timer.resetTimer({ isPaused: true });
        player2Timer.resetTimer({ isPaused: false });
    };

    const onCloseModal = () => {
        setIsModalOpen(false);
        newGame();
    };

    useEffect(() => {
        if (isGameOver) {
            setIsModalOpen(true);
        }
    }, [isGameOver]);

    return (
        <div style={{ width: isMobile ? 320 : 560 }}>
            <Timer
                position={'left'}
                isPause={player1Timer.isPaused}
                reset={player1Timer.reset}
            />
            <Chessboard position={fen} onPieceDrop={onDrop} />
            <Timer
                position={'right'}
                isPause={player2Timer.isPaused}
                reset={player2Timer.reset}
            />

            <div className="buttons-container">
                <button onClick={newGame}>New game</button>
                <button onClick={undo}>Undo</button>
            </div>

            <ChessResultModal
                isOpen={isModalOpen}
                onClose={onCloseModal}
                winner={winner}
            />
        </div>
    );
}
