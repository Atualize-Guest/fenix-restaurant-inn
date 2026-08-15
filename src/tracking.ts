/**
 * trackingService — captura de origem do tráfego + eventos de conversão.
 *
 * Padrão da workspace (skill-landingpage §5):
 *  - captura UTMs, gclid/gbraid/wbraid (Google Ads), fbclid e cookies _fbp/_fbc (Meta);
 *  - persiste em localStorage com merge (só sobrescreve o que veio na URL atual);
 *  - grava first-touch (landing_page / first_referer) só na primeira visita;
 *  - todo evento sai pelo dataLayer via dlPush() — o GTM decide o que mandar
 *    para Google Ads e Meta.
 *
 * Regra de ouro: tracking NUNCA pode travar a UX. Tudo aqui é try/catch.
 */

import { GOOGLE_ADS_ID, GOOGLE_ADS_CONVERSION_LABEL } from './config';

const STORAGE_KEY = 'fenix_tracking';

const URL_PARAMS = [
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_content',
  'utm_term',
  'utm_id',
  'gclid',
  'gbraid',
  'wbraid',
  'gad_source',
  'campaign_id',
  'adset_id',
  'ad_id',
  'fbclid',
  'device',
  'matchtype',
  'keyword',
  'placement',
] as const;

export type TrackingData = Record<string, string>;

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
    gtag?: (...args: unknown[]) => void;
  }
}

let memory: TrackingData = {};

function readStorage(): TrackingData {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as TrackingData) : {};
  } catch {
    return {};
  }
}

function writeStorage(data: TrackingData) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    /* modo privado / storage cheio — segue sem persistir */
  }
}

function readCookie(name: string): string {
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  return match ? decodeURIComponent(match[2]) : '';
}

/** Monta o _fbc a partir do fbclid quando o pixel ainda não gravou o cookie. */
function buildFbc(fbclid: string): string {
  return fbclid ? `fb.1.${Date.now()}.${fbclid}` : '';
}

/**
 * Roda uma vez no boot da página. Faz merge: parâmetros ausentes na URL atual
 * preservam o valor da visita anterior (last-touch por parâmetro).
 */
export function captureTracking(): TrackingData {
  try {
    const stored = readStorage();
    const params = new URLSearchParams(window.location.search);
    const fresh: TrackingData = {};

    for (const key of URL_PARAMS) {
      const value = params.get(key);
      if (value) fresh[key] = value;
    }

    // Cookies do pixel do Meta — sempre atualizados.
    const fbp = readCookie('_fbp');
    const fbc = readCookie('_fbc') || buildFbc(fresh.fbclid || stored.fbclid || '');
    if (fbp) fresh._fbp = fbp;
    if (fbc) fresh._fbc = fbc;

    const merged: TrackingData = { ...stored, ...fresh };

    // First-touch: só na primeira visita.
    if (!merged.landing_page) merged.landing_page = window.location.href;
    if (!merged.first_referer) merged.first_referer = document.referrer || 'direct';
    if (!merged.first_seen_at) merged.first_seen_at = new Date().toISOString();

    memory = merged;
    writeStorage(merged);
    return merged;
  } catch {
    return memory;
  }
}

export function getTracking(): TrackingData {
  if (Object.keys(memory).length) return memory;
  memory = readStorage();
  return memory;
}

/** Wrapper tipado do dataLayer — todo evento do site passa por aqui. */
export function dlPush(payload: Record<string, unknown> & { event: string }) {
  try {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ ...payload, ...getTracking() });
  } catch {
    /* nunca deixar o tracking quebrar a navegação */
  }
}

/**
 * Conversão de clique no WhatsApp. É o evento que o GTM converte em
 * "Lead" no Google Ads e no Meta. `origem` identifica de qual CTA veio.
 */
export function trackWhatsappClick(origem: string, extra: Record<string, unknown> = {}) {
  dlPush({ event: 'whatsapp_click', conversion_origin: origem, ...extra });

  // Fallback opcional: tag do Google Ads direto na página (só se configurada).
  if (GOOGLE_ADS_ID && GOOGLE_ADS_CONVERSION_LABEL && typeof window.gtag === 'function') {
    window.gtag('event', 'conversion', { send_to: GOOGLE_ADS_CONVERSION_LABEL });
  }
}
