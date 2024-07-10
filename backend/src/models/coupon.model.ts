import mongoose, { Schema } from "mongoose";

const couponSchmea = new Schema({
    code: {
        type: String,
        required: [true, "please enter coupon code"]
    },
    amount: {
        type: Number,
        required: [true, "please enter Discount amount"]
    }
})

export const Coupon = mongoose.model('Coupon', couponSchmea)