// src/pages/PlaceOrderScreen.jsx
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import CheckoutSteps from '../components/CheckoutSteps';
import axios from 'axios';

const PlaceOrderScreen = () => {
    const navigate = useNavigate();
    const cart = useSelector((state) => state.cart);
    const { cartItems, shippingAddress, paymentMethod } = cart;

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Navigation Protection Matrix
    useEffect(() => {
        if (!shippingAddress.address) {
            navigate('/shipping');
        } else if (!paymentMethod) {
            navigate('/payment');
        }
    }, [shippingAddress.address, paymentMethod, navigate]);

    // Financial Breakdown Calculations
    const itemsPrice = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
    const shippingPrice = itemsPrice > 100 ? 0 : 10; // $100 se upar free delivery
    const taxPrice = Number((0.15 * itemsPrice).toFixed(2)); // 15% standard tax
    const totalPrice = (itemsPrice + shippingPrice + taxPrice).toFixed(2);

    const placeOrderHandler = async () => {
        try {
            setLoading(true);
            setError(null);
            
            const orderData = {
                orderItems: cartItems,
                shippingAddress,
                paymentMethod,
                itemsPrice,
                shippingPrice,
                taxPrice,
                totalPrice,
            };

            const { data } = await axios.post('/api/orders', orderData);
            // Success hone par direct dynamic order summary screen par forward karenge
            navigate(`/order/${data._id}`);
        } catch (err) {
            setError(err.response && err.response.data.message ? err.response.data.message : err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="py-4">
            {/* Saare steps ab green tracking matrix par dikhenge */}
            <CheckoutSteps step1 step2 step3 step4 />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-6">
                {/* Left Information Stack */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Shipping Section */}
                    <div className="p-6 bg-neutral-900 border border-amber-900/10 rounded-xl space-y-2">
                        <h2 className="font-serif text-xl text-stone-200 tracking-wide pb-2 border-b border-stone-800">Shipping</h2>
                        <p className="text-sm font-light text-stone-300 leading-relaxed">
                            <span className="text-stone-500 uppercase tracking-wider text-xs block mb-1">Address Details:</span>
                            {shippingAddress.address}, {shippingAddress.city}, {shippingAddress.postalCode}, {shippingAddress.country}
                        </p>
                    </div>

                    {/* Payment Section */}
                    <div className="p-6 bg-neutral-900 border border-amber-900/10 rounded-xl space-y-2">
                        <h2 className="font-serif text-xl text-stone-200 tracking-wide pb-2 border-b border-stone-800">Payment Method</h2>
                        <p className="text-sm font-light text-stone-300">
                            <span className="text-stone-500 uppercase tracking-wider text-xs block mb-1">Gateway Selected:</span>
                            <span className="font-mono text-amber-500 font-medium">{paymentMethod}</span>
                        </p>
                    </div>

                    {/* Items Section */}
                    <div className="p-6 bg-neutral-900 border border-amber-900/10 rounded-xl space-y-4">
                        <h2 className="font-serif text-xl text-stone-200 tracking-wide pb-2 border-b border-stone-800">Order Items</h2>
                        {cartItems.length === 0 ? (
                            <p className="text-sm text-stone-400">Your cart is empty</p>
                        ) : (
                            <div className="space-y-3">
                                {cartItems.map((item, index) => (
                                    <div key={index} className="flex items-center justify-between gap-4 py-2 border-b border-stone-800/50 last:border-none">
                                        <div className="flex items-center gap-4">
                                            <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded bg-neutral-950" />
                                            <Link to={`/product/${item.product}`} className="font-serif text-stone-200 text-sm hover:text-amber-500 transition-colors">
                                                {item.name}
                                            </Link>
                                        </div>
                                        <div className="text-sm font-mono text-stone-400">
                                            {item.qty} x ${item.price} = <span className="text-stone-200">${(item.qty * item.price).toFixed(2)}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Right Price Breakdown Summary Panel */}
                <div className="bg-neutral-900 border border-amber-900/10 rounded-xl p-6 space-y-4 h-fit shadow-xl">
                    <h2 className="font-serif text-xl text-stone-200 tracking-wide pb-2 border-b border-stone-800">Order Summary</h2>
                    
                    <div className="flex justify-between items-center text-sm font-light text-stone-400">
                        <span>Items Subtotal:</span>
                        <span className="font-mono text-stone-200">${itemsPrice.toFixed(2)}</span>
                    </div>

                    <div className="flex justify-between items-center text-sm font-light text-stone-400">
                        <span>Shipping Cost:</span>
                        <span className="font-mono text-stone-200">${shippingPrice.toFixed(2)}</span>
                    </div>

                    <div className="flex justify-between items-center text-sm font-light text-stone-400">
                        <span>Estimated Tax (15%):</span>
                        <span className="font-mono text-stone-200">${taxPrice.toFixed(2)}</span>
                    </div>

                    <div className="flex justify-between items-center pt-3 border-t border-stone-800">
                        <span className="text-base text-stone-300">Total Price:</span>
                        <span className="text-2xl font-mono font-medium text-amber-500">${totalPrice}</span>
                    </div>

                    {error && <div className="p-3 bg-red-950/40 border border-red-900 text-red-400 text-xs rounded">{error}</div>}

                    <button 
                        type="button"
                        disabled={cartItems.length === 0 || loading}
                        onClick={placeOrderHandler}
                        className="w-full bg-amber-600 hover:bg-amber-500 disabled:bg-stone-800 disabled:text-stone-500 text-neutral-950 font-medium py-3 rounded transition-colors duration-200 uppercase tracking-wider text-sm cursor-pointer shadow-md shadow-amber-600/10 text-center"
                    >
                        {loading ? 'Processing Order...' : 'Place Order'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PlaceOrderScreen;