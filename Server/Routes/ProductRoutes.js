import express from 'express';
import asyncHandler from 'express-async-handler';
import Product from './../Models/ProductModel.js';
import { admin, protect } from './../Middleware/AuthMiddleware.js';
import Category from '../Models/CategoryModel.js';

const productRoute = express.Router();

// GET PRODUCT
productRoute.get(
    '/',
    asyncHandler(async (req, res) => {
        const pageSize = Number(req.query.pageSize) || 8;
        const page = Number(req.query.pageNumber) || 1;
        const rating = Number(req.query.rating) || 0;
        const maxPrice = Number(req.query.maxPrice) || 0;
        const minPrice = Number(req.query.minPrice) || 0;
        const sortProducts = Number(req.query.sortProducts) || 1;
        let search = {},
            sort={};
        if (req.query.keyword) {
            search.name = {
                $regex: req.query.keyword,
                $options: 'i',
            };
        }
        if (req.query.category) {
            search.category = req.query.category;
        }
        if (rating) {
            search.rating = { $gte: rating };
        }
        if (maxPrice && minPrice) {
            search = {
                ...search,
                price: { $gte: minPrice },
                price: { $lte: maxPrice },
            };
        }
        if (sortProducts == 1) sort.createdAt = -1;
        if (sortProducts == 2) {
            sort.numReviews = -1;
            sort.rating = -1;
        }
        if (sortProducts == 3) sort.price = 1;
        if (sortProducts == 4) sort.price = -1;
        const count = await Product.countDocuments({ ...search });
        const products = await Product.find({ ...search })
            .limit(pageSize)
            .skip(pageSize * (page - 1))
            .sort(sort);
        res.json({ products, page, pages: Math.ceil(count / pageSize) });
    }),
);

// GET ALL PRODUCT
productRoute.get(
    '/ProductAll',
    asyncHandler(async (req, res) => {
        const products = await Product.find({}).sort({ _id: -1 });
        const productSlice = products.slice(0, 10);
        res.json(productSlice);
    }),
);

// ADMIN GET ALL PRODUCT WITHOUT SEARCH AND PEGINATION
productRoute.get(
    '/all',
    protect,
    admin,
    asyncHandler(async (req, res) => {
        // const products = await Product.find({}).sort({ _id: -1 });
        const products = await Product.find().populate(`category`);

        res.json(products);
    }),
);

// GET SINGLE PRODUCT
productRoute.get(
    '/:id',
    asyncHandler(async (req, res) => {
        const product = await Product.findById(req.params.id);
        if (product) {
            res.json(product);
        } else {
            res.status(404);
            throw new Error('Product not Found');
        }
    }),
);

// PRODUCT REVIEW
productRoute.post(
    '/:id/review',
    protect,
    asyncHandler(async (req, res) => {
        const { rating, comment } = req.body;
        const product = await Product.findById(req.params.id);

        if (product) {
            const alreadyReviewed = product.reviews.find((r) => r.user.toString() === req.user._id.toString());
            if (alreadyReviewed) {
                res.status(400);
                throw new Error('Product already Reviewed');
            }
            const review = {
                name: req.user.name,
                rating: Number(rating),
                comment,
                user: req.user._id,
            };

            product.reviews.push(review);
            product.numReviews = product.reviews.length;
            product.rating = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length;

            await product.save();
            res.status(201).json({ message: 'Reviewed Added' });
        } else {
            res.status(404);
            throw new Error('Product not Found');
        }
    }),
);

// DELETE PRODUCT
productRoute.delete(
    '/:id',
    protect,
    admin,
    asyncHandler(async (req, res) => {
        const product = await Product.findById(req.params.id);
        if (product) {
            await product.remove();
            res.json({ message: 'Product deleted' });
        } else {
            res.status(404);
            throw new Error('Product not Found');
        }
    }),
);

// CREATE PRODUCT
productRoute.post(
    '/',
    protect,
    admin,
    asyncHandler(async (req, res) => {
        const { name, price, description, category, image, countInStock } = req.body;
        const productExist = await Product.findOne({ name });
        if (price <= 0 || countInStock < 0 || price >= 10000 || countInStock >= 10000) {
            res.status(400);
            throw new Error('Price or Count in stock is not valid, please correct it and try again');
        }
        if (productExist) {
            res.status(400);
            throw new Error('Product name already exist');
        } else {
            const product = new Product({
                name,
                price,
                description,
                category,
                image,
                countInStock,
                user: req.user._id,
            });
            if (product) {
                const createdproduct = await product.save();
                res.status(201).json(createdproduct);
            } else {
                res.status(400);
                throw new Error('Invalid product data');
            }
        }
    }),
);

// UPDATE PRODUCT
productRoute.put(
    '/:id',
    protect,
    admin,
    asyncHandler(async (req, res) => {
        const { name, price, description, category, image, countInStock } = req.body;
        const product = await Product.findById(req.params.id);
        if (price <= 0 || countInStock < 0 || price >= 10000 || countInStock >= 10000) {
            res.status(400);
            throw new Error('Price or Count in stock is not valid, please correct it and try again');
        }
        if (product) {
            product.name = name || product.name;
            product.price = price || product.price;
            product.description = description || product.description;
            product.category = category || product.category;
            product.image = image || product.image;
            product.countInStock = countInStock || product.countInStock;

            const updatedProduct = await product.save();
            res.json(updatedProduct);
        } else {
            res.status(404);
            throw new Error('Product not found');
        }
    }),
);
export default productRoute;
