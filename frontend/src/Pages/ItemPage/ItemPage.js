import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'


import { getItemId, addItemToCart } from "../../Utils/utils";

function ItemPage() {
  const {id: item_id} = useParams();
  const [item, setItem] = useState({});
  const [quantity, setQuantity] = useState(0);
  const [showAddedToCartMessage, setShowAddedToCartMessage] = useState(false);

  useEffect(() => {
    getItemId(item_id).then(item => {
      setItem(item);
    });
  }, []);

  const handleAddToCart = () => {
    addItemToCart(6, item_id, quantity).then(response => {
      console.log("Successfully added item to cart");
      setShowAddedToCartMessage(true);
    })
  }

  return (
    <Container>
      <Row>
          <Col key={item.item_id}>
            <div>
              <h2>{item.name}</h2>
              <p>{item.description}</p>
              <p>{item.price}</p>
            </div>
            <Form>
              <Form.Group>
                <Form.Label>Choose Quantity</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Select Item Quantity"
                  value={quantity}
                  onChange={event => setQuantity(event.target.value)} />
              </Form.Group>
              <Button onClick={handleAddToCart}>Add to Cart</Button>
              { showAddedToCartMessage ? <h3>Item added to cart!</h3>: null }
            </Form>
          </Col>
      </Row>
    </Container>
  );
}

export default ItemPage;
