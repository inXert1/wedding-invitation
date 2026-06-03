'use client';

import { motion, AnimatePresence } from 'motion/react';
import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Music, Settings, Volume2, Heart, Plus, X, ChevronUp } from 'lucide-react';

interface UnifiedFABProps {
  activeSection: string;
  onScrollToSection: (sectionId: string) => void;
  className?: string;
}

const sections = [
  'hero',
  'couple',
  'details',
  'venue',
  'rsvp',
  'closing',
];

export default function UnifiedFAB({
  activeSection,
  onScrollToSection,
  className = '',
}: UnifiedFABProps) {
  const { t } = useTranslation('home');
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [autoplayBlocked, setAutoplayBlocked] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [showWelcomeMessage, setShowWelcomeMessage] = useState(false);
  const [showAutoplayModal, setShowAutoplayModal] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const handleEnded = () => setIsPlaying(false);

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', handleEnded);

    // Auto-play attempt
    const attemptAutoPlay = async () => {
      try {
        await audio.play();
        setIsPlaying(true);
        setAutoplayBlocked(false);
        setHasInteracted(true);
      } catch {
        setIsPlaying(false);
        setAutoplayBlocked(true);
        setHasInteracted(false);
        setShowAutoplayModal(true);
      }
    };

    const timer = setTimeout(() => {
      attemptAutoPlay();

      const welcomeTimer = setTimeout(() => {
        setShowWelcomeMessage(true);
        setTimeout(() => setShowWelcomeMessage(false), 5000);
      }, 2000);

      return () => clearTimeout(welcomeTimer);
    }, 1500);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', handleEnded);
      clearTimeout(timer);
    };
  }, []);

  const togglePlayPause = async () => {
    const audio = audioRef.current;

    if (!audio) return;

    setShowWelcomeMessage(false);
    setShowAutoplayModal(false);

    try {
      if (isPlaying) {
        audio.pause();
        setIsPlaying(false);
      } else {
        await audio.play();
        setIsPlaying(true);
        setAutoplayBlocked(false);
        setHasInteracted(true);
      }
    } catch {
      setAutoplayBlocked(true);
      setIsPlaying(false);
    }
  };

  const handleAllowAutoplay = () => {
    setShowAutoplayModal(false);
    togglePlayPause();
  };

  const handleDismissModal = () => {
    setShowAutoplayModal(false);
    setShowWelcomeMessage(true);
  };

  const handleNextSection = () => {
    const currentIndex = sections.indexOf(activeSection);
    const nextSection = sections[(currentIndex + 1) % sections.length];
    onScrollToSection(nextSection);
    setIsOpen(false);
  };

  const scrollProgress = (sections.indexOf(activeSection) + 1) / sections.length;

  return (
    <>
      {/* Autoplay Modal */}
      {showAutoplayModal && !hasInteracted && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-midnight/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="bg-snow rounded-2xl shadow-2xl max-w-md w-full p-6 relative overflow-hidden"
          >
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-amethyst/5 to-midnight/5 opacity-50"></div>

            {/* Content */}
            <div className="relative z-10">
              {/* Header */}
              <div className="text-center mb-6">
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-amethyst mb-4"
                >
                  <Music className="w-10 h-10 mx-auto" />
                </motion.div>
                <h3 className="text-xl font-bold text-midnight mb-2 font-bruney">
                  {t('music.enable-music')}
                </h3>
                <p className="text-midnight/60 text-sm font-dm-sans">
                  {t('music.browser-blocked')}
                </p>
              </div>

              {/* Browser Settings Guide */}
              <div className="bg-amethyst/5 rounded-lg p-4 mb-6">
                <h4 className="font-semibold text-midnight mb-2 flex items-center font-dm-sans">
                  <Settings className="w-4 h-4 mr-2 text-amethyst-dark" />
                  {t('music.how-to-enable')}
                </h4>
                <div className="text-midnight/60 text-sm space-y-1 font-dm-sans">
                  <p>
                    • <strong>Chrome/Edge:</strong> {t('music.chrome-edge')}
                  </p>
                  <p>
                    • <strong>Firefox:</strong> {t('music.firefox')}
                  </p>
                  <p>
                    • <strong>Safari:</strong> {t('music.safari')}
                  </p>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex gap-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleAllowAutoplay}
                  className="flex-1 bg-midnight text-snow font-semibold py-3 px-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 cursor-pointer font-dm-sans"
                >
                  {t('music.play-music')}
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleDismissModal}
                  className="px-4 py-3 bg-snow-warm text-midnight/60 font-medium rounded-lg hover:bg-amethyst/10 transition-colors duration-200 cursor-pointer font-dm-sans"
                >
                  {t('music.later')}
                </motion.button>
              </div>

              {/* Footer note */}
              <p className="text-xs text-midnight/40 text-center mt-4 font-dm-sans">
                {t('music.auto-note')}
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Welcome message for autoplay blocked */}
      {showWelcomeMessage && !hasInteracted && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.9 }}
          className="fixed bottom-36 right-6 z-50 bg-midnight text-snow px-4 py-3 rounded-lg shadow-xl backdrop-blur-sm max-w-xs"
        >
          <div className="flex items-center space-x-2">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <Music className="w-5 h-5" />
            </motion.div>
            <div>
              <div className="font-medium text-sm font-dm-sans">
                {t('music.wedding-music')}
              </div>
              <div className="text-xs opacity-90 font-dm-sans">
                {t('music.click-to-start')}
              </div>
            </div>
          </div>
          <motion.div
            className="absolute -bottom-1 right-8 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-midnight"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3 }}
          />
        </motion.div>
      )}

      {/* FAB Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0, y: 100 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{
          duration: 0.6,
          delay: 0.8,
          type: 'spring',
          stiffness: 200,
        }}
        className={`fixed bottom-4 right-4 sm:bottom-6 sm:right-6 pb-[env(safe-area-inset-bottom)] pr-[env(safe-area-inset-right)] z-50 flex flex-col items-center gap-3 ${className}`}
      >
        {/* Hidden audio element */}
        <audio
          ref={audioRef}
          loop
          preload="auto"
          src="/assets/audio/jabili.mp3"
          aria-label="Wedding background music"
        >
          <track
            kind="captions"
            src="/assets/audio/jabili.mp3"
            label="No captions available"
          />
        </audio>

        {/* Expanding Menu Items */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.8 }}
              transition={{ duration: 0.2, staggerChildren: 0.1 }}
              className="flex flex-col gap-3"
            >
              {/* Music Button */}
              <div className="relative group">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={togglePlayPause}
                  className="w-12 h-12 rounded-full bg-snow/95 backdrop-blur-md border border-amethyst/20 shadow-lg flex items-center justify-center text-amethyst-dark cursor-pointer overflow-hidden relative"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-amethyst/5 to-midnight/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  {isPlaying ? (
                    <div className="flex items-center space-x-0.5 relative z-10">
                      <motion.div animate={{ scaleY: [1, 1.5, 1, 2, 1] }} transition={{ duration: 1.5, repeat: Infinity }} className="w-1 h-3 bg-gradient-to-t from-amethyst to-amethyst-dark rounded-full" />
                      <motion.div animate={{ scaleY: [1, 2, 1, 1.5, 1] }} transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }} className="w-1 h-4 bg-gradient-to-t from-amethyst-dark to-midnight rounded-full" />
                      <motion.div animate={{ scaleY: [1, 1.5, 2, 1, 1] }} transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }} className="w-1 h-3 bg-gradient-to-t from-midnight to-amethyst rounded-full" />
                    </div>
                  ) : (
                    <Music className="w-5 h-5 relative z-10" />
                  )}
                </motion.button>
                {/* Tooltip */}
                <div className="absolute right-full top-1/2 -translate-y-1/2 mr-3 bg-midnight/90 text-snow text-xs px-2 py-1 rounded shadow-lg backdrop-blur-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none font-dm-sans flex items-center gap-1">
                  <Volume2 className="w-3 h-3" />
                  {isPlaying ? t('music.playing') : t('music.paused')}
                </div>
              </div>

              {/* Next Section Button */}
              <div className="relative group">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleNextSection}
                  className="w-12 h-12 rounded-full bg-snow/95 backdrop-blur-md border border-amethyst/20 shadow-lg flex items-center justify-center text-amethyst-dark cursor-pointer overflow-hidden relative"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-amethyst/5 to-midnight/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <Heart className="w-5 h-5 relative z-10" fill="currentColor" />
                </motion.button>
                {/* Tooltip */}
                <div className="absolute right-full top-1/2 -translate-y-1/2 mr-3 bg-midnight/90 text-snow text-xs px-2 py-1 rounded shadow-lg backdrop-blur-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none font-dm-sans">
                  Next: <span className="capitalize">{sections[(sections.indexOf(activeSection) + 1) % sections.length] === 'hero' ? 'Home' : sections[(sections.indexOf(activeSection) + 1) % sections.length]}</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Expanding Button */}
        <div className="relative">
          <svg className="w-14 h-14 transform -rotate-90 absolute inset-0" viewBox="0 0 64 64">
            <circle cx="32" cy="32" r="28" fill="none" stroke="rgba(192, 135, 176, 0.1)" strokeWidth="2" />
            <motion.circle
              cx="32"
              cy="32"
              r="28"
              fill="none"
              stroke="url(#gradientMain)"
              strokeWidth="2"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: scrollProgress }}
              transition={{ duration: 0.8, ease: 'easeInOut' }}
              style={{ strokeDasharray: '175.93', strokeDashoffset: 0 }}
            />
            <defs>
              <linearGradient id="gradientMain" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#C087B0" />
                <stop offset="50%" stopColor="#A06B94" />
                <stop offset="100%" stopColor="#31081F" />
              </linearGradient>
            </defs>
          </svg>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(!isOpen)}
            className={`relative w-14 h-14 bg-snow/95 backdrop-blur-md border border-amethyst/20 rounded-full shadow-2xl hover:shadow-amethyst/20 transition-all duration-300 group overflow-hidden cursor-pointer ${autoplayBlocked && !hasInteracted && !isOpen ? 'animate-pulse' : ''
              }`}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-amethyst/5 to-midnight/5 opacity-80 group-hover:opacity-100 transition-opacity duration-300"></div>

            <div className="relative z-10 flex items-center justify-center w-full h-full text-amethyst-dark">
              <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
                {isOpen ? <X className="w-6 h-6" /> : <ChevronUp className="w-6 h-6" />}
              </motion.div>
            </div>

            {/* Warning indicator if autoplay blocked */}
            {autoplayBlocked && !hasInteracted && !isOpen && (
              <div className="absolute top-0 right-0 w-3 h-3 bg-amethyst-dark rounded-full border-2 border-snow"></div>
            )}
          </motion.button>
        </div>
      </motion.div>
    </>
  );
}
