'use client';

import { useTranslate } from '@/locales';
import { motion } from 'motion/react';
import { useCallback } from 'react';

// Language Toggle Button Component
export function LanguageToggle() {
  const { onChangeLang, currentLang } = useTranslate();

  const isFilipino = currentLang?.value === 'ph';

  const handleChangeLang = useCallback(
    (newLang: string) => {
      onChangeLang(newLang);
    },
    [onChangeLang]
  );

  return (
    <motion.button
      onClick={() => handleChangeLang(isFilipino ? 'en' : 'ph')}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, delay: 0.6 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="relative flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-4 py-2 sm:py-2.5 rounded-lg sm:rounded-xl text-xs sm:text-sm font-medium transition-all duration-300 group overflow-hidden cursor-pointer text-midnight/60 hover:text-amethyst-dark hover:bg-amethyst/10 font-dm-sans"
      title={`Switch to ${isFilipino ? 'English' : 'Filipino'}`}
    >
      {/* Icon with Flag Animation */}
      <motion.span
        className="text-sm sm:text-base relative z-10"
        animate={{
          rotate: [0, -5, 5, -5, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        whileHover={{ scale: 1.2, rotate: 10 }}
      >
        {isFilipino ? '🇵🇭' : '🇺🇸'}
      </motion.span>

      {/* Language Label */}
      <motion.span
        className="hidden sm:inline-block whitespace-nowrap relative z-10 text-xs sm:text-sm font-medium"
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3, delay: 0.7 }}
      >
        {isFilipino ? 'PH' : 'EN'}
      </motion.span>

      {/* Hover Ripple Effect */}
      <motion.div
        className="absolute inset-0 rounded-lg sm:rounded-xl opacity-0 group-hover:opacity-10 transition-opacity duration-300"
        style={{
          background:
            'radial-gradient(circle at center, #C087B0 0%, transparent 70%)',
        }}
      />

      {/* Active State Background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-amethyst/10 to-amethyst-dark/10 rounded-lg sm:rounded-xl"
        initial={{ scale: 0, opacity: 0 }}
        whileHover={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
      />
    </motion.button>
  );
}
