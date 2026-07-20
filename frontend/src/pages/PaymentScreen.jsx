// src/pages/PaymentScreen.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import CheckoutSteps from '../components/CheckoutSteps';
import { savePaymentMethod } from '../store/cartSlice';

const PaymentScreen = () => {
    const cart = useSelector((state) => state.cart);
    const { shippingAddress } = cart;

    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Protection matrix: Agar shipping address store nahi hai, toh wapas bhej do
    useEffect(() => {
        if (!shippingAddress || !shippingAddress.address) {
            navigate('/shipping');
        }
    }, [shippingAddress, navigate]);

    const [paymentMethod, setPaymentMethod] = useState('PayPal');

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(savePaymentMethod(paymentMethod));
        navigate('/placeorder');
    };

    return (
        <div className="py-4">
            {/* Step 1, 2, aur 3 active track status */}
            <CheckoutSteps step1 step2 step3 />

            <div className="max-w-md mx-auto p-8 bg-neutral-900 border border-amber-900/10 rounded-xl space-y-6 shadow-xl">
                <div className="text-center space-y-2">
                    <h1 className="font-serif text-3xl text-stone-100 tracking-wide">Payment Method</h1>
                    <p className="text-xs text-stone-400 font-light uppercase tracking-widest">Select Gateway Gateway</p>
                </div>

                <form onSubmit={submitHandler} className="space-y-6">
                    <div className="space-y-4">
                        <label className="text-xs text-stone-400 uppercase tracking-wider block mb-2">Select Method</label>
                        
                        {/* PayPal / Credit Card Option */}
                        <div className="flex items-center gap-3 p-3 bg-neutral-950 border border-stone-800 rounded cursor-pointer hover:border-amber-600/50 transition-colors">
                            <input 
                                type="radio" 
                                id="PayPal" 
                                name="paymentMethod" 
                                value="PayPal" 
                                checked={paymentMethod === 'PayPal'}
                                onChange={(e) => setPaymentMethod(e.target.value)}
                                className="accent-amber-500 w-4 h-4"
                            />
                            <label htmlFor="PayPal" className="text-sm text-stone-200 cursor-pointer">
                                PayPal or Credit Card
                            </label>
                        </div>

                        {/* Optional Alternative: Razorpay / Stripe Option */}
                        <div className="flex items-center gap-3 p-3 bg-neutral-950 border border-stone-800 rounded cursor-pointer hover:border-amber-600/50 transition-colors">
                            <input 
                                type="radio" 
                                id="Razorpay" 
                                name="paymentMethod" 
                                value="Razorpay" 
                                checked={paymentMethod === 'Razorpay'}
                                onChange={(e) => setPaymentMethod(e.target.value)}
                                className="accent-amber-500 w-4 h-4"
                            />
                            <label htmlFor="Razorpay" className="text-sm text-stone-200 cursor-pointer">
                                Razorpay
                            </label>
                        </div>
                    </div>

                    <button 
                        type="submit" 
                        className="w-full bg-amber-600 hover:bg-amber-500 text-neutral-950 font-medium py-3 rounded transition-colors duration-200 uppercase tracking-wider text-sm cursor-pointer shadow-md shadow-amber-600/10"
                    >
                        Continue to Place Order
                    </button>
                </form>
            </div>
        </div>
    );
};

export default PaymentScreen;