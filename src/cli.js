import readline from "readline/promises";
import { stdin as input, stdout as output } from "process";
const rl = readline.createInterface({input, output});
import db from "./db/connection.js";

async function main () {
    while (true) {
        console.log("CLI for inventory management:\n");
        console.log("Cancel - press 0")
        console.log("1) View all products\n");
        console.log("2) Add a new product\n");
        console.log("3) View all suppliers\n");
        console.log("4) Add new supplier\n");
        const choice = await rl.question("Choose option (1,2,3 or 4)");

        if (choice === "0") {
            console.log("Shutting down CLI...");
            process.exit();
        }
        if (choice === "1") {
            try {
                const [rows] = await db.query("SELECT * FROM products");
                console.table(rows);
            } catch (error) {
                console.error("Something went wrong:", error); 
            }
        }
        if (choice === "2") {
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
                console.error("Something went wrong:", error);
            }
        }
        if (choice === "3") {
            try {
                const [rows] = await db.query("SELECT * FROM supplier");
                console.table(rows);

            } catch (error) {
                console.error("Something went wrong:", error);
            }
        }
        if (choice === "4") {
            try {
                const name = await rl.question("Supplier name: ");
                const contactInfo = await rl.question("Contact-info: ");
                
                const [result] = await db.query (
                    "INSERT INTO supplier (name, contact_info) VALUES (?,?)",
                    [name, contactInfo]
                );
                console.log("The supplier was added!\n")
            } catch (error) {
                console.error("Something went wrong:", error);
            }
        }
    }
}

main();