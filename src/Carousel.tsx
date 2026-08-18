import React, { useCallback, useRef, useState } from 'react';

export interface CarouselPhoto {
  arquivo: string;
  alt: string;
}

interface CarouselProps {
  fotos: CarouselPhoto[];
  /** Rótulo do grupo para leitores de tela (ex.: "Fotos da Suíte Família"). */
  ariaLabel: string;
  /** Abre a foto no lightbox. Sem isso, o clique na imagem não faz nada. */
  onExpand?: (indice: number) => void;
  /** A primeira imagem do primeiro card não deve ser lazy (afeta o LCP). */
  prioridade?: boolean;
}

const LIMIAR_SWIPE = 40; // px

/**
 * Carrossel de fotos em proporção 3:4 — a mesma do acervo da pousada, para a
 * foto aparecer inteira em vez de ser cortada no meio.
 * Navega por setas, bolinhas, arrasto no celular e setas do teclado.
 */
export default function Carousel({ fotos, ariaLabel, onExpand, prioridade = false }: CarouselProps) {
  const [indice, setIndice] = useState(0);
  const toqueX = useRef<number | null>(null);
  const total = fotos.length;

  const irPara = useCallback(
    (proximo: number) => setIndice(((proximo % total) + total) % total),
    [total],
  );

  const aoTeclar = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      irPara(indice - 1);
    }
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      irPara(indice + 1);
    }
  };

  const aoTocarInicio = (e: React.TouchEvent) => {
    toqueX.current = e.touches[0].clientX;
  };

  const aoTocarFim = (e: React.TouchEvent) => {
    if (toqueX.current === null) return;
    const delta = e.changedTouches[0].clientX - toqueX.current;
    if (Math.abs(delta) > LIMIAR_SWIPE) irPara(indice + (delta < 0 ? 1 : -1));
    toqueX.current = null;
  };

  if (total === 0) return null;

  return (
    <div
      className="carousel"
      role="group"
      aria-roledescription="carrossel"
      aria-label={ariaLabel}
      tabIndex={0}
      onKeyDown={aoTeclar}
      onTouchStart={aoTocarInicio}
      onTouchEnd={aoTocarFim}
    >
      <div className="carousel-viewport">
        <div className="carousel-track" style={{ transform: `translate3d(-${indice * 100}%, 0, 0)` }}>
          {fotos.map((foto, i) => (
            <div
              className="carousel-slide"
              key={foto.arquivo}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} de ${total}`}
              aria-hidden={i !== indice}
            >
              <img
                src={foto.arquivo}
                alt={foto.alt}
                width={1200}
                height={1600}
                /* Só a vizinhança do slide atual sai do lazy: evita baixar 21 fotos de uma vez. */
                loading={prioridade && i === 0 ? 'eager' : 'lazy'}
                decoding="async"
                onClick={() => onExpand?.(i)}
                style={onExpand ? { cursor: 'zoom-in' } : undefined}
              />
            </div>
          ))}
        </div>

        {total > 1 && (
          <>
            <button
              type="button"
              className="carousel-arrow prev"
              aria-label="Foto anterior"
              onClick={() => irPara(indice - 1)}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
            </button>
            <button
              type="button"
              className="carousel-arrow next"
              aria-label="Próxima foto"
              onClick={() => irPara(indice + 1)}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>
            <span className="carousel-counter" aria-hidden="true">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                <circle cx="8.5" cy="8.5" r="1.5"></circle>
                <polyline points="21 15 16 10 5 21"></polyline>
              </svg>
              {indice + 1}/{total}
            </span>
          </>
        )}
      </div>

      {total > 1 && (
        <div className="carousel-dots">
          {fotos.map((foto, i) => (
            <button
              type="button"
              key={foto.arquivo}
              className={`carousel-dot ${i === indice ? 'active' : ''}`}
              aria-label={`Ir para a foto ${i + 1}`}
              aria-current={i === indice}
              onClick={() => irPara(i)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
