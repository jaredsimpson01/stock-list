import '../css/Home.css';

function Home() {
    return (
        <div className="home-page">
            <h1>Welcome to Grandslam Stocks 📈</h1>
            <p>Track your favorite stocks, build your portfolio, and stay ahead of the market.</p>
            <div className="home-buttons">
                <a href="/Stocks" className="btn-primary">View Stocks</a>
                <a href="/Saved" className="btn-secondary">Your Saved Stocks</a>
            </div>
        </div>
    );
}

export default Home;
