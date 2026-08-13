import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMarketplace } from '../context/MarketplaceContext';

export default function AddListing() {
  const { user, categories, cities, addListing } = useMarketplace();
  const navigate = useNavigate();
  
  if (!user) {
    return (
      <div className="container" style={{ textAlign: 'center', marginTop: '4rem' }}>
        <h2>You need to register or login to post a listing</h2>
        <button onClick={() => navigate('/register')} className="btn btn-primary" style={{ marginTop: '1rem' }}>
          Register Now
        </button>
      </div>
    );
  }

  const [formData, setFormData] = useState({
    name: '',
    detail: '',
    category: categories[0]?.id || '',
    subcategory: '',
    country: 'India',
    state: '',
    city: cities[0] || '',
    area: '',
    price: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.price && formData.category && formData.city) {
      addListing({
        ...formData,
        price: Number(formData.price)
      });
      navigate('/');
    }
  };

  return (
    <div className="container" style={{ maxWidth: '600px', marginTop: '2rem', marginBottom: '4rem' }}>
      <div className="card" style={{ padding: '2rem' }}>
        <h1 style={{ marginBottom: '1.5rem' }}>Post a Listing</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Ad title *</label>
            <input 
              type="text" 
              name="name"
              className="form-control" 
              value={formData.name}
              onChange={handleChange}
              required 
            />
          </div>
          
          <div className="form-group">
            <label className="form-label">Description *</label>
            <textarea 
              name="detail"
              className="form-control" 
              rows="4"
              value={formData.detail}
              onChange={handleChange}
              required 
            ></textarea>
          </div>

          <div className="grid grid-cols-2" style={{ gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">Category *</label>
              <select name="category" className="form-control" value={formData.category} onChange={handleChange} required>
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Subcategory</label>
              <input type="text" name="subcategory" className="form-control" value={formData.subcategory} onChange={handleChange} />
            </div>
          </div>

          <div className="grid grid-cols-2" style={{ gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">Country</label>
              <input type="text" name="country" className="form-control" value={formData.country} readOnly />
            </div>
            <div className="form-group">
              <label className="form-label">State *</label>
              <input type="text" name="state" className="form-control" value={formData.state} onChange={handleChange} required />
            </div>
          </div>

          <div className="grid grid-cols-2" style={{ gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">City *</label>
              <select name="city" className="form-control" value={formData.city} onChange={handleChange} required>
                {cities.map(city => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Area/Neighborhood *</label>
              <input type="text" name="area" className="form-control" value={formData.area} onChange={handleChange} required />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Price (INR) *</label>
            <input 
              type="number" 
              name="price"
              className="form-control" 
              value={formData.price}
              onChange={handleChange}
              min="0"
              required 
            />
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem', padding: '0.75rem' }}>
            Post Now
          </button>
        </form>
      </div>
    </div>
  );
}
