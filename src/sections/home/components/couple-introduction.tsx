'use client';

import type { WeddingConfigType } from '@/types';
import { motion } from 'motion/react';
import { useInView } from 'react-intersection-observer';
import { useTranslation } from 'react-i18next';
import { Heart, Crown } from 'lucide-react';
import Image from 'next/image';

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
      className="py-14 px-4 bg-snow"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bruney text-midnight mb-4">
            {t('couple.our-story')}
          </h2>
          <div className="w-24 h-px bg-amethyst mx-auto"></div>
          <p className="text-base sm:text-lg md:text-xl text-midnight/60 mt-4 max-w-2xl mx-auto font-cormorant">
            {t('couple.story-text')}
          </p>
        </motion.div>

        {/* Couple Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 relative">
          {/* Groom Card */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: inView ? 1 : 0, x: inView ? 0 : -50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center lg:text-right relative"
          >
            {/* Groom Flower */}
            <div className="absolute top-[5%] -left-4 md:-left-[10%] lg:-left-[15%] w-[180px] sm:w-[220px] md:w-[280px] lg:w-[350px] -z-10 pointer-events-none">
              <Image
                src="/assets/images/couple-left-v2.png"
                alt="Decorative vintage flowers"
                width={600}
                height={600}
                className="w-full h-auto max-md:-rotate-6 md:rotate-[160deg]"
              />
            </div>

            <div className="relative inline-block mb-4">
              <div className="w-36 h-36 min-[400px]:w-40 min-[400px]:h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 rounded-full overflow-hidden shadow-2xl border-8 border-snow">
                <Image
                  src="/assets/images/tiryu.jpg"
                  alt={groom.fullName}
                  width={256}
                  height={256}
                  className="w-full h-full object-cover"
                  priority
                />
              </div>
              <div className="absolute -bottom-4 -right-4 w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-midnight rounded-full flex items-center justify-center shadow-lg">
                <Crown className="w-5 h-5 sm:w-6 sm:h-6 text-snow" />
              </div>
            </div>

            <h3 className="text-4xl sm:text-5xl md:text-5xl lg:text-6xl font-ballet text-midnight mb-1">
              {groom.fullName}
            </h3>
            <p className="text-base sm:text-lg md:text-xl text-midnight-light mb-2 font-medium font-cormorant">
              {t('couple.the-groom')}
            </p>


            {/* Decorative Elements */}
            <div className="mt-4 flex justify-center lg:justify-end space-x-2">
              <div className="w-2 h-2 bg-midnight/30 rounded-full"></div>
              <div className="w-2 h-2 bg-midnight/50 rounded-full"></div>
              <div className="w-2 h-2 bg-midnight/70 rounded-full"></div>
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
              <motion.div
                animate={{
                  scale: [1, 1.15, 1],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="text-amethyst flex items-center justify-center"
              >
                <Heart className="w-6 h-6" fill="currentColor" />
              </motion.div>
            </motion.div>
          </div>

          {/* Heart Divider (Mobile) */}
          <div className="lg:hidden flex justify-center -my-4 z-10">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: inView ? 1 : 0, rotate: inView ? 0 : -180 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="w-12 h-12 bg-snow rounded-full flex items-center justify-center shadow-xl border-4 border-amethyst/20"
            >
              <motion.div
                animate={{
                  scale: [1, 1.15, 1],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="text-amethyst flex items-center justify-center"
              >
                <Heart className="w-5 h-5" fill="currentColor" />
              </motion.div>
            </motion.div>
          </div>

          {/* Bride Card */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: inView ? 1 : 0, x: inView ? 0 : 50 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-center lg:text-left"
          >
            <div className="relative inline-block mb-4">
              <div className="w-36 h-36 min-[400px]:w-40 min-[400px]:h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 rounded-full overflow-hidden shadow-2xl border-8 border-snow">
                <Image
                  src="/assets/images/juhjuh.jpg"
                  alt={bride.fullName}
                  width={256}
                  height={256}
                  className="w-full h-full object-cover"
                  priority
                />
              </div>
              <div className="absolute -bottom-4 -left-4 w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-amethyst rounded-full flex items-center justify-center shadow-lg">
                <Crown className="w-5 h-5 sm:w-6 sm:h-6 text-snow" />
              </div>
            </div>

            <h3 className="text-4xl sm:text-5xl md:text-5xl lg:text-6xl font-ballet text-midnight mb-1">
              {bride.fullName}
            </h3>
            <p className="text-base sm:text-lg md:text-xl text-amethyst-dark mb-2 font-medium font-cormorant">
              {t('couple.the-bride')}
            </p>


            {/* Decorative Elements */}
            <div className="mt-4 flex justify-center lg:justify-start space-x-2">
              <div className="w-2 h-2 bg-amethyst-light rounded-full"></div>
              <div className="w-2 h-2 bg-amethyst rounded-full"></div>
              <div className="w-2 h-2 bg-amethyst-dark rounded-full"></div>
            </div>
          </motion.div>
        </div>


      </div>
    </div>
  );
};
