// frontend/src/pages/CartScreen.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Trash2, ArrowLeft, Tag, X, Plus, Minus } from 'lucide-react';
import { addToCart, removeFromCart, applyCoupon, removeCoupon } from '../store/cartSlice';

const CartScreen = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { cartItems, appliedCoupon, discount } = useSelector((state) => state.cart);
    
    const [couponCode, setCouponCode] = useState('');
    const [couponError, setCouponError] = useState('');

    // Quantity Handlers
    const updateQtyHandler = (item, newQty) => {
        if (newQty > 0 && newQty <= item.countInStock) {
            dispatch(addToCart({ ...item, qty: newQty }));
        }
    };

    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id));
    };

    // Coupon Validation Handler
    const handleApplyCoupon = (e) => {
        e.preventDefault();
        const upperCode = couponCode.toUpperCase().trim();

        if (upperCode === 'VINTAGE20') {
            dispatch(applyCoupon({ code: 'VINTAGE20', discountRate: 0.20 })); // 20% Off
            setCouponError('');
            setCouponCode('');
        } else if (upperCode === 'MATRIX50') {
            dispatch(applyCoupon({ code: 'MATRIX50', discountRate: 0.50 })); // 50% Off
            setCouponError('');
            setCouponCode('');
        } else {
            setCouponError('Invalid voucher manifest token');
        }
    };

    // Summary Mathematical Matrices
    const itemsPrice = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
    const discountAmount = itemsPrice * discount;
    const shippingPrice = itemsPrice > 100 || itemsPrice === 0 ? 0 : 10;
    const taxPrice = Number((0.15 * (itemsPrice - discountAmount)).toFixed(2));
    const totalPrice = (itemsPrice - discountAmount) + shippingPrice + taxPrice;

    const checkoutHandler = () => {
        navigate('/login?redirect=/shipping');
    };

    return (
        <div className="space-y-6">
            <div className="pb-4 border-b border-stone-800 space-y-1">
                <h1 className="font-serif text-2xl md:text-3xl text-stone-100 tracking-wide">Shopping Vault</h1>
                <p className="text-xs text-stone-500 font-mono uppercase">Review Curated Artifacts</p>
            </div>

            {cartItems.length === 0 ? (
                <div className="text-center py-16 border border-dashed border-stone-800 rounded-xl space-y-4">
                    <p className="text-stone-500 font-light text-sm">Your vault repository is currently empty.</p>
                    <Link to="/" className="inline-flex items-center gap-2 text-xs font-mono text-amber-500 hover:text-amber-400 uppercase tracking-wider transition-colors">
                        <ArrowLeft className="w-3.5 h-3.5" /> Back to Collections
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column: Cart Items List */}
                    <div className="lg:col-span-2 space-y-4">
                        {cartItems.map((item) => (
                            <div key={item.product} className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between bg-neutral-900 border border-amber-900/5 rounded-xl p-4 shadow-md transition-all hover:border-amber-900/20">
                                <div className="flex gap-4 items-center flex-grow">
                                    <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-md border border-stone-800 bg-neutral-950" />
                                    <div className="space-y-1">
                                        <Link to={`/product/${item.product}`} className="font-serif text-stone-200 hover:text-amber-500 transition-colors block text-base">
                                            {item.name}
                                        </Link>
                                        <p className="text-xs text-stone-500 font-mono">{item.brand} • {item.category}</p>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto border-t sm:border-t-0 pt-3 sm:pt-0 border-stone-800/60">
                                    {/* Responsive Qty Selector Controls */}
                                    <div className="flex items-center bg-neutral-950 border border-stone-800 rounded overflow-hidden">
                                        <button onClick={() => updateQtyHandler(item, item.qty - 1)} className="p-1.5 text-stone-400 hover:text-stone-200 hover:bg-stone-900 transition-colors">
                                            <Minus className="w-3.5 h-3.5" />
                                        </button>
                                        <span className="px-3 text-xs font-mono text-stone-200">{item.qty}</span>
                                        <button onClick={() => updateQtyHandler(item, item.qty + 1)} className="p-1.5 text-stone-400 hover:text-stone-200 hover:bg-stone-900 transition-colors">
                                            <Plus className="w-3.5 h-3.5" />
                                        </button>
                                    </div>

                                    {/* Price Matrix */}
                                    <span className="font-mono text-amber-500 text-sm font-medium">${(item.price * item.qty).toFixed(2)}</span>

                                    {/* Action Vanish Vector */}
                                    <button onClick={() => removeFromCartHandler(item.product)} className="text-stone-500 hover:text-rose-400 p-1.5 rounded transition-all cursor-pointer">
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        ))}

                        <Link to="/" className="inline-flex items-center gap-2 text-xs font-mono text-stone-500 hover:text-amber-500 uppercase tracking-wider transition-colors pt-2">
                            <ArrowLeft className="w-3.5 h-3.5" /> Continue Sourcing Artifacts
                        </Link>
                    </div>

                    {/* Right Column: Calculations & Voucher Panel */}
                    <div className="space-y-4 h-fit">
                        {/* 🚀 Integrated Dynamic Voucher Form Module */}
                        <div className="bg-neutral-900 border border-amber-900/10 rounded-xl p-5 shadow-xl space-y-3">
                            <h3 className="font-serif text-sm text-stone-200 tracking-wide uppercase font-medium">Apply Vault Voucher</h3>
                            
                            {!appliedCoupon ? (
                                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                                    <input 
                                        type="text" 
                                        placeholder="e.g. VINTAGE20" 
                                        value={couponCode}
                                        onChange={(e) => setCouponCode(e.target.value)}
                                        className="bg-neutral-950 border border-stone-800 text-stone-200 rounded px-3 py-2 text-xs focus:outline-none focus:border-amber-600 flex-grow font-mono uppercase tracking-wider placeholder:text-stone-700"
                                    />
                                    <button type="submit" className="bg-amber-600 hover:bg-amber-500 text-neutral-950 font-medium px-4 py-2 rounded text-xs uppercase tracking-wider transition-colors cursor-pointer">
                                        Apply
                                    </button>
                                </form>
                            ) : (
                                <div className="flex justify-between items-center bg-amber-600/10 border border-amber-600/20 rounded p-2.5 text-xs font-mono text-amber-500">
                                    <div className="flex items-center gap-1.5">
                                        <Tag className="w-3.5 h-3.5" />
                                        <span>ACTIVE TOKEN: <strong>{appliedCoupon}</strong> (-{discount * 100}%)</span>
                                    </div>
                                    <button onClick={() => dispatch(removeCoupon())} className="text-stone-400 hover:text-rose-400 transition-colors cursor-pointer">
                                        <X className="w-4 h-4" />
                                    </button>
                                </div>
                            )}
                            
                            {couponError && <p className="text-[10px] text-rose-500 font-mono tracking-wide">{couponError}</p>}
                        </div>

                        {/* Order Summary Manifest Box */}
                        <div className="bg-neutral-900 border border-amber-900/10 rounded-xl p-6 shadow-xl space-y-4">
                            <h2 className="font-serif text-lg text-stone-200 tracking-wide pb-2 border-b border-stone-800">Order Manifest</h2>
                            
                            <div className="space-y-2.5 text-xs font-mono text-stone-400">
                                <div className="flex justify-between">
                                    <span>Total Items Qty:</span>
                                    <span className="text-stone-200">{cartItems.reduce((acc, item) => acc + item.qty, 0)} units</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Subtotal Base:</span>
                                    <span className="text-stone-200">${itemsPrice.toFixed(2)}</span>
                                </div>

                                {discount > 0 && (
                                    <div className="flex justify-between text-emerald-400">
                                        <span>Vault Discount:</span>
                                        <span>-${discountAmount.toFixed(2)}</span>
                                    </div>
                                )}

                                <div className="flex justify-between">
                                    <span>Shipping Matrix:</span>
                                    <span className="text-stone-200">{shippingPrice === 0 ? 'FREE' : `$${shippingPrice.toFixed(2)}`}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Estimated Taxes (15%):</span>
                                    <span className="text-stone-200">${taxPrice.toFixed(2)}</span>
                                </div>
                                <div className="border-t border-stone-800/80 my-2 pt-3 flex justify-between text-sm font-medium">
                                    <span className="font-serif text-stone-200">Aggregate Total:</span>
                                    <span className="text-amber-500">${totalPrice.toFixed(2)}</span>
                                </div>
                            </div>

                            <button 
                                onClick={checkoutHandler}
                                className="w-full bg-amber-600 hover:bg-amber-500 text-neutral-950 font-medium py-3 rounded transition-all text-xs uppercase tracking-widest cursor-pointer mt-2"
                            >
                                Proceed To Checkout
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CartScreen;