import React from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';

import ModalTitle from './ModalTitle';
import ModalContent from './ModalContent';
import ModalButton from './ModalButton';

import './Modal.css';
import useOnClickOutside from '@/hooks/useOnClickOutside';

type ModalProps = {
    isOpen: boolean;
    onClose: () => void;
    children?: React.ReactNode;
};

const ModalComponent = ({ isOpen, onClose, children }: ModalProps) => {
    const ref = useOnClickOutside(onClose);

    if (!isOpen) return null;

    return createPortal(
        <div className="overlay">
            <div className="chess-result-modal" ref={ref}>
                <button className="close-icon" onClick={onClose}>
                    <X />
                </button>

                {children}
            </div>
        </div>,
        document.body
    );
};

const Modal = Object.assign(ModalComponent, {
    Title: ModalTitle,
    Content: ModalContent,
    Button: ModalButton
});

export default Modal;
