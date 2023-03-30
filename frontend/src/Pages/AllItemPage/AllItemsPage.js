import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'

import * as AiIcons from 'react-icons/ai';
import { getAllItems } from '../../Utils/utils';

import './AllItems.css'

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
    </Container>
  )
}

export default AllItemsPage