'use client';

import { motion } from 'motion/react';
import { useInView } from 'react-intersection-observer';
import { useTranslation } from 'react-i18next';
import { Shirt } from 'lucide-react';
import Image from 'next/image';

export const AttireGuide = () => {
  const { t } = useTranslation('home');

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.15,
  });

  const femaleColors = ['#551C25', '#7A2934', '#993341', '#A83847', '#B83D4E'];
  const maleColors = ['#966936', '#A5743B', '#B47E41', '#BE884B', '#C4925A'];

  return (
    <div
      ref={ref}
      className="py-20 sm:py-28 px-4 bg-snow-warm"
    >
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 sm:mb-20"
        >
          <div className="inline-block bg-amethyst/10 rounded-full p-4 mb-6">
            <Shirt className="w-8 h-8 text-amethyst-dark" />
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bruney text-midnight mb-4">
            {t('attire.title')}
          </h2>
          <div className="w-24 h-px bg-amethyst mx-auto"></div>
          <p className="text-base sm:text-lg md:text-xl text-midnight/60 mt-6 max-w-2xl mx-auto font-cormorant leading-relaxed">
            {t('attire.description')}
          </p>
          <p className="text-sm sm:text-base md:text-lg text-amethyst-dark mt-4 max-w-2xl mx-auto font-cormorant italic font-medium">
            {t('attire.encouragement')}
          </p>
        </motion.div>

        {/* Attire Cards with Illustrations */}
        <div className="grid md:grid-cols-2 gap-8 sm:gap-12 max-w-4xl mx-auto items-stretch">
          {/* Female Card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 40 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="group flex flex-col h-full"
          >
            <div className="bg-snow rounded-3xl shadow-xl border border-amethyst/10 overflow-hidden hover:shadow-2xl transition-all duration-500 flex flex-col h-full">
              {/* Illustration */}
              <div className="relative overflow-hidden bg-amethyst/5 flex-shrink-0 h-[300px] sm:h-[360px] md:h-[400px]">
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                  className="relative w-full flex items-center justify-center py-8 sm:py-10"
                >
                  <Image
                    src="/assets/images/female.png"
                    alt={t('attire.female-label')}
                    width={320}
                    height={380}
                    className="object-contain max-h-[280px] sm:max-h-[340px] md:max-h-[380px] drop-shadow-lg"
                    priority
                  />
                </motion.div>

              </div>

              {/* Label & Colors */}
              <div className="px-6 sm:px-8 pb-8 pt-4 text-center flex flex-col flex-1 justify-between">
                <div>
                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-bruney text-midnight mb-2">
                    {t('attire.female-label')}
                  </h3>
                  <p className="text-sm sm:text-base text-midnight/70 font-cormorant mb-6 leading-relaxed max-w-xs mx-auto">
                    {t('attire.female-description')}
                  </p>
                </div>
                <div className="flex flex-wrap justify-center gap-2.5 sm:gap-3.5 mt-auto">
                  {femaleColors.map((color, index) => (
                    <motion.div
                      key={color}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: inView ? 1 : 0, opacity: inView ? 1 : 0 }}
                      transition={{
                        duration: 0.4,
                        delay: 0.5 + index * 0.1,
                        type: 'spring',
                      }}
                      whileHover={{ y: -5, scale: 1.15 }}
                      className="w-10 h-10 sm:w-12 sm:h-12 rounded-full shadow-md border-2 border-snow-warm cursor-pointer"
                      style={{ backgroundColor: color }}
                      title={color}
                    />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Male Card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 40 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="group flex flex-col h-full"
          >
            <div className="bg-snow rounded-3xl shadow-xl border border-amethyst/10 overflow-hidden hover:shadow-2xl transition-all duration-500 flex flex-col h-full">
              {/* Illustration */}
              <div className="relative overflow-hidden bg-amethyst/5 flex-shrink-0 h-[300px] sm:h-[360px] md:h-[400px]">
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                  className="relative w-full flex items-center justify-center py-8 sm:py-10"
                >
                  <Image
                    src="/assets/images/male.png"
                    alt={t('attire.male-label')}
                    width={320}
                    height={380}
                    className="object-contain max-h-[280px] sm:max-h-[340px] md:max-h-[380px] drop-shadow-lg"
                    priority
                  />
                </motion.div>

              </div>

              {/* Label & Colors */}
              <div className="px-6 sm:px-8 pb-8 pt-4 text-center flex flex-col flex-1 justify-between">
                <div>
                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-bruney text-midnight mb-2">
                    {t('attire.male-label')}
                  </h3>
                  <p className="text-sm sm:text-base text-midnight/70 font-cormorant mb-6 leading-relaxed max-w-xs mx-auto">
                    {t('attire.male-description')}
                  </p>
                </div>
                <div className="flex flex-wrap justify-center gap-2.5 sm:gap-3.5 mt-auto">
                  {maleColors.map((color, index) => (
                    <motion.div
                      key={color}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: inView ? 1 : 0, opacity: inView ? 1 : 0 }}
                      transition={{
                        duration: 0.4,
                        delay: 0.7 + index * 0.1,
                        type: 'spring',
                      }}
                      whileHover={{ y: -5, scale: 1.15 }}
                      className="w-10 h-10 sm:w-12 sm:h-12 rounded-full shadow-md border-2 border-snow-warm cursor-pointer"
                      style={{ backgroundColor: color }}
                      title={color}
                    />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
