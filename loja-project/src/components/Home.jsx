import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Button, Card } from 'react-bootstrap';
import { FaPaintBrush, FaArrowRight, FaStar, FaStarHalfAlt } from 'react-icons/fa'; 
import Kit from '../assets/kit-pinceis-condor.webp'; 
import VDE from '../assets/vermelho-cadmio-escuro.jpg'; 
import mini10X15 from '../assets/tela-10x15.webp'; 
import OleoCartamo from '../assets/oleo-cartamo.jpg'; 
import Veneza from '../assets/veneza.jpg'; 
import image1 from '../assets/image5-c.jpg'; 
import image3 from '../assets/image3.jpg'; 
import image5 from '../assets/image5.jpg'; 
import image7 from '../assets/image7.jpg'; 

import NavbarP from './NavbarP';  
import '../Navbar.css';
import { Swiper, SwiperSlide } from 'swiper/react'; 
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/autoplay';
import Rodape from './Rodape'; 

const ImageCarousel = ({ images }) => {
  return (
    <div className="carousel">
      <Swiper
        modules={[Autoplay]}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop={true}
        speed={1000}
        slidesPerView={1}
        spaceBetween={0}
      >
        {images.map((img, index) => (
          <SwiperSlide key={index}>
            <div
              className="carousel-slide"
              style={{ backgroundImage: `url(${img})` }}
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="venezart-label">Venezart</div>
      <p className="venezart-p">Da alma para a tela.</p>
    </div>
  );
};

function Home() {
  const images = [image1,image3,image5, image7];

  const produtos = [
    {
      id: 1,
      nome: "Kit de Pincéis",
      preco: "R$ 39,90",
      imagem: Kit,
      avaliacao: 4.5,
      destaque: false,
    },
    {
      id: 2,
      nome: "Tela para Pintura",
      preco: "R$ 35,00",
      imagem: mini10X15,
      avaliacao: 4,
      destaque: true,
    },
    {
      id: 3,
      nome: "Tinta a Óleo",
      preco: "R$ 15,00",
      imagem: VDE,
      avaliacao: 5,
      destaque: false,
    },
    {
      id: 4,
      nome: "Óleo de Cártamo",
      preco: "R$ 15,70",
      imagem: OleoCartamo,
      avaliacao: 3.5,
      destaque: false,
    },
  ];

  const renderEstrelas = (nota) => {
    const estrelas = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= Math.floor(nota)) {
        estrelas.push(<FaStar key={i} className="star filled" />);
      } else if (i - nota < 1) {
        estrelas.push(<FaStarHalfAlt key={i} className="star filled" />);
      } else {
        estrelas.push(<FaStar key={i} className="star empty" />);
      }
    }
    return estrelas;
  };

  return (
    <>
      <NavbarP />
      <ImageCarousel images={images} />

      <div className="sobre-section">
        <div className="container-sobre">
          <div className="texto">
            <h2>
              <FaPaintBrush size={24} className="icon-margin" /> Sobre a Venezart!
            </h2>
            <p>
              Na Venezart, acreditamos que toda grande obra começa com uma tela em branco.
              Oferecemos materiais de qualidade - telas, pincéis, tintas a óleo e solventes - para que você possa dar vida às suas ideias.
              Aqui, cada produto é escolhido com cuidado e carinho para inspirar sua criatividade.<br />
              Seja você um artista iniciante ou experiente, nossa missão é ajudar a colocar cor e emoção em cada criação.
            </p>
            <p className="frase-impacto">
              "Transforme sua arte com qualidade e inspiração em cada detalhe."
            </p>
          </div>
          <div className="imagem">
            <img src={Veneza} alt="Nossa Loja" className="sobre-img" />
          </div>
        </div>

        <div className="onda">
          <svg viewBox="0 0 1440 200" preserveAspectRatio="none" className="onda-svg">
            <path
              fill="#fff"
              d="M0,64L48,85.3C96,107,192,149,288,160C384,171,480,149,576,128C672,107,768,85,864,101.3C960,117,1056,171,1152,181.3C1248,192,1344,160,1392,144L1440,128V200H0Z"
            />
          </svg>
        </div>
      </div>

      <section className="produtos-section">
        <Container>
          <h2 className="produtos-title">Nossos Produtos</h2>
          <div className="cards-grid">
            {produtos.map(({ id, nome, preco, imagem, avaliacao, destaque }) => (
              <Card
                key={id}
                className={`produto-card ${destaque ? "card-destaque" : ""}`}
              >
                <Card.Img variant="top" src={imagem} alt={nome} className="produto-img" />
                <Card.Body>
                  <Card.Title>{nome}</Card.Title>
                  <Card.Text className="produto-preco">{preco}</Card.Text>
                  <div className="avaliacao-stars">{renderEstrelas(avaliacao)}</div>
                  <Button className="btn-verprodutos" variant="outline-success">
                    Ver todos os produtos <FaArrowRight className="btn-arrow" />
                  </Button>
                </Card.Body>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      <section className="contato-section">
  <Container className="contato-container">
    <h2 className="contato-titulo">Conecte-se com a Arte</h2>
    <p className="contato-texto">
      Tem dúvidas, sugestões ou deseja fazer um pedido personalizado?  
      Fale com a gente e transforme suas ideias em obras-primas.
      Estamos aqui para ajudar você a criar com alma, cor e emoção.
    </p>

    <form className="contato-form">
      <input type="text" placeholder="Seu nome" required />
      <input type="email" placeholder="Seu e-mail" required />
      <textarea placeholder="Sua mensagem..." rows="4" required />
      <Button variant="dark" type="submit" className="btn-enviar">
        Enviar Mensagem <FaArrowRight />
      </Button>
    </form>
  </Container>
</section>

<Rodape />
    </>
  );
}

export default Home;