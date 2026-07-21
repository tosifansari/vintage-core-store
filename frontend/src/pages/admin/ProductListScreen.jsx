import axios from 'axios';

// Get all products
const fetchProducts = async () => {
  const { data } = await axios.get('/api/products');
  return data;
};

// Create product
const createProductHandler = async () => {
  const { data } = await axios.post('/api/products');
  return data;
};

// Delete product
const deleteHandler = async (id) => {
  await axios.delete(`/api/products/${id}`);
};