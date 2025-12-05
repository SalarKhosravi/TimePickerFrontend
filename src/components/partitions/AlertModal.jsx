import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export default function AlertModal({ message, onConfirm, buttonColor = 'warning', confirmText = "Yes", cancelText = "No", children }) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleConfirm = () => {
        if (onConfirm) onConfirm();
        handleClose();
    };

    return (
        <>
            <span onClick={handleShow} style={{ cursor: 'pointer' }}>
                {children}
            </span>

            <Modal show={show} onHide={handleClose} centered>
                <Modal.Body className={'py-5 h6'}>{message}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        {cancelText}
                    </Button>
                    <Button variant={buttonColor} onClick={handleConfirm}>
                        {confirmText}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
