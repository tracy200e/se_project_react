import { useEffect } from "react";
import "./Modal.css"

export const Modal = ({ name, onClose, children }) => {

    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === "Escape") {
                onClose();
            }
        };
    

    document.addEventListener("keydown", handleEscape);

    return () => document.removeEventListener("keydown", handleEscape);
    }, [onClose]);

    const handleOverlay = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div className={`modal modal_type_${name}`} onClick={handleOverlay}>
            <div className="modal__container">
                <button 
                className="modal__close-button" 
                type="button" 
                onClick={onClose} 
                />
                {children}
            </div>
        </div>
    );
};