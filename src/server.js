import express from "express";
import productsRouter from "./routes/products.js";
import suppliersRouter from "./routes/suppliers.js";

app.use(express.json());

app.use('/products', productsRouter);
app.use('/suppliers', suppliersRouter);

export default app;

