'use client';

import type { WeddingConfigType } from '@/types';
import { motion } from 'motion/react';
import { useInView } from 'react-intersection-observer';
import { useTranslation } from 'react-i18next';
import { Heart, Crown } from 'lucide-react';

interface CoupleIntroductionProps {
  bride: WeddingConfigType['bride'];
  groom: WeddingConfigType['groom'];
  isVisible: boolean;
}

export const CoupleIntroduction = ({
  bride,
  groom,
}: CoupleIntroductionProps) => {
  const { t } = useTranslation('home');

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <div
      ref={ref}
      className="py-20 px-4 bg-gradient-to-b from-snow to-snow-warm"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-playfair text-midnight mb-4">
            {t('couple.our-story')}
          </h2>
          <div className="w-24 h-px bg-amethyst mx-auto"></div>
          <p className="text-base sm:text-lg md:text-xl text-midnight/60 mt-6 max-w-2xl mx-auto font-cormorant">
            {t('couple.story-text')}
          </p>
        </motion.div>

        {/* Couple Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Bride Card */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: inView ? 1 : 0, x: inView ? 0 : -50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center lg:text-right"
          >
            <div className="relative inline-block mb-6">
              <div className="w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 bg-gradient-to-br from-amethyst-light/30 to-amethyst/20 rounded-full flex items-center justify-center shadow-2xl border-8 border-snow">
                <span className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-playfair text-amethyst-dark select-none">
                  {bride.name.charAt(0)}
                </span>
              </div>
              <div className="absolute -bottom-4 -right-4 w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-amethyst rounded-full flex items-center justify-center shadow-lg">
                <Crown className="w-5 h-5 sm:w-6 sm:h-6 text-snow" />
              </div>
            </div>

            <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-playfair text-midnight mb-2">
              {bride.fullName}
            </h3>
            <p className="text-base sm:text-lg md:text-xl text-amethyst-dark mb-4 font-medium font-cormorant">
              {t('couple.the-bride')}
            </p>
            <p className="text-sm sm:text-base md:text-lg text-midnight/60 leading-relaxed max-w-md mx-auto lg:mx-0 lg:ml-auto font-dm-sans">
              {t('couple.bride-description')}
            </p>

            {/* Decorative Elements */}
            <div className="mt-6 flex justify-center lg:justify-end space-x-2">
              <div className="w-2 h-2 bg-amethyst-light rounded-full"></div>
              <div className="w-2 h-2 bg-amethyst rounded-full"></div>
              <div className="w-2 h-2 bg-amethyst-dark rounded-full"></div>
            </div>
          </motion.div>

          {/* Heart Divider (Desktop) */}
          <div className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: inView ? 1 : 0, rotate: inView ? 0 : -180 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="w-16 h-16 bg-snow rounded-full flex items-center justify-center shadow-xl border-4 border-amethyst/20"
            >
              <Heart className="w-6 h-6 text-amethyst animate-pulse" fill="currentColor" />
            </motion.div>
          </div>

          {/* Heart Divider (Mobile) */}
          <div className="lg:hidden flex justify-center -my-6 z-10">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: inView ? 1 : 0, rotate: inView ? 0 : -180 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="w-12 h-12 bg-snow rounded-full flex items-center justify-center shadow-xl border-4 border-amethyst/20"
            >
              <Heart className="w-5 h-5 text-amethyst animate-pulse" fill="currentColor" />
            </motion.div>
          </div>

          {/* Groom Card */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: inView ? 1 : 0, x: inView ? 0 : 50 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-center lg:text-left"
          >
            <div className="relative inline-block mb-6">
              <div className="w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 bg-gradient-to-br from-midnight/10 to-midnight-light/15 rounded-full flex items-center justify-center shadow-2xl border-8 border-snow">
                <span className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-playfair text-midnight/70 select-none">
                  {groom.name.charAt(0)}
                </span>
              </div>
              <div className="absolute -bottom-4 -left-4 w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-midnight rounded-full flex items-center justify-center shadow-lg">
                <Crown className="w-5 h-5 sm:w-6 sm:h-6 text-snow" />
              </div>
            </div>

            <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-playfair text-midnight mb-2">
              {groom.fullName}
            </h3>
            <p className="text-base sm:text-lg md:text-xl text-midnight-light mb-4 font-medium font-cormorant">
              {t('couple.the-groom')}
            </p>
            <p className="text-sm sm:text-base md:text-lg text-midnight/60 leading-relaxed max-w-md mx-auto lg:mx-0 font-dm-sans">
              {t('couple.groom-description')}
            </p>

            {/* Decorative Elements */}
            <div className="mt-6 flex justify-center lg:justify-start space-x-2">
              <div className="w-2 h-2 bg-midnight/30 rounded-full"></div>
              <div className="w-2 h-2 bg-midnight/50 rounded-full"></div>
              <div className="w-2 h-2 bg-midnight/70 rounded-full"></div>
            </div>
          </motion.div>
        </div>

        {/* Love Quote */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 30 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-16"
        >
          <div className="bg-snow-warm/60 rounded-2xl p-8 max-w-2xl mx-auto shadow-lg border border-amethyst/10">
            <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-cormorant text-midnight/80 italic mb-4">
              {t('couple.love-quote')}
            </p>
            <p className="text-midnight/40 text-xs sm:text-sm font-dm-sans">— Clannad</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
