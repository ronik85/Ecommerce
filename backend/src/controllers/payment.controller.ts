import { TryCatch } from "../middlewares/error.js";
import { Coupon } from "../models/coupon.model.js";
import ErrorHandler from "../utils/utility-class.js";

export const newCoupon = TryCatch(async (req, res, next) => {
    const { code, amount } = req.body;
    if (!code || !amount)
        return next(new ErrorHandler("Please enter coupon code and amount", 400));
    await Coupon.create({ code, amount });
    return res.status(201).json({
        success: true,
        message: `Coupon ${code} Created Successfully`,
    });
});
export const applyDiscount = TryCatch(async (req, res, next) => {
    const { coupon: code } = req.query;
    const discount = await Coupon.findOne({ code })
    if (!discount) return next(new ErrorHandler("Invalid Coupon code", 400))
    return res.status(200).json({
        success: true,
        discount: discount.amount
    });
});
export const allCoupons = TryCatch(async (req, res, next) => {
    const coupons = await Coupon.find()
    return res.status(200).json({
        success: true,
        coupons
    });
});
export const deleteCoupon = TryCatch(async (req, res, next) => {
    const { id } = req.params
    const coupon = await Coupon.findByIdAndDelete(id)
    if (!coupon) return next(new ErrorHandler("Invalid Coupon ID", 400));
    return res.status(200).json({
        success: true,
        message: `Coupon ${coupon.code} Deleted Successfully`
    });
});