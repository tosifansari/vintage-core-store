// src/components/CheckoutSteps.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
    return (
        <div className="flex justify-center items-center space-x-4 md:space-x-8 max-w-xl mx-auto mb-10 text-xs md:text-sm font-medium uppercase tracking-wider">
            {/* Step 1: Sign In */}
            <div>
                {step1 ? (
                    <Link to="/login" className="text-amber-500 border-b-2 border-amber-500 pb-1">Sign In</Link>
                ) : (
                    <span className="text-stone-600 cursor-not-allowed">Sign In</span>
                )}
            </div>

            <div className="text-stone-700">➔</div>

            {/* Step 2: Shipping */}
            <div>
                {step2 ? (
                    <Link to="/shipping" className="text-amber-500 border-b-2 border-amber-500 pb-1">Shipping</Link>
                ) : (
                    <span className="text-stone-600 cursor-not-allowed">Shipping</span>
                )}
            </div>

            <div className="text-stone-700">➔</div>

            {/* Step 3: Payment */}
            <div>
                {step3 ? (
                    <Link to="/payment" className="text-amber-500 border-b-2 border-amber-500 pb-1">Payment</Link>
                ) : (
                    <span className="text-stone-600 cursor-not-allowed">Payment</span>
                )}
            </div>

            <div className="text-stone-700">➔</div>

            {/* Step 4: Place Order */}
            <div>
                {step4 ? (
                    <Link to="/placeorder" className="text-amber-500 border-b-2 border-amber-500 pb-1">Place Order</Link>
                ) : (
                    <span className="text-stone-600 cursor-not-allowed">Place Order</span>
                )}
            </div>
        </div>
    );
};

export default CheckoutSteps;