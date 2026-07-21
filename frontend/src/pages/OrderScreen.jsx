// src/pages/OrderScreen.jsx
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const OrderScreen = () => {
    const { id: orderId } = useParams();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOrderDetails = async () => {
            try {
                setLoading(true);
                // Fixed relative URL to use global axios baseURL
                const { data } = await axios.get(`/api/orders/${orderId}`);
                setOrder(data);
                setLoading(false);
            } catch (err) {
                setError(err.response && err.response.data.message ? err.response.data.message : err.message);
                setLoading(false);
            }
        };

        if (orderId) {
            fetchOrderDetails();
        }
    }, [orderId]);

    if (loading) return <div className="text-center py-20 text-amber-500 font-mono tracking-wider animate-pulse">RETRIEVING INVOICE MANIFEST...</div>;
    if (error) return <div className="text-center py-20 text-red-400 bg-red-950/20 border border-red-900 rounded p-4">{error}</div>;
    
    // SAFETY CHECK Matrix: Agar state abhi bhi empty hai toh crash hone se bachao
    if (!order) return <div className="text-center py-20 text-stone-500 font-mono">MANIFEST RETRIEVAL FAILED</div>;

    return (
        <div className="space-y-6">
            <div className="space-y-1">
                <h1 className="font-serif text-2xl md:text-3xl text-stone-100 tracking-wide">Manifest: #{orderId}</h1>
                <p className="text-xs text-stone-500 font-mono uppercase">Secure Verification Registered</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Progress Matrix Stack */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Shipping Address Status Block */}
                    <div className="p-6 bg-neutral-900 border border-amber-900/10 rounded-xl space-y-3">
                        <h2 className="font-serif text-xl text-stone-200 tracking-wide pb-2 border-b border-stone-800">Logistics</h2>
                        <p className="text-sm font-light text-stone-300">
                            <span className="text-stone-500 uppercase tracking-wider text-xs block mb-1">Target Coordinates:</span>
                            {order.shippingAddress?.address}, {order.shippingAddress?.city}, {order.shippingAddress?.postalCode}, {order.shippingAddress?.country}
                        </p>
                        {order.isDelivered ? (
                            <div className="p-3 bg-emerald-950/40 border border-emerald-900 text-emerald-400 text-xs rounded font-medium">Delivered on {order.deliveredAt}</div>
                        ) : (
                            <div className="p-3 bg-amber-950/20 border border-amber-900/20 text-amber-500 text-xs rounded font-light uppercase tracking-wider">Awaiting Dispatch Courier</div>
                        )}
                    </div>

                    {/* Payment Status Block */}
                    <div className="p-6 bg-neutral-900 border border-amber-900/10 rounded-xl space-y-3">
                        <h2 className="font-serif text-xl text-stone-200 tracking-wide pb-2 border-b border-stone-800">Financial Instrument</h2>
                        <p className="text-sm font-light text-stone-300">
                            <span className="text-stone-500 uppercase tracking-wider text-xs block mb-1">Gateway Pipeline:</span>
                            <span className="font-mono text-amber-500 font-medium">{order.paymentMethod}</span>
                        </p>
                        {order.isPaid ? (
                            <div className="p-3 bg-emerald-950/40 border border-emerald-900 text-emerald-400 text-xs rounded font-medium">Cleared Vault on {order.paidAt}</div>
                        ) : (
                            <div className="p-3 bg-rose-950/40 border border-rose-900 text-rose-400 text-xs rounded font-medium uppercase tracking-wider animate-pulse">Pending Gateway Settlement</div>
                        )}
                    </div>

                    {/* Order Items Mapping Container */}
                    <div className="p-6 bg-neutral-900 border border-amber-900/10 rounded-xl space-y-4">
                        <h2 className="font-serif text-xl text-stone-200 tracking-wide pb-2 border-b border-stone-800">Acquired Assets</h2>
                        <div className="space-y-3">
                            {order.orderItems?.map((item, index) => (
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
                    </div>
                </div>

                {/* Right Receipt Ledger Summary Panel */}
                <div className="bg-neutral-900 border border-amber-900/10 rounded-xl p-6 space-y-4 h-fit shadow-xl">
                    <h2 className="font-serif text-xl text-stone-200 tracking-wide pb-2 border-b border-stone-800">Ledger Balance</h2>
                    
                    <div className="flex justify-between items-center text-sm font-light text-stone-400">
                        <span>Items Total:</span>
                        <span className="font-mono text-stone-200">${order.itemsPrice?.toFixed(2)}</span>
                    </div>

                    <div className="flex justify-between items-center text-sm font-light text-stone-400">
                        <span>Logistics Cost:</span>
                        <span className="font-mono text-stone-200">${order.shippingPrice?.toFixed(2)}</span>
                    </div>

                    <div className="flex justify-between items-center text-sm font-light text-stone-400">
                        <span>Government Tax:</span>
                        <span className="font-mono text-stone-200">${order.taxPrice?.toFixed(2)}</span>
                    </div>

                    <div className="flex justify-between items-center pt-3 border-t border-stone-800">
                        <span>Total Settlement:</span>
                        <span className="text-2xl font-mono font-medium text-amber-500">${order.totalPrice?.toFixed(2)}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderScreen;