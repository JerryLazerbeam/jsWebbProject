import express from "express";
import taskRouter from "../routes/tasks.js";

const app = express();

const port = 8000;

app.use(express.json())
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.use("/api/products", productRouter)

app.get("/api/products", (req, res) => {
    res.json(products);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
