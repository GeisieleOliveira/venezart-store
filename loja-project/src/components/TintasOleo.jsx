import '../Navbar.css';
import NavbarP from './NavbarP';
import React, { useState } from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Button, Card, Row, Col, Modal, Form } from 'react-bootstrap';
import VCE from '../assets/vermelho-cadmio-escuro.jpg';
import AU from '../assets/azul-ultramar.jpg';
import AO from '../assets/amarelo-ocre.jpg';
import BT from '../assets/branco-titanio.jpg';
import PF from '../assets/preto.webp';
import VV from '../assets/verde-veronese.webp';
import AP from '../assets/azul-prussia.jpg';
import LI from '../assets/laranja-intenso.jpg';
import RP from '../assets/rosa-permanente.png';
import Rodape from './Rodape'; 


function TintasOleo() {
  const [cards, setCards] = useState([
    { 
      id : 20,
      titulo: "Gato Preto - Vermelho Cadmio Escuro 37ml",
      descricao: ["Pigmentação intensa, ideal para tons quentes"],
      precoAtual: 15.00,
      precoAntigo: 19.00,
      imagem: VCE, },

    { 
      id : 21,
      titulo: "Acrilex - Azul Ultramar 20ml",
      descricao: ["Secagem lenta, excelente para degradês"],
      precoAtual: 13.00,
      precoAntigo: 17.00,
      imagem: AU,},

    { 
      id : 22,
      titulo: "Corfix - Amarelo Ocre 37ml",
      descricao: ["Cor terrosa clássica, ótima para tons de pele"],
      precoAtual: 16.00,
      precoAntigo: 21.00,
      imagem: AO, },

      { 
      id : 23,
      titulo: "Gato Preto - Branco de Titânio 37ml",
      descricao: ["Essencial para mistura de cores"],
      precoAtual: 12.00,
      precoAntigo: 15.00,
      imagem: BT, },

      { 
      id : 24,
      titulo: "Corfix - Preto Profundo 20ml",
      descricao: ["Perfeita para sombreamentos e constrastes"],
      precoAtual: 13.00,
      precoAntigo: 17.00,
      imagem: PF, },

      { 
      id : 25,
      titulo: "Acrilex - Verde Veronese 40ml",
      descricao: ["Ideal para elementos naturais e paisagens"],
      precoAtual: 10.00,
      precoAntigo: 21.00,
      imagem: VV, },

      { 
      id : 26,
      titulo: 'Gato Preto - Azul da Prússia 37ml',
      descricao: ["Cor intensa, ótima para céus noturnos"],
      precoAtual: 18.00,
      precoAntigo: 25.00,
      imagem: AP, },

      { 
      id : 27,
      titulo: "Corfix - Laranja Intenso 20ml",
      descricao: ["Excelente brilho, cor vibrante e ideal para destaques"],
      precoAtual: 17.00,
      precoAntigo: 20.00,
      imagem: LI, },

      { 
      id : 28,
      titulo: "Acrilex - Rosa Permanente 37ml",
      descricao: ["Tinta com ótimo poder de cobertura e tonalidade marcante"],
      precoAtual: 18.50,
      precoAntigo: 25.00,
      imagem: RP, }
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
        <h4>Cores que carregam emoção.</h4>
        <h6>
          Cada tubo aqui foi escolhido como quem escolhe palavras pra um poema. Nossas tintas são intensas, vibrantes e pensadas pra quem sente a arte na ponta do pincel.
          <br/>
          Pinte com sentimento - o resto, a gente entrega.
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

export default TintasOleo;