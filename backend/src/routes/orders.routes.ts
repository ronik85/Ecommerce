import express from 'express';
import { adminOnly } from '../middlewares/auth.js';
import { singleUpload } from '../middlewares/multer.js';
import { newOrder, myOrders, allorders, getSingleOrder, processOrder, deleteOrder } from '../controllers/order.controller.js';

const app = express.Router();
app.post('/new', newOrder);
app.get('/my', myOrders)
app.get('/all', adminOnly, allorders)
app.route('/:id')
    .get(getSingleOrder)
    .put(adminOnly, processOrder)
    .delete(adminOnly, deleteOrder)
export default app;



