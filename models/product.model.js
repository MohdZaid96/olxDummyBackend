const mongoose = require("mongoose");

const product_Schema = mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  category: {
    type: String,
    enum: ["Clothing", "Electronics", "Furniture", "Other"],
    required: true,
  },
  image: { type: String, required: true },
  location: { type: String, required: true },
  postedAt: { type: Date },
  price: { type: Number, required: true },
});

const ProductModel = mongoose.model("classified", product_Schema);
module.exports = { ProductModel };
