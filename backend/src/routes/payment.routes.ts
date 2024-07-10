import express from 'express';
import { adminOnly } from '../middlewares/auth.js';
import { applyDiscount, newCoupon, allCoupons, deleteCoupon } from '../controllers/payment.controller.js';

const app = express.Router();


app.get("/discount", applyDiscount);
app.post("/coupon/new", adminOnly, newCoupon);
app.get("/coupon/all", adminOnly, allCoupons);
app.delete("/coupon/:id", deleteCoupon);

export default app;