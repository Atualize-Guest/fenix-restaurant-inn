import React, { useState, useEffect } from 'react';
import { IMAGES } from './images';

export default function App() {
  // 1. Rates Calculator State
  const [withBreakfast, setWithBreakfast] = useState(true);

  const rates = {
    comCafe: { hidro: "R$ 440", familia: "R$ 540", familiar: "R$ 900" },
    semCafe: { hidro: "R$ 380", familia: "R$ 465", familiar: "R$ 780" }
  };

  // 2. Gallery State
  const [currentCategory, setCurrentCategory] = useState<'quartos' | 'piscina' | 'comida-cafe-almoco'>('quartos');
  const [itemsShown, setItemsShown] = useState(8);

  const images = IMAGES[currentCategory] || [];
  const visibleImages = images.slice(0, itemsShown);

  // 3. Testimonials Slider State
  const [currentReviewIdx, setCurrentReviewIdx] = useState(0);

  const reviews = [
    {
      stars: 5,
      text: `"Me hospedei com minha namorada e amamos! O lugar é simples e muito aconchegante, tudo bem limpo e organizado. A localização é ótima, me senti bem segura e o atendimento também foi show! Recomendo!"`,
      author: "Carol Amparo",
      source: "Google Avaliações"
    },
    {
      stars: 5,
      text: `"Viajei para Pontal a trabalho e me hospedei na pousada. O atendimento com os hóspedes em geral é excelente, especialmente o atendimento da equipe, muito acolhedora e prestativa, me senti em casa. Os quartos são aconchegantes e limpos, tem wi-fi em toda a pousada, o café da manhã é ótimo. Além de estar pertinho da praia, tem uma piscina que sempre está limpinha e no restaurante tem uma comida excelente com preço justo. Super recomendo!"`,
      author: "Ataine Lopes",
      source: "Google Avaliações"
    },
    {
      stars: 5,
      text: `"Super indico a pousada Fênix, minha experiência foi ótima nesse lugar! Fomos muito bem atendidos, o lugar é aconchegante e limpo, o café da manhã servido é maravilhoso com variedade e os pratos do restaurante são ótimos. Tivemos um problema com ar-condicionado e foi resolvido rapidamente, estavam sempre de prontidão. A pousada é próxima à praia e com fácil acesso ao centro, com certeza voltarei."`,
      author: "Jaqueline Mariano",
      source: "Google Avaliações"
    }
  ];

  // Auto scroll testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentReviewIdx(prev => (prev + 1) % reviews.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [reviews.length]);

  // 4. FAQ Accordion State
  const [activeFaqIdx, setActiveFaqIdx] = useState<number | null>(null);

  const faqs = [
    {
      question: "Qual a distância da pousada até a praia?",
      answer: "A Pousada Fênix está localizada a apenas 300 metros da beira-mar de Praia de Leste, em Pontal do Paraná. Isso equivale a uma caminhada de aproximadamente 4 a 5 minutos por uma rua reta e de fácil acesso."
    },
    {
      question: "Quais são os horários de check-in e check-out?",
      answer: "O nosso horário padrão de check-in é das 14:00 às 22:00. O check-out deve ser realizado das 09:00 até as 12:00. Caso precise de horários flexíveis, entre em contato conosco antecipadamente para verificar a disponibilidade."
    },
    {
      question: "Crianças pagam diária?",
      answer: "Crianças de até 5 anos de idade são totalmente isentas de pagamento de diárias na Pousada Fênix, desde que acomodadas na mesma suíte dos responsáveis."
    },
    {
      question: "Vocês oferecem café da manhã nas estadias?",
      answer: "Sim! Nós oferecemos diárias com café da manhã completo e variado (servido em estilo buffet). Também temos a opção de diárias sem café da manhã para quem busca tarifas mais econômicas. Você seleciona a sua preferência no momento da reserva."
    },
    {
      question: "A pousada aceita animais de estimação (Pets)?",
      answer: "Infelizmente, para garantir a tranquilidade, o silêncio e as normas de higienização das nossas acomodações para todos os hóspedes, não aceitamos pets na pousada."
    },
    {
      question: "O restaurante e a piscina são abertos a não-hóspedes?",
      answer: "O nosso restaurante (Churrascaria e Parrilla Fênix) é aberto ao público em geral, servindo pratos excelentes para almoço e jantar. A área de lazer com a piscina, contudo, é de uso estritamente exclusivo de hóspedes."
    }
  ];

  const toggleFaq = (idx: number) => {
    setActiveFaqIdx(prev => (prev === idx ? null : idx));
  };

  // 5. Lightbox State
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIdx, setLightboxIdx] = useState(0);

  const openLightbox = (idx: number) => {
    setLightboxIdx(idx);
    setLightboxOpen(true);
  };

  const navigateLightbox = (direction: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setLightboxIdx(prev => {
      const next = prev + direction;
      if (next < 0) return images.length - 1;
      if (next >= images.length) return 0;
      return next;
    });
  };

  // Handle keyboard events for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lightboxOpen) return;
      if (e.key === "ArrowLeft") setLightboxIdx(prev => (prev === 0 ? images.length - 1 : prev - 1));
      if (e.key === "ArrowRight") setLightboxIdx(prev => (prev === images.length - 1 ? 0 : prev + 1));
      if (e.key === "Escape") setLightboxOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxOpen, images.length]);

  // 6. Scroll navigation active highlights
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "sobre", "suites", "galeria", "depoimentos", "faq", "contato"];
      let current = "home";
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 140) {
            current = sectionId;
          }
        }
      }
      setActiveSection(current);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const formatCaption = (imgName: string) => {
    return imgName
      .replace(/\.[^/.]+$/, "")
      .replace(/-/g, " ")
      .replace(/\b\w/g, c => c.toUpperCase());
  };

  return (
    <div className="app-root">
      {/* Header / Navbar */}
      <header className="navbar">
        <div className="nav-container">
          <a href="#" className="logo">
            <img src="/logo.png" alt="Pousada Restaurante Fênix" className="logo-img" />
          </a>
          <nav className="nav-menu">
            <a href="#home" className={`nav-link ${activeSection === 'home' ? 'active' : ''}`}>Início</a>
            <a href="#sobre" className={`nav-link ${activeSection === 'sobre' ? 'active' : ''}`}>Sobre</a>
            <a href="#suites" className={`nav-link ${activeSection === 'suites' ? 'active' : ''}`}>Suítes</a>
            <a href="#galeria" className={`nav-link ${activeSection === 'galeria' ? 'active' : ''}`}>Galeria</a>
            <a href="#depoimentos" className={`nav-link ${activeSection === 'depoimentos' ? 'active' : ''}`}>Avaliações</a>
            <a href="#faq" className={`nav-link ${activeSection === 'faq' ? 'active' : ''}`}>FAQ</a>
            <a href="#contato" className={`nav-link ${activeSection === 'contato' ? 'active' : ''}`}>Contato</a>
          </nav>
          <div className="nav-cta">
            <a href="https://wa.me/554189047277" target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-sm">
              <i className="fa-brands fa-whatsapp"></i> Reservar
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className="hero">
        <div className="hero-bg-overlay"></div>
        <div className="hero-content">
          <span className="hero-badge"><i className="fa-solid fa-umbrella-beach"></i> A apenas 300m do mar 🌊</span>
          <h1 className="hero-title">Conforto e lazer a 300m do mar</h1>
          <p className="hero-subtitle">Descubra a Pousada Fênix. Suítes climatizadas, piscina externa relaxante e uma churrascaria de dar água na boca, com o acolhimento familiar que você merece.</p>
          <div className="hero-actions">
            <a href="#suites" className="btn btn-primary btn-lg">Conhecer Suítes</a>
            <a href="#galeria" className="btn btn-secondary btn-lg">Ver Fotos</a>
          </div>
        </div>
        <div className="hero-scroll-indicator">
          <a href="#sobre"><i className="fa-solid fa-chevron-down"></i></a>
        </div>
        <div className="hero-wave">
          <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V0C26.9,8.75,57.05,18.3,87.43,26.79,166.42,48.81,248.8,69.93,321.39,56.44Z" className="shape-fill"></path>
          </svg>
        </div>
      </section>

      {/* About Section */}
      <section id="sobre" className="section sobre">
        <div className="container grid grid-2">
          <div className="sobre-img-wrapper">
            <div className="image-box">
              <img src="/fotos-fenix/piscina/pousada-fenix-litoral-pr-piscina-ao-ar-livre-1.jpg" alt="Piscina da Pousada Fênix" className="main-img" />
              <div className="experience-badge">
                <span class="number" style={{ color: 'var(--accent-primary)', fontSize: '2.5rem', fontWeight: 900, display: 'block', lineHeight: 1 }}>25</span>
                <span className="text">Suítes Climatizadas</span>
              </div>
            </div>
          </div>
          <div className="sobre-info">
            <span className="section-badge">Sobre Nós</span>
            <h2 className="section-title">O equilíbrio perfeito para suas férias no litoral</h2>
            <p className="section-text">
              Na Pousada Fênix, oferecemos uma experiência acolhedora que fará você se sentir em casa. Com uma administração familiar dedicada e atenciosa, nosso foco é garantir o seu descanso total a poucos passos da praia.
            </p>
            <div className="features-list">
              <div className="feature-item">
                <i className="fa-solid fa-umbrella-beach"></i>
                <div>
                  <h4>Pertinho do Mar</h4>
                  <p>Estamos a apenas 300 metros da praia, uma curta caminhada de 4 minutos.</p>
                </div>
              </div>
              <div className="feature-item">
                <i className="fa-solid fa-utensils"></i>
                <div>
                  <h4>Restaurante Integrado</h4>
                  <p>Delicie-se com a nossa churrascaria e parrilla integrada, servindo pratos excelentes.</p>
                </div>
              </div>
              <div className="feature-item">
                <i className="fa-solid fa-swimming-pool"></i>
                <div>
                  <h4>Piscina & Lazer</h4>
                  <p>Piscina externa sempre limpa e área com mesas para socializar e relaxar.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Suites Section */}
      <section id="suites" className="section suites">
        <div className="container text-center">
          <span className="section-badge">Nossas Suítes</span>
          <h2 className="section-title">Acomodações sob medida para você</h2>
          <p className="section-subtitle">Selecione opções com ou sem café da manhã para simular tarifas exclusivas.</p>

          {/* Cafe Toggle */}
          <div className="toggle-container">
            <span className={`toggle-label sem-cafe ${!withBreakfast ? 'active' : ''}`}>Sem Café da Manhã</span>
            <label className="switch">
              <input type="checkbox" checked={withBreakfast} onChange={(e) => setWithBreakfast(e.target.checked)} />
              <span className="slider round"></span>
            </label>
            <span className={`toggle-label com-cafe ${withBreakfast ? 'active' : ''}`}>Com Café da Manhã</span>
          </div>

          <div className="suites-grid">
            {/* Suite 1 */}
            <div className="suite-card">
              <div className="suite-img-container">
                <img src="/fotos-fenix/quartos/pousada-fenix-praia-de-leste-suite-hidromassagem-jacuzzi.jpeg" alt="Suíte com Hidromassagem" />
                <span className="suite-badge">Premium</span>
              </div>
              <div className="suite-info">
                <h3>Suíte com Hidromassagem</h3>
                <p className="suite-desc">Perfeita para casais. Privacidade, banheira de hidromassagem privativa e enxoval especial para momentos relaxantes.</p>
                <ul class="suite-amenities" style={{ listStyle: 'none', padding: 0 }}>
                  <li><i className="fa-solid fa-user-friends"></i> 2 Adultos</li>
                  <li><i className="fa-solid fa-bath"></i> Hidromassagem</li>
                  <li><i className="fa-solid fa-snowflake"></i> Ar-condicionado</li>
                  <li><i className="fa-solid fa-tv"></i> Smart TV</li>
                  <li><i className="fa-solid fa-wind"></i> Secador (Quarto 8)</li>
                </ul>
                <div className="suite-pricing">
                  <span className="price-prefix">A partir de</span>
                  <span className="price">{withBreakfast ? rates.comCafe.hidro : rates.semCafe.hidro}</span>
                  <span className="price-suffix">/ diária</span>
                </div>
                <a href={`https://wa.me/554189047277?text=Olá,%20gostaria%20de%20reservar%20a%20Suíte%20com%20Hidromassagem%20(${withBreakfast ? 'Com' : 'Sem'}%20Café%20da%20Manhã)`} target="_blank" rel="noopener noreferrer" className="btn btn-outline-primary btn-block">Consultar Disponibilidade</a>
              </div>
            </div>

            {/* Suite 2 */}
            <div className="suite-card">
              <div className="suite-img-container">
                <img src="/fotos-fenix/quartos/pousada-fenix-litoral-pr-suite-hidromassagem-jacuzzi-4.jpg" alt="Suíte Família" />
                <span className="suite-badge">Recomendado</span>
              </div>
              <div className="suite-info">
                <h3>Suíte Família</h3>
                <p className="suite-desc">Ideal para famílias pequenas. Espaço aconchegante com cama de casal e solteiro com ótima ventilação.</p>
                <ul class="suite-amenities" style={{ listStyle: 'none', padding: 0 }}>
                  <li><i className="fa-solid fa-user-friends"></i> 2 Hóspedes + 1 Criança</li>
                  <li><i className="fa-solid fa-snowflake"></i> Ar-condicionado</li>
                  <li><i className="fa-solid fa-tv"></i> Smart TV</li>
                  <li><i className="fa-solid fa-wifi"></i> Wi-Fi Grátis</li>
                  <li><i className="fa-solid fa-baby"></i> Crianças até 5a grátis</li>
                </ul>
                <div className="suite-pricing">
                  <span className="price-prefix">A partir de</span>
                  <span className="price">{withBreakfast ? rates.comCafe.familia : rates.semCafe.familia}</span>
                  <span className="price-suffix">/ diária</span>
                </div>
                <a href={`https://wa.me/554189047277?text=Olá,%20gostaria%20de%20reservar%20a%20Suíte%20Família%20(${withBreakfast ? 'Com' : 'Sem'}%20Café%20da%20Manhã)`} target="_blank" rel="noopener noreferrer" className="btn btn-outline-primary btn-block">Consultar Disponibilidade</a>
              </div>
            </div>

            {/* Suite 3 */}
            <div className="suite-card">
              <div className="suite-img-container">
                <img src="/fotos-fenix/quartos/pousada-fenix-litoral-pr-suite-hidromassagem-jacuzzi-5.jpg" alt="Suíte Familiar" />
              </div>
              <div className="suite-info">
                <h3>Suíte Familiar</h3>
                <p className="suite-desc">Ideal para grupos médios. Conforto compartilhado em um espaço amplo com camas planejadas.</p>
                <ul class="suite-amenities" style={{ listStyle: 'none', padding: 0 }}>
                  <li><i className="fa-solid fa-users"></i> Até 5 Hóspedes</li>
                  <li><i className="fa-solid fa-snowflake"></i> Ar-condicionado</li>
                  <li><i className="fa-solid fa-tv"></i> Smart TV</li>
                  <li><i className="fa-solid fa-mattress-pillow"></i> Cama de Casal + Beliche</li>
                  <li><i className="fa-solid fa-kitchen-set"></i> Frigobar</li>
                </ul>
                <div className="suite-pricing">
                  <span className="price-prefix">A partir de</span>
                  <span className="price">{withBreakfast ? rates.comCafe.familiar : rates.semCafe.familiar}</span>
                  <span className="price-suffix">/ diária</span>
                </div>
                <a href={`https://wa.me/554189047277?text=Olá,%20gostaria%20de%20reservar%20a%20Suíte%20Familiar%20(${withBreakfast ? 'Com' : 'Sem'}%20Café%20da%20Manhã)`} target="_blank" rel="noopener noreferrer" className="btn btn-outline-primary btn-block">Consultar Disponibilidade</a>
              </div>
            </div>

            {/* Suite 4 */}
            <div className="suite-card">
              <div className="suite-img-container">
                <img src="/fotos-fenix/quartos/pousada-fenix-pontal-do-parana-decoracao-cama-casal-cisnes.jpeg" alt="Suíte Grupo Grande" />
              </div>
              <div className="suite-info">
                <h3>Suíte Grupo (Quarto 2)</h3>
                <p className="suite-desc">Ampla suíte familiar equipada com 2 camas de casal e 2 beliches, ideal para grandes grupos e excursões.</p>
                <ul class="suite-amenities" style={{ listStyle: 'none', padding: 0 }}>
                  <li><i className="fa-solid fa-users"></i> Até 7 Hóspedes</li>
                  <li><i className="fa-solid fa-snowflake"></i> Ar-condicionado</li>
                  <li><i className="fa-solid fa-tv"></i> Smart TV</li>
                  <li><i className="fa-solid fa-bed"></i> 2 Casal + 2 Beliches</li>
                  <li><i className="fa-solid fa-wifi"></i> Wi-Fi de alta velocidade</li>
                </ul>
                <div className="suite-pricing">
                  <span className="price-prefix">Consulte tarifas</span>
                  <span className="price" style={{ fontSize: '1.8rem' }}>Sob Consulta</span>
                </div>
                <a href="https://wa.me/554189047277?text=Olá,%20gostaria%20de%20consultar%20preços%20para%20a%20Suíte%20Grupo%20(Quarto%202)" target="_blank" rel="noopener noreferrer" className="btn btn-outline-primary btn-block">Solicitar Cotação</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="galeria" className="section galeria">
        <div className="container">
          <div className="text-center">
            <span className="section-badge">Galeria de Fotos</span>
            <h2 className="section-title">Explore as fotos da nossa pousada</h2>
            <p className="section-subtitle">Clique nas categorias abaixo para navegar pelas imagens reais das nossas instalações.</p>
          </div>

          <div className="gallery-tabs">
            <button className={`tab-btn ${currentCategory === 'quartos' ? 'active' : ''}`} onClick={() => { setCurrentCategory('quartos'); setItemsShown(8); }}>Quartos & Suítes</button>
            <button className={`tab-btn ${currentCategory === 'piscina' ? 'active' : ''}`} onClick={() => { setCurrentCategory('piscina'); setItemsShown(8); }}>Piscina & Lazer</button>
            <button className={`tab-btn ${currentCategory === 'comida-cafe-almoco' ? 'active' : ''}`} onClick={() => { setCurrentCategory('comida-cafe-almoco'); setItemsShown(8); }}>Restaurante & Café</button>
          </div>

          {/* Gallery Grid */}
          <div className="gallery-grid" id="galleryGrid">
            {visibleImages.map((imgName, i) => {
              const imgPath = `/fotos-fenix/${currentCategory}/${imgName}`;
              const caption = formatCaption(imgName);
              return (
                <div className="gallery-item" key={imgName} onClick={() => openLightbox(i)}>
                  <img src={imgPath} alt={caption} />
                  <div className="gallery-overlay">
                    <i className="fa-solid fa-magnifying-glass-plus"></i>
                  </div>
                </div>
              );
            })}
          </div>

          {itemsShown < images.length && (
            <div className="text-center mt-4">
              <button id="btnShowMore" className="btn btn-primary" onClick={() => setItemsShown(prev => prev + 8)}>Mostrar Mais</button>
            </div>
          )}
        </div>
      </section>

      {/* Reviews Section */}
      <section id="depoimentos" className="section depoimentos">
        <div className="container text-center">
          <span className="section-badge">Depoimentos</span>
          <h2 className="section-title">O que dizem os nossos hóspedes</h2>

          <div className="reviews-slider">
            {reviews.map((rev, i) => (
              <div className={`review-card ${i === currentReviewIdx ? 'active' : ''}`} key={i}>
                <div className="review-stars">
                  {[...Array(rev.stars)].map((_, s) => (
                    <i className="fa-solid fa-star" key={s}></i>
                  ))}
                </div>
                <p className="review-text">{rev.text}</p>
                <h4 className="review-author">{rev.author}</h4>
                <span className="review-source">{rev.source}</span>
              </div>
            ))}
          </div>

          {/* Review dots */}
          <div className="review-dots">
            {reviews.map((_, i) => (
              <span className={`dot ${i === currentReviewIdx ? 'active' : ''}`} key={i} onClick={() => setCurrentReviewIdx(i)}></span>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" class="section faq">
        <div className="container">
          <div className="text-center">
            <span className="section-badge">FAQ</span>
            <h2 className="section-title">Dúvidas Frequentes</h2>
            <p className="section-subtitle">Encontre respostas rápidas para as principais perguntas sobre a sua estadia na Pousada Fênix.</p>
          </div>

          <div className="faq-accordion">
            {faqs.map((faq, i) => (
              <div className={`faq-item ${activeFaqIdx === i ? 'active' : ''}`} key={i}>
                <button className="faq-question" onClick={() => toggleFaq(i)}>
                  <span>{faq.question}</span>
                  <i className="fa-solid fa-chevron-down faq-icon"></i>
                </button>
                <div className="faq-answer">
                  <p>{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact & Map Section */}
      <section id="contato" className="section contato">
        <div className="container grid grid-2">
          <div className="contato-info">
            <span className="section-badge">Fale Conosco</span>
            <h2 className="section-title">Estamos prontos para receber você</h2>
            <p className="section-text">Deseja fazer uma reserva direta ou tirar alguma dúvida? Entre em contato pelos canais abaixo ou envie uma mensagem no WhatsApp.</p>

            <div className="contact-details">
              <div className="contact-item">
                <i className="fa-solid fa-phone"></i>
                <div>
                  <h4>WhatsApp / Telefone</h4>
                  <p><a href="https://wa.me/554189047277">+55 41 8904-7277</a></p>
                </div>
              </div>
              <div className="contact-item">
                <i className="fa-solid fa-envelope"></i>
                <div>
                  <h4>E-mail de Suporte</h4>
                  <p><a href="mailto:fenixpousadaerestaurante@gmail.com">fenixpousadaerestaurante@gmail.com</a></p>
                </div>
              </div>
              <div className="contact-item">
                <i className="fa-solid fa-location-dot"></i>
                <div>
                  <h4>Nosso Endereço</h4>
                  <p>Al. Paranaguá, 1310 - Praia de Leste, Pontal do Paraná - PR</p>
                </div>
              </div>
            </div>

            <div className="social-links">
              <a href="https://www.facebook.com/fenixpousada/?locale=pt_BR" target="_blank" rel="noopener noreferrer" className="social-icon"><i className="fa-brands fa-facebook"></i></a>
              <a href="https://www.instagram.com/fenixpousadaerestaurante/" target="_blank" rel="noopener noreferrer" className="social-icon"><i className="fa-brands fa-instagram"></i></a>
            </div>
          </div>

          <div className="contato-mapa">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3598.6720516524317!2d-48.37989912460565!3d-25.714856077382216!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1m12!2sPousada%20e%20Restaurante%20F%C3%AAnix%2C%20Al.%20Paranagu%C3%A1%2C%201310!5e0!3m2!1spt-BR!2sbr!4v1722200000000!5m2!1spt-BR!2sbr"
              style={{ border: 0, width: '100%', height: '100%', minHeight: '380px', borderRadius: '18px' }}
              allowFullScreen={true}
              loading="lazy"
              title="Localização da Pousada Fênix no Google Maps"
            ></iframe>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer>
        <div className="container footer-grid">
          <div className="footer-brand">
            <img src="/logo.png" alt="Pousada Restaurante Fênix" className="footer-logo" />
            <p>Conforto, lazer e gastronomia a apenas 300 metros do mar em Praia de Leste.</p>
          </div>
          <div className="footer-links">
            <h4>Links Rápidos</h4>
            <a href="#home">Início</a>
            <a href="#sobre">Sobre</a>
            <a href="#suites">Suítes</a>
            <a href="#galeria">Galeria</a>
            <a href="#faq">FAQ</a>
          </div>
          <div className="footer-contact">
            <h4>Contato</h4>
            <p><i className="fa-solid fa-phone"></i> +55 41 8904-7277</p>
            <p><i className="fa-solid fa-envelope"></i> fenixpousadaerestaurante@gmail.com</p>
          </div>
        </div>
        <div className="footer-bottom text-center">
          <p>&copy; 2026 Pousada Restaurante Fênix. Todos os direitos reservados. Praia de Leste, PR.</p>
        </div>
      </footer>

      {/* Lightbox for Gallery */}
      {lightboxOpen && (
        <div id="lightbox" className="lightbox" style={{ display: 'block' }} onClick={() => setLightboxOpen(false)}>
          <span className="close-lightbox" id="closeLightbox" onClick={() => setLightboxOpen(false)}>&times;</span>
          <img
            className="lightbox-content"
            id="lightboxImg"
            src={`/fotos-fenix/${currentCategory}/${images[lightboxIdx]}`}
            alt={formatCaption(images[lightboxIdx])}
            onClick={(e) => e.stopPropagation()}
          />
          <div className="lightbox-caption" id="lightboxCaption">
            {formatCaption(images[lightboxIdx])} ({lightboxIdx + 1}/{images.length})
          </div>
          <a className="prev-lightbox" id="prevLightbox" onClick={(e) => navigateLightbox(-1, e)}>&#10094;</a>
          <a className="next-lightbox" id="nextLightbox" onClick={(e) => navigateLightbox(1, e)}>&#10095;</a>
        </div>
      )}
    </div>
  );
}
