import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const ProductListScreen = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Get all products
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get('/api/products');
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Create product
  const createProductHandler = async () => {
    try {
      await axios.post('/api/products');
      fetchProducts(); // Refresh list after creating
    } catch (error) {
      console.error('Error creating product:', error);
    }
  };

  // Delete product
  const deleteHandler = async (id) => {
    if (window.confirm('Are you sure you want to delete this asset?')) {
      try {
        await axios.delete(`/api/products/${id}`);
        fetchProducts(); // Refresh list after deletion
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-amber-500 font-mono">
            Vault Asset Management
          </h1>
          <p className="text-sm text-gray-400 font-mono uppercase">
            Administrative Inventory Access
          </p>
        </div>
        <button
          onClick={createProductHandler}
          className="bg-amber-600 hover:bg-amber-500 text-black font-semibold font-mono px-4 py-2 rounded transition cursor-pointer"
        >
          + CREATE PRODUCT
        </button>
      </div>

      {loading ? (
        <div className="text-gray-400 font-mono">Loading Vault Assets...</div>
      ) : (
        <div className="bg-neutral-900 border border-neutral-800 rounded-lg overflow-hidden">
          <table className="w-full text-left font-mono text-sm text-gray-300">
            <thead className="bg-neutral-950 text-gray-400 border-b border-neutral-800">
              <tr>
                <th className="p-4">ID</th>
                <th className="p-4">NAME</th>
                <th className="p-4">PRICE</th>
                <th className="p-4">CATEGORY</th>
                <th className="p-4">BRAND</th>
                <th className="p-4 text-right">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id} className="border-b border-neutral-800/50 hover:bg-neutral-800/30">
                  <td className="p-4 text-amber-500/80">{product._id}</td>
                  <td className="p-4 font-medium text-white">{product.name}</td>
                  <td className="p-4">${product.price?.toFixed(2)}</td>
                  <td className="p-4">{product.category}</td>
                  <td className="p-4">{product.brand}</td>
                  <td className="p-4 text-right space-x-3">
                    <Link
                      to={`/admin/product/${product._id}/edit`}
                      className="text-amber-500 hover:text-amber-400 transition"
                    >
                      EDIT
                    </Link>
                    <button
                      onClick={() => deleteHandler(product._id)}
                      className="text-red-500 hover:text-red-400 cursor-pointer"
                    >
                      DELETE
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ProductListScreen;