const express = require("express");
var cors = require('cors')
const pool = require("./config/db");

const app = express();
const port = 8000;

var corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json());

// Get item by id
app.get("/items/:id", async(req, res) => {
    try {
        const { id } = req.params;
        const item = await pool.query("SELECT * FROM items WHERE item_id = $1", [id]);
        res.json(item.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
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

// Add Item 
app.post("/items", async (req, res) => {
    try {
        const { name, description, price } = req.body;
        const newItem = await pool.query("INSERT INTO items (name, description, price) VALUES ($1, $2, $3) RETURNING *", [name, description, price])

        res.json(newItem.rows[0])
    } catch (err) {
        console.error(err.message)
    }
})


// Create a Cart
app.post("/carts", async (req, res) => {
    try {
        const { userId } = req.body;
        const cart = await pool.query("INSERT INTO cart (user_id) VALUES ($1)", [userId]);

        res.json(cart.rows[0])
    } catch (err) {
        console.error(err.message)
    }
})

app.get("/carts/:id", async(req, res) => {
    try {
        const {id:  cartId} = req.params;
        const cart = await pool.query("SELECT * FROM cart_view WHERE cart_id = $1", [cartId])

        res.json(cart.rows)
    } catch (err) {
        console.error(err.message)        
    }
})

// Add item to a cart 
app.post("/line-items", async (req, res) => {
    try {
        const { cartId, itemId, quantity } = req.body;
        const line = await pool.query("INSERT INTO line_items (cart_id, item_id, quantity) VALUES ($1, $2, $3)", [cartId, itemId, quantity])

        res.json(line.rows[0])
    } catch (err) {
        console.error(err.message)
    }
})

// Remove item from a cart
app.delete("/line-items/:id", async (req, res) => {
    try {
        const { id: lineItemId } = req.params;

        const deleteItem = await pool.query("DELETE FROM line_items WHERE line_item_id = $1", [lineItemId])
        res.json(deleteItem.rows[0])
    } catch (err) {
        console.error(err.message)
    }
});

// Update quantity of item within a cart
app.patch("/line-items/:id", async (req, res) => {
    try {
        const { id: lineItemId } = req.params;
        const { quantity } = req.body;

        const updateItem = await pool.query("UPDATE line_items SET quantity = $1 WHERE line_item_id = $2", [quantity, lineItemId])
        res.json(updateItem.rows[0])
    } catch (err) {
        console.error(err.message)
    }
});

// Delete entire cart 
app.delete("/carts/:id", async (req, res) => {
    try {
        const { id: cartId } = req.params;

        const deleteCart = await pool.query(`DELETE FROM "carts" WHERE cart_id = $1`, [cartId])
        res.json(deleteCart.rows[0])

    } catch (err) {
        console.error(err.message)
    }
})



app.listen(port, () => {
    console.log(`Server listening on port: ${port}`);
})