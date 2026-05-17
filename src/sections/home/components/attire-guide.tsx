'use client';

import { motion } from 'motion/react';
import { useInView } from 'react-intersection-observer';
import { useTranslation } from 'react-i18next';
import { Shirt, Scissors } from 'lucide-react';

export const AttireGuide = () => {
  const { t } = useTranslation('home');

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const femaleColors = ['#551C25', '#7A2934', '#993341', '#A83847', '#B83D4E'];
  const maleColors = ['#966936', '#A5743B', '#B47E41', '#BE884B', '#C4925A'];

  return (
    <div
      ref={ref}
      className="py-20 px-4 bg-gradient-to-b from-snow-warm to-snow"
    >
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
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

        {/* Color Palettes */}
        <div className="grid md:grid-cols-2 gap-12 max-w-3xl mx-auto">
          {/* Female Palette */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: inView ? 1 : 0, x: inView ? 0 : -30 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-snow rounded-3xl p-8 shadow-xl border border-amethyst/10 text-center group hover:shadow-2xl transition-all duration-300"
          >
            <h3 className="text-xl sm:text-2xl font-bruney text-midnight mb-6">
              {t('attire.female-label')}
            </h3>
            <div className="flex flex-wrap justify-center gap-2 sm:gap-4">
              {femaleColors.map((color, index) => (
                <motion.div
                  key={color}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: inView ? 1 : 0, opacity: inView ? 1 : 0 }}
                  transition={{
                    duration: 0.4,
                    delay: 0.4 + index * 0.1,
                    type: 'spring',
                  }}
                  whileHover={{ y: -5, scale: 1.1 }}
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-full shadow-md border-2 border-snow-warm transition-transform cursor-pointer"
                  style={{ backgroundColor: color }}
                  title={color}
                />
              ))}
            </div>
          </motion.div>

          {/* Male Palette */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: inView ? 1 : 0, x: inView ? 0 : 30 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-snow rounded-3xl p-8 shadow-xl border border-amethyst/10 text-center group hover:shadow-2xl transition-all duration-300"
          >
            <h3 className="text-xl sm:text-2xl font-bruney text-midnight mb-6">
              {t('attire.male-label')}
            </h3>
            <div className="flex flex-wrap justify-center gap-2 sm:gap-4">
              {maleColors.map((color, index) => (
                <motion.div
                  key={color}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: inView ? 1 : 0, opacity: inView ? 1 : 0 }}
                  transition={{
                    duration: 0.4,
                    delay: 0.6 + index * 0.1,
                    type: 'spring',
                  }}
                  whileHover={{ y: -5, scale: 1.1 }}
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-full shadow-md border-2 border-snow-warm transition-transform cursor-pointer"
                  style={{ backgroundColor: color }}
                  title={color}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
