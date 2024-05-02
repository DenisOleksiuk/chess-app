import { Chess, Move, Square } from 'chess.js';
import { Chessboard } from 'react-chessboard';
import { useState } from 'react';

type MakeAMoveProps = Pick<Move, 'from' | 'to' | 'promotion'> | string;

const chess = new Chess();

export default function Game() {
    const [fen, setFen] = useState(chess.fen());

    function makeAMove(move: MakeAMoveProps) {
        const moveResult = chess.move(move);
        setFen(chess.fen());
        return moveResult;
    }

    function makeRandomMove() {
        const possibleMoves = chess.moves();

        if (chess.isGameOver() || chess.isDraw() || possibleMoves.length === 0) {
            return;
        }

        const randomIndex = Math.floor(Math.random() * possibleMoves.length);
        makeAMove(possibleMoves[randomIndex]);
    }

    function onDrop(sourceSquare: Square, targetSquare: Square) {
        const move = makeAMove({
            from: sourceSquare,
            to: targetSquare,
            promotion: 'q'
        });

        if (move === null) return false;
        setTimeout(makeRandomMove, 200);
        return true;
    }
    return <Chessboard boardWidth={560} position={fen} onPieceDrop={onDrop} />;
}
