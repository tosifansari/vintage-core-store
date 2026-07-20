import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';
import path from 'path';
import connectDB from './config/db.js'; // Apne actual DB config path ke mutabik check kar lena
import productRoutes from './routes/productRoutes.js'; // Apne actual routes ke mutabik check kar lena

// Load environment variables
dotenv.config();

// Connect to Database
connectDB();

const app = express();

// Body parser middleware
app.parse = express.json(); 
app.use(express.urlencoded({ extended: true }));

// API Routes
app.use('/api/products', productRoutes);

// Clean Base Route for Render API (Static frontend code routing bypassed for Vercel split hosting)
app.get('/', (req, res) => {
  res.send('API is running successfully...');
});

// Port Configuration
const PORT = process.env.PORT || 5000;

// Start Server with standard color configurations
app.listen(PORT, () => {
  console.log(`Server executing in ${process.env.NODE_ENV || 'development'} matrix mode on port ${PORT}`.yellow.bold);
});