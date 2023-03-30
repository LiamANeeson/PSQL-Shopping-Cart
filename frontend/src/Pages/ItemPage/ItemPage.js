import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import { getItemId } from "../../Utils/utils";

function ItemPage() {
  const {id: item_id} = useParams();
  const [item, setItem] = useState({});

  useEffect(() => {
    getItemId(item_id).then(item => {
      setItem(item);
    });
  }, []);

  return (
    <Container>
      <Row>
          <Col key={item.item_id}>
            <div>
              <h2>{item.name}</h2>
              <p>{item.description}</p>
              <p>{item.price}</p>
            </div>
          </Col>
      </Row>
    </Container>
  );
}

export default ItemPage;
