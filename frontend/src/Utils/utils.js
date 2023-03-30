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

export const getItemId = (item_id) => {
    return axios.get(`http://localhost:8000/items/${item_id}`)
      .then(response => response.data)
      .catch(error => {
        console.error(error.message);
        throw new Error("Error retrieving Data")
    });
}