import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function HomePage() {
    return (
      <Container fluid='lg'>

        <Row className='header'>

        <Col xs={2} >
          <img src='wacky_wally_logo2.png' width='250' alt='Wacky Wally Logo'/>
        </Col>

          <Col className='mt-5'>
            <h1>Welcome to Wacky Wally's Electronic Wonderland</h1>
            <p>If we don't have it, you don't want it!</p>
          </Col>

        </Row>

        <Row>

        
        
        </Row>

      </Container>
    );
    
  }

export default HomePage;