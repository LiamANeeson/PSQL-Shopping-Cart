import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'

import "./Home.css"

function Home() {
  return (
    <Container fluid>
      <Row className="homePage-Row">
        <Col>
          <h1 className='homePage-Title'>Shopping List & Cart</h1>
        </Col>
      </Row>
      <Row className="homePage-Row">
        <Col>
          <a href='/items' className='allItems-Link'>
            <h2 className="homePage-AllItems">View Items</h2>
          </a>
        </Col>
      </Row>
    </Container>
  )
}

export default Home