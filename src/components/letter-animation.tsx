'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { Heart } from 'lucide-react';
import { WEDDING_CONFIG } from '@/constants';
import styles from './letter-animation.module.css';

const CornerOrnament = ({ className }: { className?: string }) => (
  <svg className={`${styles.cornerOrnament} ${className || ''}`} viewBox="0 0 180 180" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 10 Q80 10 10 80" stroke="#6B2737" strokeWidth="1" fill="none" />
    <path d="M10 10 Q60 40 40 90" stroke="#6B2737" strokeWidth="0.7" fill="none" />
    <path d="M10 10 Q40 60 90 40" stroke="#6B2737" strokeWidth="0.7" fill="none" />
    <circle cx="10" cy="10" r="3" fill="#6B2737" />
    <ellipse cx="50" cy="50" rx="18" ry="10" fill="#6B2737" opacity="0.6" transform="rotate(-30 50 50)" />
    <ellipse cx="30" cy="70" rx="14" ry="8" fill="#6B2737" opacity="0.5" transform="rotate(-60 30 70)" />
    <ellipse cx="70" cy="30" rx="14" ry="8" fill="#6B2737" opacity="0.5" transform="rotate(0 70 30)" />
    <circle cx="55" cy="20" r="4" fill="#6B2737" opacity="0.4" />
    <circle cx="20" cy="55" r="4" fill="#6B2737" opacity="0.4" />
    <circle cx="75" cy="55" r="3" fill="#6B2737" opacity="0.3" />
    <circle cx="55" cy="75" r="3" fill="#6B2737" opacity="0.3" />
    <path d="M25 80 Q35 65 50 70 Q45 85 25 80Z" fill="#6B2737" opacity="0.5" />
    <path d="M80 25 Q65 35 70 50 Q85 45 80 25Z" fill="#6B2737" opacity="0.5" />
  </svg>
);


interface LetterAnimationProps {
  onOpen: () => void;
  coupleName: string;
}

