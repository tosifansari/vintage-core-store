import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';
import cors from 'cors';
import path from 'path';
import connectDB from './config/db.js';

// Route Imports (Apne exact routes files ke path ke according adjust kar lena)
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js'; 
import orderRoutes from './routes/orderRoutes.js';

// Load environment variables
dotenv.config();

// Connect to Database
connectDB();

const app = express();

// 1. Enable CORS for cross-origin requests from Vercel
app.use(cors({
  origin: '*', // Production mein exact Vercel URL bhi daal sakte ho
  credentials: true
}));

// 2. Body parser middleware (Fixed syntax)
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

// 3. API Routes
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);

// Base Route for Render
app.get('/', (req, res) => {
  res.send('API is running successfully...');
});

// Port Configuration
const PORT = process.env.PORT || 5000;

// Start Server
app.listen(PORT, () => {
  console.log(`Server executing in ${process.env.NODE_ENV || 'development'} matrix mode on port ${PORT}`.yellow.bold);
});