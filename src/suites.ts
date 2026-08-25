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
      'Suíte no térreo com cama de casal, frigobar e TV.',
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
      'Nossa opção mais em conta para casais no térreo. Equipado com cama de casal, ventilador, TV de tela plana, frigobar e banheiro privativo.',
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
      { arquivo: Q + 'pousada-fenix-pontal-do-parana-quartos-com-ar-condicionado-4.webp', alt: 'Quarto com ventilador and frigobar' },
      { arquivo: Q + 'pousada-fenix-pontal-do-parana-quartos-com-ar-condicionado-5.webp', alt: 'Vista interna com mesa e cama' },
      { arquivo: Q + 'pousada-fenix-suite-casal-30.webp', alt: 'Quarto aconchegante e compacto no térreo' },
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
      'Perfeita para casais no térreo. Oferece privacidade total, cama queen, banheira de hidromassagem privativa, ar-condicionado, TV smart e frigobar.',
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
      'Suíte no térreo equipada com cama de casal ou queen, mais uma cama de solteiro, frigobar, TV e ar-condicionado.',
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
      'Localizada no 1º andar. Dispõe de opções com cama de casal, solteiro e beliche, frigobar, ar-condicionado, geladeira e banheiro privativo. Acomoda até 06 pessoas.',
    comodidades: [
      { icone: 'fa-compress', texto: '1º Andar' },
      { icone: 'fa-bed', texto: 'Cama casal, solteiro e beliche' },
      { icone: 'fa-snowflake', texto: 'Ar-condicionado' },
      { icone: 'fa-tv', texto: 'TV e Frigobar' },
      { icone: 'fa-kitchen-set', texto: 'Geladeira e mesa de refeição' },
      { icone: 'fa-users', texto: 'Acomoda até 06 pessoas' },
    ],
    tarifa: 'familia',
    ctaLabel: 'Consultar Disponibilidade',
    mensagem: 'Olá! Vim pelo site e quero reservar a Suíte Família (%CAFE%).',
    fotos: [
      { arquivo: Q + 'pousada-fenix-quarto-familia-privativo-cama-1.png', alt: 'Suíte Família - Vista das camas de casal e beliche' },
      { arquivo: Q + 'pousada-fenix-quarto-familia-privativo-cama-2.png', alt: 'Suíte Família - Beliche, TV e ventilador de parede' },
      { arquivo: Q + 'pousada-fenix-quarto-familia-privativo-cama-3.png', alt: 'Suíte Família - Outro ambiente com camas e ar-condicionado' },
      { arquivo: Q + 'pousada-fenix-quarto-familia-privativo-refeicao.png', alt: 'Suíte Família - Entrada com geladeira' },
      { arquivo: Q + 'pousada-fenix-quarto-familia-privativo-banheiro.png', alt: 'Suíte Família - Banheiro privativo com box de vidro' },
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
      'Localizada no térreo com ar-condicionado, geladeira e TV. Opções com camas de casal e beliches, ideal para excursões e grandes grupos. Acomoda até 08 pessoas.',
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
      { arquivo: Q + 'pousada-fenix-quarto-familia-standard-cama-1.png', alt: 'Suíte Econômica - Cama de solteiro, ventilador e frigobar' },
      { arquivo: Q + 'pousada-fenix-quarto-familia-standard-cama-2.png', alt: 'Suíte Econômica - Beliche de madeira, solteiro e TV' },
      { arquivo: Q + 'pousada-fenix-quarto-familia-standard-cama-3.png', alt: 'Suíte Econômica - Cama de casal e solteiro com ar-condicionado' },
      { arquivo: Q + 'pousada-fenix-quarto-familia-standard-cama-4.png', alt: 'Suíte Econômica - Visão geral com sofás e beliche' },
      { arquivo: Q + 'pousada-fenix-quarto-familia-standard-banheiro-1.png', alt: 'Suíte Econômica - Banheiro com box e pia' },
    ],
    tabelaPrecos: [
      { hospedes: 3, semCafe: 'R$ 350', comCafe: 'R$ 425' },
      { hospedes: 4, semCafe: 'R$ 469', comCafe: 'R$ 569' },
      { hospedes: 5, semCafe: 'R$ 588', comCafe: 'R$ 713' },
      { hospedes: 6, semCafe: 'R$ 700', comCafe: 'R$ 850' },
    ],
  },
];
