import React, { createContext, useContext, useState, useEffect } from 'react';
import { initialCategories, initialCities, initialListings } from '../data/mockData';

const MarketplaceContext = createContext();

export function useMarketplace() {
  return useContext(MarketplaceContext);
}

export function MarketplaceProvider({ children }) {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('marketplace_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [listings, setListings] = useState(() => {
    const savedListings = localStorage.getItem('marketplace_listings');
    const parsed = savedListings ? JSON.parse(savedListings) : [];
    // Force load the seeded data if the local storage only has the old initial 3 items or is empty
    if (parsed.length < 10) {
      return initialListings;
    }
    return parsed;
  });

  const categories = initialCategories;
  const cities = initialCities;

  useEffect(() => {
    if (user) {
      localStorage.setItem('marketplace_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('marketplace_user');
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem('marketplace_listings', JSON.stringify(listings));
  }, [listings]);

  const registerUser = (userData) => {
    const newUser = {
      ...userData,
      id: 'user_' + Date.now()
    };
    setUser(newUser);
  };

  const logout = () => {
    setUser(null);
  };

  const addListing = (listingData) => {
    const newListing = {
      ...listingData,
      id: Date.now().toString(),
      sellerId: user.id,
      createdAt: new Date().toISOString(),
      // Add a placeholder image if none provided
      imageUrl: listingData.imageUrl || 'https://images.unsplash.com/photo-1560393464-5c69a73c5770?auto=format&fit=crop&w=500&q=60'
    };
    setListings([newListing, ...listings]);
  };

  const value = {
    user,
    registerUser,
    logout,
    listings,
    addListing,
    categories,
    cities
  };

  return (
    <MarketplaceContext.Provider value={value}>
      {children}
    </MarketplaceContext.Provider>
  );
}
