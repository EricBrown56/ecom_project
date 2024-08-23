import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function HomePage() {
    return (
      <Container>

        <Row>
          <img src='wacky_wally_logo.png' width='300' alt='Wacky Wally Logo'/>
        </Row>

        <Row>
          <Col>
            <h1>Welcome to Wacky Wally's Electronic Wonderland</h1>
            <p>If we don't have it, you don't want it!</p>
          </Col>
        </Row>
        
      </Container>
    );
    
  }

export default HomePage;