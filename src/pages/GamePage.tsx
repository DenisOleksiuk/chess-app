import React from 'react';
import Chessboard from './Chessboard';
import { Square } from './ChessTypes';

interface GamePageProps {
    squares: Square[];
    onMove: (source: string, destination: string) => void;
}

const GamePage: React.FC<GamePageProps> = ({ squares, onMove }) => {
    return (
        <div className="game">
            <h1>Chess Game</h1>
            <Chessboard squares={squares} onMove={onMove} />
            <button onClick={() => onMove('E2', 'E4')}>Example Move</button>
        </div>
    );
};

export default GamePage;
