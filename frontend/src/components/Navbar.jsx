// src/components/Navbar.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { ShoppingCart, User, LogOut, ChevronDown } from 'lucide-react';
import { logout } from '../store/authSlice';

const Navbar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const { cartItems } = useSelector((state) => state.cart);
    const { userInfo } = useSelector((state) => state.auth);

    const logoutHandler = () => {
        dispatch(logout());
        setDropdownOpen(false);
        navigate('/login');
    };

    return (
        <nav className="bg-neutral-950 border-b border-amber-900/20 py-4 px-6 sticky top-0 z-50">
            <div className="container mx-auto flex justify-between items-center">
                {/* Brand Logo */}
                <Link to="/" className="font-serif text-2xl tracking-widest text-amber-500 font-normal">
                    VINTAGE<span className="text-stone-400 font-sans text-sm tracking-normal ml-1">CORE</span>
                </Link>

                {/* Right Actions Menu */}
                <div className="flex items-center space-x-6">
                    {/* Cart Link with Badge Counts */}
                    <Link to="/cart" className="relative text-stone-300 hover:text-amber-500 transition-colors flex items-center">
                        <ShoppingCart className="w-5 h-5" />
                        {cartItems.length > 0 && (
                            <span className="absolute -top-2 -right-2 bg-amber-600 text-neutral-950 text-[10px] font-mono font-bold rounded-full h-4 w-4 flex items-center justify-center">
                                {cartItems.reduce((acc, item) => acc + item.qty, 0)}
                            </span>
                        )}
                    </Link>

                    {/* Dynamic Auth Profile Dropdown State */}
                    {userInfo ? (
                        <div className="relative">
                            <button 
                                onClick={() => setDropdownOpen(!dropdownOpen)}
                                className="flex items-center gap-1 text-sm text-stone-300 hover:text-amber-500 transition-colors focus:outline-none cursor-pointer font-medium"
                            >
                                <User className="w-4 h-4" />
                                {userInfo.name}
                                <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} />
                            </button>

                            {/* Dropdown Card Grid overlay */}
                            {dropdownOpen && (
                                <div className="absolute right-0 mt-3 w-40 bg-neutral-900 border border-amber-900/20 rounded-md shadow-xl py-1 z-50 animate-in fade-in slide-in-from-top-2 duration-100">
                                    <Link 
                                        to="/profile" 
                                        onClick={() => setDropdownOpen(false)}
                                        className="flex items-center gap-2 px-4 py-2 text-xs text-stone-300 hover:bg-neutral-950 hover:text-amber-500 transition-colors"
                                    >
                                        <User className="w-3.5 h-3.5" /> Profile Profile
                                    </Link>
                                    <button 
                                        onClick={logoutHandler}
                                        className="w-full flex items-center gap-2 px-4 py-2 text-xs text-stone-300 hover:bg-neutral-950 hover:text-red-400 transition-colors border-t border-stone-800/60 text-left cursor-pointer"
                                    >
                                        <LogOut className="w-3.5 h-3.5" /> Sign Out
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <Link 
                            to="/login" 
                            className="bg-amber-600 hover:bg-amber-500 text-neutral-950 font-medium text-xs px-4 py-2 rounded transition-colors uppercase tracking-wider shadow-md shadow-amber-600/10"
                        >
                            Sign In
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;