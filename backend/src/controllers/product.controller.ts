import { Request } from "express";
import { TryCatch } from "../middlewares/error.js";
import { BaseQuery, NewProductRequestBody, SearchRequestQuery } from '../types/types.js'
import { Product } from "../models/product.model.js";
import ErrorHandler from "../utils/utility-class.js";
import { rm } from "fs";
import { myCache } from "../app.js";
import { invalidateCache } from "../utils/features.js";
// import { faker } from "@faker-js/faker";



export const getLatestProducts = TryCatch(async (req, res, next) => {
    let products = []
    if (myCache.has("latest-products")) { products = JSON.parse(myCache.get("latest-products")!) }
    else {
        products = await Product.find({}).sort({ createdAt: -1 }).limit(5)
        myCache.set("latest-products", JSON.stringify(products))
    }
    return res.status(201).json({
        success: true,
        products
    })
})

export const getCategories = TryCatch(async (req, res, next) => {
    let categories;
    if (myCache.has("categories")) { categories = JSON.parse(myCache.get("categories")!) }
    else {
        categories = await Product.distinct('category')
        myCache.set("categories", JSON.stringify(categories))
    }
    return res.status(201).json({
        success: true,
        categories
    })
})

export const getAdminProducts = TryCatch(async (req, res, next) => {
    let products;
    if (myCache.has("all-product")) { products = JSON.parse(myCache.get("all-product")!) }
    else {
        products = await Product.find({})
        myCache.set("all-product", JSON.stringify(products))
    }
    return res.status(201).json({
        success: true,
        products
    })
})

export const getSingleProduct = TryCatch(async (req, res, next) => {
    const { id } = req.params

    let product;
    if (myCache.has(`product-${id}`)) product = JSON.parse(myCache.get(`product-${id}`) as string)

    else {
        product = await Product.findById(id)
        if (!product) return next(new ErrorHandler("Product Not Found", 404))

        myCache.set(`product-${id}`, JSON.stringify(product))

    }

    return res.status(201).json({
        success: true,
        product
    })
})

export const createProduct = TryCatch(async (req: Request<{}, {}, NewProductRequestBody>, res, next) => {
    const { name, price, stock, category } = req.body;
    const photo = req.file;

    if (!photo) return next(new ErrorHandler("Please add Photo", 400))
    if (!name || !price || !stock || !category) {
        rm(photo.path, () => {
            console.log("Photo deleted")
        })
        return next(new ErrorHandler("Please add all fields", 400))
    }

    await Product.create({
        name,
        price,
        stock,
        category: category.toLowerCase(),
        photo: photo.path,
    })
    await invalidateCache({ product: true })
    return res.status(201).json({
        success: true,
        message: "Product Created successfully"
    })
})
export const updateProduct = TryCatch(async (req, res, next) => {
    const { id } = req.params
    const { name, price, stock, category } = req.body;
    const photo = req.file;
    console.log(photo, "sdsd")
    const product = await Product.findById(id)

    if (!product) return next(new ErrorHandler("Product Not Found", 404))
    if (photo) {
        rm(product.photo!, () => {
            console.log("Old Photo deleted")
        })
        product.photo = photo.path
    }
    if (name) product.name = name
    if (price) product.price = price
    if (stock) product.stock = stock
    if (category) product.category = category

    await product.save()
    await invalidateCache({ product: true })

    return res.status(200).json({
        success: true,
        message: "Product Updated successfully"
    })
})

export const deleteProduct = TryCatch(async (req, res, next) => {
    const { id } = req.params

    const product = await Product.findById(id)
    if (!product) return next(new ErrorHandler("Invalid product ID", 404))

    rm(product.photo, () => {
        console.log("Product Photo deleted")
    })
    await product.deleteOne({})
    await invalidateCache({ product: true })
    return res.status(201).json({
        success: true,
        message: "Product deleted successfully"
    })
})

export const getAllProducts = TryCatch(async (req: Request<{}, {}, {}, SearchRequestQuery>, res, next) => {
    const { search, sort, category, price } = req.query;
    const page = Number(req.query.page) || 1;
    const limit = Number(process.env.PRODUCT_PER_PAGE) || 8;
    const skip = (page - 1) * limit;

    const baseQuery: BaseQuery = {};

    if (search)
        baseQuery.name = {
            $regex: search,
            $options: "i",
        };

    if (price)
        baseQuery.price = {
            $lte: Number(price),
        };

    if (category) baseQuery.category = category;

    const productsPromise = Product.find(baseQuery)
        .sort(sort && { price: sort === "asc" ? 1 : -1 })
        .limit(limit)
        .skip(skip);

    const [products, filteredOnlyProduct] = await Promise.all([
        productsPromise,
        Product.find(baseQuery),
    ]);

    const totalPage = Math.ceil(filteredOnlyProduct.length / limit);

    return res.status(200).json({
        success: true,
        products,
        totalPage,
    });
})

// const generateRandomProducts = async (count: number = 10) => {
//     const products = [];

//     for (let i = 0; i < count; i++) {
//         const product = {
//             name: faker.commerce.productName(),
//             photo: "uploads\c3629a1e-069c-4328-931b-4d0a3bd24261.jpg",
//             price: faker.commerce.price({ min: 1500, max: 80000, dec: 0 }),
//             stock: faker.commerce.price({ min: 0, max: 100, dec: 0 }),
//             category: faker.commerce.department(),
//             createdAt: new Date(faker.date.past()),
//             updatedAt: new Date(faker.date.recent()),
//             __v: 0,
//         };

//         products.push(product);
//     }

//     await Product.create(products);

//     console.log({ succecss: true });
// };
// const deleteRandomsProducts = async (count: number = 10) => {
//     const products = await Product.find({}).skip(2);

//     for (let i = 0; i < products.length; i++) {
//         const product = products[i];
//         await product.deleteOne();
//     }

//     console.log({ succecss: true });
// };