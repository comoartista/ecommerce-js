const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

//Get all products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json({ success: true, data: products });
  } catch (error) {
    res.status(500).json({ success: false, error: "Something went wrong" });
  }
});

//Get single product
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.json({ success: true, data: product });
  } catch {
    res.status(500).json({ success: false, error: "Something went wrong" });
  }
});

module.exports = router;
