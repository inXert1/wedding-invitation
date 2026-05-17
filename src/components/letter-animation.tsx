'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'next/navigation';
import styles from './letter-animation.module.css';

const CornerOrnament = ({ className }: { className?: string }) => (
  <svg className={`${styles.cornerOrnament} ${className || ''}`} viewBox="0 0 180 180" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 10 Q80 10 10 80" stroke="#6B2737" strokeWidth="1" fill="none"/>
    <path d="M10 10 Q60 40 40 90" stroke="#6B2737" strokeWidth="0.7" fill="none"/>
    <path d="M10 10 Q40 60 90 40" stroke="#6B2737" strokeWidth="0.7" fill="none"/>
    <circle cx="10" cy="10" r="3" fill="#6B2737"/>
    <ellipse cx="50" cy="50" rx="18" ry="10" fill="#6B2737" opacity="0.6" transform="rotate(-30 50 50)"/>
    <ellipse cx="30" cy="70" rx="14" ry="8" fill="#6B2737" opacity="0.5" transform="rotate(-60 30 70)"/>
    <ellipse cx="70" cy="30" rx="14" ry="8" fill="#6B2737" opacity="0.5" transform="rotate(0 70 30)"/>
    <circle cx="55" cy="20" r="4" fill="#6B2737" opacity="0.4"/>
    <circle cx="20" cy="55" r="4" fill="#6B2737" opacity="0.4"/>
    <circle cx="75" cy="55" r="3" fill="#6B2737" opacity="0.3"/>
    <circle cx="55" cy="75" r="3" fill="#6B2737" opacity="0.3"/>
    <path d="M25 80 Q35 65 50 70 Q45 85 25 80Z" fill="#6B2737" opacity="0.5"/>
    <path d="M80 25 Q65 35 70 50 Q85 45 80 25Z" fill="#6B2737" opacity="0.5"/>
  </svg>
);

const Seal = () => (
  <svg viewBox="0 0 82 82" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="sealGrad" cx="38%" cy="35%" r="65%">
        <stop offset="0%" stopColor="#8B3A4D"/>
        <stop offset="50%" stopColor="#6B2737"/>
        <stop offset="100%" stopColor="#3A1020"/>
      </radialGradient>
      <radialGradient id="goldRing" cx="50%" cy="50%" r="50%">
        <stop offset="80%" stopColor="transparent"/>
        <stop offset="90%" stopColor="#C8A96E" stopOpacity="0.7"/>
        <stop offset="100%" stopColor="#A88040" stopOpacity="0.5"/>
      </radialGradient>
    </defs>
    {/* Outer decorative ring */}
    <circle cx="41" cy="41" r="40" fill="none" stroke="#C8A96E" strokeWidth="0.5" opacity="0.6"/>
    {/* Main seal */}
    <circle cx="41" cy="41" r="36" fill="url(#sealGrad)"/>
    {/* Texture ring */}
    <circle cx="41" cy="41" r="36" fill="url(#goldRing)"/>
    {/* Inner ring */}
    <circle cx="41" cy="41" r="29" fill="none" stroke="#C8A96E" strokeWidth="0.5" opacity="0.5"/>
    {/* Monogram */}
    <text x="41" y="36" textAnchor="middle" fontFamily="var(--font-ballet)" fontSize="13" fill="#F0D8A0" opacity="0.95">J &amp; A</text>
    {/* Star ornaments */}
    <g fill="#C8A96E" opacity="0.5">
      <polygon points="41,13 42.2,16.6 46,16.6 43,18.8 44.2,22.4 41,20.2 37.8,22.4 39,18.8 36,16.6 39.8,16.6" transform="scale(0.55) translate(33,17)"/>
    </g>
    {/* Small dots ring */}
    <g fill="#C8A96E" opacity="0.45">
      <circle cx="41" cy="12" r="1.2"/>
      <circle cx="41" cy="70" r="1.2"/>
      <circle cx="12" cy="41" r="1.2"/>
      <circle cx="70" cy="41" r="1.2"/>
      <circle cx="20" cy="20" r="1"/>
      <circle cx="62" cy="20" r="1"/>
      <circle cx="20" cy="62" r="1"/>
      <circle cx="62" cy="62" r="1"/>
    </g>
    {/* Light reflection */}
    <ellipse cx="32" cy="28" rx="10" ry="6" fill="white" opacity="0.06" transform="rotate(-30 32 28)"/>
  </svg>
);

