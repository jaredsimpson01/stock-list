// src/pages/Saved.jsx
import StockCard from "../components/StockCard";
import { useFavouriteContext } from "../contexts/FavouriteContext";
import { usePortfolioContext } from "../contexts/PortfolioContext";
import BuyModal from "../components/BuyModal";
import '../css/Saved.css';
import { useState } from "react";

function Saved() {
    const { favourites } = useFavouriteContext();
    const { buyStock } = usePortfolioContext();

    const [selectedStock, setSelectedStock] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleBuyClick = (stock) => {
        setSelectedStock(stock);
        setIsModalOpen(true);
    };

    const handleBuyConfirm = (stock, quantity) => {
        buyStock(stock, quantity);
        setIsModalOpen(false);
    };

    return (
        <div className="saved-page">
            {favourites.length > 0 ? (
                <>
                    <div className="saved-header">
                        <span>Stock</span>
                        <span>Name</span>
                        <span>Price</span>
                        <span>Change</span>
                        <span>Saved</span>
                    </div>

                    {favourites.map((stock) => (
                        <StockCard
                            key={stock.ID}
                            stock={stock}
                            onBuyClick={handleBuyClick}
                        />
                    ))}

                    {selectedStock && (
                        <BuyModal
                            stock={selectedStock}
                            isOpen={isModalOpen}
                            onClose={() => setIsModalOpen(false)}
                            onBuyConfirm={handleBuyConfirm}
                        />
                    )}
                </>
            ) : (
                <div className="saved-empty">
                    <h2>No Favourite Stocks Yet</h2>
                    <p>Start adding stocks to your favourites and they'll appear here.</p>
                </div>
            )}
        </div>
    );
}

export default Saved;
