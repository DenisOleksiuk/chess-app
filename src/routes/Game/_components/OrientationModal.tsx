import { useTimer } from '@/hooks/useTimer';
import Modal from '../../../components/Modal';
import { BoardOrientation } from 'react-chessboard/dist/chessboard/types';

interface OrientationModalProps {
    isOpen: boolean;
    setOrientation: React.Dispatch<React.SetStateAction<BoardOrientation | undefined>>;
    player1Timer: ReturnType<typeof useTimer>;
    player2Timer: ReturnType<typeof useTimer>;
    makeARandomMove: () => void;
}

export const OrientationModal = ({
    isOpen,
    setOrientation,
    player1Timer,
    player2Timer,
    makeARandomMove
}: OrientationModalProps) => {
    const onWhiteClick = () => {
        setOrientation('white');
        player1Timer.resetTimer({ isPaused: true });
        player2Timer.resetTimer({ isPaused: false });
    };

    const onBlackClick = () => {
        setOrientation('black');
        player1Timer.resetTimer({ isPaused: false });
        player2Timer.resetTimer({ isPaused: true });
        makeARandomMove();
    };

    return (
        <Modal isOpen={isOpen} onClose={() => {}}>
            <Modal.Title>Choosing a side</Modal.Title>
            <div style={{ display: 'flex', gap: '20px' }}>
                <Modal.Button onClick={onWhiteClick}>White</Modal.Button>
                <Modal.Button onClick={onBlackClick}>Black</Modal.Button>
            </div>
        </Modal>
    );
};
