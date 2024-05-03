import React from 'react';

const ModalContent = ({ children }: { children: React.ReactNode }) => {
    return <div className="modal-content">{children}</div>;
};

export default ModalContent;
