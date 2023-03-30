import { useState, useEffect } from 'react';

import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'

import * as AiIcons from 'react-icons/ai';
import { getAllItems } from '../../Utils/utils';


function AllItemsPage() {
  const [items, setItems] = useState([])

  useEffect(() => {
    getAllItems().then(data => {
      setItems(data);
      console.log("Data Received");
    }).catch(error => {
      console.error(error);
    });
  }, []);
  
  return (
    <Container>
      <Row>
      {items.map((item) => (
          <Col key={item.item_id}>
            <div>
              <h2>{item.name}</h2>
              <p>{item.description}</p>
            </div>
          </Col>
        ))}
      </Row>
    </Container>
  )
}

export default AllItemsPage