import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useMarketplace } from '../context/MarketplaceContext';
import ListingsGrid from '../components/ListingsGrid';
import { Search } from 'lucide-react';
import './Home.css';

export default function Home() {
  const { categories, cities, listings } = useMarketplace();
  const navigate = useNavigate();
  const [selectedCity, setSelectedCity] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (selectedCity) {
      navigate(`/listings/location/${selectedCity.toLowerCase()}`);
    }
  };

  const recentListings = listings.slice(0, 8);

  return (
    <div className="home-page">
      <section className="hero-section">
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">Find anything in your city</h1>
            <form className="search-form" onSubmit={handleSearch}>
              <div className="search-input-group">
                <select 
                  className="form-control search-select" 
                  value={selectedCity} 
                  onChange={(e) => setSelectedCity(e.target.value)}
                >
                  <option value="">All India</option>
                  {cities.map(city => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
              </div>
              <button type="submit" className="btn btn-primary search-btn">
                <Search size={20} />
                <span>Search</span>
              </button>
            </form>
          </div>
        </div>
      </section>

      <section className="categories-section container">
        <h2 className="section-title">Browse categories</h2>
        <div className="categories-grid">
          {categories.map(category => (
            <Link to={`/listings/category/${category.id}`} key={category.id} className="category-card">
              <span className="category-name">{category.name}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="recent-listings-section container">
        <h2 className="section-title">Fresh recommendations</h2>
        <ListingsGrid listings={recentListings} />
      </section>
    </div>
  );
}
