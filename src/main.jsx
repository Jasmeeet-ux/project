import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import { MarketplaceProvider } from './context/MarketplaceContext.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <MarketplaceProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </MarketplaceProvider>
  </React.StrictMode>
);
