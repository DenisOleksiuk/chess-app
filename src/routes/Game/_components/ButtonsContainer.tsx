interface ButtonsContainerProps {
    newGame: () => void;
    undo: () => void;
}

export const ButtonsContainer = ({ newGame, undo }: ButtonsContainerProps) => (
    <div className="buttons-container">
        <button onClick={newGame}>New game</button>
        <button onClick={undo}>Undo</button>
    </div>
);
