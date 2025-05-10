import { useState, useEffect } from "react";
import '../css/BuyModal.css';

function BuyModal({ stock, isOpen, onClose, onBuyConfirm }) {
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
        return () => document.body.style.overflow = "auto";
    }, [isOpen]);

    if (!isOpen) return null;

    function handleOverlayClick(e) {
        if (e.target.classList.contains('modal-overlay')) {
            onClose();
            setQuantity(1);
        }
    }

    function handleConfirm() {
        if (quantity > 0) {
            onBuyConfirm(stock, quantity);
            onClose();
            setQuantity(1);
        }
    }

    return (
        <div className="modal-overlay" onClick={handleOverlayClick}>
            <div className="modal-content">
                <h2>Buy {stock.title}</h2>
                <input
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                />
                <div className="modal-buttons">
                    <button onClick={handleConfirm}>Confirm</button>
                    <button onClick={onClose}>Cancel</button>
                </div>
            </div>
        </div>
    );
}

export default BuyModal;
