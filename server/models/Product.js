const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    category: { type: [String], required: true },
    description: { type: String, required: true },
    color: { type: String, required: true },
    price: { type: Number, required: true },
    imageUrl: { type: [String], required: true },
    quantity: { type: Number, required: true, default: 0 },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;
