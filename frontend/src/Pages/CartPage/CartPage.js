import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"

import Col from "react-bootstrap/Col"
import Row from "react-bootstrap/Row"
import Container from "react-bootstrap/Container"

import { getCartById, updateCartItemQuantity, removeCartItem } from "../../Utils/utils"

function CartPage() {
  const {id: cart_id} = useParams();
  const [cart, setCart] = useState(null);
  

  useEffect(() => {
    getCartById(cart_id).then(cart => {
      setCart(cart);
    });
  }, []);

  if (cart === null) {
    return <div>Cart Empty!</div>;
  }

  const handleQuantityChange = (event, item) => {
    
    const newQuantity = parseInt(event.target.value);

    const currentItem = cart.filter(element => element.line_item_id === item.line_item_id)[0];
    const updatedItem = {...currentItem, quantity: newQuantity};
    const newCart = cart.map(cartItem => cartItem.line_item_id === updatedItem.line_item_id ? updatedItem : cartItem);

    updateCartItemQuantity(item.line_item_id, newQuantity).then(updatedCart => {
      setCart(newCart);
    });
  };

  const handleRemoveItem = (line_item_id) => {
    removeCartItem(line_item_id).then(responseData => {
      getCartById(cart_id).then(cart => {
        const sortedCart = cart.sort(item => item.line_item_id, false, parseInt);
        setCart(sortedCart);
      });
    });
  };

  const getSubtotal = (item) => {
    const price = parseFloat(item.price.replace("$", ""));
    return (price * item.quantity).toFixed(2);
  };

  const getTotalPrice = () => {
    let totalPrice = 0;
    cart.forEach(item => {
      totalPrice += (parseFloat(item.price.replace("$", "")) * item.quantity);
    });
    return totalPrice.toFixed(2);
  };

  return (
    <Container>
      <Row>
        {cart.map((item) => (
          <Col key={item.cart_item_id}>
            <div>
              <h2>{item.name}</h2>
              <p>{item.description}</p>
              <p>Quantity: 
                <input type="number" min="1" value={item.quantity} onChange={(e) => handleQuantityChange(e, item)} />
              </p>
              <p>Price: {item.price}</p>
              <p>Subtotal: {getSubtotal(item)}</p>
              <button onClick={() => handleRemoveItem(item.line_item_id)}>Remove</button>
            </div>
          </Col>
        ))}
      </Row>
      <div>Total Price:  ${getTotalPrice()}</div>
    </Container>
  )
}

export default CartPage;