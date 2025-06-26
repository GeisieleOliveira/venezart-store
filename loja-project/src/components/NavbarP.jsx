import 'bootstrap/dist/css/bootstrap.min.css';
import "../Navbar.css";
import { Container, Nav, Navbar, Button } from 'react-bootstrap';
import NavDropdown from 'react-bootstrap/NavDropdown';
import logo from '../assets/logo.png';
import { FaShoppingCart } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import CartSidebar from './CartSidebar';

function NavbarP() {
  const userName = localStorage.getItem("userName");
  const rawUserRole = localStorage.getItem("userRole");
  const userRole = (rawUserRole || '').toLowerCase().trim(); 

  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [showSidebar, setShowSidebar] = useState(false);

  console.log('userRole do localStorage:', rawUserRole);
  console.log('userRole tratado:', userRole);

  const toggleSidebar = () => {
    setShowSidebar((prev) => !prev);
  };

  const handleLogout = () => {
    localStorage.removeItem("userName");
    localStorage.removeItem("userRole");
    window.location.href = "/";
  };

  const fetchCartItems = () => {
    if (userName) {
      fetch(`http://127.0.0.1:5000/api/cart?username=${userName}`)
        .then(res => res.json())
        .then(data => {
          const items = Array.isArray(data.cart) ? data.cart : [];
          setCartItems(items);
          const totalQuantity = items.reduce((acc, item) => acc + item.quantity, 0);
          setCartCount(totalQuantity);
        })
        .catch(() => {
          setCartItems([]);
          setCartCount(0);
        });
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, [userName]);

  return (
    <>
      <Navbar fixed="top" bg="dark" variant="dark" expand="lg" className="my-navbar px-0">
        <Container className="px-3">
          <Navbar.Brand href="/" className="navbar-brand-custom">
            <img
              src={logo}
              alt="Logo"
              width="90"
              height="70"
              className="d-inline-block align-top me-2"
            />
            {userName && <span className="text-white ms-2">Olá, {userName}!</span>}
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mx-auto text-center">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/produtos">Produtos</Nav.Link>
              <NavDropdown title="Compra" id="collapsible-nav-dropdown">
                <NavDropdown.Item href="/telas">Telas</NavDropdown.Item>
                <NavDropdown.Item href="/tintas">Tintas a óleo</NavDropdown.Item>
                <NavDropdown.Item href="/pinceis">Pinceis</NavDropdown.Item>
                <NavDropdown.Item href="/solventes">Soluveis e Solventes</NavDropdown.Item>
              </NavDropdown>

              
              {userRole === 'admin' && (
                <Nav.Link href="/pedidos">Pedidos</Nav.Link>
              )}
            </Nav>

            <Nav className="d-flex flex-column flex-lg-row justify-content-center justify-content-lg-end align-items-center gap-2 gap-lg-4 w-100">
              <div className="cart-container" onClick={toggleSidebar}>
                <FaShoppingCart size={24} color="white" />
                {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
              </div>
              {userName ? (
                <Button variant="danger" onClick={handleLogout}>Logout</Button>
              ) : (
                <Button variant="success" onClick={() => window.location.href = "/login"}>Login</Button>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <CartSidebar
        show={showSidebar}
        onClose={toggleSidebar}
        cartItems={cartItems}
      />
    </>
  );
}

export default NavbarP;