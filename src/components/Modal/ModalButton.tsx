import React from 'react';

const ModalButton = ({
    onClick,
    children
}: {
    onClick: () => void;
    children: React.ReactNode;
}) => {
    return (
        <button className="modal-button" onClick={onClick}>
            {children}
        </button>
    );
};

export default ModalButton;
