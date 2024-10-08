import { NavLink } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';

function NavigationBar() {
    return (
        <Navbar bg='light' expand='md'className='nav'>
            <Navbar.Brand href='/'>Wacky Wally's Electronic Wonderland</Navbar.Brand>
            <Navbar.Toggle aria-controls='basic-navbar-nav' />
            <Navbar.Collapse id='basic-navbar-nav'>
                <Nav className='mr-auto'>
                    <Nav.Link as={NavLink} to='/Login' activeclassname='active'>
                            Login
                    </Nav.Link>
                    <Nav.Link as={NavLink} to='/Customers' activeclassname='active'>
                        View Customers
                    </Nav.Link>
                    <Nav.Link as={NavLink} to='/Add-Customer' activeclassname='active'>
                        Add Customer
                    </Nav.Link>
                    <Nav.Link as={NavLink} to='/Products' activeclassname='active'>
                        Products
                    </Nav.Link>
                    <Nav.Link as={NavLink} to='/Add-Product' activeclassname='active'>
                        Add Product
                    </Nav.Link>
                    
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default NavigationBar;