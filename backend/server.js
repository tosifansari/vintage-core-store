// backend/server.js
const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const colors = require('colors');

// Load environment configuration variables
dotenv.config();

const app = express();

// Body parser middleware matrices
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Mock/Standard API endpoints references placeholder
app.get('/api/products', (req, res) => {
    // Standard asset database payload logic can be plugged here
    res.json([
        { _id: '1', name: 'Vintage T-Shirt 1', brand: 'Vintage Core', category: 'T-Shirts', price: 25.00, countInStock: 5, image: '/images/tshirt.jpg', description: 'Classy vintage aesthetic texture tee.' },
        { _id: '2', name: 'Retro Classic Hoodie', brand: 'Vintage Core', category: 'Hoodies', price: 45.00, countInStock: 8, image: '/images/hoodie.jpg', description: 'Premium warm texture oversized comfort fit.' },
        { _id: '3', name: 'Vintage Core Concept Tee', brand: 'Vintage Core', category: 'T-Shirts', price: 35.00, countInStock: 3, image: '/images/concept_tee.jpg', description: 'Premium premium brand aesthetic layout.' }
    ]);
});

app.get('/api/products/:id', (req, res) => {
    res.json({
        _id: req.params.id,
        name: 'Vintage Core Concept Tee',
        brand: 'Vintage Core',
        category: 'T-Shirts',
        price: 35.00,
        countInStock: 4,
        image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c',
        description: 'Premium premium brand aesthetic layout with comfortable vintage wash and structured drape styling.'
    });
});

// 🚀 PRODUCTION STATIC ASSET ROUTING MATRIX
if (process.env.NODE_ENV === 'production') {
    // Direct server to serve static assets from the frontend build artifact directory
    app.use(express.static(path.join(__dirname, '../frontend/dist')));

    // Intercept all non-API routing vectors and serve index.html main interface view
    app.get('*', (req, res) =>
        res.sendFile(path.resolve(__dirname, '..', 'frontend', 'dist', 'index.html'))
    );
} else {
    // Fallback development landing confirmation
    app.get('/', (req, res) => {
        res.send('API Engine is running securely in Development Vault...');
    });
}

// System Port Binder Acceleration
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server executing in ${process.env.NODE_ENV || 'development'} matrix mode on port ${PORT}`.yellow.bold);
});