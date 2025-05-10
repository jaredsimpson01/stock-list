import './App.css'
import Navbar from './components/Navbar'
import {Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import Portfolio from './pages/Portfolio'
import Saved from './pages/Saved'
import Stocks from './pages/Stocks'
import { FavouriteProvider } from './contexts/FavouriteContext'
import { PortfolioProvider } from './contexts/PortfolioContext';

function App() {
  return (
    <PortfolioProvider>
      <FavouriteProvider>
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Stocks" element={<Stocks />} />
            <Route path="/Saved" element={<Saved />} />
            <Route path="/Portfolio" element={<Portfolio />} /> {/* NEW */}
          </Routes>
        </main>
      </FavouriteProvider>
    </PortfolioProvider>
  );
}


export default App