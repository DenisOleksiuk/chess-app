import { useState } from 'react';
import { Square } from 'chess.js';

import { Chessboard } from 'react-chessboard';
import { useChess } from '@/hooks/useChess';
import { useTimer } from '@/hooks/useTimer';
import { wait } from '@/utils';
import { Timer } from '@/components/Timer';
import ChessResultModal from '@/components/ChessResultModal';

export default function Game() {
    const { fen, makeAMove, makeRandomMove, reset, undo, isGameOver } = useChess();
    const [isModalOpen, setIsModalOpen] = useState(true);

    const player1Timer = useTimer({ isPaused: true });
    const player2Timer = useTimer({ isPaused: false });

    console.log('isGameOver :>> ', isGameOver);

    function onDrop(sourceSquare: Square, targetSquare: Square) {
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

        wait(1000).then(() => {
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

    return (
        <div style={{ width: 560 }}>
            <ChessResultModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                winner="test"
            />
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

            <div className="flex gap-5 mt-4">
                <button onClick={newGame}>New game</button>
                <button onClick={undo}>Undo</button>
            </div>
        </div>
    );
}
