// src/pages/RegisterScreen.jsx
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setCredentials } from '../store/authSlice';

const RegisterScreen = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { search } = useLocation();
    const sp = new URLSearchParams(search);
    const redirect = sp.get('redirect') || '/';

    const { userInfo } = useSelector((state) => state.auth);

    useEffect(() => {
        if (userInfo) {
            navigate(redirect);
        }
    }, [navigate, redirect, userInfo]);

    const submitHandler = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }
        try {
            setLoading(true);
            setError(null);
            const { data } = await axios.post('http://localhost:5000/api/auth/register', { name, email, password });
            dispatch(setCredentials({ ...data }));
            navigate(redirect);
        } catch (err) {
            setError(err.response && err.response.data.message ? err.response.data.message : err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto my-8 p-8 bg-neutral-900 border border-amber-900/10 rounded-xl space-y-6 shadow-xl">
            <div className="text-center space-y-2">
                <h1 className="font-serif text-3xl text-stone-100 tracking-wide">Register</h1>
                <p className="text-xs text-stone-400 font-light uppercase tracking-widest">Create Your Collector Profile</p>
            </div>

            {error && <div className="p-3 bg-red-950/40 border border-red-900 text-red-400 text-sm rounded">{error}</div>}

            <form onSubmit={submitHandler} className="space-y-4">
                <div className="flex flex-col gap-1.5">
                    <label className="text-xs text-stone-400 uppercase tracking-wider">Full Name</label>
                    <input 
                        type="text" 
                        placeholder="Enter your name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="bg-neutral-950 border border-stone-800 text-stone-200 rounded p-2.5 text-sm focus:outline-none focus:border-amber-600 transition-colors placeholder:text-stone-600"
                    />
                </div>

                <div className="flex flex-col gap-1.5">
                    <label className="text-xs text-stone-400 uppercase tracking-wider">Email Address</label>
                    <input 
                        type="email" 
                        placeholder="Enter email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="bg-neutral-950 border border-stone-800 text-stone-200 rounded p-2.5 text-sm focus:outline-none focus:border-amber-600 transition-colors placeholder:text-stone-600"
                    />
                </div>

                <div className="flex flex-col gap-1.5">
                    <label className="text-xs text-stone-400 uppercase tracking-wider">Password</label>
                    <input 
                        type="password" 
                        placeholder="Create password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="bg-neutral-950 border border-stone-800 text-stone-200 rounded p-2.5 text-sm focus:outline-none focus:border-amber-600 transition-colors placeholder:text-stone-600"
                    />
                </div>

                <div className="flex flex-col gap-1.5">
                    <label className="text-xs text-stone-400 uppercase tracking-wider">Confirm Password</label>
                    <input 
                        type="password" 
                        placeholder="Confirm password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        className="bg-neutral-950 border border-stone-800 text-stone-200 rounded p-2.5 text-sm focus:outline-none focus:border-amber-600 transition-colors placeholder:text-stone-600"
                    />
                </div>

                <button 
                    type="submit" 
                    disabled={loading}
                    className="w-full bg-amber-600 hover:bg-amber-500 disabled:bg-stone-800 disabled:text-stone-500 text-neutral-950 font-medium py-3 rounded transition-colors duration-200 uppercase tracking-wider text-sm cursor-pointer shadow-md shadow-amber-600/10"
                >
                    {loading ? 'Creating Account...' : 'Register'}
                </button>
            </form>

            <div className="text-center pt-2 border-t border-stone-800 text-sm font-light text-stone-400">
                Already registered? <Link to={redirect !== '/' ? `/login?redirect=${redirect}` : '/login'} className="text-amber-500 hover:underline">Sign In</Link>
            </div>
        </div>
    );
};

export default RegisterScreen;