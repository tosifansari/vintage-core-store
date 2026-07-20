// backend/routes/productRoutes.js
// backend/routes/productRoutes.js
const express = require('express');
const router = express.Router();
const { 
    getProducts, 
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
} = require('../controllers/productController');

// Standard endpoint configurations
router.route('/')
      .get(getProducts)
      .post(createProduct);

router.route('/:id')
      .get(getProductById)
      .put(updateProduct)
      .delete(deleteProduct);

module.exports = router;