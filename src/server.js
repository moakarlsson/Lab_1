const express = require ('express');
const app = express();
const db = require('./db/connection.js');
const PORT = process.argv[2] || process.env.PORT || 3000;

app.use(express.json());

const productsRouter = require ('./routes/products.js');
const suppliersRouter = require ('./routes/suppliers.js');

app.use('/products', productsRouter);
app.use('/suppliers', suppliersRouter);

app.listen (PORT, (err) => {
    if (err) {
        console.error ("Server failed to start:", err);
    } else {
        console.log(`Server running on port ${PORT}`);
    }
});