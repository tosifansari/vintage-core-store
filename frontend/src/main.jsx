// frontend/src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import axios from 'axios'; // Axios import kiya
import store from './store';
import App from './App.jsx';
import './index.css'; // Tailwind input directive matrix

// Global Base URL setup for production deployment
axios.defaults.baseURL = 'https://vintage-core-store.onrender.com';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);