// frontend/src/store/cartSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    cartItems: localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [],
    shippingAddress: localStorage.getItem('shippingAddress') ? JSON.parse(localStorage.getItem('shippingAddress')) : {},
    paymentMethod: localStorage.getItem('paymentMethod') ? JSON.parse(localStorage.getItem('paymentMethod')) : 'Razorpay',
    // 🚀 Added voucher metrics
    discount: localStorage.getItem('discount') ? Number(localStorage.getItem('discount')) : 0,
    appliedCoupon: localStorage.getItem('appliedCoupon') ? localStorage.getItem('appliedCoupon') : '',
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const item = action.payload;
            const existItem = state.cartItems.find((x) => x.product === item.product);

            if (existItem) {
                state.cartItems = state.cartItems.map((x) => x.product === existItem.product ? item : x);
            } else {
                state.cartItems = [...state.cartItems, item];
            }
            localStorage.setItem('cart', JSON.stringify(state.cartItems));
        },
        removeFromCart: (state, action) => {
            state.cartItems = state.cartItems.filter((x) => x.product !== action.payload);
            localStorage.setItem('cart', JSON.stringify(state.cartItems));
        },
        saveShippingAddress: (state, action) => {
            state.shippingAddress = action.payload;
            localStorage.setItem('shippingAddress', JSON.stringify(action.payload));
        },
        savePaymentMethod: (state, action) => {
            state.paymentMethod = action.payload;
            localStorage.setItem('paymentMethod', JSON.stringify(action.payload));
        },
        // 🚀 Apply Coupon Action
        applyCoupon: (state, action) => {
            state.appliedCoupon = action.payload.code;
            state.discount = action.payload.discountRate; // e.g., 0.20 for 20% off
            localStorage.setItem('discount', state.discount);
            localStorage.setItem('appliedCoupon', state.appliedCoupon);
        },
        // 🚀 Remove Coupon Action
        removeCoupon: (state) => {
            state.appliedCoupon = '';
            state.discount = 0;
            localStorage.removeItem('discount');
            localStorage.removeItem('appliedCoupon');
        },
        clearCartItems: (state) => {
            state.cartItems = [];
            state.appliedCoupon = '';
            state.discount = 0;
            localStorage.setItem('cart', JSON.stringify(state.cartItems));
            localStorage.removeItem('discount');
            localStorage.removeItem('appliedCoupon');
        }
    },
});

export const { 
    addToCart, 
    removeFromCart, 
    saveShippingAddress, 
    savePaymentMethod, 
    applyCoupon,
    removeCoupon,
    clearCartItems 
} = cartSlice.actions;

export default cartSlice.reducer;