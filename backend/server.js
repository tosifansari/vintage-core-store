import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';
import cors from 'cors';
import { connectDB } from './config/db.js';
import productRoutes from './routes/productRoutes.js';

dotenv.config();
connectDB();

const app = express();

app.use(cors({
  origin: '*',
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/products', productRoutes);

app.get('/', (req, res) => {
  res.send('API is running successfully...');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server executing on port ${PORT}`.yellow.bold);
});