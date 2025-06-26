import 'bootstrap/dist/css/bootstrap.min.css';
import {Container, Nav, Navbar} from 'react-bootstrap';
import NavDropdown from 'react-bootstrap/NavDropdown';
import logo from '../assets/logo.png'; 
import { FaShoppingCart } from 'react-icons/fa';
function NavbarL() {
  return (
    <>
    <Navbar  fixed="top" bg="dark" variant="dark" expand="lg" className="w-100">
      <Container fluid>
        <Navbar.Brand href="#home"><img
            src={logo}
            alt=""
            width="60"
            height="60"
            className="d-inline-block align-top me-2"/></Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#features">Home</Nav.Link>
            <Nav.Link href="#pricing">Produtos</Nav.Link>
            <NavDropdown title="Compra" id="collapsible-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Telas</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Tintas a óleo</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Pinceis</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Soluveis e Solventes</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav>
            <Nav.Link href="#deets">
                <span className="cart-icon">
                    <FaShoppingCart size={24}/>
                    <span className="cart-count">3</span>
                </span>
            </Nav.Link>
            <Nav.Link eventKey={2} href="#memes">
              Dank memes
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>

  </>
  );
}

export default NavbarL;