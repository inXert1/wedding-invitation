'use client';

import { motion } from 'motion/react';
import { useInView } from 'react-intersection-observer';
import { useTranslation } from 'react-i18next';
import { Shirt, Info } from 'lucide-react';

export const AttireGuide = () => {
  const { t } = useTranslation('home');

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.15,
  });

  const femaleColors = [
    { nameKey: 'attire.color-mauve', hex: '#A58390' },
    { nameKey: 'attire.color-berry', hex: '#91224F' },
    { nameKey: 'attire.color-burgundy', hex: '#6B1F32' },
  ] as const;

  const maleColors = [
    { nameKey: 'attire.color-beige', hex: '#E3D7C5' },
    { nameKey: 'attire.color-light-gray', hex: '#CCC5B9' },
    { nameKey: 'attire.color-taupe', hex: '#8E7E73' },
  ] as const;

  return (
    <div
      ref={ref}
      className="py-14 sm:py-16 px-4 bg-snow-warm"
    >
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-10 sm:mb-12"
        >
          <div className="inline-block bg-amethyst/10 rounded-full p-4 mb-6">
            <Shirt className="w-8 h-8 text-amethyst-dark" />
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bruney text-midnight mb-4">
            {t('attire.title')}
          </h2>
          <div className="w-24 h-px bg-amethyst mx-auto"></div>
          <p className="text-base sm:text-lg md:text-xl text-midnight/60 mt-4 max-w-2xl mx-auto font-cormorant leading-relaxed">
            {t('attire.description')}
          </p>
          <p className="text-sm sm:text-base md:text-lg text-amethyst-dark mt-4 max-w-2xl mx-auto font-cormorant italic font-medium">
            {t('attire.encouragement')}
          </p>
        </motion.div>

        {/* Attire Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto items-stretch">
          {/* Female Card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 40 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="group flex flex-col h-full"
          >
            <div className="bg-snow rounded-3xl shadow-xl border border-amethyst/10 overflow-hidden hover:shadow-2xl transition-all duration-500 flex flex-col h-full p-8 sm:p-10">
              <div className="text-center flex flex-col flex-1 justify-between gap-8">
                <div>
                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-bruney text-midnight mb-4">
                    {t('attire.female-label')}
                  </h3>
                  <p className="text-sm sm:text-base text-midnight/70 font-cormorant leading-relaxed max-w-xs mx-auto">
                    {t('attire.female-description')}
                  </p>
                </div>

                <div className="flex flex-col items-center gap-6 mt-auto">
                  {/* Top Swatch */}
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: inView ? 1 : 0, opacity: inView ? 1 : 0 }}
                    transition={{ duration: 0.4, delay: 0.5, type: 'spring' }}
                    className="flex flex-col items-center"
                  >
                    <div
                      className="w-14 h-14 sm:w-16 sm:h-16 rounded-full shadow-lg border-2 border-snow-warm transition-transform duration-300 hover:scale-110"
                      style={{ backgroundColor: femaleColors[0].hex }}
                      title={t(femaleColors[0].nameKey)}
                    />
                    <span className="text-xs sm:text-sm text-midnight/80 font-cormorant font-bold tracking-wide mt-3">
                      {t(femaleColors[0].nameKey)}
                    </span>
                  </motion.div>

                  {/* Bottom Swatches */}
                  <div className="flex gap-8 sm:gap-12 justify-center">
                    {femaleColors.slice(1).map((color, index) => (
                      <motion.div
                        key={color.nameKey}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: inView ? 1 : 0, opacity: inView ? 1 : 0 }}
                        transition={{
                          duration: 0.4,
                          delay: 0.6 + index * 0.1,
                          type: 'spring',
                        }}
                        className="flex flex-col items-center"
                      >
                        <div
                          className="w-14 h-14 sm:w-16 sm:h-16 rounded-full shadow-lg border-2 border-snow-warm transition-transform duration-300 hover:scale-110"
                          style={{ backgroundColor: color.hex }}
                          title={t(color.nameKey)}
                        />
                        <span className="text-xs sm:text-sm text-midnight/80 font-cormorant font-bold tracking-wide mt-3">
                          {t(color.nameKey)}
                        </span>
                      </motion.div>
                    ))}
                  </div>
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
            <div className="bg-snow rounded-3xl shadow-xl border border-amethyst/10 overflow-hidden hover:shadow-2xl transition-all duration-500 flex flex-col h-full p-8 sm:p-10">
              <div className="text-center flex flex-col flex-1 justify-between gap-8">
                <div>
                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-bruney text-midnight mb-4">
                    {t('attire.male-label')}
                  </h3>
                  <p className="text-sm sm:text-base text-midnight/70 font-cormorant leading-relaxed max-w-xs mx-auto">
                    {t('attire.male-description')}
                  </p>
                </div>

                <div className="flex flex-col items-center gap-6 mt-auto">
                  {/* Top Swatch */}
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: inView ? 1 : 0, opacity: inView ? 1 : 0 }}
                    transition={{ duration: 0.4, delay: 0.5, type: 'spring' }}
                    className="flex flex-col items-center"
                  >
                    <div
                      className="w-14 h-14 sm:w-16 sm:h-16 rounded-full shadow-lg border-2 border-snow-warm transition-transform duration-300 hover:scale-110"
                      style={{ backgroundColor: maleColors[0].hex }}
                      title={t(maleColors[0].nameKey)}
                    />
                    <span className="text-xs sm:text-sm text-midnight/80 font-cormorant font-bold tracking-wide mt-3">
                      {t(maleColors[0].nameKey)}
                    </span>
                  </motion.div>

                  {/* Bottom Swatches */}
                  <div className="flex gap-8 sm:gap-12 justify-center">
                    {maleColors.slice(1).map((color, index) => (
                      <motion.div
                        key={color.nameKey}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: inView ? 1 : 0, opacity: inView ? 1 : 0 }}
                        transition={{
                          duration: 0.4,
                          delay: 0.6 + index * 0.1,
                          type: 'spring',
                        }}
                        className="flex flex-col items-center"
                      >
                        <div
                          className="w-14 h-14 sm:w-16 sm:h-16 rounded-full shadow-lg border-2 border-snow-warm transition-transform duration-300 hover:scale-110"
                          style={{ backgroundColor: color.hex }}
                          title={t(color.nameKey)}
                        />
                        <span className="text-xs sm:text-sm text-midnight/80 font-cormorant font-bold tracking-wide mt-3">
                          {t(color.nameKey)}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Friendly Warning */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 30 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="max-w-2xl mx-auto mt-12 bg-white/70 backdrop-blur-md rounded-2xl p-6 md:p-8 border border-amethyst/20 text-center shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-24 h-24 bg-amethyst/5 rounded-full blur-2xl -mr-6 -mt-6"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-amethyst/5 rounded-full blur-2xl -ml-6 -mb-6"></div>

          <div className="relative z-10">
            <div className="inline-block bg-amethyst/10 rounded-full p-3 mb-4 text-amethyst-dark">
              <Info className="w-5 h-5 animate-pulse" />
            </div>

            <p className="text-base sm:text-lg text-midnight/80 font-cormorant leading-relaxed italic max-w-lg mx-auto mb-5">
              {t('attire.warning-text')}
            </p>

            <p className="text-xs sm:text-sm text-amethyst-dark/80 tracking-wider font-cormorant uppercase font-semibold">
              {t('attire.warning-thankyou')}
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
