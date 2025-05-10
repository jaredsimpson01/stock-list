import { useFavouriteContext } from "../contexts/FavouriteContext";
import '../css/StockCard.css';

function StockCard({ stock, onBuyClick }) {
    const { isFavourite, addToFavourites, removeFromFavourites } = useFavouriteContext();
    const fav = isFavourite(stock.ID);

    function onFavouriteClick(e) {
        e.preventDefault();
        if (fav) removeFromFavourites(stock.ID);
        else addToFavourites(stock);
    }

    return (
        <div className="stock-card">
            <div>{stock.title}</div>
            <div>{stock.name}</div>
            <div>${stock.price}</div>
            <div>{stock.priceChange}</div>
            <div className="stock-actions">
                <button onClick={onFavouriteClick} className="favourite-btn">
                    {fav ? "❤️" : "🤍"}
                </button>
                <button onClick={(e) => {e.preventDefault(); onBuyClick(stock);}} className="buy-btn">
                    Buy
                </button>
            </div>
        </div>
    );
}

export default StockCard;
