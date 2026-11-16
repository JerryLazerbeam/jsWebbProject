import express from "express";
const router = express.Router();
import db from "../database/db.js";

router.post("/", (req, res) => {
  const { name, price, SKU, description, category } = req.body;

  const insertProduct = db.prepare(`
         INSERT INTO products (name, price, SKU, description, category)
          VALUES (?, ?, ?, ?, ?) `);
  insertProduct.run(name.trim(), price, SKU.trim(), description.trim(), category.trim());
  res.status(201).json({ message: "Produkten har skapats!" });
});

router.get("/", (req, res) => {
  const products = db.prepare("SELECT * FROM products").all();
  res.json(products);
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;

  try {
    const result = db.prepare("DELETE FROM products WHERE id = ?").run(id);

    if (result.changes === 0) {
      return res.status(404).json({
        message: "Produkten hittades inte.",
      });
    }

    res.json({
      message: "Produkten har tagits bort.",
    });
  } catch (err) {
    console.error("Kunde inte ta bort produkten:", err);

    res.status(500).json({
      message: "Det gick inte att ta bort produkten.",
    });
  }
});

export default router;