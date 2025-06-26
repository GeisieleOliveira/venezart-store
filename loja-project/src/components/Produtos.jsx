import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { FaCheckCircle, FaPalette, FaBrush } from 'react-icons/fa';
import pincelAchatado from '../assets/pincel-achatado.jpg';
import pincelVassoura from '../assets/pincel-vassoura.jpg';
import '../Navbar.css';
import NavbarP from './NavbarP';  
import Rodape from './Rodape'; 
import PincelReto from '../assets/pincel-reto.jpg'; 
import PincelChanfrado from '../assets/pincel-chanfrado.jpg'; 
import PinceisIntro from '../assets/pinceis-h.jpg'; 
import TelasIntro from '../assets/telas-h.jpg'; 
import TintasIntro from '../assets/tintas-h.jpg'; 
import SoluveisIntro from '../assets/soluveis-h.jpg'; 
import Tela30x40 from '../assets/tela30x40.webp'; 
import TelaRedonda from '../assets/tela-30x30.webp';
import Tela50x70 from '../assets/tela-50x70.webp'; 
import VCE from '../assets/vermelho-cadmio-escuro.jpg';
import AU from '../assets/azul-ultramar.jpg';
import AO from '../assets/amarelo-ocre.jpg';
import VV from '../assets/verde-veronese.webp';
import Terebintina from '../assets/terebintina.jpg';
import Medium from '../assets/medium.webp';
import OleoLinhaca from '../assets/oleo-linhaca.webp';


