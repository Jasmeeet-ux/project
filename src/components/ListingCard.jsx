import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin } from 'lucide-react';
import './ListingCard.css';

export default function ListingCard({ listing }) {
  const formattedPrice = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(listing.price);

  return (
    <Link to={`/listing/${listing.id}`} className="listing-card card">
      <div className="listing-image-container">
        <img src={listing.imageUrl} alt={listing.name} className="listing-image" />
      </div>
      <div className="listing-content">
        <h3 className="listing-price">{formattedPrice}</h3>
        <p className="listing-title" title={listing.name}>{listing.name}</p>
        
        <div className="listing-footer">
          <div className="listing-location">
            <MapPin size={14} />
            <span>{listing.area}, {listing.city}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
