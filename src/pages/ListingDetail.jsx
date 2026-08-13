import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useMarketplace } from '../context/MarketplaceContext';
import { MapPin, Calendar, Tag } from 'lucide-react';

export default function ListingDetail() {
  const { id } = useParams();
  const { listings, categories } = useMarketplace();
  
  const listing = listings.find(l => l.id === id);

  if (!listing) {
    return (
      <div className="container" style={{ textAlign: 'center', marginTop: '4rem' }}>
        <h2>Listing not found</h2>
        <Link to="/" className="btn btn-primary" style={{ marginTop: '1rem' }}>Back to Home</Link>
      </div>
    );
  }

  const formattedPrice = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(listing.price);

  const categoryName = categories.find(c => c.id === listing.category)?.name || listing.category;
  const date = new Date(listing.createdAt).toLocaleDateString();

  return (
    <div className="container" style={{ marginTop: '2rem', marginBottom: '4rem' }}>
      <div className="card">
        <div style={{ aspectRatio: '16/9', overflow: 'hidden', backgroundColor: '#f1f5f9' }}>
          <img 
            src={listing.imageUrl} 
            alt={listing.name} 
            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
          />
        </div>
        
        <div style={{ padding: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
            <div>
              <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{listing.name}</h1>
              <h2 style={{ fontSize: '2.5rem', fontWeight: '700', color: 'var(--primary)' }}>{formattedPrice}</h2>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '1.5rem', margin: '1.5rem 0', color: 'var(--text-muted)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <MapPin size={18} />
              <span>{listing.area}, {listing.city}, {listing.state}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Tag size={18} />
              <span>{categoryName} {listing.subcategory ? `> ${listing.subcategory}` : ''}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Calendar size={18} />
              <span>Posted on {date}</span>
            </div>
          </div>

          <div style={{ marginTop: '2rem', borderTop: '1px solid var(--border-color)', paddingTop: '2rem' }}>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Description</h3>
            <p style={{ whiteSpace: 'pre-wrap', color: 'var(--text-main)', lineHeight: '1.6' }}>
              {listing.detail}
            </p>
          </div>
          
          <div style={{ marginTop: '2rem', borderTop: '1px solid var(--border-color)', paddingTop: '2rem' }}>
             <button className="btn btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.1rem' }}>
               Contact Seller
             </button>
          </div>
        </div>
      </div>
    </div>
  );
}
