import express from "express";
import productRouter from "../routes/product.js";

const app = express();

const port = 8000;

app.use(express.json())
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.use("/api/products", productRouter)

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
