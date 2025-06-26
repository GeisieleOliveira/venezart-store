import '../Navbar.css';
import NavbarP from './NavbarP';
import React, { useState } from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Button, Card, Row, Col, Modal, Form } from 'react-bootstrap';
import Terebintina from '../assets/terebintina.jpg';
import SecanteCobalto from '../assets/secante-cobalto.jpg';
import OleoLinhaca from '../assets/oleo-linhaca.webp';
import SolventeInodoro from '../assets/solvente-inodoro.jpg';
import EssenciaPetroleo from '../assets/essencia-petroleo.webp';
import OleoCartamo from '../assets/oleo-cartamo.jpg';
import Medium from '../assets/medium.webp';
import Gel from '../assets/gel.avif';
import Verniz from '../assets/verniz.webp';

import Rodape from './Rodape'; 
 

function Solventes() {
  const [cards, setCards] = useState([
    { 
      id : 29,
      titulo: "Acrilex - Terebintina 100ml",
      descricao: ["Solvente natural à base re resina vegetal"],
      precoAtual: 16.90,
      precoAntigo: 19.00,
      imagem: Terebintina, },

    { 
      id : 30,
      titulo: "Corfix - Medium Secante de Cobalto 60ml",
      descricao: ["Acelera a secagem da tinta a óleo sem alterar a consistência"],
      precoAtual: 22.50,
      precoAntigo: 27.90,
      imagem: SecanteCobalto,},

    { 
      id : 31,
      titulo: "Gato Preto - Óleo de linhaça 100ml",
      descricao: ["Dá brilho e melhora a fluidez da tinta"],
      precoAtual: 14.80,
      precoAntigo: 19.00,
      imagem: OleoLinhaca, },

      { 
      id : 32,
      titulo: "Acrilex - Solvente Inodoro 100ml",
      descricao: ["Alternativa sem cheiro para diluição de tinta a óleo e limpeza"],
      precoAtual: 18.00,
      precoAntigo: 24.00,
      imagem: SolventeInodoro, },

      { 
      id : 33,
      titulo: "Corfix - Essência de Petróleo 100ml",
      descricao: ["Solvente leve usado na primeira etapa da pintura"],
      precoAtual: 17.90,
      precoAntigo: 21.00,
      imagem: EssenciaPetroleo, },

      { 
      id : 34,
      titulo: "Gato Preto - Óleo de Cártamo 100ml",
      descricao: ["Substituto do óleo de linhaça, ideal para tons claros e brancos"],
      precoAtual: 15.70,
      precoAntigo: 21.00,
      imagem: OleoCartamo, },

      { 
      id : 35,
      titulo: 'Acrilex - Medium para Óleo 100ml',
      descricao: ["Mistura de solvente e óleo melhora a aplicação e acabamento"],
      precoAtual: 21.90,
      precoAntigo: 25.00,
      imagem: Medium, },

      { 
      id : 36,
      titulo: "Corfix - Gel de Pintura para Óleo 60ml",
      descricao: ["Aumenta a transparência e brilho sem escorrer"],
      precoAtual: 23.50,
      precoAntigo: 24.00,
      imagem: Gel, },

      { 
      id : 37,
      titulo: "Gato Preto - Verniz Dammar 100ml",
      descricao: ["Finalizador para pintura a óleo. Realça cores e protege a obra"],
      precoAtual: 19.90,
      precoAntigo: 26.00,
      imagem: Verniz, }
  ]);

  const userRole = localStorage.getItem('userRole'); 
  const isAdmin = userRole === 'admin';

  const [showModal, setShowModal] = useState(false);
  const [novoProduto, setNovoProduto] = useState({
    titulo: '',
    descricao: '',
    precoAtual: '',
    precoAntigo: '',
    imagem: '',
  });
  const [imagemPreview, setImagemPreview] = useState(null);

  const handleAddToCart = async (productId) => {
    const userName = localStorage.getItem('userName');
    if (!userName) {
      alert('Faça login para adicionar produtos ao carrinho.');
      return;
    }

    const response = await fetch('http://127.0.0.1:5000/api/cart', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: userName, product_id: productId, quantity: 1 }),
    });

    if (response.ok) {
      alert('Produto adicionado ao carrinho!');
    } else {
      alert('Erro ao adicionar ao carrinho.');
    }
  };

  const handleCreateCard = async () => {
    const novoCard = {
      id: cards.length + 1,
      titulo: novoProduto.titulo,
      descricao: [novoProduto.descricao],
      precoAtual: parseFloat(novoProduto.precoAtual),
      precoAntigo: parseFloat(novoProduto.precoAntigo),
      imagem: imagemPreview || s,
    };

    setCards([...cards, novoCard]);
    setShowModal(false);

    try {
      const response = await fetch('http://127.0.0.1:5000/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          titulo: novoProduto.titulo,
          descricao: novoProduto.descricao, 
          precoAtual: parseFloat(novoProduto.precoAtual),
        }),
      });

      if (response.ok) {
        console.log('Produto criado com sucesso no backend!');
      } else {
        console.error('Erro ao criar produto no backend.');
      }
    } catch (error) {
      console.error('Erro na requisição:', error);
    }

    setNovoProduto({
      titulo: '',
      descricao: '',
      precoAtual: '',
      precoAntigo: '',
      imagem: '',
    });
    setImagemPreview(null);
  };

  const handleImagemChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagemPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <NavbarP />
      <Container className="custom-padding">
        <h4>A harmonia entre técnica e expressão.</h4>
        <h6>
          Os segredos de uma boa pintura não estão só nas cores - estão nos detalhes.<br/>
          Nossos solvntes e auxiliares foram selecionados com atenção por quem domina a técnica e valoriza o resultado.<br/>
          Da preparação à finalização, tudo para a sua arte fluir com leveza.
        </h6>
        <Row className="g-4">
          {cards.map((card, idx) => (
            <Col xs={12} sm={6} md={4} key={idx}>
              <Card className="card-hover text-start">
                <Card.Img variant="top" src={card.imagem} />
                <Card.Body>
                  <Card.Title className="fw-bold">{card.titulo}</Card.Title>
                  {card.descricao.map((linha, i) => (
                    <Card.Text className="mb-1" key={i}>
                      {linha}
                    </Card.Text>
                  ))}
                  <div className="d-flex align-items-center gap-3 mt-2">
                    <span className="text-danger fw-bold fs-5">
                      R${card.precoAtual.toFixed(2).replace('.', ',')}
                    </span>
                    <span className="text-muted text-decoration-line-through">
                      R${card.precoAntigo.toFixed(2).replace('.', ',')}
                    </span>
                  </div>
                  <Button
                    style={{ backgroundColor: '#566E3D', borderColor: '#566E3D' }}
                    size="sm"
                    className="mt-3"
                    onClick={() => handleAddToCart(card.id)}
                  >
                    Adicionar ao carrinho
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}

          {isAdmin && (
            <Col xs={12} sm={6} md={4}>
              <Card
                className="d-flex align-items-center justify-content-center text-center"
                style={{ height: '100%', border: '2px dashed #ccc', cursor: 'pointer' }}
                onClick={() => setShowModal(true)}
              >
                <Card.Body>
                  <h1 style={{ fontSize: '4rem', color: '#999' }}>+</h1>
                  <p>Adicionar novo produto</p>
                </Card.Body>
              </Card>
            </Col>
          )}
        </Row>
      </Container>

    
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Adicionar Produto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-2">
              <Form.Label>Título</Form.Label>
              <Form.Control
                type="text"
                value={novoProduto.titulo}
                onChange={(e) => setNovoProduto({ ...novoProduto, titulo: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Descrição</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={novoProduto.descricao}
                onChange={(e) => setNovoProduto({ ...novoProduto, descricao: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Preço Atual</Form.Label>
              <Form.Control
                type="number"
                value={novoProduto.precoAtual}
                onChange={(e) => setNovoProduto({ ...novoProduto, precoAtual: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Preço Antigo</Form.Label>
              <Form.Control
                type="number"
                value={novoProduto.precoAntigo}
                onChange={(e) => setNovoProduto({ ...novoProduto, precoAntigo: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Imagem</Form.Label>
              <Form.Control type="file" onChange={handleImagemChange} />
            </Form.Group>
            <Button variant="success" onClick={handleCreateCard}>
              Criar Produto
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
      <br/>
      <Rodape /> 
    </>
  );
}

export default Solventes;