import { createContext, useContext, useState, useEffect } from "react";

const PortfolioContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export function usePortfolioContext() {
    return useContext(PortfolioContext);
}

export function PortfolioProvider({ children }) {
    const [portfolio, setPortfolio] = useState(() => {
        const saved = localStorage.getItem('portfolio');
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem('portfolio', JSON.stringify(portfolio));
    }, [portfolio]);


    function buyStock(stock, quantity = 1) {  // <-- Accept quantity!
        setPortfolio(prev => {
            const existing = prev.find(item => item.ID === stock.ID);
            if (existing) {
                return prev.map(item =>
                    item.ID === stock.ID ? { ...item, quantity: item.quantity + quantity } : item
                );
            } else {
                return [...prev, { ...stock, quantity }];
            }
        });
    }


    function sellStock(stockID, quantity = 1) {
        setPortfolio(prev => {
            return prev
                .map(item => 
                    item.ID === stockID ? { ...item, quantity: item.quantity - quantity } : item
                )
                .filter(item => item.quantity > 0);
        });
    }


    return (
        <PortfolioContext.Provider value={{ portfolio, buyStock, sellStock }}>
            {children}
        </PortfolioContext.Provider>
    );
}
