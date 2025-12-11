import express from "express";
import productsRouter from "./routes/products.js";
import suppliersRouter from "./routes/suppliers.js";

const app = express(); 

app.use(express.json());
app.use('/products', productsRouter);
app.use('/suppliers', suppliersRouter);

export default app;

