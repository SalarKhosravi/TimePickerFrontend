// src/components/ToastNotifications.jsx
import { useState, useEffect } from "react";
import { Toast, ToastContainer } from "react-bootstrap";

let externalShow;

export function ToastNotifications() {
    const [toastData, setToastData] = useState({
        show: false,
        header: "",
        message: "",
        duration: 3000,
        bgColor: "primary",
    });

    useEffect(() => {
        // expose the function globally
        externalShow = (header, message, duration = 3000, bgColor = 'primary') => {
            setToastData({ show: true, header, message, duration, bgColor });
            setTimeout(() => setToastData((t) => ({ ...t, show: false })), duration);
        };
    }, []);

    return (
        <ToastContainer position="top-end" className={'p-3 mt-5'}>
            <Toast
                show={toastData.show}
                bg={toastData.bgColor}
                onClose={() => setToastData((t) => ({ ...t, show: false }))}
            >
                <Toast.Header>
                    <strong className="me-auto">{toastData.header.toUpperCase()}</strong>
                </Toast.Header>
                <Toast.Body className="text-white">{toastData.message}</Toast.Body>
            </Toast>
        </ToastContainer>
    );
}

// export an object that can be called anywhere
export const toaste = {
    show: (header, message, duration, bgColor) => {
        if (externalShow) externalShow(header, message, duration, bgColor);
        else console.warn("ToastComponent not mounted yet");
    },
};
