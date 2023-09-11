const express = require("express");
const { ProductModel } = require("../models/product.model");

const app = express();

const productRoute = express.Router();

productRoute.post("/post", async (req, res) => {
  const { name, description, category, image, location, postedAt, price } =
    req.body;
  const newPost = new ProductModel({
    name,
    description,
    category,
    image,
    location,
    postedAt,
    price,
  });
  try {
    await newPost.save();
    res.send({ msg: "Data posted Done" });
  } catch (error) {
    res.send("Please login");
    console.log(error);
  }
});

productRoute.get("/browse", async (req, res) => {
  try {
    const { category, sortBy, search, page, pageSize } = req.query;
    const filter = {};
    if (category) filter.category = category;
    if (search) filter.name = { $regex: search, $options: "i" }; 
    const sortCriteria = sortBy === "date" ? { postedAt: -1 } : {};
    const skip = (page - 1) * pageSize;
    const limit = parseInt(pageSize);

    const total = await ProductModel.countDocuments(filter);
    const classifieds = await ProductModel.find(filter)
      .sort(sortCriteria)
      .skip(skip)
      .limit(limit);

    res.status(200).json({ classifieds, total });
  } catch (error) {
    res.status(500).json({ error: "Error" });
  }
});

module.exports = { productRoute };
