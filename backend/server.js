import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();

app.use(cors({ origin: '*', credentials: true }));
app.use(express.json());

// Auth Mock/Real Endpoints
app.post('/api/auth/register', (req, res) => {
  const { name, email } = req.body;
  res.status(201).json({
    _id: 'user_' + Date.now(),
    name: name || 'Tosif Ansari',
    email: email,
    token: 'jwt_mock_token_12345',
  });
});

app.get('/api/orders/myorders', (req, res) => {
  res.json([]);
});

app.get('/', (req, res) => {
  res.send('Vintage Core Backend Running');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server on port ${PORT}`));