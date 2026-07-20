// frontend/src/pages/admin/ProductListScreen.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Trash, Edit, Plus } from 'lucide-react';
import axios from 'axios';

const ProductListScreen = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                const { data } = await axios.get('http://localhost:5000/api/products');
                setProducts(data);
                setLoading(false);
            } catch (err) {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    const createProductHandler = async () => {
        try {
            const { data } = await axios.post('http://localhost:5000/api/products');
            setProducts([...products, data]);
            setMessage('Asset Created Successfully');
            setTimeout(() => setMessage(''), 3000);
        } catch (err) {
            console.error(err);
        }
    };

    const deleteHandler = async (id) => {
        if (window.confirm('Are you sure you want to delete this asset?')) {
            try {
                await axios.delete(`http://localhost:5000/api/products/${id}`);
                setProducts(products.filter((p) => p._id !== id));
                setMessage('Asset Removed from Vault');
                setTimeout(() => setMessage(''), 3000);
            } catch (err) {
                console.error(err);
            }
        }
    };

    if (loading) return <div className="text-center py-20 text-amber-500 font-mono tracking-wider animate-pulse">RETRIEVING ASSET CATALOG...</div>;

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center pb-4 border-b border-stone-800">
                <div className="space-y-1">
                    <h1 className="font-serif text-2xl md:text-3xl text-stone-100 tracking-wide">Vault Asset Management</h1>
                    <p className="text-xs text-stone-500 font-mono uppercase">Administrative Inventory Access</p>
                </div>
                <button 
                    onClick={createProductHandler}
                    className="inline-flex items-center gap-2 bg-amber-600 hover:bg-amber-500 text-neutral-950 px-4 py-2 text-xs font-medium rounded transition-all uppercase tracking-wider cursor-pointer"
                >
                    <Plus className="w-4 h-4" /> Create Product
                </button>
            </div>

            {message && <div className="p-3 bg-emerald-950/40 border border-emerald-900 text-emerald-400 text-xs rounded">{message}</div>}

            <div className="bg-neutral-900 border border-amber-900/10 rounded-xl p-6 shadow-xl overflow-x-auto">
                <table className="w-full text-left border-collapse text-sm">
                    <thead>
                        <tr className="border-b border-stone-800 text-stone-500 text-xs uppercase tracking-wider font-medium">
                            <th className="py-3 px-2">ID</th>
                            <th className="py-3 px-2">Name</th>
                            <th className="py-3 px-2">Price</th>
                            <th className="py-3 px-2">Category</th>
                            <th className="py-3 px-2">Brand</th>
                            <th className="py-3 px-2"></th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-800/40 text-stone-300 font-light">
                        {products.map((product) => (
                            <tr key={product._id} className="hover:bg-neutral-950/40 transition-colors">
                                <td className="py-3 px-2 font-mono text-xs text-stone-500">{product._id}</td>
                                <td className="py-3 px-2 font-serif text-stone-200">{product.name}</td>
                                <td className="py-3 px-2 font-mono text-amber-500">${product.price.toFixed(2)}</td>
                                <td className="py-3 px-2 text-stone-400">{product.category}</td>
                                <td className="py-3 px-2 text-stone-400">{product.brand}</td>
                                <td className="py-3 px-2 text-right space-x-2">
                                    <Link to={`/admin/product/${product._id}/edit`} className="inline-flex items-center bg-stone-800 hover:bg-amber-600 hover:text-neutral-950 text-stone-300 p-1.5 rounded transition-all">
                                        <Edit className="w-3.5 h-3.5" />
                                    </Link>
                                    <button 
                                        onClick={() => deleteHandler(product._id)}
                                        className="inline-flex items-center bg-stone-800 hover:bg-rose-950 hover:text-rose-400 text-stone-300 p-1.5 rounded transition-all cursor-pointer"
                                    >
                                        <Trash className="w-3.5 h-3.5" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ProductListScreen;