function Produtos() {
  return (
    <>
    <NavbarP />
      <section className="produtos-header">
        <Container>
          <h1 className="produtos-titulo">Explore o Universo Venezart</h1>
          <p className="produtos-subtitulo">
            Cada material aqui foi escolhido com carinho para transformar sua arte em emoção.
          </p>
        </Container>

        <div className="onda">
          <svg viewBox="0 0 1440 200" preserveAspectRatio="none" className="onda-svg">
            <path
              fill="#fff"
              d="M0,64L48,85.3C96,107,192,149,288,160C384,171,480,149,576,128C672,107,768,85,864,101.3C960,117,1056,171,1152,181.3C1248,192,1344,160,1392,144L1440,128V200H0Z"
            />
          </svg>
        </div>
      </section>

      <section className="pinceis-intro">
        <Container>
          <Row className="align-items-center">
            <Col md={6}>
              <h2 className="intro-titulo">A Essência do Traço</h2>
              <p className="intro-texto">
                Os pincéis são ferramentas fundamentais para qualquer artista. Cada tipo tem uma função: 
                <strong> redondo</strong> para contornos, 
                <strong> chato</strong> para cobrir grandes áreas, 
                <strong> leque</strong> para criar texturas, 
                <strong> chanfrado</strong> para sombreados precisos. 
                <br /><br />
                Na <strong>Venezart</strong>, você encontra pincéis das melhores marcas como <strong>Condor</strong>, <strong>Tigre</strong>, <strong>Pituá</strong> e <strong>Keramik</strong>, garantindo qualidade e durabilidade em cada pincelada.
              </p>
            </Col>
            <Col md={6}>
              <img
                src={PinceisIntro}
                alt="Pincéis artísticos diversos"
                className="intro-img"
              />
            </Col>
          </Row>
        </Container>
      </section>
      <section className="produtos-categoria pinceis-bg">
        <Container>

          <h2 className="categoria-titulo"><FaBrush /> Pincéis Profissionais</h2>
          
          <p className="categoria-descricao">
            Descubra a variedade ideal para diferentes técnicas. Escolha entre opções macias e firmes.
          </p>
          <Row>
            <Col md={3}>
              <Card className="produto-card">
                <Card.Img variant="top" src={PincelReto} />
                <Card.Body>
                  <Card.Title>Pincel Reto</Card.Title>
                  <Card.Text>
                    Indicado para traços marcados e áreas amplas de preenchimento. Fabricado pela <strong>Tigre</strong>.
                  </Card.Text>
                  <Link to="/pinceis">
                  <Button variant="outline-dark">Confira</Button>
                  </Link>
                </Card.Body>
              </Card>
            </Col>

            <Col md={3}>
              <Card className="produto-card">
                <Card.Img variant="top" src={PincelChanfrado} />
                <Card.Body>
                  <Card.Title>Pincel Chanfrado</Card.Title>
                  <Card.Text>
                    Excelente para linhas diagonais e efeitos de sombreamento. Modelo <strong>Condor 227</strong>.
                  </Card.Text>
                  <Link to="/pinceis">
                  <Button variant="outline-dark">Confira</Button>
                  </Link>
                </Card.Body>
              </Card>
            </Col>

            <Col md={3}>
              <Card className="produto-card">
                <Card.Img variant="top" src={pincelVassoura} />
                <Card.Body>
                  <Card.Title>Pincel Leque</Card.Title>
                  <Card.Text>
                    Ideal para criar texturas suaves como cabelos e folhagens. Marca <strong>Keramik</strong>.
                  </Card.Text>
                  <Link to="/pinceis">
                  <Button variant="outline-dark">Confira</Button>
                  </Link>
                </Card.Body>
              </Card>
            </Col>

            <Col md={3}>
              <Card className="produto-card">
                <Card.Img variant="top" src={pincelAchatado} />
                <Card.Body>
                  <Card.Title>Pincel Redondo</Card.Title>
                  <Card.Text>
                    Ideal para contornos e detalhes finos. Modelo <strong>Condor 227</strong>.
                  </Card.Text>
                  <Link to="/pinceis">
                  <Button variant="outline-dark">Confira</Button>
                  </Link>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="telas-intro">
        <Container>
          <Row className="align-items-center">
            <Col md={6}>
              <img
                src={TelasIntro}
                alt="Telas para pintura artística"
                className="intro-img"
              />
            </Col>
            <Col md={6}>
              <h2 className="intro-titulo">A Base da Sua Obra</h2>
              <p className="intro-texto">
                A tela é onde a mágica acontece. É nela que cada cor ganha vida e cada traço encontra seu lugar. 
                <br /><br />
                Contamos com uma variedade de tamanhos, formatos e texturas para atender todas as necessidades, seja para estudos ou obras profissionais. Oferecemos telas de marcas reconhecidas como <strong>Canson</strong>, <strong>Acrilex</strong>, <strong>Phoenix</strong>, <strong>Trident</strong> e <strong>Ecoalgodão</strong>. 
                <br /><br />
                Todas garantem excelente absorção, resistência e acabamento para pinturas a óleo, acrílicas e mistas.
              </p>
            </Col>
          </Row>
        </Container>
      </section>
      <section className="produtos-categoria tela-bg">
        <Container>
          <h2 className="categoria-titulo"><FaPalette /> Telas para Pintura</h2>
          <p className="categoria-descricao">
            Da clássica 20x30 à redonda 30x40, com acabamento acrílico de alta qualidade para absorção perfeita da tinta.
          </p>
          <Row>
            <Col md={4}>
              <Card className="produto-card">
                <Card.Img variant="top" src={Tela30x40} />
                <Card.Body>
                  <Card.Title>Tela 30 x 40 - Trident</Card.Title>
                  <Card.Text>
                    Estrutura firme e tecido 100% algodão, ideal para pinturas detalhadas.
                  </Card.Text>
                  <Link to="/telas">
                  <Button variant="outline-success">Confira</Button>
                  </Link>
                </Card.Body>
              </Card>
            </Col>

            <Col md={4}>
              <Card className="produto-card">
                <Card.Img variant="top" src={TelaRedonda} />
                <Card.Body>
                  <Card.Title>Tela Redonda 40 x 40 - Acrilex</Card.Title>
                  <Card.Text>
                    Ótima absorção de tinta com acabamento resistente para uso diário.
                  </Card.Text>
                  <Link to="/telas">
                  <Button variant="outline-success">Confira</Button>
                  </Link>
                </Card.Body>
              </Card>
            </Col>

            <Col md={4}>
              <Card className="produto-card">
                <Card.Img variant="top" src={Tela50x70} />
                <Card.Body>
                  <Card.Title>Tela 50 x 70 - Phoenix</Card.Title>
                  <Card.Text>
                     Superfície lisa e versátil, perfeita para técnicas mistas e camadas.
                  </Card.Text>
                  <Link to="/telas">
                  <Button variant="outline-success">Confira</Button>
                  </Link>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

       <section className="tintas-intro">
        <Container>
          <Row className="align-items-center">
            <Col md={6}>
              <h2 className="intro-titulo">Cores que Falam</h2>
              <p className="intro-texto">
                As tintas a óleo são sinônimo de profundidade e expressão. Sua composição permite misturas ricas, camadas suaves e efeitos que permanecem vibrantes por décadas.
                <br /><br />
                Trabalhamos com marcas renomadas como <strong>Corfix</strong>, <strong>Acrilex</strong> e <strong>Gato Preto</strong>, garantindo uma paleta completa de cores com excelente cobertura, secagem equilibrada e alto rendimento.
                <br /><br />
                Perfeitas para artistas que buscam versatilidade e impacto visual em cada pincelada.
              </p>
            </Col>
            <Col md={6}>
              <img
                src={TintasIntro} 
                alt="Tintas a óleo artísticas"
                className="intro-img"
              />
            </Col>
          </Row>
        </Container>
      </section>

      <section className="produtos-categoria tintas-bg">
        <Container>
          <h2 className="categoria-titulo">Tintas a Óleo</h2>
          <p className="categoria-descricao">
            Pigmentos vibrantes e excelente espalhabilidade. Cores intensas para criar efeitos impressionantes.
          </p>
          <Row>
            <Col md={3}>
              <Card className="produto-card">
                <Card.Img variant="top" src={VCE} />
                <Card.Body>
                  <Card.Title>Vermelho Cádmio</Card.Title>
                  <Card.Text>
                    Tom vibrante e quente, ideal para detalhes expressivos e tons de pele.
                  </Card.Text>
                  <Link to="/tintas">
                  <Button variant="outline-success">Confira</Button>
                  </Link>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3}>
              <Card className="produto-card">
                <Card.Img variant="top" src={AU} />
                <Card.Body>
                  <Card.Title>Azul Ultramar</Card.Title>
                  <Card.Text>
                    Cor profunda e intensa, perfeita para sombras e céus dramáticos.
                  </Card.Text>
                  <Link to="/tintas">
                  <Button variant="outline-success">Confira</Button>
                  </Link>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3}>
              <Card className="produto-card">
                <Card.Img variant="top" src={VV} />
                <Card.Body>
                  <Card.Title>Verde Veronese</Card.Title>
                  <Card.Text>
                    Ótimo para criar profundidade e contrastes sutis.
                  </Card.Text>
                  <Link to="/tintas">
                  <Button variant="outline-success">Confira</Button>
                  </Link>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3}>
              <Card className="produto-card">
                <Card.Img variant="top" src={AO} />
                <Card.Body>
                  <Card.Title>Amarelo Ocre</Card.Title>
                  <Card.Text>
                    Um tom terroso, perfeito para iluminar composições naturais e dar vida a tons de pele.
                  </Card.Text>
                  <Link to="/tintas">
                  <Button variant="outline-success">Confira</Button>
                  </Link>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          
        </Container>
      </section>

      <section className="solventes-intro">
        <Container>
          <Row className="align-items-center">
            <Col md={6}>
              <img
                src={SoluveisIntro} 
                alt="Frasco de solvente para pintura a óleo"
                className="intro-img"
              />
            </Col>
            <Col md={6}>
              <h2 className="intro-titulo">Controle e Textura na Medida Certa</h2>
              <p className="intro-texto">
                Os solventes e solúveis são essenciais para a pintura a óleo, permitindo ajustar a viscosidade da tinta, acelerar ou retardar a secagem e facilitar misturas com camadas suaves.
                <br /><br />
                Eles ajudam na criação de efeitos de transparência, controle de textura e limpeza segura dos pincéis, sem comprometer a durabilidade do material.
                <br /><br />
                Aqui na Venezart você encontra produtos das marcas <strong>Corfix</strong>, <strong>Acrilex</strong> e <strong>Gato Preto</strong>, ideais para artistas exigentes que valorizam desempenho e segurança no ateliê.
              </p>
            </Col>
          </Row>
        </Container>
      </section>
      <section className="produtos-categoria solvente-bg">
        <Container>
          <h2 className="categoria-titulo">Solventes & Solúveis</h2>
          <p className="categoria-descricao">
            Essenciais para limpeza e diluição da tinta com segurança e controle.
          </p>
          <Row>
            <Col md={4}>
              <Card className="produto-card">
                <Card.Img variant="top" src={Terebintina} />
                <Card.Body>
                  <Card.Title> Essência de Terebintina – Corfix</Card.Title>
                  <Card.Text>
                    Solvente natural clássico com aroma marcante, ideal para diluir tintas a óleo e criar efeitos translúcidos em camadas iniciais.
                  </Card.Text>
                  <Link to="/solventes">
                  <Button variant="outline-success">Confira</Button>
                  </Link>
                </Card.Body>
              </Card>
            </Col>

            <Col md={4}>
              <Card className="produto-card">
                <Card.Img variant="top" src={Medium} />
                <Card.Body>
                  <Card.Title>Medium Secagem Rápida – Acrilex</Card.Title>
                  <Card.Text>
                   Acelera o tempo de secagem sem comprometer a textura da tinta, ótimo para quem deseja agilidade entre camadas.
                  </Card.Text>
                  <Link to="/solventes">
                  <Button variant="outline-success">Confira</Button>
                  </Link>
                </Card.Body>
              </Card>
            </Col>

            <Col md={4}>
              <Card className="produto-card">
                <Card.Img variant="top" src={OleoLinhaca} />
                <Card.Body>
                  <Card.Title>Óleo de Linhaça Refinado – Gato Preto</Card.Title>
                  <Card.Text>
                   Melhora a fluidez, brilho e profundidade das cores, além de aumentar a aderência da tinta sobre a tela.
                  </Card.Text>
                  <Link to="/solventes">
                  <Button variant="outline-success">Confira</Button>
                  </Link>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>
    <>
    <Rodape />
    </>
    </>
  );
}

export default Produtos;