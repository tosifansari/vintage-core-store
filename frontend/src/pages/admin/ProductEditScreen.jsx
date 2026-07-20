// frontend/src/pages/admin/ProductEditScreen.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ProductEditScreen = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [image, setImage] = useState('');
    const [brand, setBrand] = useState('');
    const [category, setCategory] = useState('');
    const [countInStock, setCountInStock] = useState(0);
    const [description, setDescription] = useState('');
    
    const [loading, setLoading] = useState(true);
    const [updateLoading, setUpdateLoading] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setLoading(true);
                // 🚀 Changed to relative path for production compatibility
                const { data } = await axios.get(`/api/products/${id}`);
                setName(data.name);
                setPrice(data.price);
                setImage(data.image);
                setBrand(data.brand);
                setCategory(data.category);
                setCountInStock(data.countInStock);
                setDescription(data.description);
                setLoading(false);
            } catch (err) {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id]);

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            setUpdateLoading(true);
            // 🚀 Changed to relative path for production compatibility
            await axios.put(`/api/products/${id}`, {
                name,
                price,
                image,
                brand,
                category,
                countInStock,
                description,
            });
            setUpdateLoading(false);
            setMessage('Asset Manifest Updated Successfully');
            setTimeout(() => {
                setMessage('');
                navigate('/admin/productlist');
            }, 2000);
        } catch (err) {
            setUpdateLoading(false);
        }
    };

    if (loading) return <div className="text-center py-20 text-amber-500 font-mono tracking-wider animate-pulse">DECRYPTING ASSET FILE...</div>;

    return (
        <div className="max-w-2xl mx-auto bg-neutral-900 border border-amber-900/10 rounded-xl p-8 shadow-xl space-y-6">
            <div className="space-y-1 pb-4 border-b border-stone-800">
                <h1 className="font-serif text-2xl text-stone-100 tracking-wide">Modify Asset Details</h1>
                <p className="text-xs text-stone-500 font-mono uppercase">ID: {id}</p>
            </div>

            {message && <div className="p-3 bg-emerald-950/40 border border-emerald-900 text-emerald-400 text-xs rounded">{message}</div>}

            <form onSubmit={submitHandler} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5 md:col-span-2">
                    <label className="text-[10px] text-stone-400 uppercase tracking-wider">Product Title</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} required className="bg-neutral-950 border border-stone-800 text-stone-200 rounded p-2.5 text-sm focus:outline-none focus:border-amber-600" />
                </div>

                <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] text-stone-400 uppercase tracking-wider">Price ($)</label>
                    <input type="number" step="0.01" value={price} onChange={(e) => setPrice(e.target.value)} required className="bg-neutral-950 border border-stone-800 text-stone-200 rounded p-2.5 text-sm focus:outline-none focus:border-amber-600 font-mono" />
                </div>

                <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] text-stone-400 uppercase tracking-wider">Stock Count</label>
                    <input type="number" value={countInStock} onChange={(e) => setCountInStock(e.target.value)} required className="bg-neutral-950 border border-stone-800 text-stone-200 rounded p-2.5 text-sm focus:outline-none focus:border-amber-600 font-mono" />
                </div>

                <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] text-stone-400 uppercase tracking-wider">Brand Label</label>
                    <input type="text" value={brand} onChange={(e) => setBrand(target.value)} className="bg-neutral-950 border border-stone-800 text-stone-200 rounded p-2.5 text-sm focus:outline-none focus:border-amber-600" />
                </div>

                <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] text-stone-400 uppercase tracking-wider">Category</label>
                    <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} className="bg-neutral-950 border border-stone-800 text-stone-200 rounded p-2.5 text-sm focus:outline-none focus:border-amber-600" />
                </div>

                <div className="flex flex-col gap-1.5 md:col-span-2">
                    <label className="text-[10px] text-stone-400 uppercase tracking-wider">Image Resource Path</label>
                    <input type="text" value={image} onChange={(e) => setImage(e.target.value)} className="bg-neutral-950 border border-stone-800 text-stone-300 rounded p-2.5 text-xs focus:outline-none focus:border-amber-600 font-mono" />
                </div>

                <div className="flex flex-col gap-1.5 md:col-span-2">
                    <label className="text-[10px] text-stone-400 uppercase tracking-wider">Asset Description</label>
                    <textarea rows="4" value={description} onChange={(e) => setDescription(e.target.value)} className="bg-neutral-950 border border-stone-800 text-stone-200 rounded p-2.5 text-sm focus:outline-none focus:border-amber-600 resize-none" />
                </div>

                <div className="md:col-span-2 pt-2">
                    <button type="submit" disabled={updateLoading} className="w-full bg-amber-600 hover:bg-amber-500 disabled:bg-stone-800 text-neutral-950 font-medium py-3 rounded transition-colors text-xs uppercase tracking-widest cursor-pointer">
                        {updateLoading ? 'Saving Manifest...' : 'Commit Asset Variations'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ProductEditScreen;