import { useState } from "react";
import '../css/SellModal.css';

function SellModal({ stock, isOpen, onClose, onSellConfirm }) {
    const [quantity, setQuantity] = useState(1);
    const [error, setError] = useState("");

    if (!isOpen) return null;

    function handleConfirm() {
        if (quantity > stock.quantity) {
            setError(`You only have ${stock.quantity} shares!`);
            return;
        }
        onSellConfirm(stock.ID, quantity);
        onClose();
        setQuantity(1);
        setError("");
    }

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Sell {stock.title}</h2>
                <input
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) => setQuantity(parseInt(e.target.value))}
                />
                {error && <p className="error-text">{error}</p>}
                <div className="modal-buttons">
                    <button onClick={handleConfirm}>Confirm</button>
                    <button onClick={onClose}>Cancel</button>
                </div>
            </div>
        </div>
    );
}

export default SellModal;
