import express from "express";
import db from "../db/connection.js";
const router = express.Router();


router.get("/", async (req, res) => {
    try {
        const[rows] = await db.query("SELECT * FROM supplier");
        res.status(200).json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({error: "Internal server error"});
    }
});

router.get("/:id", async (req, res) => {
    try {
        const[rows] = await db.query("SELECT * FROM supplier WHERE id = ?", [req.params.id]);
        if (rows.length === 0) {
            return res.status(404).json({error: "Supplier not found"});
        }
        res.status(200).json(rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({error: "Internal server error"});
    }
});

router.post("/", async (req,res) => {
    const  { name, contact_info } = req.body;
    try {
        const [result] = await db.query("INSERT INTO supplier (name, contact_info) VALUES (?,?)" , [name, contact_info]);
        res.status(201).json({
            message: "Supplier created",
            insertId : result.insertId
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({error: "Internal server error"});
    }
})
export default router;
