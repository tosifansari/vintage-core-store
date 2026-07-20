// frontend/src/pages/ProductScreen.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { ArrowLeft, Star, MessageSquare } from 'lucide-react';
import axios from 'axios';
import { addToCart } from '../store/cartSlice';

const ProductScreen = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [qty, setQty] = useState(1);

    // Dynamic Local Mock Review State
    const [reviews, setReviews] = useState([]);
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState('');
    const [reviewMessage, setReviewMessage] = useState('');

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setLoading(true);
                const { data } = await axios.get(`http://localhost:5000/api/products/${id}`);
                setProduct(data);
                
                // Load default dummy reviews initially matching product metadata
                setReviews([
                    {
                        _id: 'rev_1',
                        name: 'Aron V.',
                        rating: 5,
                        createdAt: '2026-07-15',
                        comment: 'Absolutely stunning quality. The weave texture feels incredibly premium and vintage.'
                    }
                ]);
                setLoading(false);
            } catch (err) {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id]);

    const addToCartHandler = () => {
        dispatch(addToCart({ ...product, qty }));
        navigate('/cart');
    };

    // Review Submit Handler Intercept
    const submitReviewHandler = (e) => {
        e.preventDefault();
        if (!comment.trim()) return;

        const newReview = {
            _id: 'rev_mock_' + Date.now(),
            name: 'Tosif (You)',
            rating: Number(rating),
            createdAt: new Date().toISOString().substring(0, 10),
            comment: comment.trim()
        };

        setReviews([newReview, ...reviews]);
        setComment('');
        setReviewMessage('Review logged into asset history successfully.');
        setTimeout(() => setReviewMessage(''), 3000);
    };

    if (loading) return <div className="text-center py-20 text-amber-500 font-mono tracking-wider animate-pulse">DECRYPTING ARTIFACT DATA...</div>;
    if (!product) return <div className="text-center py-20 text-stone-500 text-sm">Artifact manifest not found.</div>;

    return (
        <div className="space-y-8">
            {/* Back Navigation Button */}
            <Link to="/" className="inline-flex items-center gap-2 text-xs font-mono text-stone-500 hover:text-amber-500 uppercase tracking-wider transition-colors">
                <ArrowLeft className="w-3.5 h-3.5" /> Back to Catalog
            </Link>

            {/* Product Meta Core Layout Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Left Side: Product Image Display */}
                <div className="bg-neutral-900 border border-amber-900/5 rounded-xl p-4 shadow-xl flex items-center justify-center">
                    <img src={product.image} alt={product.name} className="max-h-[450px] object-cover rounded-lg border border-stone-800 bg-neutral-950 w-full" />
                </div>

                {/* Right Side: Technical Manifest Details */}
                <div className="flex flex-col justify-between space-y-6">
                    <div className="space-y-4">
                        <div className="space-y-1">
                            <span className="text-[10px] text-amber-500 font-mono uppercase tracking-widest">{product.brand}</span>
                            <h1 className="font-serif text-3xl text-stone-100 tracking-wide">{product.name}</h1>
                        </div>

                        {/* Rating Flag Indicator */}
                        <div className="flex items-center gap-1.5 text-stone-400 text-xs font-mono">
                            <div className="flex text-amber-500">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className={`w-3.5 h-3.5 ${i < Math.floor(product.rating || 5) ? 'fill-current' : ''}`} />
                                ))}
                            </div>
                            <span>({reviews.length} Collector Logs)</span>
                        </div>

                        <p className="font-mono text-xl text-amber-500 font-medium">${product.price.toFixed(2)}</p>
                        
                        <div className="border-t border-b border-stone-800/60 py-4">
                            <p className="text-sm text-stone-400 font-light leading-relaxed">{product.description}</p>
                        </div>
                    </div>

                    {/* Stock Status Box */}
                    <div className="bg-neutral-900 border border-amber-900/10 rounded-xl p-5 shadow-lg space-y-4">
                        <div className="flex justify-between text-xs font-mono">
                            <span className="text-stone-500">Inventory Registry:</span>
                            <span className={product.countInStock > 0 ? 'text-emerald-500' : 'text-rose-500'}>
                                {product.countInStock > 0 ? 'In Vault Storage' : 'Out of Allocation'}
                            </span>
                        </div>

                        {product.countInStock > 0 && (
                            <div className="flex justify-between items-center text-xs font-mono">
                                <span className="text-stone-500">Select Allocation Quantity:</span>
                                <select 
                                    value={qty} 
                                    onChange={(e) => setQty(Number(e.target.value))}
                                    className="bg-neutral-950 border border-stone-800 text-stone-200 rounded p-1 text-xs focus:outline-none focus:border-amber-600 font-mono"
                                >
                                    {[...Array(product.countInStock).keys()].map((x) => (
                                        <option key={x + 1} value={x + 1}>{x + 1}</option>
                                    ))}
                                </select>
                            </div>
                        )}

                        <button 
                            onClick={addToCartHandler}
                            disabled={product.countInStock === 0}
                            className="w-full bg-amber-600 hover:bg-amber-500 disabled:bg-stone-800 text-neutral-950 font-medium py-3 rounded transition-all text-xs uppercase tracking-widest cursor-pointer"
                        >
                            {product.countInStock > 0 ? 'Acquire Artifact Item' : 'Allocation Locked'}
                        </button>
                    </div>
                </div>
            </div>

            {/* 🚀 Dynamic Feedback Review Section Segment */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 border-t border-stone-800/40">
                {/* Display Lists Block */}
                <div className="space-y-4">
                    <h2 className="font-serif text-lg text-stone-200 tracking-wide flex items-center gap-2">
                        <MessageSquare className="w-4 h-4 text-amber-500" /> Collector Manifest Reviews
                    </h2>

                    {reviews.length === 0 ? (
                        <p className="text-xs font-mono text-stone-500">No telemetry logs found for this item.</p>
                    ) : (
                        <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
                            {reviews.map((rev) => (
                                <div key={rev._id} className="bg-neutral-900/60 border border-stone-800/80 rounded-lg p-4 space-y-2">
                                    <div className="flex justify-between items-center text-xs font-mono">
                                        <span className="text-stone-300 font-medium">{rev.name}</span>
                                        <span className="text-stone-600">{rev.createdAt}</span>
                                    </div>
                                    <div className="flex text-amber-500">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} className={`w-3 h-3 ${i < rev.rating ? 'fill-current' : ''}`} />
                                        ))}
                                    </div>
                                    <p className="text-xs text-stone-400 font-light leading-relaxed">{rev.comment}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Input Form Submission Block */}
                <div className="bg-neutral-900 border border-amber-900/10 rounded-xl p-6 h-fit shadow-xl space-y-4">
                    <h3 className="font-serif text-sm text-stone-200 tracking-wide uppercase font-medium">Log Asset Experience</h3>
                    
                    {reviewMessage && <div className="p-2.5 bg-emerald-950/40 border border-emerald-900 text-emerald-400 text-xs rounded font-mono">{reviewMessage}</div>}

                    <form onSubmit={submitReviewHandler} className="space-y-4">
                        <div className="flex flex-col gap-1.5">
                            <label className="text-[10px] text-stone-400 uppercase tracking-wider">Evaluation Score</label>
                            <select 
                                value={rating} 
                                onChange={(e) => setRating(Number(e.target.value))}
                                className="bg-neutral-950 border border-stone-800 text-stone-200 rounded p-2 text-xs focus:outline-none focus:border-amber-600 font-mono"
                            >
                                <option value="5">5 Stars - Exceptional Quality</option>
                                <option value="4">4 Stars - Highly Satisfactory</option>
                                <option value="3">3 Stars - Standard Allocation</option>
                                <option value="2">2 Stars - Minor Imperfections</option>
                                <option value="1">1 Star - Requires Inspection</option>
                            </select>
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <label className="text-[10px] text-stone-400 uppercase tracking-wider">Review Logs Comment</label>
                            <textarea 
                                rows="3" 
                                required
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                placeholder="Share your experience with this custom aesthetic design asset..."
                                className="bg-neutral-950 border border-stone-800 text-stone-200 rounded p-2.5 text-xs focus:outline-none focus:border-amber-600 resize-none placeholder:text-stone-700"
                            />
                        </div>

                        <button type="submit" className="w-full bg-stone-800 hover:bg-amber-600 hover:text-neutral-950 text-stone-300 font-medium py-2 rounded text-xs uppercase tracking-wider transition-all cursor-pointer">
                            Submit Verification Review
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ProductScreen;