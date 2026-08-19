/**
 * Dados das suítes — cada card monta o carrossel a partir de `fotos`.
 *
 * ATENÇÃO: a distribuição das fotos por suíte foi inferida pelo nome dos
 * arquivos (jacuzzi, quarto-familia, ar-condicionado...). A pousada precisa
 * confirmar quais fotos pertencem de fato a cada acomodação antes de virar
 * material de campanha — foto de quarto errado no anúncio gera reclamação.
 */

export type RateKey = 'hidro' | 'familia' | 'familiar' | 'grupo';

export interface Suite {
  id: string;
  nome: string;
  badge?: string;
  descricao: string;
  comodidades: { icone: string; texto: string }[];
  /** Chave da tabela de tarifas; ausente = "Sob Consulta". */
  tarifa?: RateKey;
  ctaLabel: string;
  /** Mensagem do WhatsApp; `%CAFE%` é trocado pela opção de café escolhida. */
  mensagem: string;
  fotos: { arquivo: string; alt: string }[];
  tabelaPrecos?: { hospedes: number; semCafe: string; comCafe: string }[];
}

const Q = 'fotos-fenix/quartos/';

export const SUITES: Suite[] = [
  {
    id: 'suite-hidromassagem',
    nome: 'Suíte Queen com Banheira de Hidromassagem',
    badge: 'Premium',
    descricao:
      'Perfeita para casais. Oferece privacidade total, cama de casal grande, banheira de hidromassagem privativa, ar-condicionado, TV de tela plana com serviços de streaming e frigobar. Tamanho de 20 m².',
    comodidades: [
      { icone: 'fa-compress', texto: 'Tamanho: 20 m²' },
      { icone: 'fa-bed', texto: '1 cama de casal grande' },
      { icone: 'fa-bath', texto: 'Banheira de Hidromassagem' },
      { icone: 'fa-snowflake', texto: 'Ar-condicionado' },
      { icone: 'fa-tv', texto: 'Smart TV e Frigobar' },
      { icone: 'fa-wifi', texto: 'WiFi Gratuito' },
    ],
    tarifa: 'hidro',
    ctaLabel: 'Consultar Disponibilidade',
    mensagem: 'Olá! Vim pelo site e quero reservar a Suíte Queen com Banheira de Hidromassagem (%CAFE%).',
    fotos: [
      { arquivo: Q + 'pousada-fenix-suite-hidromassagem-cama-1.png', alt: 'Cama de casal da suíte com hidromassagem da Pousada Fênix' },
      { arquivo: Q + 'pousada-fenix-suite-hidromassagem-banheira-1.png', alt: 'Banheira de hidromassagem com espuma e TV Netflix ligada' },
      { arquivo: Q + 'pousada-fenix-suite-hidromassagem-banheira-2.jpg', alt: 'Pia do banheiro e banheira de hidromassagem' },
      { arquivo: Q + 'pousada-fenix-suite-hidromassagem-cama-2.png', alt: 'Cama de casal vista com espelho decorativo' },
      { arquivo: Q + 'pousada-fenix-suite-hidromassagem-banheiro-1.png', alt: 'Banheiro privativo com box de vidro e chuveiro' },
    ],
    tabelaPrecos: [
      { hospedes: 1, semCafe: 'R$ 240', comCafe: 'R$ 265' },
      { hospedes: 2, semCafe: 'R$ 300', comCafe: 'R$ 350' },
    ],
  },
  {
    id: 'suite-familia',
    nome: 'Suíte Família Deluxe',
    badge: 'Recomendado',
    descricao:
      'Perfeita para famílias pequenas. A suíte de 20 m² oferece 1 cama de casal e 1 de solteiro (confortáveis, nota 7,3). Conta com ar-condicionado, TV de tela plana com streaming (Netflix), frigobar, banheiro privativo e área para refeições ao ar livre.',
    comodidades: [
      { icone: 'fa-compress', texto: 'Tamanho: 20 m²' },
      { icone: 'fa-bed', texto: '1 cama casal + 1 solteiro' },
      { icone: 'fa-snowflake', texto: 'Ar-condicionado' },
      { icone: 'fa-tv', texto: 'TV Smart c/ Streaming' },
      { icone: 'fa-kitchen-set', texto: 'Frigobar e Refeição Externa' },
      { icone: 'fa-wifi', texto: 'WiFi Gratuito' },
    ],
    tarifa: 'familia',
    ctaLabel: 'Consultar Disponibilidade',
    mensagem: 'Olá! Vim pelo site e quero reservar a Suíte Família Deluxe (%CAFE%).',
    fotos: [
      { arquivo: Q + 'pousada-fenix-suite-familia-deluxe-cama-1.png', alt: 'Suíte Família Deluxe - Cama de casal, solteiro e frigobar' },
      { arquivo: Q + 'pousada-fenix-suite-familia-deluxe-cama-2.png', alt: 'Suíte Família Deluxe - Estante de madeira, Smart TV e espelho' },
      { arquivo: Q + 'pousada-fenix-suite-familia-deluxe-cama-3.png', alt: 'Suíte Família Deluxe - Camas, ar-condicionado e cortinas' },
      { arquivo: Q + 'pousada-fenix-suite-familia-deluxe-banheiro-1.png', alt: 'Suíte Família Deluxe - Banheiro privativo com pia e box de vidro' },
      { arquivo: Q + 'pousada-fenix-suite-familia-deluxe-cama-4.png', alt: 'Suíte Família Deluxe - Configuração alternativa com camas arrumadas' },
    ],
    tabelaPrecos: [
      { hospedes: 2, semCafe: 'R$ 238', comCafe: 'R$ 288' },
      { hospedes: 3, semCafe: 'R$ 350', comCafe: 'R$ 425' },
    ],
  },
  {
    id: 'suite-familiar',
    nome: 'Quarto Família com Banheiro Privativo',
    descricao:
      'Espaço conjugado de 25 m² perfeito para grupos e famílias. Oferece ar-condicionado, TV de tela plana com streaming (Netflix), geladeira, banheiro privativo e área para refeições ao ar livre. Camas confortáveis (nota 7,3).',
    comodidades: [
      { icone: 'fa-compress', texto: 'Tamanho: 25 m²' },
      { icone: 'fa-bed', texto: '2 camas de casal e 2 beliches' },
      { icone: 'fa-snowflake', texto: 'Ar-condicionado' },
      { icone: 'fa-tv', texto: 'TV Smart c/ Streaming' },
      { icone: 'fa-kitchen-set', texto: 'Geladeira e Mesa de Refeição' },
      { icone: 'fa-wifi', texto: 'WiFi Gratuito' },
    ],
    tarifa: 'familiar',
    ctaLabel: 'Consultar Disponibilidade',
    mensagem: 'Olá! Vim pelo site e quero reservar o Quarto Família com Banheiro Privativo (%CAFE%).',
    fotos: [
      { arquivo: Q + 'pousada-fenix-quarto-familia-privativo-cama-1.png', alt: 'Quarto Família - Vista das camas de casal e beliche' },
      { arquivo: Q + 'pousada-fenix-quarto-familia-privativo-cama-2.png', alt: 'Quarto Família - Beliche, TV e ventilador de parede' },
      { arquivo: Q + 'pousada-fenix-quarto-familia-privativo-cama-3.png', alt: 'Quarto Família - Outro ambiente com camas e ar-condicionado' },
      { arquivo: Q + 'pousada-fenix-quarto-familia-privativo-refeicao.png', alt: 'Quarto Família - Entrada com geladeira e cabideiros de toalha' },
      { arquivo: Q + 'pousada-fenix-quarto-familia-privativo-banheiro.png', alt: 'Quarto Família - Banheiro privativo limpo com box de vidro' },
    ],
    tabelaPrecos: [
      { hospedes: 4, semCafe: 'R$ 525', comCafe: 'R$ 625' },
      { hospedes: 5, semCafe: 'R$ 602', comCafe: 'R$ 727' },
      { hospedes: 6, semCafe: 'R$ 700', comCafe: 'R$ 850' },
    ],
  },
  {
    id: 'suite-grupo',
    nome: 'Quarto Família Standard',
    descricao:
      'Espaço amplo de 25 m² ideal para famílias e grupos. Oferece vista do pátio interno, ar-condicionado, TV de tela plana com streaming (Netflix), frigobar e banheiro privativo. A unidade conta com 2 camas de solteiro, 1 cama de casal e 1 beliche.',
    comodidades: [
      { icone: 'fa-compress', texto: 'Tamanho: 25 m²' },
      { icone: 'fa-bed', texto: '1 cama casal, 2 solteiro e 1 beliche' },
      { icone: 'fa-snowflake', texto: 'Ar-condicionado' },
      { icone: 'fa-tv', texto: 'TV Smart e Frigobar' },
      { icone: 'fa-tree', texto: 'Vista do pátio interno' },
      { icone: 'fa-wifi', texto: 'WiFi Gratuito' },
    ],
    tarifa: 'grupo',
    ctaLabel: 'Consultar Disponibilidade',
    mensagem: 'Olá! Vim pelo site e quero reservar o Quarto Família Standard (%CAFE%).',
    fotos: [
      { arquivo: Q + 'pousada-fenix-pontal-do-parana-decoracao-cama-casal-cisnes.webp', alt: 'Quarto Família Standard - Cama de casal decorada' },
      { arquivo: Q + 'pousada-fenix-suite-casal-1.webp', alt: 'Quarto Família Standard - Ambiente amplo com beliche e camas' },
      { arquivo: Q + 'pousada-fenix-suite-casal-3.webp', alt: 'Quarto Família Standard - Vista das camas de solteiro adicionais' },
      { arquivo: Q + 'pousada-fenix-suite-casal-4.webp', alt: 'Quarto Família Standard - Janela e área de circulação' },
      { arquivo: Q + 'pousada-fenix-suite-casal-5.webp', alt: 'Quarto Família Standard - Armário e frigobar do quarto' },
    ],
    tabelaPrecos: [
      { hospedes: 3, semCafe: 'R$ 350', comCafe: 'R$ 425' },
      { hospedes: 4, semCafe: 'R$ 469', comCafe: 'R$ 569' },
      { hospedes: 5, semCafe: 'R$ 588', comCafe: 'R$ 713' },
      { hospedes: 6, semCafe: 'R$ 700', comCafe: 'R$ 850' },
    ],
  },
];
