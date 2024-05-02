import { Chess } from 'chess.js';
import { Chessboard } from 'react-chessboard';
import { useState } from 'react';

const chess = new Chess();

export default function Game() {
    const [game, setGame] = useState<Chess>(chess);

    // perform modify function on game state
    function safeGameMutate(modify: (game: Chess) => void) {
        setGame((g: Chess) => {
            const update = new Chess(g.fen()); // create a new Chess instance with the current game state
            modify(update);
            return update;
        });
    }
    // make computer move
    function makeRandomMove() {
        const possibleMoves = game.moves();
        // exit if the game is over
        if (game.isGameOver() || game.isDraw() || possibleMoves.length === 0) return;
        // select random move
        const randomIndex = Math.floor(Math.random() * possibleMoves.length);
        // play random move
        safeGameMutate((game) => {
            game.move(possibleMoves[randomIndex]);
        });
    }
    // perform action when piece dropped by user
    function onDrop(sourceSquare: string, targetSquare: string) {
        console.log('sourceSquare :>> ', sourceSquare);
        console.log('targetSquare :>> ', targetSquare);
        // attempt move
        let move = null;
        safeGameMutate((game) => {
            move = game.move({
                from: sourceSquare,
                to: targetSquare,
                promotion: 'q'
            });
        });

        // illegal move made
        if (move === null) return false;
        // valid move made, make computer move
        setTimeout(makeRandomMove, 200);
        return true;
    }
    return <Chessboard boardWidth={560} position={game.fen()} onPieceDrop={onDrop} />;
}