export const LetterAnimation = ({
  onOpen,
  coupleName,
}: LetterAnimationProps) => {
  const { t } = useTranslation('home');
  const searchParams = useSearchParams();

  const toName =
    searchParams.get('to') || searchParams.get('toName') || t('letter.guest');

  const [isOpen, setIsOpen] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);

  const handleOpen = () => {
    if (isOpen) return;
    setIsOpen(true);
  };

  const handleKeyDownOpen = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleOpen();
    }
  };

  const handleCardClick = (e: React.MouseEvent) => {
    if (!isOpen || isZoomed) return;
    e.stopPropagation(); // Prevent trigger handleOpen again
    setIsZoomed(true);

    // Give time for zoom animation to play before calling onOpen to fade out overlay
    setTimeout(() => {
      onOpen();
    }, 600);
  };

  const handleKeyDownCard = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      e.stopPropagation();
      if (!isOpen || isZoomed) return;
      setIsZoomed(true);
      setTimeout(() => {
        onOpen();
      }, 600);
    }
  };

  return (
    <div className={`${styles.container} ${isZoomed ? styles.isZoomed : ''}`}>
      {/* Decorative corner flowers */}
      <div
        className="absolute top-0 left-0 pointer-events-none z-10"
        style={{
          width: 'clamp(160px, 40vw, 300px)',
          opacity: isZoomed ? 0 : 0.75,
          transition: 'opacity 0.8s ease',
        }}
      >
        <Image
          src="/assets/images/RSVP-upper-left.png"
          alt="Flower ornament top left"
          width={300}
          height={500}
          className="w-full h-auto opacity-75"
          priority
        />
      </div>
      <div
        className="absolute top-0 right-0 pointer-events-none z-10"
        style={{
          width: 'clamp(160px, 40vw, 300px)',
          opacity: isZoomed ? 0 : 0.75,
          transition: 'opacity 0.8s ease',
        }}
      >
        <Image
          src="/assets/images/RSVP-upper-right.png"
          alt="Flower ornament top right"
          width={250}
          height={250}
          className="w-full h-auto opacity-75"
          priority
        />
      </div>
      <div
        className="absolute bottom-0 left-0 pointer-events-none z-10"
        style={{
          width: 'clamp(240px, 60vw, 480px)',
          opacity: isZoomed ? 0 : 0.9,
          transition: 'opacity 0.8s ease',
        }}
      >
        <Image
          src="/assets/images/home-left.png"
          alt="Flower ornament bottom left"
          width={500}
          height={350}
          className="w-full h-auto opacity-90"
          priority
        />
      </div>
      <div
        className="absolute bottom-0 right-0 pointer-events-none z-10"
        style={{
          width: 'clamp(240px, 60vw, 480px)',
          opacity: isZoomed ? 0 : 0.9,
          transition: 'opacity 0.8s ease',
        }}
      >
        <Image
          src="/assets/images/home-right.png"
          alt="Flower ornament bottom right"
          width={350}
          height={350}
          className="w-full h-auto opacity-90"
          priority
        />
      </div>

      <header className={styles.pageHeader}>
        <p className={styles.eyebrow}>{t('letter.invitation-title') || 'Welcome to our wedding'}</p>
        <div className={styles.titleBlock}>
          <span className={styles.titleOur}>Wedding</span>
          <span className={styles.titleWedding}>Of</span>
        </div>
        <div className={styles.headerRule}></div>
        <p className={styles.inviteLine}>
          {t('letter.dear') || 'Dear'} <strong>{toName}</strong> &mdash; {t('letter.you-are-invited')}
        </p>
      </header>

      <div className={styles.scene}>
        <div
          className={`${styles.envelopeWrap} ${isOpen ? styles.isOpen : ''} ${isZoomed ? styles.envelopeZoomed : ''
            }`}
          id="envelope"
          onClick={handleOpen}
          onKeyDown={handleKeyDownOpen}
          role="button"
          tabIndex={isOpen ? -1 : 0}
          aria-label="Click to open invitation"
        >
          <div className={styles.envelopeBody}>
            <div className={styles.envBack}></div>
            <div className={`${styles.envSide} ${styles.left}`}></div>
            <div className={`${styles.envSide} ${styles.right}`}></div>
            <div className={styles.envBottom}></div>

            {/* Flap */}
            <div className={styles.flapWrap} id="flap">
              <div className={styles.envFlap}></div>
              <div className={styles.envFlapInner}></div>
            </div>

            {/* Wax seal */}
            <div className={styles.sealWrap} id="seal">
              <div className={styles.seal}>
                <Image
                  src="/assets/images/wax-seal.png"
                  alt="Wax Seal"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>

            {/* Card slot */}
            <div className={styles.cardSlot}>
              <div
                className={`${styles.inviteCard} ${isZoomed ? styles.cardZoomed : ''}`}
                id="card"
                onClick={handleCardClick}
                onKeyDown={handleKeyDownCard}
                role="button"
                tabIndex={isOpen && !isZoomed ? 0 : -1}
                aria-label="Read invitation details"
              >
                {/* Flowers inside the card */}
                <div className="absolute -top-1 -left-1 w-14 sm:w-20 md:w-28 pointer-events-none z-0 opacity-40 sm:opacity-50">
                  <Image
                    src="/assets/images/RSVP-upper-left.png"
                    alt="Flower ornament top left"
                    width={300}
                    height={500}
                    className="w-full h-auto"
                  />
                </div>
                <div className="absolute -top-1 -right-1 w-12 sm:w-18 md:w-24 pointer-events-none z-0 opacity-40 sm:opacity-50">
                  <Image
                    src="/assets/images/RSVP-upper-right.png"
                    alt="Flower ornament top right"
                    width={250}
                    height={250}
                    className="w-full h-auto"
                  />
                </div>
                <div className="absolute -bottom-1 -left-1 w-20 sm:w-28 md:w-36 pointer-events-none z-0 opacity-50 sm:opacity-60">
                  <Image
                    src="/assets/images/home-left.png"
                    alt="Flower ornament bottom left"
                    width={500}
                    height={350}
                    className="w-full h-auto"
                  />
                </div>
                <div className="absolute -bottom-1 -right-1 w-16 sm:w-24 md:w-30 pointer-events-none z-0 opacity-50 sm:opacity-60">
                  <Image
                    src="/assets/images/home-right.png"
                    alt="Flower ornament bottom right"
                    width={350}
                    height={350}
                    className="w-full h-auto"
                  />
                </div>

                <div className="relative z-10 flex flex-col items-center justify-center h-full w-full">
                  <div className="text-[7px] sm:text-[10px] md:text-xs text-midnight/70 font-medium font-cormorant tracking-[0.2em] uppercase mb-1 sm:mb-4">
                    {t('hero.welcome') || 'Together with our Families'}
                  </div>
                  <h1 className="font-bruney text-2xl sm:text-5xl md:text-6xl text-midnight leading-none mb-1.5 sm:mb-4 text-center">
                    Wedding
                    <span className="block text-amethyst">
                      Of
                    </span>
                  </h1>
                  <div className="w-12 sm:w-24 h-px bg-amethyst/30 mx-auto mb-2.5 sm:mb-6"></div>

                  <div className="flex flex-row items-center justify-center gap-2 sm:gap-4 mb-2.5 sm:mb-6">
                    <div className="text-center">
                      <h3 className="text-2xl sm:text-4xl md:text-5xl font-ballet text-midnight leading-none">
                        {WEDDING_CONFIG.groom.name}
                      </h3>
                      <p className="text-[7px] sm:text-[10px] text-amethyst-dark font-cormorant italic mt-0.5 leading-none">
                        {WEDDING_CONFIG.groom.fullName}
                      </p>
                    </div>
                    <div className="text-amethyst mx-1.5 sm:mx-2 flex items-center justify-center">
                      <Heart className="w-2.5 h-2.5 sm:w-4 sm:h-4 md:w-5 md:h-5" fill="currentColor" />
                    </div>
                    <div className="text-center">
                      <h3 className="text-2xl sm:text-4xl md:text-5xl font-ballet text-midnight leading-none">
                        {WEDDING_CONFIG.bride.name}
                      </h3>
                      <p className="text-[7px] sm:text-[10px] text-amethyst-dark font-cormorant italic mt-0.5 leading-none">
                        {WEDDING_CONFIG.bride.fullName}
                      </p>
                    </div>
                  </div>

                  <div className="text-[7px] sm:text-[10px] md:text-xs tracking-widest uppercase text-amethyst-dark font-cormorant border-t border-b border-amethyst/10 py-1 sm:py-2 px-3 sm:px-6">
                    {t('letter.to') || 'to'}: {toName}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={`${styles.clickHint} ${isZoomed ? styles.hidden : ''}`} id="hint">
          <span className={styles.clickHintText}>
            {isOpen ? t('letter.click-to-read') || 'Click the card to read' : t('letter.click-to-open')}
          </span>
          <div className={styles.clickHintChevron}></div>
        </div>
      </div>
    </div>
  );
};
