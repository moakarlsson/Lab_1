const mySql = require ('mysql2');
const dotenv = require ('dotenv');
dotenv.config();

const pool = mySql.createPool ({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_PORT
});

module.exports = pool.promise();

pool.getConnection((err, connection) => {
    if (err) {
        console.error('Database connetion failed', err);
    } else {
        console.log('Database connected succesfully!');
        connection.release();
    }
});