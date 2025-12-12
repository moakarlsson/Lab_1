import express from "express";
import db from "../db/connection.js";
const router = express.Router();


router.get("/", async (req, res) => {
    const maxQuantity = parseInt(req.query.max, 10);
    if (req.query.max === undefined || isNaN(maxQuantity)) {
        try {
            const [rows] = await db.query("SELECT * FROM products");
            res.status(200).json(rows);
        } catch (error) {
            console.error(error);
            res.status(500).json({error: "Internal server error"});
        }
    }
    try {
        const [filtered] = await db.query("SELECT * FROM products WHERE quantity < ?", [maxQuantity]);
        res.status(200).json(filtered); 
    } catch (error) {
        console.error(error);
        res.status(500).json({error: "Internal server error"});
    }
});

router.get("/:id", async (req, res) => {
    try {
        const[rows] = await db.query("SELECT * FROM products WHERE id = ?", [req.params.id]);
        if (rows.length === 0) {
            return res.status(404).json({error: "Product not found"});
        }
        res.status(200).json(rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({error: "Internal server error"});
    }
});


router.post("/", async (req,res) => {
    const  { name, quantity, price, supplier_id } = req.body;
    try {
        const [result] = await db.query("INSERT INTO products (name, quantity, price, supplier_id) VALUES (?,?,?,?)" , [name, quantity, price, supplier_id]);
        res.status(201).json({
            message: "Product created",
            insertId : result.insertId
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({error: "Internal server error"});
    }
});

export default router;
