'use client';

import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { useInView } from 'react-intersection-observer';
import { Heart } from 'lucide-react';

interface ClosingMessageProps {
  bride: string;
  groom: string;
}

export const ClosingMessage = ({ bride, groom }: ClosingMessageProps) => {
  const { t } = useTranslation('home');

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <div
      ref={ref}
      className="py-14 px-4 bg-snow-warm"
    >
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 30 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bruney text-midnight mb-6">
            {t('closing-message.title')}
          </h2>
          <div className="w-24 h-px bg-amethyst mx-auto mb-8"></div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: inView ? 1 : 0, scale: inView ? 1 : 0.9 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-snow/60 backdrop-blur-sm rounded-3xl p-6 md:p-8 shadow-xl border border-amethyst/10 mb-8"
        >
          <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-midnight/70 leading-relaxed mb-6 font-cormorant font-light">
            &quot;{t('closing-message.quote')}&quot;
          </p>
          <div className="text-base sm:text-lg text-midnight/50 font-dm-sans">
            {t('closing-message.with-love')}
          </div>
          <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-ballet text-amethyst-dark mt-2">
            {groom} & {bride}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="space-y-4"
        >
          <div className="flex justify-center space-x-4">
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="text-amethyst"
            >
              <Heart className="w-5 h-5" fill="currentColor" />
            </motion.div>
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 0.1 }}
              className="text-amethyst-dark"
            >
              <Heart className="w-6 h-6" fill="currentColor" />
            </motion.div>
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 0.2 }}
              className="text-amethyst"
            >
              <Heart className="w-5 h-5" fill="currentColor" />
            </motion.div>
          </div>

        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: inView ? 1 : 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-10 pt-6 border-t border-amethyst/10"
        >

        </motion.div>
      </div>
    </div>
  );
};
