// backend/routes/productRoutes.js
import express from 'express';
const router = express.Router();

import { 
    getProducts, 
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
} from '../controllers/productController.js';

// Standard endpoint configurations
router.route('/')
      .get(getProducts)
      .post(createProduct);

router.route('/:id')
      .get(getProductById)
      .put(updateProduct)
      .delete(deleteProduct);

export default router;