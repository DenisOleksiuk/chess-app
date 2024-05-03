import Modal from '@/components/Modal';

interface ResultModalProps {
    isOpen: boolean;
    onClose: () => void;
    winner: string;
}

export const ResultModal = ({ isOpen, onClose, winner }: ResultModalProps) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <Modal.Title>Game Over</Modal.Title>
            <Modal.Content>Winner: {winner}</Modal.Content>
            <Modal.Button onClick={onClose}>Close</Modal.Button>
        </Modal>
    );
};
