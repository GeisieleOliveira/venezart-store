import '../Navbar.css';
import NavbarP from './NavbarP';
import React, { useState } from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Button, Card, Row, Col, Modal, Form } from 'react-bootstrap';
import Condor456 from '../assets/condor-456.webp';
import Condor227 from '../assets/condor-227.webp';
import KeramickRedondo from '../assets/keramick-redondo.jpg';
import AtlasEspecial from '../assets/atlas-especial.webp';
import Tigre321 from '../assets/tigre-321.jpg';
import Tigre815 from '../assets/tigre-815.png';
import MacrilanTrincha from '../assets/macrilan-trincha.webp';
import Kit from '../assets/kit-pinceis-condor.webp';
import Pitua415 from '../assets/pitua-415.webp';
import Rodape from './Rodape'; 
 

function Pinceis() {
  const [cards, setCards] = useState([
    { 
      id : 10,
      titulo: "Pincel Condor 456 nº 10",
      descricao: ["Ideal para detalhes e contornos"],
      precoAtual: 15.00,
      precoAntigo: 19.00,
      imagem: Condor456, },

    { 
      id : 11,
      titulo: "Pincel Condor 227 Chato nº 12",
      descricao: ["Versátil e durável"],
      precoAtual: 13.00,
      precoAntigo: 17.00,
      imagem: Condor227,},

    { 
      id : 12,
      titulo: "Pincel Keramik Redondo nº 4",
      descricao: ["Perfeito para sombreados"],
      precoAtual: 16.00,
      precoAntigo: 21.00,
      imagem: KeramickRedondo, },

      { 
      id : 13,
      titulo: "Pincel Atlas Especial nº 16",
      descricao: ["Cerda sintética de alta resistência"],
      precoAtual: 18.00,
      precoAntigo: 24.00,
      imagem: AtlasEspecial, },

      { 
      id : 14,
      titulo: "Pincel Tigre 321 Angular nº 8",
      descricao: ["Excelente para efeitos e ângulos"],
      precoAtual: 17.00,
      precoAntigo: 21.00,
      imagem: Tigre321, },

      { 
      id : 15,
      titulo: "Pincel Tigre 815 nº 14",
      descricao: ["Para grandes áreas e fundo"],
      precoAtual: 10.00,
      precoAntigo: 21.00,
      imagem: Tigre815, },

      { 
      id : 16,
      titulo: 'Pincel Trincha 2" Macrilan',
      descricao: ["Ideal para fundos e base"],
      precoAtual: 13.00,
      precoAntigo: 25.00,
      imagem: MacrilanTrincha, },

      { 
      id : 17,
      titulo: "Kit Pincéis Artísticos 5 unid.",
      descricao: ["Vários tamanhos em um único kit"],
      precoAtual: 40.00,
      precoAntigo: 70.00,
      imagem: Kit, },

      { 
      id : 18,
      titulo: "Pincel Pituá 415 nº 6",
      descricao: ["Para técnica de batidinhas"],
      precoAtual: 19.00,
      precoAntigo: 29.00,
      imagem: Pitua415, }
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
        <h4>Extensões da sua criatividade.</h4>
        <h6>
        Quem pinta sabe: o pincel faz toda a diferença. Aqui, cada modelo foi escolhido com cuidado de quem já viveu o toque da tinta na tela. <br/>Seja para detalhes, preenchimentos ou texturas, você encontra o pincel que entende sua mão.
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

export default Pinceis;