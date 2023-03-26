const express = require("express");
const pool = require("./config/db");

const app = express();
const port = 8000;

app.use(express.json());

app.get('/', (req, res) => {
    res.send(`<h1>Hello, World</h1>`)
});

// Get list of all items
app.get("/items", async (req, res) => {
    try {
        const allItems = await pool.query("SELECT * FROM items");
        res.json(allItems.rows);
    } catch (err) {
        console.error(err.message);
    }
});

// Get item by id
app.get("/items/:id", async(req, res) => {
    try {
        const { id } = req.params;
        const item = await pool.query("SELECT * FROM items WHERE item_id = $1", [id]);

        res.json(item.rows[0])
    } catch (err) {
        console.error(err.message);
    }
});

// Create a Cart

// Add item to a cart 

// Remove item from a cart

// Update quantity of item within a cart

// Delete item from cart

// Delete entire cart 

// Save cart for later

// Checkout

app.listen(port, () => {
    console.log(`Server listening on port: ${port}`);
})