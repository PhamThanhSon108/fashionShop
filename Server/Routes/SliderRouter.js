import express from "express";
import slider from "./../Models/SliderModel.js";
import asyncHandler from "express-async-handler";
import { admin, protect } from "./../Middleware/AuthMiddleware.js";

const SliderRouter = express.Router();
SliderRouter.get(
    "/", async (req, res) => {
        const Slider = await slider.find({}).sort({ _id: -1 });
        res.json(Slider);
      }
)


SliderRouter.delete(
  "/:id",
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const Slider = await slider.findById(req.params.id);
    if (Slider) {
      await Slider.remove();
      res.json({ message: "Product deleted" });
    } else {
      res.status(404);
      throw new Error("Product not Found");
    }
  })
);
export default SliderRouter
