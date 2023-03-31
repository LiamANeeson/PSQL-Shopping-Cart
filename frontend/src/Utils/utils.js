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

// Add Item with a Quantity to Cart
export const addItemToCart = (cartId, itemId, quantity) => {
  return axios.post("http://localhost:8000/line-items", {
    cartId: cartId,
    itemId: itemId,
    quantity: quantity
  })
  .then(response => response.data)
}

// Add Item with a Quantity to Cart
export const addItem = (name, description, price) => {
  return axios.post("http://localhost:8000/items", {
    name: name,
    description: description,
    price: price
  })
  .then(response => response.data)
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