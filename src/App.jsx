import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Register from './pages/Register';
import AddListing from './pages/AddListing';
import Listings from './pages/Listings';
import ListingDetail from './pages/ListingDetail';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="register" element={<Register />} />
        <Route path="post" element={<AddListing />} />
        <Route path="listings/category/:category" element={<Listings />} />
        <Route path="listings/location/:city" element={<Listings />} />
        <Route path="listings/location/:city/category/:category" element={<Listings />} />
        <Route path="listing/:id" element={<ListingDetail />} />
      </Route>
    </Routes>
  );
}

export default App;
