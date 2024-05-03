// hooks/useChess.ts
import { useState, useCallback, useMemo } from 'react';
import { Chess, Move } from 'chess.js';

type MakeAMoveProps = Pick<Move, 'from' | 'to' | 'promotion'> | string;

// isCheckmate fen rnb1kbnr/pppp1ppp/8/4p2q/5PP1/8/PPPPP2P/RNBQKBNR b KQkq - 1 3

export const useChess = () => {
    const chess = useMemo(
        () => new Chess('rnb1kbnr/pppp1ppp/8/4p2q/5PP1/8/PPPPP2P/RNBQKBNR b KQkq - 1 3'),
        []
    );
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

    return {
        fen,
        makeAMove,
        makeRandomMove,
        reset,
        undo,
        isGameOver,
        winner,
        setWinner
    };
};
