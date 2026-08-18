/**
 * Dados das suítes — cada card monta o carrossel a partir de `fotos`.
 *
 * ATENÇÃO: a distribuição das fotos por suíte foi inferida pelo nome dos
 * arquivos (jacuzzi, quarto-familia, ar-condicionado...). A pousada precisa
 * confirmar quais fotos pertencem de fato a cada acomodação antes de virar
 * material de campanha — foto de quarto errado no anúncio gera reclamação.
 */

export type RateKey = 'hidro' | 'familia' | 'familiar';

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
}

const Q = 'fotos-fenix/quartos/';

export const SUITES: Suite[] = [
  {
    id: 'suite-hidromassagem',
    nome: 'Suíte com Hidromassagem',
    badge: 'Premium',
    descricao:
      'Perfeita para casais. Privacidade, banheira de hidromassagem privativa e enxoval especial para momentos relaxantes.',
    comodidades: [
      { icone: 'fa-user-friends', texto: '2 Adultos' },
      { icone: 'fa-bath', texto: 'Hidromassagem' },
      { icone: 'fa-snowflake', texto: 'Ar-condicionado' },
      { icone: 'fa-tv', texto: 'Smart TV' },
      { icone: 'fa-wind', texto: 'Secador (Quarto 8)' },
    ],
    tarifa: 'hidro',
    ctaLabel: 'Consultar Disponibilidade',
    mensagem: 'Olá! Vim pelo site e quero reservar a Suíte com Hidromassagem (%CAFE%).',
    fotos: [
      { arquivo: Q + 'pousada-fenix-praia-de-leste-suite-hidromassagem-jacuzzi.webp', alt: 'Banheira de hidromassagem da suíte premium da Pousada Fênix' },
      { arquivo: Q + 'pousada-fenix-litoral-pr-suite-hidromassagem-jacuzzi-3.webp', alt: 'Suíte com hidromassagem vista do quarto' },
      { arquivo: Q + 'pousada-fenix-litoral-pr-suite-hidromassagem-jacuzzi-4.webp', alt: 'Cama de casal da suíte com hidromassagem' },
      { arquivo: Q + 'pousada-fenix-litoral-pr-suite-hidromassagem-jacuzzi-5.webp', alt: 'Detalhe da banheira de hidromassagem privativa' },
      { arquivo: Q + 'pousada-fenix-litoral-pr-suite-hidromassagem-jacuzzi-6.webp', alt: 'Ambiente da suíte com hidromassagem da Pousada Fênix' },
      { arquivo: Q + 'pousada-fenix-pontal-do-parana-banheiro-suite-box.webp', alt: 'Banheiro com box da suíte da Pousada Fênix' },
    ],
  },
  {
    id: 'suite-familia',
    nome: 'Suíte Família',
    badge: 'Recomendado',
    descricao:
      'Ideal para famílias pequenas. Espaço aconchegante com cama de casal e solteiro com ótima ventilação.',
    comodidades: [
      { icone: 'fa-user-friends', texto: '2 Hóspedes + 1 Criança' },
      { icone: 'fa-snowflake', texto: 'Ar-condicionado' },
      { icone: 'fa-tv', texto: 'Smart TV' },
      { icone: 'fa-wifi', texto: 'Wi-Fi Grátis' },
      { icone: 'fa-baby', texto: 'Crianças até 5a grátis' },
    ],
    tarifa: 'familia',
    ctaLabel: 'Consultar Disponibilidade',
    mensagem: 'Olá! Vim pelo site e quero reservar a Suíte Família (%CAFE%).',
    fotos: [
      { arquivo: Q + 'pousada-fenix-pontal-do-parana-quarto-familia-camas-solteiro.webp', alt: 'Suíte família com camas de solteiro da Pousada Fênix' },
      { arquivo: Q + 'pousada-fenix-praia-de-leste-quarto-casal-ar-condicionado-tv.webp', alt: 'Quarto de casal com ar-condicionado e Smart TV' },
      { arquivo: Q + 'pousada-fenix-pontal-do-parana-quartos-com-ar-condicionado-2.webp', alt: 'Quarto climatizado da Pousada Fênix' },
      { arquivo: Q + 'pousada-fenix-pontal-do-parana-quartos-com-ar-condicionado-3.webp', alt: 'Vista interna do quarto climatizado' },
      { arquivo: Q + 'pousada-fenix-praia-de-leste-suite-casal-vista-quarto.webp', alt: 'Suíte de casal vista do quarto' },
    ],
  },
  {
    id: 'suite-familiar',
    nome: 'Suíte Familiar',
    descricao:
      'Espaço amplo e confortável para até 5 hóspedes. Opções nos apartamentos Ap. 21, Ap. 25 e Quarto 26, com diversas configurações de camas, ar-condicionado e frigobar.',
    comodidades: [
      { icone: 'fa-users', texto: 'Até 5 Hóspedes (Ap. 21, 25 e 26)' },
      { icone: 'fa-snowflake', texto: 'Ar-condicionado' },
      { icone: 'fa-tv', texto: 'Smart TV' },
      { icone: 'fa-bed', texto: 'Casal + Viúva + Solteiro' },
      { icone: 'fa-kitchen-set', texto: 'Frigobar e Banheiro Privativo' },
      { icone: 'fa-wifi', texto: 'Wi-Fi Grátis' },
    ],
    tarifa: 'familiar',
    ctaLabel: 'Consultar Disponibilidade',
    mensagem: 'Olá! Vim pelo site e quero reservar a Suíte Familiar (%CAFE%).',
    fotos: [
      { arquivo: Q + 'pousada-fenix-ap-25-1.webp', alt: 'Ap. 25 - Suíte familiar para 5 pessoas (2 camas de casal + 1 solteiro)' },
      { arquivo: Q + 'pousada-fenix-ap-25-2.webp', alt: 'Ap. 25 - Quarto climatizado com Smart TV' },
      { arquivo: Q + 'pousada-fenix-ap-25-3.webp', alt: 'Ap. 25 - Vista das camas e conforto' },
      { arquivo: Q + 'pousada-fenix-ap-21-1.webp', alt: 'Ap. 21 - Suíte para 5 pessoas (1 cama casal, 1 viúva e 2 solteiro)' },
      { arquivo: Q + 'pousada-fenix-ap-21-2.webp', alt: 'Ap. 21 - Climatização, TV e frigobar' },
      { arquivo: Q + 'pousada-fenix-ap-21-3.webp', alt: 'Ap. 21 - Disposição de camas aconchegantes' },
      { arquivo: Q + 'pousada-fenix-ap-21-4.webp', alt: 'Ap. 21 - Banheiro privativo' },
      { arquivo: Q + 'pousada-fenix-quarto-26-1.webp', alt: 'Quarto 26 - Apartamento para até 5 pessoas climatizado' },
      { arquivo: Q + 'pousada-fenix-quarto-26-2.webp', alt: 'Quarto 26 - Cama de casal e Smart TV' },
      { arquivo: Q + 'pousada-fenix-quarto-26-3.webp', alt: 'Quarto 26 - Vista interna do quarto' },
      { arquivo: Q + 'pousada-fenix-quarto-26-4.webp', alt: 'Quarto 26 - Camas adicionais e ventilação' },
      { arquivo: Q + 'pousada-fenix-quarto-26-5.webp', alt: 'Quarto 26 - Banheiro privativo' },
      { arquivo: Q + 'pousada-fenix-quarto-26-6.webp', alt: 'Quarto 26 - Ambiente amplo para famílias' },
    ],
  },
  {
    id: 'suite-grupo',
    nome: 'Suíte Grupo (Quarto 2)',
    descricao:
      'Ampla suíte familiar equipada com 2 camas de casal e 2 beliches, ideal para grandes grupos e excursões.',
    comodidades: [
      { icone: 'fa-users', texto: 'Até 7 Hóspedes' },
      { icone: 'fa-snowflake', texto: 'Ar-condicionado' },
      { icone: 'fa-tv', texto: 'Smart TV' },
      { icone: 'fa-bed', texto: '2 Casal + 2 Beliches' },
      { icone: 'fa-wifi', texto: 'Wi-Fi de alta velocidade' },
    ],
    ctaLabel: 'Solicitar Cotação',
    mensagem: 'Olá! Vim pelo site e quero consultar preços para a Suíte Grupo (Quarto 2).',
    fotos: [
      { arquivo: Q + 'pousada-fenix-pontal-do-parana-decoracao-cama-casal-cisnes.webp', alt: 'Cama de casal com decoração de cisnes na suíte de grupo' },
      { arquivo: Q + 'pousada-fenix-suite-casal-1.webp', alt: 'Suíte ampla para grupos da Pousada Fênix' },
      { arquivo: Q + 'pousada-fenix-suite-casal-3.webp', alt: 'Camas da suíte para grupos da Pousada Fênix' },
      { arquivo: Q + 'pousada-fenix-suite-casal-4.webp', alt: 'Vista da suíte para grupos e excursões' },
      { arquivo: Q + 'pousada-fenix-suite-casal-5.webp', alt: 'Ambiente da suíte para grandes grupos' },
    ],
  },
];
