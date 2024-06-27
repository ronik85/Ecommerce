import express from 'express';
import { adminOnly } from '../middlewares/auth.js';
import { createProduct, getLatestProducts, getCategories, getAdminProducts, getSingleProduct, updateProduct, deleteProduct, getAllProducts } from '../controllers/product.controller.js';
import { singleUpload } from '../middlewares/multer.js';

const app = express.Router();
app.post('/create', adminOnly, singleUpload, createProduct)

app.get('/latest', getLatestProducts)

app.get('/categories', getCategories)

app.get('/admin-products', getAdminProducts)

app.get('/all', getAllProducts)

app.route('/:id')
    .get(getSingleProduct)
    .put(adminOnly, singleUpload, updateProduct)
    .delete(adminOnly, deleteProduct)

export default app;



