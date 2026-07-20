// frontend/src/components/Header.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ShoppingCart, User, Anchor } from 'lucide-react'; // 🚀 Added Anchor for classy brand identity symbol

const Header = () => {
    const navigate = useNavigate();
    const { cartItems } = useSelector((state) => state.cart);
    const { userInfo } = useSelector((state) => state.auth);

    // Dynamic mock values fallbacks if auth matrix is refreshing
    const activeUser = userInfo ? userInfo.name : 'tosif'; 
    const cartCount = cartItems ? cartItems.reduce((acc, item) => acc + item.qty, 0) : 0;

    return (
        <header className="bg-neutral-900 border-b border-stone-800 p-4 sticky top-0 z-50">
            <div className="container mx-auto flex justify-between items-center max-w-7xl">
                
                {/* 🚀 Brand Logo: Text transformed into a premium visual token logo */}
                <Link to="/" className="flex items-center gap-2.5 group hover:opacity-90 transition-opacity">
                    <div className="bg-amber-600/10 border border-amber-600/30 p-1.5 rounded-lg text-amber-500 group-hover:border-amber-500 group-hover:bg-amber-600/20 transition-all duration-300">
                        <Anchor className="w-5 h-5 stroke-[1.5]" />
                    </div>
                    <div className="flex flex-col">
                        <span className="font-serif text-amber-500 tracking-widest text-lg leading-tight">VINTAGE</span>
                        <span className="text-stone-500 text-[9px] font-mono uppercase tracking-widest leading-none">Est. 2026</span>
                    </div>
                </Link>

                {/* Navigation Terminal Vectors */}
                <div className="flex items-center gap-6">
                    {/* Cart Controller Flag */}
                    <Link to="/cart" className="relative flex items-center text-stone-400 hover:text-amber-500 transition-colors">
                        <ShoppingCart className="w-5 h-5" />
                        {cartCount > 0 && (
                            <span className="absolute -top-2 -right-2 bg-amber-600 text-neutral-950 font-mono text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-fade-in">
                                {cartCount}
                            </span>
                        )}
                    </Link>

                    {/* Active User Dropdown/Profile Trigger */}
                    <Link to="/profile" className="flex items-center gap-1.5 text-stone-400 hover:text-amber-500 transition-colors text-sm font-mono cursor-pointer">
                        <User className="w-4 h-4" />
                        <span>{activeUser}</span>
                    </Link>

                    {/* Quick Link to Admin View Dashboard */}
                    <Link to="/admin/productlist" className="text-[10px] text-stone-500 hover:text-amber-600 border border-stone-800 px-2 py-0.5 rounded transition-all uppercase tracking-wider">
                        Admin
                    </Link>
                </div>
            </div>
        </header>
    );
};

export default Header;