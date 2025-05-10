import { useState } from "react";
import { usePortfolioContext } from "../contexts/PortfolioContext";
import SellModal from "../components/SellModal";
import '../css/Portfolio.css';

function Portfolio() {
    const { portfolio, sellStock } = usePortfolioContext();
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedStock, setSelectedStock] = useState(null);

    const totalValue = portfolio.reduce((sum, stock) => {
        return sum + (parseFloat(stock.price) * stock.quantity);
    }, 0);

    function onSellClick(stock) {
        setSelectedStock(stock);
        setModalOpen(true);
    }

    function handleSellConfirm(stockID, quantity) {
        sellStock(stockID, quantity);
    }

    return (
        <div className="portfolio-page">
            <h1>Your Portfolio</h1>
            {portfolio.length > 0 ? (
                <>
                    <div className="portfolio-header">
                        <span>Stock</span>
                        <span>Price</span>
                        <span>Quantity</span>
                        <span>Total</span>
                        <span>Action</span>
                    </div>

                    {portfolio.map((stock) => (
                        <div className="portfolio-card" key={stock.ID}>
                            <div>{stock.title}</div>
                            <div>${stock.price}</div>
                            <div>{stock.quantity}</div>
                            <div>${(parseFloat(stock.price) * stock.quantity).toFixed(2)}</div>
                            <div>
                                <button onClick={() => onSellClick(stock)}>Sell</button>
                            </div>
                        </div>
                    ))}
                    <h2 className="portfolio-total">Portfolio Value: ${totalValue.toFixed(2)}</h2>

                    <SellModal
                        stock={selectedStock}
                        isOpen={modalOpen}
                        onClose={() => setModalOpen(false)}
                        onSellConfirm={handleSellConfirm}
                    />
                </>
            ) : (
                <p>You don't own any stocks yet.</p>
            )}
        </div>
    );
}

export default Portfolio;
