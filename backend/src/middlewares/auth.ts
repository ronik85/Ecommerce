// middle ware to make sure only admin is allowed

import { User } from "../models/user.model.js";
import ErrorHandler from "../utils/utility-class.js";
import { TryCatch } from "./error.js";

export const adminOnly = TryCatch(async (req, res, next) => {
    const { id } = req.query;
    if (!id) return next(new ErrorHandler("Login first", 401))

    const user = await User.findById(id)
    if (!user) return next(new ErrorHandler("user doesnot exist", 401))

    if (user.role !== "admin") next(new ErrorHandler("only admin can access", 401))

    next()
})