import express from "express";
import db from "../db/connection.js";
const router = express.Router();


router.get("/", async (req, res) => {
    const maxQuantity = parseInt(req.query.max, 10);
    if (req.query.max === undefined || isNaN(maxQuantity)) {
        try {
            const [rows] = await db.query("SELECT * FROM products");
            return res.status(200).json(rows);
        } catch (error) {
            console.error(error);
            return res.status(500).json({error: "Internal server error"});
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

router.get("/:product_id/supplier", async(req, res) => {
    const productId = parseInt(req.params.product_id,10);
    if (isNaN(productId)) {
        return res.status(400).json({error: "Invalid product Id"});
    }
    try {
        const [rows] = await db.query(
            `SELECT s.id AS supplier_id, s.name AS supplier_name, s.contact_info 
             FROM products p 
             JOIN supplier s ON p.supplier_id = s.id 
             WHERE p.id = ?`,
            [productId]
        );
        if (rows.length === 0) {
            return res.status(404).json({error: "Supplier not found"});
        }
        res.status(200).json(rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({error: "Internal server error"});
    }
});

router.get("/:product_id/inventory", async(req,res) => {
    const productId = parseInt(req.params.product_id, 10);

    if (isNaN(productId)) {
        return res.status(400).json({ error: "Invalid product ID" });
    }
    try {
        const [rows] = await db.query(
            `SELECT id AS product_id, supplier_id, quantity, createdAt AS last_updated 
             FROM products 
             WHERE id = ?`,
            [productId]
        );
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
