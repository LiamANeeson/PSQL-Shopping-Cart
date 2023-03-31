import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

import { getAllItems, addItemToCart, addItem } from '../../Utils/utils';

import './AllItems.css'

function AllItemsPage() {
  const [items, setItems] = useState([]);
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");

  useEffect(() => {
    getAllItems()
      .then(data => {
        setItems(data);
        console.log("Data Received");
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
  const handleAddItem = (event) => {
    event.preventDefault();
    addItem(name, description, price)
      .then(() => {
        setName("");
        setDescription("");
        setPrice("");
        setShow(false); // Close modal after successful add
      })
      .catch((error) => {
        console.error(error.message);
      });
  };

  return (
    <Container>
      <Row>
        {items.map((item) => (
          <Col key={item.item_id} className="itemsCol">
            <Link to={`/items/${item.item_id}`}>
              <div>
                <h2 className='itemName'>{item.name}</h2>
                <p className='itemDescription'>{item.description}</p>
                <p className='itemName'>{item.price}</p>
              </div>
            </Link>
          </Col>
        ))}
      </Row>
      <Row>
        <Col>
          <Button variant="primary" onClick={handleShow}>Add Item</Button>
        </Col>
      </Row>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleAddItem}>
            <Form.Group controlId="formItemName">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" placeholder="Enter name" value={name} onChange={(event) => setName(event.target.value)} />
            </Form.Group>
            <Form.Group controlId="formItemDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control type="text" placeholder="Enter description" value={description} onChange={(event) => setDescription(event.target.value)} />
            </Form.Group>
            <Form.Group controlId="formItemPrice">
              <Form.Label>Price</Form.Label>
              <Form.Control type="text" placeholder="Enter price" value={price} onChange={(event) => setPrice(event.target.value)} />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  )
}

export default AllItemsPage;

