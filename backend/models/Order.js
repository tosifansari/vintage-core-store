// models/Order.js
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    orderItems: [
        {
            name: { type: String, required: true },
            qty: { type: Number, required: true },
            price: { type: Number, required: true },
            product: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Product' }
        }
    ],
    totalPrice: { type: Number, required: true, default: 0.0 },
    paymentResult: {
        id: { type: String },
        status: { type: String },
        update_time: { type: String }
    },
    isPaid: { type: Boolean, required: true, default: false },
    paidAt: { type: Date }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);