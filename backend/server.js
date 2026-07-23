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

// --- MOCK DATABASE DATA (20 UNIQUE VINTAGE PRODUCTS) ---
const mockProducts = [
  {
    _id: '1',
    name: '1984 Nostalgia Graphic Oversized Tee',
    image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80',
    description: 'Heavyweight 240 GSM washed cotton tee featuring a faded retro cyberpunk print.',
    brand: 'Vintage Core',
    category: 'Apparel',
    price: 38.00,
    countInStock: 12,
    rating: 4.8,
    numReviews: 18,
  },
  {
    _id: '2',
    name: 'Monochrome Cipher Heavy Hoodie',
    image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80',
    description: '450 GSM fleece oversized hoodie with drop-shoulder fit and custom vault coordinates.',
    brand: 'Vintage Core',
    category: 'Apparel',
    price: 75.00,
    countInStock: 8,
    rating: 4.9,
    numReviews: 24,
  },
  {
    _id: '3',
    name: 'Aesthetic Golden Silhouette Canvas',
    image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=800&q=80',
    description: 'Spiritual atmospheric artwork printed on museum-grade textured canvas.',
    brand: 'Vault Artifacts',
    category: 'Art & Collectibles',
    price: 120.00,
    countInStock: 4,
    rating: 5.0,
    numReviews: 9,
  },
  {
    _id: '4',
    name: 'Retro Brass Analog Desk Clock',
    image: 'https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?auto=format&fit=crop&w=800&q=80',
    description: 'Solid brass mechanical movement desktop clock with an antique matte finish.',
    brand: 'Chronos Vault',
    category: 'Accessories',
    price: 65.00,
    countInStock: 15,
    rating: 4.7,
    numReviews: 14,
  },
  {
    _id: '5',
    name: 'Classic Amber Glass Desk Lamp',
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80',
    description: 'Warm golden ambient lighting with a hand-blown amber shade and dark mahogany base.',
    brand: 'Aura Craft',
    category: 'Home Aesthetics',
    price: 95.00,
    countInStock: 6,
    rating: 4.9,
    numReviews: 31,
  },
  {
    _id: '6',
    name: 'Handcrafted Leather Manifest Journal',
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80',
    description: 'Genuine full-grain leather journal with deckle-edge parchment paper and brass clasp.',
    brand: 'Vault Artifacts',
    category: 'Accessories',
    price: 42.00,
    countInStock: 20,
    rating: 4.8,
    numReviews: 11,
  },
  {
    _id: '7',
    name: 'Cybernetic Matrix Faded Denim Jacket',
    image: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=800&q=80',
    description: 'Vintage distress-washed denim jacket with dark cyberpunk graphic back panels.',
    brand: 'Vintage Core',
    category: 'Apparel',
    price: 110.00,
    countInStock: 5,
    rating: 4.9,
    numReviews: 15,
  },
  {
    _id: '8',
    name: 'Minimalist Black Matte Coffee Press',
    image: 'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=800&q=80',
    description: 'Double-walled stainless steel French press designed for precision artisanal brews.',
    brand: 'Aura Craft',
    category: 'Home Aesthetics',
    price: 48.00,
    countInStock: 14,
    rating: 4.6,
    numReviews: 22,
  },
  {
    _id: '9',
    name: 'Faded Obsidian Acid-Wash Sweatshirt',
    image: 'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=800&q=80',
    description: 'Heavyweight loopback Terry fleece with custom garment acid wash treatment.',
    brand: 'Vintage Core',
    category: 'Apparel',
    price: 68.00,
    countInStock: 9,
    rating: 4.7,
    numReviews: 19,
  },
  {
    _id: '10',
    name: 'Vintage Vinyl Turntable Player',
    image: 'https://images.unsplash.com/photo-1539375665275-f9de415ef9ac?auto=format&fit=crop&w=800&q=80',
    description: 'Belt-driven wooden record player with built-in dynamic stereo speakers & RCA output.',
    brand: 'Chronos Vault',
    category: 'Electronics',
    price: 185.00,
    countInStock: 3,
    rating: 5.0,
    numReviews: 40,
  },
  {
    _id: '11',
    name: 'Golden Hour Atmospheric Wall Print',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80',
    description: 'High-contrast golden hour landscape framed in a sleek matte-black wooden border.',
    brand: 'Vault Artifacts',
    category: 'Art & Collectibles',
    price: 85.00,
    countInStock: 10,
    rating: 4.8,
    numReviews: 13,
  },
  {
    _id: '12',
    name: 'Retro Mechanical Mechanical Keyboard',
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80',
    description: 'Typewriter-inspired round keycaps with warm amber backlighting and tactile blue switches.',
    brand: 'Chronos Vault',
    category: 'Electronics',
    price: 125.00,
    countInStock: 7,
    rating: 4.9,
    numReviews: 28,
  },
  {
    _id: '13',
    name: 'Dark Aesthetic Corduroy Cap',
    image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=800&q=80',
    description: 'Soft-grain corduroy dad hat featuring tonal brass buckle closure and minimalist patch.',
    brand: 'Vintage Core',
    category: 'Apparel',
    price: 28.00,
    countInStock: 25,
    rating: 4.5,
    numReviews: 16,
  },
  {
    _id: '14',
    name: 'Hand-Poured Amber & Sandalwood Candle',
    image: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=800&q=80',
    description: '100% natural soy wax candle infused with rich sandalwood and smoky amber oil.',
    brand: 'Aura Craft',
    category: 'Home Aesthetics',
    price: 32.00,
    countInStock: 18,
    rating: 4.9,
    numReviews: 35,
  },
  {
    _id: '15',
    name: 'Antique Brass Compass & Key Ring',
    image: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=800&q=80',
    description: 'Functional vintage pocket compass enclosed in a polished solid brass casing.',
    brand: 'Vault Artifacts',
    category: 'Accessories',
    price: 24.00,
    countInStock: 30,
    rating: 4.6,
    numReviews: 8,
  },
  {
    _id: '16',
    name: 'Vintage Distressed Leather Duffle Bag',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80',
    description: 'Rugged full-grain leather weekender bag with reinforced brass hardware.',
    brand: 'Vault Artifacts',
    category: 'Accessories',
    price: 160.00,
    countInStock: 4,
    rating: 5.0,
    numReviews: 21,
  },
  {
    _id: '17',
    name: 'Retro Ceramic Coffee Mug (Set of 2)',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80',
    description: 'Hand-glazed matte ceramic mugs with rustic earthen texture finish.',
    brand: 'Aura Craft',
    category: 'Home Aesthetics',
    price: 36.00,
    countInStock: 16,
    rating: 4.7,
    numReviews: 12,
  },
  {
    _id: '18',
    name: 'Cyberpunk Neon Cyber-Frame Glasses',
    image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=800&q=80',
    description: 'UV400 protective tinted aviator sunglasses with industrial dark metallic rims.',
    brand: 'Vintage Core',
    category: 'Apparel',
    price: 45.00,
    countInStock: 11,
    rating: 4.8,
    numReviews: 17,
  },
  {
    _id: '19',
    name: 'Smokey Quartz Crystal Desk Obelisk',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
    description: 'Natural hand-cut smokey quartz crystal point for desk aesthetics and grounding focus.',
    brand: 'Vault Artifacts',
    category: 'Art & Collectibles',
    price: 52.00,
    countInStock: 8,
    rating: 4.9,
    numReviews: 10,
  },
  {
    _id: '20',
    name: 'Minimalist Walnut Desk Organizer',
    image: 'https://images.unsplash.com/photo-1585336261026-8f5786372969?auto=format&fit=crop&w=800&q=80',
    description: 'Solid walnut wood desktop tray crafted for stationery, keys, and everyday EDC items.',
    brand: 'Aura Craft',
    category: 'Accessories',
    price: 58.00,
    countInStock: 13,
    rating: 4.8,
    numReviews: 27,
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