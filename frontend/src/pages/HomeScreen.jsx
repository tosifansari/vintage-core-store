// frontend/src/pages/HomeScreen.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, ShoppingCart, SlidersHorizontal } from 'lucide-react';
import axios from 'axios';

const HomeScreen = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    
    // Search & Filter Local States
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                const { data } = await axios.get('http://localhost:5000/api/products');
                setProducts(data);
                setFilteredProducts(data);
                setLoading(false);
            } catch (err) {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    // Real-time Query Filter Processing Loop
    useEffect(() => {
        let result = products;

        // 1. Text Search Filter
        if (searchTerm.trim() !== '') {
            result = result.filter(product => 
                product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                product.brand.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // 2. Category Dropdown Filter
        if (selectedCategory !== 'All') {
            result = result.filter(product => product.category === selectedCategory);
        }

        setFilteredProducts(result);
    }, [searchTerm, selectedCategory, products]);

    if (loading) return <div className="text-center py-20 text-amber-500 font-mono tracking-wider animate-pulse">SOURCING VINTAGE VAULT MATRICES...</div>;

    // Dynamically pull distinct categories for filter buttons
    const categories = ['All', ...new Set(products.map(p => p.category))];

    return (
        <div className="space-y-8">
            {/* Hero Section Banner */}
            <div className="bg-neutral-900 border border-stone-800 rounded-2xl p-8 text-center relative overflow-hidden shadow-xl">
                <div className="max-w-xl mx-auto space-y-3 relative z-10">
                    <span className="text-[10px] text-amber-500 font-mono uppercase tracking-widest">Curated Artifacts</span>
                    <h1 className="font-serif text-3xl md:text-4xl text-stone-100 tracking-wide">Timeless Aesthetics. Vintage Spirit.</h1>
                    <p className="text-xs text-stone-400 font-light leading-relaxed">Discover modern functional utilities built with premium materials and custom design profiles.</p>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/20 to-transparent pointer-events-none" />
            </div>

            {/* 🚀 Dynamic Search and Filtering Control Toolbar */}
            <div className="flex flex-col md:flex-row gap-4 justify-between items-stretch md:items-center bg-neutral-900/40 border border-stone-800/80 p-4 rounded-xl shadow-md">
                {/* Search Bar Input Element */}
                <div className="relative flex-grow max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-600" />
                    <input 
                        type="text" 
                        placeholder="Search assets (e.g., Tee, Hoodie)..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-neutral-950 border border-stone-800 text-stone-200 rounded-lg pl-9 pr-4 py-2 text-xs focus:outline-none focus:border-amber-600 font-mono placeholder:text-stone-700 transition-colors"
                    />
                </div>

                {/* Category Filter Pills Container */}
                <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
                    <SlidersHorizontal className="w-3.5 h-3.5 text-stone-500 hidden sm:block" />
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className={`px-3 py-1.5 rounded-md text-[10px] font-mono uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap ${
                                selectedCategory === cat 
                                ? 'bg-amber-600 text-neutral-950 font-bold' 
                                : 'bg-neutral-950 border border-stone-800 text-stone-400 hover:text-stone-200 hover:border-stone-700'
                            }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            {/* Catalog Grid View */}
            <div className="space-y-4">
                <div className="flex justify-between items-center pb-2 border-b border-stone-800/60">
                    <h2 className="font-serif text-xl text-stone-200 tracking-wide">Latest Collections</h2>
                    <span className="text-[10px] font-mono text-stone-500">{filteredProducts.length} Entries Found</span>
                </div>

                {filteredProducts.length === 0 ? (
                    <div className="text-center py-12 text-stone-500 text-xs font-mono">No artifacts match your current query parameter tags.</div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredProducts.map((product) => (
                            <div key={product._id} className="bg-neutral-900 border border-amber-900/5 rounded-xl p-4 shadow-md flex flex-col justify-between group hover:border-amber-900/20 transition-all duration-300">
                                <Link to={`/product/${product._id}`} className="space-y-3 block">
                                    <div className="overflow-hidden rounded-lg border border-stone-800 bg-neutral-950">
                                        <img src={product.image} alt={product.name} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500" />
                                    </div>
                                    <div className="space-y-1">
                                        <h3 className="font-serif text-stone-200 group-hover:text-amber-500 transition-colors text-base truncate">{product.name}</h3>
                                        <p className="text-[10px] text-stone-500 font-mono uppercase">{product.brand} • {product.category}</p>
                                    </div>
                                </Link>

                                <div className="flex justify-between items-center mt-4 pt-3 border-t border-stone-800/40">
                                    <span className="font-mono text-amber-500 text-sm font-medium">${product.price.toFixed(2)}</span>
                                    <Link to={`/product/${product._id}`} className="bg-stone-800 hover:bg-amber-600 text-stone-300 hover:text-neutral-950 p-2 rounded-lg transition-all shadow cursor-pointer">
                                        <ShoppingCart className="w-3.5 h-3.5" />
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default HomeScreen;