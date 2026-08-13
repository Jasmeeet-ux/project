import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useMarketplace } from '../context/MarketplaceContext';
import { Store, PlusCircle, LogOut, User } from 'lucide-react';
import './Navbar.css';

export default function Navbar() {
  const { user, logout } = useMarketplace();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="navbar">
      <div className="container navbar-container">
        <Link to="/" className="navbar-brand">
          <Store className="navbar-logo-icon" />
          <span>Marketplace</span>
        </Link>
        
        <nav className="navbar-nav">
          {user ? (
            <>
              <div className="user-info">
                <User size={18} />
                <span>Hi, {user.name}</span>
              </div>
              <Link to="/post" className="btn btn-primary nav-post-btn">
                <PlusCircle size={18} />
                <span>SELL</span>
              </Link>
              <button onClick={handleLogout} className="btn btn-outline nav-logout-btn">
                <LogOut size={18} />
                <span>Logout</span>
              </button>
            </>
          ) : (
            <>
              <Link to="/register" className="btn btn-outline nav-login-btn">
                <span>Register</span>
              </Link>
              <Link to="/register" className="btn btn-primary nav-post-btn">
                <PlusCircle size={18} />
                <span>SELL</span>
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
