import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();

// CORS Settings for Vercel
app.use(cors({
  origin: '*',
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// --- MOCK DATABASE DATA ---
const mockProducts = [
  {
    _id: '1',
    name: 'Vintage T-Shirt 1',
    image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518',
    description: 'Classy vintage aesthetic texture tee.',
    brand: 'Vintage Core',
    category: 'Apparel',
    price: 25.00,
    countInStock: 10,
    rating: 4.5,
    numReviews: 12,
  },
  {
    _id: '2',
    name: 'Retro Classic Hoodie',
    image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2',
    description: 'Premium warm texture oversized comfort fit.',
    brand: 'Vintage Core',
    category: 'Apparel',
    price: 45.00,
    countInStock: 7,
    rating: 4.8,
    numReviews: 8,
  },
  {
    _id: '3',
    name: 'Vintage Core Concept Tee',
    image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518',
    description: 'Premium brand aesthetic layout.',
    brand: 'Vintage Core',
    category: 'Apparel',
    price: 35.00,
    countInStock: 5,
    rating: 4.9,
    numReviews: 24,
  }
];

// --- 1. PRODUCTS API ENDPOINTS ---
app.get('/api/products', (req, res) => {
  res.status(200).json(mockProducts);
});

app.get('/api/products/:id', (req, res) => {
  const product = mockProducts.find((p) => p._id === req.params.id) || mockProducts[0];
  res.status(200).json(product);
});

app.post('/api/products', (req, res) => {
  const sampleProduct = {
    _id: 'mock_product_' + Date.now(),
    name: 'Sample Vintage Tee',
    price: 0.00,
    brand: 'Vintage Core',
    category: 'Apparel',
    countInStock: 10,
    rating: 5,
    numReviews: 0,
    description: 'Sample description',
    image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518'
  };
  res.status(201).json(sampleProduct);
});

app.delete('/api/products/:id', (req, res) => {
  res.status(200).json({ message: 'Product deleted' });
});

app.put('/api/products/:id', (req, res) => {
  res.status(200).json({ _id: req.params.id, ...req.body });
});

// --- 2. AUTH & USER ENDPOINTS ---
const userAuthHandler = (req, res) => {
  const { email, name } = req.body;
  res.status(200).json({
    _id: 'user_101',
    name: name || 'Tosif Ansari',
    email: email || 'worldwarz9953@gmail.com',
    isAdmin: true,
    token: 'mock_jwt_token_secret_123456789'
  });
};

app.post('/api/users/login', userAuthHandler);
app.post('/api/auth/login', userAuthHandler);
app.post('/api/users/register', userAuthHandler);
app.post('/api/auth/register', userAuthHandler);
app.post('/api/users', userAuthHandler);

app.put('/api/users/profile', userAuthHandler);
app.put('/api/auth/profile', userAuthHandler);

// --- 3. ORDERS ENDPOINTS ---
app.post('/api/orders', (req, res) => {
  const orderData = req.body;
  res.status(201).json({
    _id: 'ord_' + Date.now(),
    ...orderData,
    isPaid: true,
    paidAt: new Date().toISOString(),
    isDelivered: false,
    createdAt: new Date().toISOString()
  });
});

app.get('/api/orders/myorders', (req, res) => {
  res.status(200).json([
    {
      _id: 'ord_sample_991',
      createdAt: '2026-07-20',
      totalPrice: 38.75,
      isPaid: true,
      isDelivered: false
    }
  ]);
});

app.get('/api/orders/:id', (req, res) => {
  res.status(200).json({
    _id: req.params.id,
    shippingAddress: { address: 'falana', city: 'gurgao', postalCode: '110033', country: 'delhi' },
    paymentMethod: 'Razorpay',
    orderItems: [
      { name: 'Vintage T-Shirt 1', qty: 1, price: 25.00, image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518', product: '1' }
    ],
    itemsPrice: 25.00,
    shippingPrice: 10.00,
    taxPrice: 3.75,
    totalPrice: 38.75,
    isPaid: true,
    paidAt: new Date().toISOString(),
    isDelivered: false
  });
});

// Root Route
app.get('/', (req, res) => {
  res.send('Vintage Core API Backend Online');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});