import axios from "axios"

// Get All Items
export const getAllItems = () => {
    return axios.get("http://localhost:8000/items")
      .then(response => response.data)
      .catch(error => {
        console.error(error.message);
        throw new Error("Error Retrieving Data");
      });
}

// Get Item by Id
export const getItemId = (item_id) => {
    return axios.get(`http://localhost:8000/items/${item_id}`)
      .then(response => response.data)
      .catch(error => {
        console.error(error.message);
        throw new Error("Error retrieving Data")
    });
}

// Add Item 
export const addItem = (name, description, price) => {
  const data = {
    name: name,
    description: description,
    price: price
  };

  return axios.post("http://localhost:8000/items", data)
    .then(response => {
      console.log(response.data);
      getAllItems(); // Call getAllItems after a successful add
    })
    .catch(error => {
      console.error(error.message);
      throw new Error("Error adding item");
    });
};

// Add Item with a Quantity to Cart
export const addItemToCart = (cartId, itemId, quantity) => {
  return axios.post("http://localhost:8000/line-items", {
    cartId: cartId,
    itemId: itemId,
    quantity: quantity
  })
  .then(response => response.data)
  .catch(err => {
    console.log(err.message);
  })
}

// Get Cart by Id
export const getCartById = (cart_id) => {
  return axios.get(`http://localhost:8000/carts/${cart_id}`)
  .then(response => response.data)
  .catch(error => {
    console.error(error.message);
    throw new Error("Error retrieving Data") 
  })
}

// Update Item Quantity In a Cart
export const updateCartItemQuantity = (line_item_id, new_quantity) => {
  const data = {
    quantity: new_quantity
  };

  return axios.patch(`http://localhost:8000/line-items/${line_item_id}`, data)
    .then(response => response.data)
    .catch(error => {
      console.error(error.message);
      throw new Error("Error updating cart item quantity");
    });
};

// Remove Item from Cart
export const removeCartItem = (line_item_id) => {
  return axios.delete(`http://localhost:8000/line-items/${line_item_id}`)
    .then(response => response.data)
    .catch(error => {
      console.error(error.message);
      throw new Error("Error removing item from cart");
    });
};