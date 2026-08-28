/**
 * Configuração central do site — mexer aqui, nunca espalhar pelo App.tsx.
 */

export const SITE_URL = 'https://pousadafenixpontalpr.com.br';

/** URL oficial de reservas no Booking.com */
export const BOOKING_URL = 'https://www.booking.com/hotel/br/pousada-restaurante-fenix.pt-br.html';

/** Número do WhatsApp sem máscara (formato do wa.me). */
export const WHATSAPP_NUMBER = '5541989047277';

/** Container GTM. As conversões do Google Ads e do Meta são disparadas por ele. */
export const GTM_ID = 'GTM-M7NL3H84';

/**
 * Google Ads (gtag) — opcional e desligado por padrão.
 * O caminho recomendado é configurar a conversão dentro do GTM ouvindo os
 * eventos do dataLayer (`whatsapp_click`). Só preencha estes dois campos se o
 * cliente exigir a tag do Google Ads direto na página (sem GTM):
 *   GOOGLE_ADS_ID:    'AW-XXXXXXXXXX'
 *   GOOGLE_ADS_LABEL: 'AW-XXXXXXXXXX/AbC-D_efGh'
 */
export const GOOGLE_ADS_ID = '';
export const GOOGLE_ADS_CONVERSION_LABEL = '';
