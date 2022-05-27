import express from "express";
import Category from "./../Models/CategoryModel.js";
import { admin, protect } from "./../Middleware/AuthMiddleware.js";
import asyncHandler from "express-async-handler";
import Product from "./../Models/ProductModel.js";
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
 CategoryRouter.delete(
    "/:id",
    // admin,
    // protect,
    asyncHandler(async (req, res) => {
        const categories = await Category.findById(req.params.id)
        if (categories) {
            // const cateInProduct = await Product.findOne({category: categories.category })
            // if(cateInProduct != "") {
            //      res.status(404);
            //      throw new Error("bug chỗ này");
            // }
            await categories.remove()
            res.json({message: "Category deleted"})
        } else {
            res.status(404);
            throw new Error("Can delete category");
        }
    }
    ))
export default CategoryRouter

CategoryRouter.post(
    "/",
//   protect,
  asyncHandler(async (req, res) => {
    const { name, image, description } = req.body;
    const category = await Category.findOne({name: name.trim() });

    if (category) {
        res.status(404);
      throw new Error("This category already exists");
    }
     
    const newCategory = new Category({
        name,
        image,
        description
    })
      await newCategory.save();
      res.status(201).json({ message: "Category Added" });
  })
);