const Petals = () => {
  const colors = ['#C8A0A8', '#DEB8C0', '#E8C8C0', '#C8A96E', '#EDD8C8'];
  const count = 22;

  // We only want to generate these once on client mount to avoid hydration mismatch
  const [petals, setPetals] = useState<any[]>([]);

  useEffect(() => {
    const generatedPetals = Array.from({ length: count }).map((_, i) => ({
      id: i,
      size: 6 + Math.random() * 10,
      xPos: 20 + Math.random() * 60,
      dur: 2.5 + Math.random() * 2.5,
      delay: Math.random() * 0.4 + (i * 0.08),
      color: colors[Math.floor(Math.random() * colors.length)],
      borderRadius: Math.random() > 0.5 ? '50% 0 50% 0' : '0 50% 0 50%'
    }));
    setPetals(generatedPetals);
  }, []);

  return (
    <>
      {petals.map((petal) => (
        <motion.div
          key={petal.id}
          className={styles.petal}
          style={{
            left: `${petal.xPos}%`,
            top: '30%',
            width: petal.size,
            height: petal.size * 0.65,
            background: petal.color,
            borderRadius: petal.borderRadius,
          }}
          initial={{ y: -20, rotate: 0, opacity: 0.8 }}
          animate={{ y: '100vh', rotate: 360, opacity: 0 }}
          transition={{
            duration: petal.dur,
            delay: petal.delay,
            ease: 'linear',
          }}
        />
      ))}
    </>
  );
};

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
  const [showPetals, setShowPetals] = useState(false);

  const handleOpen = () => {
    if (isOpen) return;
    setIsOpen(true);
    
    setTimeout(() => {
      setShowPetals(true);
    }, 400);

    setTimeout(() => {
      onOpen();
    }, 3500); // Give the animation time to play out
  };

  return (
    <div className={styles.container}>
      <CornerOrnament className={styles.tl} />
      <CornerOrnament className={styles.tr} />
      <CornerOrnament className={styles.bl} />
      <CornerOrnament className={styles.br} />

      <header className={styles.pageHeader}>
        <p className={styles.eyebrow}>{t('letter.invitation-title') || 'Welcome to our wedding'}</p>
        <div className={styles.titleBlock}>
          <span className={styles.titleOur}>Our</span>
          <span className={styles.titleWedding}>Wedding</span>
        </div>
        <div className={styles.headerRule}></div>
        <p className={styles.inviteLine}>
          {t('letter.dear') || 'Dear'} <strong>{toName}</strong> &mdash; {t('letter.you-are-invited')}
        </p>
      </header>

      <div className={styles.scene}>
        <div 
          className={`${styles.envelopeWrap} ${isOpen ? styles.isOpen : ''}`} 
          id="envelope" 
          onClick={handleOpen} 
          role="button" 
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
                <Seal />
              </div>
            </div>

            {/* Card slot */}
            <div className={styles.cardSlot}>
              <div className={styles.inviteCard} id="card">
                <div className={styles.cardOrnament}>
                  <div className={styles.cardOrnamentDot}></div>
                  <div className={styles.cardOrnamentLine}></div>
                  <div className={styles.cardOrnamentDot}></div>
                </div>

                <div className={styles.cardTo}>{t('letter.to') || 'to'}: {toName}</div>

                <div className={styles.cardNames}>{coupleName}</div>

                <div className={styles.cardDivider}>
                  <div className={styles.cardDividerLine}></div>
                  <div className={styles.cardDividerDiamond}></div>
                  <div className={styles.cardDividerLine}></div>
                </div>

                <p className={styles.cardTagline}>{t('letter.invitation-title') || 'Inviting you to share in the joy of our wedding day'}</p>

                <p className={styles.cardQuote}>&ldquo;{t('letter.invitation-quote') || 'You changed my world the moment I met you...'}&rdquo;</p>

                <div className={styles.cardOrnament}>
                  <div className={styles.cardOrnamentDot}></div>
                  <div className={styles.cardOrnamentLine}></div>
                  <div className={styles.cardOrnamentDot}></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={`${styles.clickHint} ${isOpen ? styles.hidden : ''}`} id="hint">
          <span className={styles.clickHintText}>{t('letter.click-to-open')}</span>
          <div className={styles.clickHintChevron}></div>
        </div>
      </div>

      {showPetals && <Petals />}
    </div>
  );
};
