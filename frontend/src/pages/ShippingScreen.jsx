// src/pages/ShippingScreen.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import CheckoutSteps from '../components/CheckoutSteps';
import { saveShippingAddress } from '../store/cartSlice';

const ShippingScreen = () => {
    const cart = useSelector((state) => state.cart);
    const { shippingAddress } = cart;

    const [address, setAddress] = useState(shippingAddress?.address || '');
    const [city, setCity] = useState(shippingAddress?.city || '');
    const [postalCode, setPostalCode] = useState(shippingAddress?.postalCode || '');
    const [country, setCountry] = useState(shippingAddress?.country || '');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(saveShippingAddress({ address, city, postalCode, country }));
        navigate('/payment');
    };

    return (
        <div className="py-4">
            {/* Active steps track progress matrix */}
            <CheckoutSteps step1 step2 />

            <div className="max-w-md mx-auto p-8 bg-neutral-900 border border-amber-900/10 rounded-xl space-y-6 shadow-xl">
                <div className="text-center space-y-2">
                    <h1 className="font-serif text-3xl text-stone-100 tracking-wide">Shipping Address</h1>
                    <p className="text-xs text-stone-400 font-light uppercase tracking-widest">Delivery Coordination Panel</p>
                </div>

                <form onSubmit={submitHandler} className="space-y-4">
                    <div className="flex flex-col gap-1.5">
                        <label className="text-xs text-stone-400 uppercase tracking-wider">Address</label>
                        <input 
                            type="text" 
                            placeholder="Enter address"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            required
                            className="bg-neutral-950 border border-stone-800 text-stone-200 rounded p-2.5 text-sm focus:outline-none focus:border-amber-600 transition-colors placeholder:text-stone-600"
                        />
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <label className="text-xs text-stone-400 uppercase tracking-wider">City</label>
                        <input 
                            type="text" 
                            placeholder="Enter city"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            required
                            className="bg-neutral-950 border border-stone-800 text-stone-200 rounded p-2.5 text-sm focus:outline-none focus:border-amber-600 transition-colors placeholder:text-stone-600"
                        />
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <label className="text-xs text-stone-400 uppercase tracking-wider">Postal Code</label>
                        <input 
                            type="text" 
                            placeholder="Enter postal code"
                            value={postalCode}
                            onChange={(e) => setPostalCode(e.target.value)}
                            required
                            className="bg-neutral-950 border border-stone-800 text-stone-200 rounded p-2.5 text-sm focus:outline-none focus:border-amber-600 transition-colors placeholder:text-stone-600"
                        />
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <label className="text-xs text-stone-400 uppercase tracking-wider">Country</label>
                        <input 
                            type="text" 
                            placeholder="Enter country"
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                            required
                            className="bg-neutral-950 border border-stone-800 text-stone-200 rounded p-2.5 text-sm focus:outline-none focus:border-amber-600 transition-colors placeholder:text-stone-600"
                        />
                    </div>

                    <button 
                        type="submit" 
                        className="w-full bg-amber-600 hover:bg-amber-500 text-neutral-950 font-medium py-3 rounded transition-colors duration-200 uppercase tracking-wider text-sm cursor-pointer shadow-md shadow-amber-600/10"
                    >
                        Continue to Payment
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ShippingScreen;