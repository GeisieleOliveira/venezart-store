import React from 'react';
import { Container } from 'react-bootstrap';
import '../Navbar.css';

function Rodape() {
  return (
    <footer className="footer">
      <Container>
        <div className="footer-content">
          <div className="footer-brand">
            <h4 className="footer-logo">Venezart</h4>
            <p className="footer-desc">
              Onde a inspiração encontra a qualidade.  
              Materiais selecionados para artistas que criam com alma.
            </p>
          </div>

          <div className="footer-links">
            <h5>Links Rápidos</h5>
            <ul>
              <li><a href="#sobre">Sobre</a></li>
              <li><a href="#produtos">Produtos</a></li>
              <li><a href="#contato">Contato</a></li>
            </ul>
          </div>

          <div className="footer-contato">
            <h5>Fale Conosco</h5>
            <p>Email: contato@venezart.com</p>
            <p>WhatsApp: (11) 91234-5678</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Venezart. Todos os direitos reservados.</p>
        </div>
      </Container>
    </footer>
  );
}

export default Rodape;