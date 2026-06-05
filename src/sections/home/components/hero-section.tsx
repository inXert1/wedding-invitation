'use client';

import type { WeddingConfigType } from '@/types';
import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { Heart, ChevronDown } from 'lucide-react';

interface HeroSectionProps {
  isLoaded: boolean;
  couple: WeddingConfigType;
  onScrollToSection: (sectionId: string) => void;
}

export const HeroSection = ({
  isLoaded,
  couple,
  onScrollToSection,
}: HeroSectionProps) => {
  const { t } = useTranslation('home');

  return (
    <div className="h-screen bg-snow relative overflow-hidden">
      {/* Subtle background accents */}
      <div className="absolute inset-0 hidden md:block">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-amethyst/8 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-midnight/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-amethyst-light/8 rounded-full blur-3xl"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col h-full px-6 pt-10 sm:pt-18 md:pt-20">
        <div className="flex-1 flex items-center justify-center">
          <div className="max-w-4xl mx-auto text-center">
            {/* Main Heading */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 50 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="mb-6 sm:mb-8"
            >
              <div className="text-sm sm:text-base md:text-lg lg:text-xl text-midnight/50 mb-4 font-medium font-cormorant tracking-widest uppercase">
                {t('hero.welcome')}
              </div>
              <h1 className="text-7xl sm:text-8xl md:text-9xl font-bruney text-midnight mb-6 leading-tight">
                Our
                <span className="block text-amethyst">
                  Wedding
                </span>
              </h1>
              <div className="w-32 h-px bg-amethyst/30 mx-auto"></div>
            </motion.div>

            {/* Couple Names */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: isLoaded ? 1 : 0, scale: isLoaded ? 1 : 0.8 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="mb-6 sm:mb-8"
            >
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 md:gap-8 lg:gap-10 mb-4 sm:mb-6">
                {/* Groom Name */}
                <div className="text-center flex-shrink-0">
                  <h3 className="text-6xl sm:text-7xl md:text-7xl lg:text-8xl font-ballet text-midnight">
                    {couple.groom.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-amethyst-dark font-cormorant italic mt-1">
                    {couple.groom.fullName}
                  </p>
                </div>

                {/* Ampersand */}
                <div className="text-4xl sm:text-5xl md:text-5xl lg:text-6xl text-amethyst font-bruney flex-shrink-0">
                  <Heart className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 mx-auto" fill="currentColor" />
                </div>

                {/* Bride Name */}
                <div className="text-center flex-shrink-0">
                  <h3 className="text-6xl sm:text-7xl md:text-7xl lg:text-8xl font-ballet text-midnight">
                    {couple.bride.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-amethyst-dark font-cormorant italic mt-1">
                    {couple.bride.fullName}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 30 }}
              transition={{ duration: 1, delay: 1.2 }}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center"
            >
              <motion.button
                onClick={() => onScrollToSection('rsvp')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-midnight text-snow px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-sm sm:text-base md:text-lg shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer font-dm-sans hover:bg-midnight-light"
              >
                {t('navigation.rsvp')}
              </motion.button>
              <motion.button
                onClick={() => onScrollToSection('details')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-snow-warm text-midnight px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-sm sm:text-base md:text-lg shadow-lg hover:shadow-xl transition-all duration-300 border border-amethyst/20 cursor-pointer font-dm-sans hover:border-amethyst/40"
              >
                {t('hero.view-details')}
              </motion.button>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="flex justify-center pb-6 sm:pb-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isLoaded ? 1 : 0 }}
            transition={{ duration: 1, delay: 1.5 }}
            className="z-20"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-midnight/40 text-center cursor-pointer"
              onClick={() => onScrollToSection('couple')}
            >
              <div className="text-xs mb-1 sm:mb-2 font-dm-sans">
                {t('hero.scroll-down')}
              </div>
              <ChevronDown className="w-5 h-5 mx-auto" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
