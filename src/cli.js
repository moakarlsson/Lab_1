import readline from "readline/promises";
import { stdin as input, stdout as output } from "process";
const rl = readline.createInterface({input, output});
import db from "./db/connection.js";

async function main () {
    while (true) {
        console.log("CLI for inventory management:\n");
        console.log("Cancel - press 0")
        console.log("1) View all products\n");
        console.log("2) View one product\n");
        console.log("3) Add a new product\n");
        console.log("4) View all suppliers\n");
        console.log("5) View one supplier\n");
        console.log("6) Add new supplier\n");
        const choice = await rl.question("Choose option (0-6)");

        if (choice === "0") {
            console.log("Shutting down CLI...");
            process.exit();
        }
        if (choice === "1") {
            try {
                const [rows] = await db.query("SELECT * FROM products");
                console.table(rows);
            } catch (error) {
                console.error("Database error", error.message); 
            }
        }
        if (choice === "2") {
            try {
                const id = await rl.question("Submit product Id: ");
                const [rows] = await db.query (
                    "SELECT * FROM products WHERE id= ?" , [id]
                );
                console.table(rows);
            } catch (error) {
                console.error("Database error", error.message);
            }
        }
        if (choice === "3") {
            try {
                const name = await rl.question("Product name: ");
                const quantityStr = await rl.question("Quantity: ");
                const priceStr = await rl.question("Price: ");
                const supplierIdStr = await rl.question("Suppler Id: ");

                const quantity = parseInt(quantityStr);
                const price = parseFloat(priceStr);
                const supplierId = parseInt(supplierIdStr);
                
                const [result] = await db.query (
                    "INSERT INTO products (name, quantity, price, supplier_id) VALUES (?,?,?,?)",
                    [name, quantity, price, supplierId]
                );
                console.log("The product was added!\n")
            } catch (error) {
                console.error("Database error", error.message);
            }
        }
        if (choice === "4") {
            try {
                const [rows] = await db.query("SELECT * FROM supplier");
                console.table(rows);

            } catch (error) {
                console.error("Database error", error.message);
            }
        }
        if (choice === "5") {
            try {
                const id = await rl.question("Submit supplier Id: ");
                const [rows] = await db.query (
                    "SELECT * FROM supplier WHERE id= ?" , [id]
                );
                console.table(rows);
            } catch (error) {
                console.error("Database error", error.message);
            }
        }
        if (choice === "6") {
            try {
                const name = await rl.question("Supplier name: ");
                const contactInfo = await rl.question("Contact-info: ");
                
                const [result] = await db.query (
                    "INSERT INTO supplier (name, contact_info) VALUES (?,?)",
                    [name, contactInfo]
                );
                console.log("The supplier was added!\n")
            } catch (error) {
                console.error("Database error", error.message);
            }
        }
    }
}

main();