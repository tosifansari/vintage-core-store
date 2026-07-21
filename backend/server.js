import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';
import cors from 'cors';
import connectDB from './config/db.js';

// Route Imports
import productRoutes from './routes/productRoutes.js';
// Note: Agar userRoutes.js / orderRoutes.js file exists karti hain backend/routes mein, tabhi uncomment karna.
// import userRoutes from './routes/userRoutes.js'; 
// import orderRoutes from './routes/orderRoutes.js';

// Load environment variables
dotenv.config();

// Connect to Database
connectDB();

const app = express();

// 1. Enable CORS for cross-origin requests from Vercel
app.use(cors({
  origin: '*', 
  credentials: true
}));

// 2. Body parser middleware
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

// 3. API Routes
app.use('/api/products', productRoutes);
// app.use('/api/users', userRoutes);
// app.use('/api/orders', orderRoutes);

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