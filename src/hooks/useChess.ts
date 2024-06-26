import { useState, useCallback, useMemo } from 'react';
import { Chess, Move } from 'chess.js';

type MakeAMoveProps = Pick<Move, 'from' | 'to' | 'promotion'> | string;

// isCheckmate fen rnb1kbnr/pppp1ppp/8/4p2q/5PP1/8/PPPPP2P/RNBQKBNR b KQkq - 1 3
// rnb1kb1r/pppp1p2/8/2PP4/P3np2/7q/1P2Kp1p/2RN4 b kq - 0 19

export const useChess = () => {
    const chess = useMemo(() => new Chess(), []);
    const [fen, setFen] = useState(chess.fen());
    const [isGameOver, setIsGameOver] = useState(false);
    const [winner, setWinner] = useState('');

    const makeAMove = useCallback(
        (move: MakeAMoveProps) => {
            const moveResult = chess.move(move);

            if (chess.isGameOver()) {
                setIsGameOver(true);
                setWinner(chess.turn() === 'w' ? 'Black' : 'White');
            }
            setFen(chess.fen());
            return moveResult;
        },
        [chess]
    );

    const makeRandomMove = useCallback(() => {
        const possibleMoves = chess.moves();

        if (chess.isGameOver() || chess.isDraw() || possibleMoves.length === 0) {
            return;
        }

        const randomIndex = Math.floor(Math.random() * possibleMoves.length);

        makeAMove(possibleMoves[randomIndex]);
    }, [chess, makeAMove]);

    const reset = useCallback(() => {
        chess.reset();
        setFen(chess.fen());
    }, [chess]);

    const undo = useCallback(() => {
        chess.undo();
        setFen(chess.fen());
    }, [chess]);

    makeRandomMove;
    return {
        chess,
        fen,
        makeAMove,
        makeRandomMove,
        reset,
        undo,
        isGameOver,
        setIsGameOver,
        winner,
        setWinner
    };
};
