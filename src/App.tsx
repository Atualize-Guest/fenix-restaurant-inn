import React, { useState, useEffect, useCallback } from 'react';
import { IMAGES } from './images';
import { WHATSAPP_NUMBER } from './config';
import { captureTracking, trackWhatsappClick } from './tracking';

/* ------------------------------------------------------------------ */
/* Constantes (fora do componente: não recriam a cada render)          */
/* ------------------------------------------------------------------ */

const RATES = {
  comCafe: { hidro: 'R$ 440', familia: 'R$ 540', familiar: 'R$ 900' },
  semCafe: { hidro: 'R$ 380', familia: 'R$ 465', familiar: 'R$ 780' },
};

const SECTIONS = ['home', 'sobre', 'suites', 'galeria', 'depoimentos', 'faq', 'contato'];

const NAV_LINKS = [
  { id: 'home', label: 'Início' },
  { id: 'sobre', label: 'Sobre' },
  { id: 'suites', label: 'Suítes' },
  { id: 'galeria', label: 'Galeria' },
  { id: 'depoimentos', label: 'Avaliações' },
  { id: 'faq', label: 'FAQ' },
  { id: 'contato', label: 'Contato' },
];

const REVIEWS = [
  {
    stars: 5,
    text: `"Me hospedei com minha namorada e amamos! O lugar é simples e muito aconchegante, tudo bem limpo e organizado. A localização é ótima, me senti bem segura e o atendimento também foi show! Recomendo!"`,
    author: 'Carol Amparo',
    source: 'Google Avaliações',
  },
  {
    stars: 5,
    text: `"Viajei para Pontal a trabalho e me hospedei na pousada. O atendimento com os hóspedes em geral é excelente, especialmente o atendimento da equipe, muito acolhedora e prestativa, me senti em casa. Os quartos são aconchegantes e limpos, tem wi-fi em toda a pousada, o café da manhã é ótimo. Além de estar pertinho da praia, tem uma piscina que sempre está limpinha e no restaurante tem uma comida excelente com preço justo. Super recomendo!"`,
    author: 'Ataine Lopes',
    source: 'Google Avaliações',
  },
  {
    stars: 5,
    text: `"Super indico a pousada Fênix, minha experiência foi ótima nesse lugar! Fomos muito bem atendidos, o lugar é aconchegante e limpo, o café da manhã servido é maravilhoso com variedade e os pratos do restaurante são ótimos. Tivemos um problema com ar-condicionado e foi resolvido rapidamente, estavam sempre de prontidão. A pousada é próxima à praia e com fácil acesso ao centro, com certeza voltarei."`,
    author: 'Jaqueline Mariano',
    source: 'Google Avaliações',
  },
];

const FAQS = [
  {
    question: 'Qual a distância da pousada até a praia?',
    answer:
      'A Pousada Fênix está localizada a apenas 300 metros da beira-mar de Praia de Leste, em Pontal do Paraná. Isso equivale a uma caminhada de aproximadamente 4 a 5 minutos por uma rua reta e de fácil acesso.',
  },
  {
    question: 'Quais são os horários de check-in e check-out?',
    answer:
      'O nosso horário padrão de check-in é das 14:00 às 22:00. O check-out deve ser realizado das 09:00 até as 12:00. Caso precise de horários flexíveis, entre em contato conosco antecipadamente para verificar a disponibilidade.',
  },
  {
    question: 'Crianças pagam diária?',
    answer:
      'Crianças de até 5 anos de idade são totalmente isentas de pagamento de diárias na Pousada Fênix, desde que acomodadas na mesma suíte dos responsáveis.',
  },
  {
    question: 'Vocês oferecem café da manhã nas estadias?',
    answer:
      'Sim! Nós oferecemos diárias com café da manhã completo e variado (servido em estilo buffet). Também temos a opção de diárias sem café da manhã para quem busca tarifas mais econômicas. Você seleciona a sua preferência no momento da reserva.',
  },
  {
    question: 'A pousada aceita animais de estimação (Pets)?',
    answer:
      'Infelizmente, para garantir a tranquilidade, o silêncio e as normas de higienização das nossas acomodações para todos os hóspedes, não aceitamos pets na pousada.',
  },
  {
    question: 'O restaurante e a piscina são abertos a não-hóspedes?',
    answer:
      'O nosso restaurante (Churrascaria e Parrilla Fênix) é aberto ao público em geral, servindo pratos excelentes para almoço e jantar. A área de lazer com a piscina, contudo, é de uso estritamente exclusivo de hóspedes.',
  },
];

