const express = require("express");
const port = 5001;

const app = express();

app.get("/", (req, res) => {
  res.json({ message: "Welcome to the app" });
});

const productsRouter = require("./routes/products");
app.use("/api/products", productsRouter);

app.listen(port, () => console.log(`Server listening on port ${port}`));
