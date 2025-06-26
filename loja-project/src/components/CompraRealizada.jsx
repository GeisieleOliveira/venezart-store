import React from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import { Button, Card, Container } from 'react-bootstrap';
import '../Navbar.css';
import NavbarP from './NavbarP';
import Rodape from './Rodape'; 

const CompraRealizada = () => {
  return (
    <>
      <NavbarP />
      <div className="compra-wrapper">
        <Container className="d-flex flex-column justify-content-center align-items-center flex-grow-1">
          <Card className="text-center compra-card">
            <FaCheckCircle size={60} color="#28a745" className="mb-3" />
            <h2 className="mb-3">Compra Realizada com Sucesso!</h2>
            <p>Seu pedido foi confirmado e um comprovante em PDF foi baixado automaticamente.</p>
            <p>Obrigado por comprar com a <strong>Venezart</strong> 🎨</p>
            <Button variant="success" href="/home">Voltar à Loja</Button>
          </Card>
        </Container>
      </div>
      <Rodape />
    </>
  );
};

export default CompraRealizada;
