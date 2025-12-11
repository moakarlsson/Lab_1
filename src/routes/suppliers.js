import express from "express";
import db from "../db/connection.js";
const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const [rows] = await db.query("SELECT * FROM supplier");
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({error: "Internal server error"});
    }
});

export default router;
