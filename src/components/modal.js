// Modal.js
import React from 'react';
import './Clientes';

const Modal = ({ show, handleClose, handleConfirm, title, children }) => {
    if (!show) {
        return null;
    }

    return (
        <div className="modal-overlay">
            <div className="modal">
                <div className="modal-header">
                    <h2>{title}</h2>
                </div>
                <div className="modal-body">
                    {children}
                </div>
                <div className="modal-footer">
                    <button onClick={handleClose}>Cancelar</button>
                    <button onClick={handleConfirm}>Ok</button>
                </div>
            </div>
        </div>
    );
};

export default Modal;
