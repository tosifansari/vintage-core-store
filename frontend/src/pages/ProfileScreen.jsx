// frontend/src/pages/ProfileScreen.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Eye, Check, X } from 'lucide-react';
import axios from 'axios';
import { setCredentials } from '../store/authSlice';

const ProfileScreen = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [myOrders, setMyOrders] = useState([]);
    const [loadingOrders, setLoadingOrders] = useState(true);
    const [updateLoading, setUpdateLoading] = useState(false);
    const [message, setMessage] = useState(null);
    const [error, setError] = useState(null);

    const dispatch = useDispatch();
    const { userInfo } = useSelector((state) => state.auth);

    useEffect(() => {
        if (userInfo) {
            setName(userInfo.name);
            setEmail(userInfo.email);
        }

        const fetchMyOrders = async () => {
            try {
                setLoadingOrders(true);
                const { data } = await axios.get('[https://vintage-core-store.onrender.com](https://vintage-core-store.onrender.com)/api/orders/myorders');
                setMyOrders(data);
                setLoadingOrders(false);
            } catch (err) {
                setLoadingOrders(false);
            }
        };

        fetchMyOrders();
    }, [userInfo]);

    const submitHandler = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setMessage('Passwords do not match');
            return;
        }
        try {
            setUpdateLoading(true);
            setMessage(null);
            setError(null);
            
            const { data } = await axios.put('[https://vintage-core-store.onrender.com](https://vintage-core-store.onrender.com)/api/auth/profile', {
                _id: userInfo ? userInfo._id : 'mock_user_101',
                name,
                email,
                password,
            });
            
            dispatch(setCredentials({ ...data }));
            setMessage('Profile Updated Successfully');
            setPassword('');
            setConfirmPassword('');
            setUpdateLoading(false);
        } catch (err) {
            setError(err.response && err.response.data.message ? err.response.data.message : err.message);
            setUpdateLoading(false);
        }
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Left Column: Update Profile Form */}
            <div className="md:col-span-1 bg-neutral-900 border border-amber-900/10 rounded-xl p-6 h-fit shadow-xl space-y-4">
                <h2 className="font-serif text-xl text-stone-200 tracking-wide pb-2 border-b border-stone-800">Collector Profile</h2>
                
                {message && <div className="p-2.5 bg-emerald-950/40 border border-emerald-900 text-emerald-400 text-xs rounded">{message}</div>}
                {error && <div className="p-2.5 bg-red-950/40 border border-red-900 text-red-400 text-xs rounded">{error}</div>}

                <form onSubmit={submitHandler} className="space-y-3">
                    <div className="flex flex-col gap-1">
                        <label className="text-[10px] text-stone-500 uppercase tracking-wider">Name</label>
                        <input 
                            type="text" 
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="bg-neutral-950 border border-stone-800 text-stone-200 rounded p-2 text-sm focus:outline-none focus:border-amber-600"
                        />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label className="text-[10px] text-stone-500 uppercase tracking-wider">Email</label>
                        <input 
                            type="email" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="bg-neutral-950 border border-stone-800 text-stone-200 rounded p-2 text-sm focus:outline-none focus:border-amber-600"
                        />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label className="text-[10px] text-stone-500 uppercase tracking-wider">New Password</label>
                        <input 
                            type="password" 
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="bg-neutral-950 border border-stone-800 text-stone-200 rounded p-2 text-sm focus:outline-none focus:border-amber-600 placeholder:text-stone-700"
                        />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label className="text-[10px] text-stone-500 uppercase tracking-wider">Confirm Password</label>
                        <input 
                            type="password" 
                            placeholder="••••••••"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="bg-neutral-950 border border-stone-800 text-stone-200 rounded p-2 text-sm focus:outline-none focus:border-amber-600 placeholder:text-stone-700"
                        />
                    </div>

                    <button 
                        type="submit" 
                        disabled={updateLoading}
                        className="w-full bg-amber-600 hover:bg-amber-500 disabled:bg-stone-800 text-neutral-950 text-xs font-medium py-2.5 rounded transition-colors uppercase tracking-wider cursor-pointer"
                    >
                        {updateLoading ? 'Updating...' : 'Update Profile'}
                    </button>
                </form>
            </div>

            {/* Right Column: Orders History Table */}
            <div className="md:col-span-3 bg-neutral-900 border border-amber-900/10 rounded-xl p-6 shadow-xl space-y-4 overflow-x-auto">
                <h2 className="font-serif text-xl text-stone-200 tracking-wide pb-2 border-b border-stone-800">Order Manifests Ledger</h2>
                
                {loadingOrders ? (
                    <div className="text-center py-10 text-amber-500 font-mono text-xs tracking-wider">SYNCING LEDGER...</div>
                ) : myOrders.length === 0 ? (
                    <div className="text-center py-10 text-stone-500 font-light text-sm">No historical manifests registered for this collector profile.</div>
                ) : (
                    <table className="w-full text-left border-collapse text-sm">
                        <thead>
                            <tr className="border-b border-stone-800 text-stone-500 text-xs uppercase tracking-wider font-medium">
                                <th className="py-3 px-2">ID</th>
                                <th className="py-3 px-2">Date</th>
                                <th className="py-3 px-2">Total</th>
                                <th className="py-3 px-2 text-center">Paid</th>
                                <th className="py-3 px-2 text-center">Delivered</th>
                                <th className="py-3 px-2"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-stone-800/40 text-stone-300 font-light">
                            {myOrders.map((order) => (
                                <tr key={order._id} className="hover:bg-neutral-950/40 transition-colors">
                                    <td className="py-3 px-2 font-mono text-xs text-stone-400">{order._id.substring(0, 10)}...</td>
                                    <td className="py-3 px-2 text-xs">{order.createdAt ? order.createdAt.substring(0, 10) : 'N/A'}</td>
                                    <td className="py-3 px-2 font-mono text-amber-500">${order.totalPrice ? order.totalPrice.toFixed(2) : '0.00'}</td>
                                    <td className="py-3 px-2">
                                        {order.isPaid ? <Check className="w-4 h-4 text-emerald-500 mx-auto" /> : <X className="w-4 h-4 text-rose-500 mx-auto" />}
                                    </td>
                                    <td className="py-3 px-2">
                                        {order.isDelivered ? <Check className="w-4 h-4 text-emerald-500 mx-auto" /> : <X className="w-4 h-4 text-rose-500 mx-auto" />}
                                    </td>
                                    <td className="py-3 px-2 text-right">
                                        <Link to={`/order/${order._id}`} className="inline-flex items-center gap-1 bg-stone-800 hover:bg-amber-600 hover:text-neutral-950 text-stone-300 p-1.5 rounded transition-all">
                                            <Eye className="w-3.5 h-3.5" />
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default ProfileScreen;