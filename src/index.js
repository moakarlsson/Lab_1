const express = require('express');
const db = require('./db/connection.js');
const app = express();

app.use(express.json());

const PORT = process.argv[2] || process.env.PORT || 3000;

app.listen (PORT, (err) => {
    if (err) {
        console.error ("Server failed to start:", err);
    } else {
        console.log(`Server running on port ${PORT}`);
    }
});