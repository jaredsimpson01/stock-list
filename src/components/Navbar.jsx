import { Link } from "react-router-dom";
import '../css/Navbar.css';

function Navbar() {
    return (
      <nav className="navbar">
        <div className="navbar-brand">Grandslam</div>
        <div className="navbar-links">
          <Link to="/">Home</Link>
          <Link to="/Stocks">Stocks</Link>
          <Link to="/Saved">Saved</Link>
          <Link to="/Portfolio">Portfolio</Link>
        </div>
      </nav>
    );
}

export default Navbar;
