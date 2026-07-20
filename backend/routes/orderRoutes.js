// backend/routes/orderRoutes.js
const express = require('express');
const router = express.Router();
const { 
    addOrderItems, 
    getOrderById, 
    updateOrderToPaid, 
    getMyOrders 
} = require('../controllers/orderController');

// 1. Post new order matrix
router.post('/', addOrderItems);

// 2. Get logged in user orders
router.get('/myorders', getMyOrders);

// 3. Get specific order details by dynamic parameter ID
router.get('/:id', getOrderById); // <-- Ye ensure karega ki /api/orders/order_success_1001 yahan hit ho

// 4. Pay order status
router.put('/:id/pay', updateOrderToPaid);

module.exports = router;