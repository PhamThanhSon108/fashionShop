import express from "express";
import slider from "./../Models/SliderModel.js";
import asyncHandler from "express-async-handler";


const SliderRouter =express.Router();
SliderRouter.get(
    "/", async (req, res) => {
        const Slider = await slider.find({}).sort({ _id: -1 });
        res.json(Slider);
      }
)
export default SliderRouter