import express from "express";
import Category from "./../Models/CategoryModel.js";
import { admin, protect } from "./../Middleware/AuthMiddleware.js";
import asyncHandler from "express-async-handler";
const CategoryRouter = express.Router();

CategoryRouter.get(
    "/",
    protect,
    asyncHandler(async (req, res) => {
        const categories = await Category.find({}).sort({ _id: -1 });
        if (categories) {
            res.json(categories);
        } else {
            res.status(404);
            throw new Error("Category not Found");
        }
    }
    ))
export default CategoryRouter