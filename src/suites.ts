/**
 * Dados das suítes — cada card monta o carrossel a partir de `fotos`.
 *
 * ATENÇÃO: a distribuição das fotos por suíte foi inferida pelo nome dos
 * arquivos (jacuzzi, quarto-familia, ar-condicionado...). A pousada precisa
 * confirmar quais fotos pertencem de fato a cada acomodação antes de virar
 * material de campanha — foto de quarto errado no anúncio gera reclamação.
 */

export type RateKey = 'ar' | 'ventilador' | 'hidro' | 'tripla' | 'familia' | 'economica';

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
    id: 'suite-ar-condicionado',
    nome: 'Suíte com Ar Condicionado',
    badge: 'Standard',
    descricao:
      'Suíte no térreo com cama de casal, frigobar e TV. (No Booking.com: Suíte / Suíte de 01 quarto - Quartos 11 e 17).',
    comodidades: [
      { icone: 'fa-compress', texto: 'Térreo' },
      { icone: 'fa-bed', texto: '1 cama de casal' },
      { icone: 'fa-snowflake', texto: 'Ar-condicionado' },
      { icone: 'fa-tv', texto: 'TV e Frigobar' },
      { icone: 'fa-shower', texto: 'Banheiro Privativo' },
      { icone: 'fa-wifi', texto: 'WiFi Gratuito' },
    ],
    tarifa: 'ar',
    ctaLabel: 'Consultar Disponibilidade',
    mensagem: 'Olá! Vim pelo site e quero reservar a Suíte com Ar Condicionado (%CAFE%).',
    fotos: [
      { arquivo: Q + 'pousada-fenix-suite-ar-condicionado-cama-1.png', alt: 'Suíte com Ar Condicionado - Cama de casal, TV e ar' },
      { arquivo: Q + 'pousada-fenix-suite-ar-condicionado-cama-2.png', alt: 'Suíte com Ar Condicionado - Cama vista de outro ângulo' },
      { arquivo: Q + 'pousada-fenix-suite-ar-condicionado-banheiro-1.png', alt: 'Suíte com Ar Condicionado - Banheiro privativo' },
    ],
    tabelaPrecos: [
      { hospedes: 2, semCafe: 'R$ 180', comCafe: 'R$ 230' },
    ],
  },
  {
    id: 'suite-ventilador',
    nome: 'Suíte com Ventilador',
    badge: 'Econômica',
    descricao:
      'Nossa opção mais em conta para casais no térreo. Equipado com cama de casal, ventilador, TV de tela plana, frigobar e banheiro privativo. (Esta suíte está disponível exclusivamente para reservas diretas e não se encontra no Booking.com).',
    comodidades: [
      { icone: 'fa-compress', texto: 'Térreo' },
      { icone: 'fa-bed', texto: '1 cama de casal' },
      { icone: 'fa-fan', texto: 'Ventilador' },
      { icone: 'fa-tv', texto: 'TV e Frigobar' },
      { icone: 'fa-shower', texto: 'Banheiro Privativo' },
      { icone: 'fa-wifi', texto: 'WiFi Gratuito' },
    ],
    tarifa: 'ventilador',
    ctaLabel: 'Consultar Disponibilidade',
    mensagem: 'Olá! Vim pelo site e quero reservar a Suíte com Ventilador (%CAFE%).',
    fotos: [
      { arquivo: Q + 'suite-ventilador-nova-1.jpg', alt: 'Suíte com Ventilador - Cama de casal, TV, frigobar e ventilador' },
      { arquivo: Q + 'suite-ventilador-nova-2.jpg', alt: 'Suíte com Ventilador - Banheiro privativo com box de vidro e chuveiro' },
      { arquivo: Q + 'suite-ventilador-nova-3.jpg', alt: 'Suíte com Ventilador - Vista do quarto e acesso ao banheiro' },
      { arquivo: Q + 'suite-ventilador-nova-4.jpg', alt: 'Suíte com Ventilador - Vista da porta de entrada, frigobar e estante' },
    ],
    tabelaPrecos: [
      { hospedes: 2, semCafe: 'R$ 130', comCafe: 'R$ 180' },
    ],
  },
  {
    id: 'suite-hidromassagem',
    nome: 'Suíte com Hidromassagem',
    badge: 'Premium',
    descricao:
      'Perfeita para casais no térreo. Oferece privacidade total, cama queen, banheira de hidromassagem privativa, ar-condicionado, TV smart e frigobar. (No Booking.com: Suíte Queen com banheira de hidromassagem - Quarto 08).',
    comodidades: [
      { icone: 'fa-compress', texto: 'Térreo' },
      { icone: 'fa-bed', texto: '1 cama queen confortável' },
      { icone: 'fa-bath', texto: 'Banheira de Hidromassagem' },
      { icone: 'fa-snowflake', texto: 'Ar-condicionado' },
      { icone: 'fa-tv', texto: 'TV Smart e Frigobar' },
      { icone: 'fa-wifi', texto: 'WiFi Gratuito' },
    ],
    tarifa: 'hidro',
    ctaLabel: 'Consultar Disponibilidade',
    mensagem: 'Olá! Vim pelo site e quero reservar a Suíte com Hidromassagem (%CAFE%).',
    fotos: [
      { arquivo: Q + 'pousada-fenix-suite-hidromassagem-cama-1.png', alt: 'Cama queen de casal da suíte com hidromassagem' },
      { arquivo: Q + 'pousada-fenix-suite-hidromassagem-banheira-1.png', alt: 'Banheira de hidromassagem com espuma e TV Netflix' },
      { arquivo: Q + 'pousada-fenix-suite-hidromassagem-banheira-2.jpg', alt: 'Pia do banheiro e hidromassagem' },
      { arquivo: Q + 'pousada-fenix-suite-hidromassagem-cama-2.png', alt: 'Cama de casal vista com espelho decorativo' },
      { arquivo: Q + 'pousada-fenix-suite-hidromassagem-banheiro-1.png', alt: 'Banheiro com box de vidro e chuveiro' },
    ],
    tabelaPrecos: [
      { hospedes: 1, semCafe: 'R$ 240', comCafe: 'R$ 265' },
      { hospedes: 2, semCafe: 'R$ 300', comCafe: 'R$ 350' },
    ],
  },
  {
    id: 'suite-tripla',
    nome: 'Suíte Tripla',
    badge: 'Recomendado',
    descricao:
      'Suíte no térreo equipada com cama de casal ou queen, mais uma cama de solteiro, frigobar, TV e ar-condicionado. (No Booking.com: Suíte família deluxe / Quarto triplo com banheiro privativo - Quartos 05, 07 e 10).',
    comodidades: [
      { icone: 'fa-compress', texto: 'Térreo' },
      { icone: 'fa-bed', texto: '1 casal/queen + 1 solteiro' },
      { icone: 'fa-snowflake', texto: 'Ar-condicionado' },
      { icone: 'fa-tv', texto: 'TV e Frigobar' },
      { icone: 'fa-shower', texto: 'Banheiro Privativo' },
      { icone: 'fa-wifi', texto: 'WiFi Gratuito' },
    ],
    tarifa: 'tripla',
    ctaLabel: 'Consultar Disponibilidade',
    mensagem: 'Olá! Vim pelo site e quero reservar a Suíte Tripla (%CAFE%).',
    fotos: [
      { arquivo: Q + 'pousada-fenix-suite-tripla-cama-1.jpg', alt: 'Suíte Tripla - Cama de casal, frigobar e estante' },
      { arquivo: Q + 'pousada-fenix-suite-tripla-cama-2.png', alt: 'Suíte Tripla - Quarto conjugado com cama de solteiro e cabeceira rosa' },
      { arquivo: Q + 'pousada-fenix-suite-tripla-cama-3.jpg', alt: 'Suíte Tripla - Visão ampla de ambas as camas' },
      { arquivo: Q + 'pousada-fenix-suite-tripla-cama-4.png', alt: 'Suíte Tripla - Detalhe do quarto de solteiro com janela' },
      { arquivo: Q + 'pousada-fenix-suite-tripla-banheiro-1.png', alt: 'Suíte Tripla - Banheiro privativo com pia e box de vidro' },
    ],
    tabelaPrecos: [
      { hospedes: 2, semCafe: 'R$ 238', comCafe: 'R$ 288' },
      { hospedes: 3, semCafe: 'R$ 350', comCafe: 'R$ 425' },
    ],
  },
  {
    id: 'suite-familia',
    nome: 'Suíte Família',
    badge: 'Família',
    descricao:
      'Suíte no 1º andar com opções de cama de casal, solteiro e beliche, TV e frigobar. Acomoda até 06 pessoas. (No Booking.com: Quarto Família, Quarto Quádruplo Confort, Standard ou Clássico, Quarto Duplo - Quartos 21 a 28).',
    comodidades: [
      { icone: 'fa-compress', texto: '1º Andar' },
      { icone: 'fa-bed', texto: 'Casal, solteiro e beliche' },
      { icone: 'fa-snowflake', texto: 'Ar-condicionado' },
      { icone: 'fa-tv', texto: 'TV e Frigobar' },
      { icone: 'fa-users', texto: 'Acomoda até 06 pessoas' },
      { icone: 'fa-wifi', texto: 'WiFi Gratuito' },
    ],
    tarifa: 'familia',
    ctaLabel: 'Consultar Disponibilidade',
    mensagem: 'Olá! Vim pelo site e quero reservar a Suíte Família (%CAFE%).',
    fotos: [
      { arquivo: Q + 'pousada-fenix-suite-familia-cama-1.png', alt: 'Suíte Família - Cama de casal, solteiro e frigobar' },
      { arquivo: Q + 'pousada-fenix-suite-familia-cama-2.png', alt: 'Suíte Família - Smart TV, ar-condicionado e estante de madeira' },
      { arquivo: Q + 'pousada-fenix-suite-familia-cama-3.png', alt: 'Suíte Família - Vista geral do quarto' },
      { arquivo: Q + 'pousada-fenix-suite-familia-cama-4.png', alt: 'Suíte Família - Quarto de solteiro e estante' },
      { arquivo: Q + 'pousada-fenix-suite-familia-banheiro-1.png', alt: 'Suíte Família - Banheiro privativo' },
    ],
    tabelaPrecos: [
      { hospedes: 4, semCafe: 'R$ 525', comCafe: 'R$ 625' },
      { hospedes: 5, semCafe: 'R$ 602', comCafe: 'R$ 727' },
      { hospedes: 6, semCafe: 'R$ 700', comCafe: 'R$ 850' },
    ],
  },
  {
    id: 'suite-economica',
    nome: 'Suíte Econômica',
    badge: 'Excursões',
    descricao:
      'Localizada no térreo com ar-condicionado, geladeira e TV. Opções com camas de casal e beliches, ideal para excursões e grandes grupos. Acomoda até 08 pessoas. (No Booking.com: Quarto família / Quarto família standard - Quartos 02 e 03).',
    comodidades: [
      { icone: 'fa-compress', texto: 'Térreo' },
      { icone: 'fa-bed', texto: 'Opções com camas casal e beliches' },
      { icone: 'fa-snowflake', texto: 'Ar-condicionado' },
      { icone: 'fa-tv', texto: 'TV de tela plana' },
      { icone: 'fa-kitchen-set', texto: 'Geladeira e Banheiro Privativo' },
      { icone: 'fa-users', texto: 'Acomoda até 08 pessoas' },
    ],
    tarifa: 'economica',
    ctaLabel: 'Consultar Disponibilidade',
    mensagem: 'Olá! Vim pelo site e quero reservar a Suíte Econômica (%CAFE%).',
    fotos: [
      { arquivo: Q + 'suite-economica-nova-1.png', alt: 'Visão geral do quarto com camas e beliche' },
      { arquivo: Q + 'suite-economica-nova-2.png', alt: 'Cama, TV e ventilador' },
      { arquivo: Q + 'suite-economica-nova-3.png', alt: 'Camas e estante' },
      { arquivo: Q + 'suite-economica-nova-4.png', alt: 'Vista da área da piscina pela janela' },
      { arquivo: Q + 'suite-economica-nova-5.png', alt: 'Banheiro privativo da Suíte Econômica' },
    ],
    tabelaPrecos: [
      { hospedes: 3, semCafe: 'R$ 350', comCafe: 'R$ 425' },
      { hospedes: 4, semCafe: 'R$ 469', comCafe: 'R$ 569' },
      { hospedes: 5, semCafe: 'R$ 588', comCafe: 'R$ 713' },
      { hospedes: 6, semCafe: 'R$ 700', comCafe: 'R$ 850' },
    ],
  },
];
