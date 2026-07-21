const productsData = [
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
    description: 'Premium premium brand aesthetic layout.',
    brand: 'Vintage Core',
    category: 'Apparel',
    price: 35.00,
    countInStock: 5,
    rating: 4.9,
    numReviews: 24,
  }
];

export const getProducts = async (req, res) => {
  try {
    res.status(200).json(productsData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getProductById = async (req, res) => {
  try {
    const product = productsData.find((p) => p._id === req.params.id);
    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createProduct = async (req, res) => {
  try {
    const sampleProduct = {
      _id: 'mock_product_' + Date.now(),
      name: 'Sample Vintage Tee',
      price: 0.00,
      user: 'mock_user_101',
      image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518',
      brand: 'Vintage Core',
      category: 'Apparel',
      countInStock: 0,
      numReviews: 0,
      description: 'Sample description placeholder text',
    };
    res.status(201).json(sampleProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { name, price, description, image, brand, category, countInStock } = req.body;
    res.status(200).json({
      _id: req.params.id,
      name,
      price: Number(price),
      description,
      image,
      brand,
      category,
      countInStock: Number(countInStock)
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};