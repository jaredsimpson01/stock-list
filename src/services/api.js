const defaultStocks = [
  { ID: 1, title: "BTO.TO", name: "B2Gold Corp.", price: "4.1500", priceChange: "-8.59%" },
  { ID: 2, title: "ESM", name: "Euro Sun Mining Inc", price: "0.0950", priceChange: "+18.75%" },
  { ID: 3, title: "AC.TO", name: "Air Canada", price: "14.13", priceChange: "-3.15%" },
  { ID: 4, title: "AYA.TO", name: "Aya Gold & Silver Inc.", price: "10.80", priceChange: "-15.76%" },
  { ID: 5, title: "BHS.V", name: "Bayhorse Silver Inc.", price: "0.0450", priceChange: "+12.50%" },
];


export const getStockSymbols = async () => {
  const API_KEY = import.meta.env.VITE_API_KEY;
  const BASE_URL = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=5min&apikey=${API_KEY}`;
  try {
    if (!API_KEY) throw new Error("No API key provided");

    const url = `https://www.alphavantage.co/query?function=LISTING_STATUS&apikey=${API_KEY}`;
    const response = await fetch(url);
    

    if (!response.ok) throw new Error("API call failed for stock symbols");

    const text = await response.text();
    const rows = text.split("\n").slice(1);
    const symbols = rows
      .map(row => {
        const [symbol, name] = row.split(",");
        return symbol && name ? { symbol, name } : null;
      })
      .filter(Boolean)
      .slice(0, 10);

    return symbols;
  } catch (error) {
    console.error("Failed to fetch stock symbols:", error.message);
    return null;
  }
};

export const getStocks = async () => {
  const API_KEY = import.meta.env.VITE_API_KEY;
  const BASE_URL = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=5min&apikey=${API_KEY}`;
  try {
    if (!API_KEY) throw new Error("No API key provided");

    const symbols = await getStockSymbols();
    if (!symbols) throw new Error("No symbols fetched");

    const requests = symbols.map(async ({symbol, name}, index) => {
      const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${API_KEY}`;
      const response = await fetch(url);

      if (!response.ok) throw new Error(`API call failed for symbol: ${symbol}`);

      const data = await response.json();
      const quote = data["Global Quote"];

      if (!quote || !quote["01. symbol"]) {
        console.warn("Invalid or missing quote for:", symbol);
        return null;
      }

      return {
        ID: index+1,
        title: quote["01. symbol"],
        name: name,
        price: quote["05. price"],
        priceChange: quote["10. change percent"],
      };
    });

    const results = await Promise.all(requests);
    const validResults = results.filter(Boolean);

    if (validResults.length === 0) throw new Error("No valid stock quotes retrieved");

    return validResults;
  } catch (error) {
    console.warn("Falling back to default stocks:", error.message);
    return defaultStocks;
  }
};

/*const fetchMatches = async (searchTerm) => {
  const response = await fetch(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${searchTerm}&apikey=${apiKey}`)
  const data = await response.json()
  setResults(data.bestMatches || [])
}*/