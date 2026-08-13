import React from 'react';
import { useParams } from 'react-router-dom';
import { useMarketplace } from '../context/MarketplaceContext';
import ListingsGrid from '../components/ListingsGrid';

export default function Listings() {
  const { city, category } = useParams();
  const { listings, categories } = useMarketplace();

  let filteredListings = listings;
  let title = "All Listings";

  if (city) {
    filteredListings = filteredListings.filter(l => l.city.toLowerCase() === city.toLowerCase());
  }
  
  if (category) {
    filteredListings = filteredListings.filter(l => l.category === category);
  }

  if (city && category) {
    const catName = categories.find(c => c.id === category)?.name || category;
    title = `${catName} in ${city.charAt(0).toUpperCase() + city.slice(1)}`;
  } else if (city) {
    title = `Listings in ${city.charAt(0).toUpperCase() + city.slice(1)}`;
  } else if (category) {
    const catName = categories.find(c => c.id === category)?.name || category;
    title = `${catName}`;
  }

  return (
    <div className="container">
      <h1 style={{ marginBottom: '2rem' }}>{title}</h1>
      <ListingsGrid 
        listings={filteredListings} 
        emptyMessage={`No listings found for your search criteria.`} 
      />
    </div>
  );
}
