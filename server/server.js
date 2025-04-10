const path = require("path");
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const port = process.env.PORT;
const connectDB = require("./config/db");

connectDB();

const app = express();
app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());

// Static Folder
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.json({ message: "Welcome to the app" });
});

const productsRouter = require("./routes/products");
app.use("/api/products", productsRouter);

const checkoutRouter = require("./routes/checkout");
app.use("/api", checkoutRouter);

app.listen(port, () => console.log(`Server listening on port ${port}`));
