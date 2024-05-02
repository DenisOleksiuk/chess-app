type ChessResultModalProps = {
    isOpen: boolean;
    onClose: () => void;
    winner: string;
};

const ChessResultModal = ({ isOpen, onClose, winner }: ChessResultModalProps) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
            <div className="flex flex-col justify-center items-center bg-white p-6 rounded-lg shadow-lg max-w-sm w-full h-96">
                <h2 className="text-xl text-gray-500 font-bold mb-4">Game Over</h2>
                <p className="mb-4 text-gray-500">Winner: {winner}</p>
                <button
                    onClick={onClose}
                    className="text-white font-bold py-2 px-4 rounded"
                >
                    Close
                </button>
            </div>
        </div>
    );
};

export default ChessResultModal;
