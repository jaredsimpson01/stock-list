import { useState, useEffect } from "react";
import { getStocks } from "../services/api";
import StockCard from "../components/StockCard";
import BuyModal from "../components/BuyModal";
import { usePortfolioContext } from "../contexts/PortfolioContext";
import '../css/Stocks.css';

function Stocks() {
    const [stocks, setStocks] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedStock, setSelectedStock] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const { buyStock } = usePortfolioContext();

    const handleBuyClick = (stock) => {
        setSelectedStock(stock);
        setIsModalOpen(true);
    };

    const handleBuyConfirm = (stock, quantity) => {
        buyStock(stock, quantity);
        setIsModalOpen(false);
    };

    useEffect(() => {
        async function fetchStocks() {
            try {
                const stocksFromAPI = await getStocks();
                console.log("Fetched Stocks:", stocksFromAPI);
                setStocks(stocksFromAPI);
            } catch (error) {
                console.error("Error fetching stocks:", error.message);
            }
        }
        fetchStocks();
    }, []);

    return (
        <div className="stocks-page">
            <form className="search-form" onSubmit={(e) => e.preventDefault()}>
                <input
                    type="search"
                    placeholder="Search Stocks..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </form>

            <div className="stocks-list">
                <div className="stocks-header">
                    <span>Stock</span>
                    <span>Name</span>
                    <span>Price</span>
                    <span>Change</span>
                    <span>Saved</span>
                </div>

                {stocks.length > 0 ? (
                    stocks
                        .filter(stock => 
                            stock.title.toLowerCase().includes(searchQuery.toLowerCase())
                        )
                        .map((stock) => (
                            <StockCard
                                key={stock.ID}
                                stock={stock}
                                onBuyClick={handleBuyClick}
                            />
                        ))
                ) : (
                    <p>No stocks available.</p>
                )}
            </div>

            {selectedStock && (
                <BuyModal
                    stock={selectedStock}
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onBuyConfirm={handleBuyConfirm}
                />
            )}
        </div>
    );
}

export default Stocks;
