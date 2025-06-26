import '../Navbar.css';
import NavbarP from './NavbarP';
import React, { useState } from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Button, Card, Row, Col, Modal, Form } from 'react-bootstrap';
import Trident40x50 from '../assets/tela-trident-40x50.jpg';
import Acrilex70x90 from '../assets/tela-70x90.jpg';
import Canson60x80 from '../assets/tela-60x80.webp';
import Phoenix30x40 from '../assets/tela30x40.webp';
import Premium50x70 from '../assets/tela-50x70.webp';
import Redonda30x30 from '../assets/tela-30x30.webp';
import EcoAlgodao40x50 from '../assets/tela-40x50t.jpg';
import Mini10x15 from '../assets/tela-10x15.webp';
import Rodape from './Rodape'; 

function Telas() {
  const [cards, setCards] = useState([
    {
      id: 1,
      titulo: "Tela Trident 40 x 50",
      descricao: ["Tela profissional de algodão"],
      precoAtual: 55.0,
      precoAntigo: 65.0,
      imagem: Trident40x50,
    },
    {
      id: 2,
      titulo: "Tela Acrilex 70 x 90",
      descricao: ["Tela profissional de algodão"],
      precoAtual: 65.0,
      precoAntigo: 85.0,
      imagem: Acrilex70x90,
    },
    {
      id: 3,
      titulo: "Tela Canson 60 x 80",
      descricao: ["Tela profissional de algodão"],
      precoAtual: 55.0,
      precoAntigo: 65.0,
      imagem: Canson60x80,
    },
    {
      id: 4,
      titulo: "Tela Phoenix 30 x 40",
      descricao: ["Tela de com gramatura 280g"],
      precoAtual: 51.0,
      precoAntigo: 65.0,
      imagem: Phoenix30x40,
    },
    {
      id: 5,
      titulo: "Tela Acrilex 70 x 90",
      descricao: ["Tela esticada em chassi de madeira tratada"],
      precoAtual: 115.0,
      precoAntigo: 150.0,
      imagem: Acrilex70x90,
    },
    {
      id: 6,
      titulo: "Tela Trident Premium 50 x 70",
      descricao: ["Acabamento profissional com melhor cobertura"],
      precoAtual: 95.0,
      precoAntigo: 120.0,
      imagem: Premium50x70,
    },
    {
      id: 7,
      titulo: "Tela Redonda 30cm",
      descricao: ["Formato diferenciado para criações únicas"],
      precoAtual: 45.0,
      precoAntigo: 60.0,
      imagem: Redonda30x30,
    },
    {
      id: 8,
      titulo: "Tela EcoAlgodão 40 x 50",
      descricao: ["Sustentável e alta absorção"],
      precoAtual: 75.0,
      precoAntigo: 90.0,
      imagem: EcoAlgodao40x50,
    },
    {
      id: 9,
      titulo: "Mini Tela 10 x 15",
      descricao: ["Para projetos delicados e personalizados"],
      precoAtual: 35.0,
      precoAntigo: 60.0,
      imagem: Mini10x15,
    },
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
        <h4>Feito por quem ama pintar.</h4>
        <h6>
          Cada tela aqui foi escolhida com carinho por quem entende de arte. <br />
          Seja bem-vindo(a) e inspire-se com nossa seleção.
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

export default Telas;