/** Monta o link do WhatsApp com a mensagem já contextualizada pela origem do clique. */
const waLink = (message: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

const formatCaption = (imgName: string) =>
  imgName
    .replace(/\.[^/.]+$/, '')
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());

/* ------------------------------------------------------------------ */

export default function App() {
  // 1. Tarifas (com / sem café da manhã)
  const [withBreakfast, setWithBreakfast] = useState(true);
  const cafeLabel = withBreakfast ? 'com café da manhã' : 'sem café da manhã';
  const tarifas = withBreakfast ? RATES.comCafe : RATES.semCafe;

  // 2. Galeria
  const [currentCategory, setCurrentCategory] = useState<'quartos' | 'piscina' | 'comida-cafe-almoco'>('quartos');
  const [itemsShown, setItemsShown] = useState(8);

  const images = IMAGES[currentCategory] || [];
  const visibleImages = images.slice(0, itemsShown);

  // 3. Depoimentos
  const [currentReviewIdx, setCurrentReviewIdx] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentReviewIdx((prev) => (prev + 1) % REVIEWS.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  // 4. FAQ
  const [activeFaqIdx, setActiveFaqIdx] = useState<number | null>(null);
  const toggleFaq = (idx: number) => setActiveFaqIdx((prev) => (prev === idx ? null : idx));

  // 5. Lightbox
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIdx, setLightboxIdx] = useState(0);

  const openLightbox = (idx: number) => {
    setLightboxIdx(idx);
    setLightboxOpen(true);
  };

  const navigateLightbox = useCallback(
    (direction: number, e?: React.MouseEvent) => {
      e?.stopPropagation();
      setLightboxIdx((prev) => {
        const next = prev + direction;
        if (next < 0) return images.length - 1;
        if (next >= images.length) return 0;
        return next;
      });
    },
    [images.length],
  );

  useEffect(() => {
    if (!lightboxOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') navigateLightbox(-1);
      if (e.key === 'ArrowRight') navigateLightbox(1);
      if (e.key === 'Escape') setLightboxOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    // Trava o scroll do fundo enquanto a foto está aberta.
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [lightboxOpen, navigateLightbox]);

  // 6. Menu mobile
  const [menuOpen, setMenuOpen] = useState(false);

  // 7. Seção ativa no menu
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      let current = 'home';
      for (const sectionId of SECTIONS) {
        const el = document.getElementById(sectionId);
        if (el && el.getBoundingClientRect().top <= 140) current = sectionId;
      }
      setActiveSection(current);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 8. Tracking: captura origem do tráfego uma vez no boot.
  useEffect(() => {
    captureTracking();
  }, []);

  const lightboxImage = images[lightboxIdx];

  return (
    <div className="app-root">
      {/* Header / Navbar */}
      <header className="navbar">
        <div className="nav-container">
          <a href="#home" className="logo" aria-label="Pousada Restaurante Fênix — início">
            <img
              src="logo.png"
              alt="Pousada Restaurante Fênix"
              className="logo-img"
              width={879}
              height={356}
            />
          </a>

          <nav className="nav-menu" aria-label="Navegação principal">
            {NAV_LINKS.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                className={`nav-link ${activeSection === link.id ? 'active' : ''}`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="nav-cta">
            <a
              href={waLink('Olá! Vim pelo site da Pousada Fênix e gostaria de fazer uma reserva.')}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary btn-sm"
              onClick={() => trackWhatsappClick('header')}
            >
              <i className="fa-brands fa-whatsapp" aria-hidden="true"></i> Reservar
            </a>
            <button
              type="button"
              className="nav-toggle"
              aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              onClick={() => setMenuOpen((prev) => !prev)}
            >
              <i className={`fa-solid ${menuOpen ? 'fa-xmark' : 'fa-bars'}`} aria-hidden="true"></i>
            </button>
          </div>
        </div>

        {/* Menu mobile */}
        <nav
          id="mobile-menu"
          className={`mobile-menu ${menuOpen ? 'open' : ''}`}
          aria-label="Navegação mobile"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              className={`mobile-menu-link ${activeSection === link.id ? 'active' : ''}`}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </nav>
      </header>

      {/* Hero */}
      <section id="home" className="hero">
        <div className="hero-bg-overlay"></div>
        <div className="hero-content">
          <span className="hero-badge">
            <i className="fa-solid fa-umbrella-beach" aria-hidden="true"></i> A apenas 300m do mar 🌊
          </span>
          <h1 className="hero-title">Pousada a 300m do mar em Praia de Leste</h1>
          <p className="hero-subtitle">
            Suítes climatizadas, piscina externa e churrascaria própria em Pontal do Paraná. Reserve
            direto com a gente pelo WhatsApp, sem taxa de intermediação.
          </p>
          <div className="hero-actions">
            <a
              href={waLink('Olá! Vim pelo site da Pousada Fênix e quero consultar disponibilidade e valores.')}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary btn-lg"
              onClick={() => trackWhatsappClick('hero')}
            >
              <i className="fa-brands fa-whatsapp" aria-hidden="true"></i> Reservar no WhatsApp
            </a>
            <a href="#suites" className="btn btn-secondary btn-lg">
              Ver Suítes e Tarifas
            </a>
          </div>
        </div>
        <div className="hero-scroll-indicator">
          <a href="#sobre" aria-label="Ir para a seção Sobre">
            <i className="fa-solid fa-chevron-down" aria-hidden="true"></i>
          </a>
        </div>
        <div className="hero-wave" aria-hidden="true">
          <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path
              d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V0C26.9,8.75,57.05,18.3,87.43,26.79,166.42,48.81,248.8,69.93,321.39,56.44Z"
              className="shape-fill"
            ></path>
          </svg>
        </div>
      </section>

      {/* Sobre */}
      <section id="sobre" className="section sobre">
        <div className="container grid grid-2">
          <div className="sobre-img-wrapper">
            <div className="image-box">
              <img
                src="fotos-fenix/piscina/pousada-fenix-litoral-pr-piscina-ao-ar-livre-1.jpg"
                alt="Piscina externa da Pousada Fênix em Praia de Leste"
                className="main-img"
                width={576}
                height={768}
                loading="lazy"
                decoding="async"
              />
              <div className="experience-badge">
                <span className="number">25</span>
                <span className="text">Suítes Climatizadas</span>
              </div>
            </div>
          </div>
          <div className="sobre-info">
            <span className="section-badge">Sobre Nós</span>
            <h2 className="section-title">O equilíbrio perfeito para suas férias no litoral</h2>
            <p className="section-text">
              Na Pousada Fênix, oferecemos uma experiência acolhedora que fará você se sentir em
              casa. Com uma administração familiar dedicada e atenciosa, nosso foco é garantir o seu
              descanso total a poucos passos da praia.
            </p>
            <div className="features-list">
              <div className="feature-item">
                <i className="fa-solid fa-umbrella-beach" aria-hidden="true"></i>
                <div>
                  <h3>Pertinho do Mar</h3>
                  <p>Estamos a apenas 300 metros da praia, uma curta caminhada de 4 minutos.</p>
                </div>
              </div>
              <div className="feature-item">
                <i className="fa-solid fa-utensils" aria-hidden="true"></i>
                <div>
                  <h3>Restaurante Integrado</h3>
                  <p>Delicie-se com a nossa churrascaria e parrilla integrada, servindo pratos excelentes.</p>
                </div>
              </div>
              <div className="feature-item">
                <i className="fa-solid fa-swimming-pool" aria-hidden="true"></i>
                <div>
                  <h3>Piscina &amp; Lazer</h3>
                  <p>Piscina externa sempre limpa e área com mesas para socializar e relaxar.</p>
                </div>
              </div>
            </div>
            <a
              href={waLink('Olá! Vim pelo site da Pousada Fênix e quero saber mais sobre a pousada.')}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
              onClick={() => trackWhatsappClick('sobre')}
            >
              <i className="fa-brands fa-whatsapp" aria-hidden="true"></i> Tirar dúvidas no WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* Suítes */}
      <section id="suites" className="section suites">
        <div className="container text-center">
          <span className="section-badge">Nossas Suítes</span>
          <h2 className="section-title">Acomodações sob medida para você</h2>
          <p className="section-subtitle">
            Selecione opções com ou sem café da manhã para simular tarifas exclusivas.
          </p>

          <div className="toggle-container">
            <span className={`toggle-label sem-cafe ${!withBreakfast ? 'active' : ''}`}>Sem Café da Manhã</span>
            <label className="switch">
              <input
                type="checkbox"
                checked={withBreakfast}
                onChange={(e) => setWithBreakfast(e.target.checked)}
                aria-label="Incluir café da manhã nas tarifas"
              />
              <span className="slider round"></span>
            </label>
            <span className={`toggle-label com-cafe ${withBreakfast ? 'active' : ''}`}>Com Café da Manhã</span>
          </div>

          <div className="suites-grid">
            {/* Suíte 1 */}
            <div className="suite-card">
              <div className="suite-img-container">
                <img
                  src="fotos-fenix/quartos/pousada-fenix-praia-de-leste-suite-hidromassagem-jacuzzi.jpeg"
                  alt="Suíte com banheira de hidromassagem da Pousada Fênix"
                  width={1200}
                  height={1600}
                  loading="lazy"
                  decoding="async"
                />
                <span className="suite-badge">Premium</span>
              </div>
              <div className="suite-info">
                <h3>Suíte com Hidromassagem</h3>
                <p className="suite-desc">
                  Perfeita para casais. Privacidade, banheira de hidromassagem privativa e enxoval
                  especial para momentos relaxantes.
                </p>
                <ul className="suite-amenities">
                  <li><i className="fa-solid fa-user-friends" aria-hidden="true"></i> 2 Adultos</li>
                  <li><i className="fa-solid fa-bath" aria-hidden="true"></i> Hidromassagem</li>
                  <li><i className="fa-solid fa-snowflake" aria-hidden="true"></i> Ar-condicionado</li>
                  <li><i className="fa-solid fa-tv" aria-hidden="true"></i> Smart TV</li>
                  <li><i className="fa-solid fa-wind" aria-hidden="true"></i> Secador (Quarto 8)</li>
                </ul>
                <div className="suite-pricing">
                  <span className="price-prefix">A partir de</span>
                  <span className="price">{tarifas.hidro}</span>
                  <span className="price-suffix">/ diária</span>
                </div>
                <a
                  href={waLink(`Olá! Vim pelo site e quero reservar a Suíte com Hidromassagem (${cafeLabel}).`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline-primary btn-block"
                  onClick={() => trackWhatsappClick('suite-hidromassagem', { suite: 'Suíte com Hidromassagem', cafe_da_manha: withBreakfast })}
                >
                  Consultar Disponibilidade
                </a>
              </div>
            </div>

            {/* Suíte 2 */}
            <div className="suite-card">
              <div className="suite-img-container">
                <img
                  src="fotos-fenix/quartos/pousada-fenix-litoral-pr-suite-hidromassagem-jacuzzi-4.jpg"
                  alt="Suíte Família com cama de casal e solteiro da Pousada Fênix"
                  loading="lazy"
                  decoding="async"
                />
                <span className="suite-badge">Recomendado</span>
              </div>
              <div className="suite-info">
                <h3>Suíte Família</h3>
                <p className="suite-desc">
                  Ideal para famílias pequenas. Espaço aconchegante com cama de casal e solteiro com
                  ótima ventilação.
                </p>
                <ul className="suite-amenities">
                  <li><i className="fa-solid fa-user-friends" aria-hidden="true"></i> 2 Hóspedes + 1 Criança</li>
                  <li><i className="fa-solid fa-snowflake" aria-hidden="true"></i> Ar-condicionado</li>
                  <li><i className="fa-solid fa-tv" aria-hidden="true"></i> Smart TV</li>
                  <li><i className="fa-solid fa-wifi" aria-hidden="true"></i> Wi-Fi Grátis</li>
                  <li><i className="fa-solid fa-baby" aria-hidden="true"></i> Crianças até 5a grátis</li>
                </ul>
                <div className="suite-pricing">
                  <span className="price-prefix">A partir de</span>
                  <span className="price">{tarifas.familia}</span>
                  <span className="price-suffix">/ diária</span>
                </div>
                <a
                  href={waLink(`Olá! Vim pelo site e quero reservar a Suíte Família (${cafeLabel}).`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline-primary btn-block"
                  onClick={() => trackWhatsappClick('suite-familia', { suite: 'Suíte Família', cafe_da_manha: withBreakfast })}
                >
                  Consultar Disponibilidade
                </a>
              </div>
            </div>

            {/* Suíte 3 */}
            <div className="suite-card">
              <div className="suite-img-container">
                <img
                  src="fotos-fenix/quartos/pousada-fenix-litoral-pr-suite-hidromassagem-jacuzzi-5.jpg"
                  alt="Suíte Familiar para até 5 hóspedes da Pousada Fênix"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="suite-info">
                <h3>Suíte Familiar</h3>
                <p className="suite-desc">
                  Ideal para grupos médios. Conforto compartilhado em um espaço amplo com camas
                  planejadas.
                </p>
                <ul className="suite-amenities">
                  <li><i className="fa-solid fa-users" aria-hidden="true"></i> Até 5 Hóspedes</li>
                  <li><i className="fa-solid fa-snowflake" aria-hidden="true"></i> Ar-condicionado</li>
                  <li><i className="fa-solid fa-tv" aria-hidden="true"></i> Smart TV</li>
                  <li><i className="fa-solid fa-mattress-pillow" aria-hidden="true"></i> Cama de Casal + Beliche</li>
                  <li><i className="fa-solid fa-kitchen-set" aria-hidden="true"></i> Frigobar</li>
                </ul>
                <div className="suite-pricing">
                  <span className="price-prefix">A partir de</span>
                  <span className="price">{tarifas.familiar}</span>
                  <span className="price-suffix">/ diária</span>
                </div>
                <a
                  href={waLink(`Olá! Vim pelo site e quero reservar a Suíte Familiar (${cafeLabel}).`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline-primary btn-block"
                  onClick={() => trackWhatsappClick('suite-familiar', { suite: 'Suíte Familiar', cafe_da_manha: withBreakfast })}
                >
                  Consultar Disponibilidade
                </a>
              </div>
            </div>

            {/* Suíte 4 */}
            <div className="suite-card">
              <div className="suite-img-container">
                <img
                  src="fotos-fenix/quartos/pousada-fenix-pontal-do-parana-decoracao-cama-casal-cisnes.jpeg"
                  alt="Suíte para grupos com duas camas de casal e beliches na Pousada Fênix"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="suite-info">
                <h3>Suíte Grupo (Quarto 2)</h3>
                <p className="suite-desc">
                  Ampla suíte familiar equipada com 2 camas de casal e 2 beliches, ideal para grandes
                  grupos e excursões.
                </p>
                <ul className="suite-amenities">
                  <li><i className="fa-solid fa-users" aria-hidden="true"></i> Até 7 Hóspedes</li>
                  <li><i className="fa-solid fa-snowflake" aria-hidden="true"></i> Ar-condicionado</li>
                  <li><i className="fa-solid fa-tv" aria-hidden="true"></i> Smart TV</li>
                  <li><i className="fa-solid fa-bed" aria-hidden="true"></i> 2 Casal + 2 Beliches</li>
                  <li><i className="fa-solid fa-wifi" aria-hidden="true"></i> Wi-Fi de alta velocidade</li>
                </ul>
                <div className="suite-pricing">
                  <span className="price-prefix">Consulte tarifas</span>
                  <span className="price price-sm">Sob Consulta</span>
                </div>
                <a
                  href={waLink('Olá! Vim pelo site e quero consultar preços para a Suíte Grupo (Quarto 2).')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline-primary btn-block"
                  onClick={() => trackWhatsappClick('suite-grupo', { suite: 'Suíte Grupo (Quarto 2)' })}
                >
                  Solicitar Cotação
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Galeria */}
      <section id="galeria" className="section galeria">
        <div className="container">
          <div className="text-center">
            <span className="section-badge">Galeria de Fotos</span>
            <h2 className="section-title">Explore as fotos da nossa pousada</h2>
            <p className="section-subtitle">
              Clique nas categorias abaixo para navegar pelas imagens reais das nossas instalações.
            </p>
          </div>

          <div className="gallery-tabs" role="tablist" aria-label="Categorias da galeria">
            {([
              ['quartos', 'Quartos & Suítes'],
              ['piscina', 'Piscina & Lazer'],
              ['comida-cafe-almoco', 'Restaurante & Café'],
            ] as const).map(([key, label]) => (
              <button
                key={key}
                type="button"
                role="tab"
                aria-selected={currentCategory === key}
                className={`tab-btn ${currentCategory === key ? 'active' : ''}`}
                onClick={() => {
                  setCurrentCategory(key);
                  setItemsShown(8);
                }}
              >
                {label}
              </button>
            ))}
          </div>

          <div className="gallery-grid" id="galleryGrid">
            {visibleImages.map((imgName, i) => {
              const caption = formatCaption(imgName);
              return (
                <button
                  type="button"
                  className="gallery-item"
                  key={imgName}
                  onClick={() => openLightbox(i)}
                  aria-label={`Ampliar foto: ${caption}`}
                >
                  <img
                    src={`fotos-fenix/${currentCategory}/${imgName}`}
                    alt={caption}
                    loading="lazy"
                    decoding="async"
                  />
                  <span className="gallery-overlay">
                    <i className="fa-solid fa-magnifying-glass-plus" aria-hidden="true"></i>
                  </span>
                </button>
              );
            })}
          </div>

          {itemsShown < images.length && (
            <div className="text-center mt-4">
              <button
                type="button"
                id="btnShowMore"
                className="btn btn-primary"
                onClick={() => setItemsShown((prev) => prev + 8)}
              >
                Mostrar Mais
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Depoimentos */}
      <section id="depoimentos" className="section depoimentos">
        <div className="container text-center">
          <span className="section-badge">Depoimentos</span>
          <h2 className="section-title">O que dizem os nossos hóspedes</h2>

          <div className="reviews-slider">
            {REVIEWS.map((rev, i) => (
              <div className={`review-card ${i === currentReviewIdx ? 'active' : ''}`} key={rev.author}>
                <div className="review-stars" aria-label={`${rev.stars} de 5 estrelas`}>
                  {[...Array(rev.stars)].map((_, s) => (
                    <i className="fa-solid fa-star" key={s} aria-hidden="true"></i>
                  ))}
                </div>
                <p className="review-text">{rev.text}</p>
                <h3 className="review-author">{rev.author}</h3>
                <span className="review-source">{rev.source}</span>
              </div>
            ))}
          </div>

          <div className="review-dots">
            {REVIEWS.map((rev, i) => (
              <button
                type="button"
                className={`dot ${i === currentReviewIdx ? 'active' : ''}`}
                key={rev.author}
                onClick={() => setCurrentReviewIdx(i)}
                aria-label={`Ver depoimento de ${rev.author}`}
              ></button>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="section faq">
        <div className="container">
          <div className="text-center">
            <span className="section-badge">FAQ</span>
            <h2 className="section-title">Dúvidas Frequentes</h2>
            <p className="section-subtitle">
              Encontre respostas rápidas para as principais perguntas sobre a sua estadia na Pousada
              Fênix.
            </p>
          </div>

          <div className="faq-accordion">
            {FAQS.map((faq, i) => (
              <div className={`faq-item ${activeFaqIdx === i ? 'active' : ''}`} key={faq.question}>
                <h3>
                  <button
                    type="button"
                    className="faq-question"
                    onClick={() => toggleFaq(i)}
                    aria-expanded={activeFaqIdx === i}
                    aria-controls={`faq-answer-${i}`}
                  >
                    <span>{faq.question}</span>
                    <i className="fa-solid fa-chevron-down faq-icon" aria-hidden="true"></i>
                  </button>
                </h3>
                <div className="faq-answer" id={`faq-answer-${i}`} role="region">
                  <p>{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="faq-cta text-center">
            <p>Ficou com alguma dúvida que não está aqui?</p>
            <a
              href={waLink('Olá! Vim pelo site da Pousada Fênix e tenho uma dúvida sobre a hospedagem.')}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary btn-lg"
              onClick={() => trackWhatsappClick('faq')}
            >
              <i className="fa-brands fa-whatsapp" aria-hidden="true"></i> Falar com a recepção
            </a>
          </div>
        </div>
      </section>

      {/* Contato */}
      <section id="contato" className="section contato">
        <div className="container grid grid-2">
          <div className="contato-info">
            <span className="section-badge">Fale Conosco</span>
            <h2 className="section-title">Estamos prontos para receber você</h2>
            <p className="section-text">
              Deseja fazer uma reserva direta ou tirar alguma dúvida? Entre em contato pelos canais
              abaixo ou envie uma mensagem no WhatsApp.
            </p>

            <div className="contact-details">
              <div className="contact-item">
                <i className="fa-solid fa-phone" aria-hidden="true"></i>
                <div>
                  <h3>WhatsApp / Telefone</h3>
                  <p>
                    <a
                      href={waLink('Olá! Vim pelo site da Pousada Fênix e gostaria de falar com vocês.')}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => trackWhatsappClick('contato')}
                    >
                      +55 41 98904-7277
                    </a>
                  </p>
                </div>
              </div>
              <div className="contact-item">
                <i className="fa-solid fa-envelope" aria-hidden="true"></i>
                <div>
                  <h3>E-mail de Suporte</h3>
                  <p>
                    <a href="mailto:fenixpousadaerestaurante@gmail.com">
                      fenixpousadaerestaurante@gmail.com
                    </a>
                  </p>
                </div>
              </div>
              <div className="contact-item">
                <i className="fa-solid fa-location-dot" aria-hidden="true"></i>
                <div>
                  <h3>Nosso Endereço</h3>
                  <p>Al. Paranaguá, 1310 - Praia de Leste, Pontal do Paraná - PR</p>
                </div>
              </div>
              <div className="contact-item">
                <i className="fa-regular fa-clock" aria-hidden="true"></i>
                <div>
                  <h3>Check-in e Check-out</h3>
                  <p>Check-in das 14h às 22h · Check-out das 09h às 12h</p>
                </div>
              </div>
            </div>

            <div className="social-links">
              <a
                href="https://www.facebook.com/fenixpousada/?locale=pt_BR"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon"
                aria-label="Facebook da Pousada Fênix"
              >
                <i className="fa-brands fa-facebook" aria-hidden="true"></i>
              </a>
              <a
                href="https://www.instagram.com/fenixpousadaerestaurante/"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon"
                aria-label="Instagram da Pousada Fênix"
              >
                <i className="fa-brands fa-instagram" aria-hidden="true"></i>
              </a>
            </div>
          </div>

          <div className="contato-mapa">
            <iframe
              src="https://www.google.com/maps?q=Al.+Paranagu%C3%A1,+1310+-+Praia+de+Leste,+Pontal+do+Paran%C3%A1+-+PR&output=embed"
              style={{ border: 0, width: '100%', height: '100%', minHeight: '380px', borderRadius: '18px' }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Localização da Pousada Fênix no Google Maps"
            ></iframe>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer>
        <div className="container footer-grid">
          <div className="footer-brand">
            <img
              src="logo.png"
              alt="Pousada Restaurante Fênix"
              className="footer-logo"
              width={879}
              height={356}
              loading="lazy"
            />
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
            <p><i className="fa-solid fa-phone" aria-hidden="true"></i> +55 41 98904-7277</p>
            <p><i className="fa-solid fa-envelope" aria-hidden="true"></i> fenixpousadaerestaurante@gmail.com</p>
            <p><i className="fa-solid fa-location-dot" aria-hidden="true"></i> Al. Paranaguá, 1310 - Pontal do Paraná/PR</p>
          </div>
        </div>
        <div className="container footer-bottom text-center">
          <p>&copy; 2026 Pousada Restaurante Fênix. Todos os direitos reservados. Praia de Leste, PR.</p>
          <p className="footer-signature">
            Desenvolvido por:{' '}
            <a href="https://atualizeguest.com.br" target="_blank" rel="noopener noreferrer">
              R. C. e Publicidade Ltda- 31.385.532/0001-18 - atualizeguest.com.br
            </a>
          </p>
        </div>
      </footer>

      {/* CTA fixo mobile */}
      <div className="sticky-cta">
        <a
          href={waLink('Olá! Vim pelo site da Pousada Fênix e quero consultar disponibilidade.')}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-primary btn-block"
          onClick={() => trackWhatsappClick('sticky-mobile')}
        >
          <i className="fa-brands fa-whatsapp" aria-hidden="true"></i> Reservar no WhatsApp
        </a>
      </div>

      {/* Lightbox */}
      {lightboxOpen && lightboxImage && (
        <div
          id="lightbox"
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label="Visualização ampliada da foto"
          onClick={() => setLightboxOpen(false)}
        >
          <button
            type="button"
            className="close-lightbox"
            aria-label="Fechar"
            onClick={() => setLightboxOpen(false)}
          >
            &times;
          </button>
          <img
            className="lightbox-content"
            src={`fotos-fenix/${currentCategory}/${lightboxImage}`}
            alt={formatCaption(lightboxImage)}
            onClick={(e) => e.stopPropagation()}
          />
          <div className="lightbox-caption">
            {formatCaption(lightboxImage)} ({lightboxIdx + 1}/{images.length})
          </div>
          <button
            type="button"
            className="prev-lightbox"
            aria-label="Foto anterior"
            onClick={(e) => navigateLightbox(-1, e)}
          >
            &#10094;
          </button>
          <button
            type="button"
            className="next-lightbox"
            aria-label="Próxima foto"
            onClick={(e) => navigateLightbox(1, e)}
          >
            &#10095;
          </button>
        </div>
      )}
    </div>
  );
}
