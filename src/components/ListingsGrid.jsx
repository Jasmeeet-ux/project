import React from 'react';
import ListingCard from './ListingCard';

export default function ListingsGrid({ listings, emptyMessage = "No listings found." }) {
  if (!listings || listings.length === 0) {
    return (
      <div className="empty-state" style={{ padding: '3rem', textAlign: 'center', backgroundColor: 'var(--card-bg)', borderRadius: 'var(--border-radius)', border: '1px solid var(--border-color)' }}>
        <p style={{ color: 'var(--text-muted)' }}>{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-4">
      {listings.map(listing => (
        <ListingCard key={listing.id} listing={listing} />
      ))}
    </div>
  );
}
