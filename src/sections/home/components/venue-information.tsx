'use client';

import type { WeddingConfigType } from '@/types';
import { motion } from 'motion/react';
import { useInView } from 'react-intersection-observer';
import { useTranslation } from 'react-i18next';
import { generateMapLink } from '@/lib/wedding-utils';
import { Church, Wine, Calendar, Utensils, Bus } from 'lucide-react';

interface VenueInformationProps {
  venue: WeddingConfigType['venue'];
}

export const VenueInformation = ({ venue }: VenueInformationProps) => {
  const { t } = useTranslation('home');

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <div ref={ref} className="py-20 px-4 bg-snow">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-playfair text-midnight mb-4">
            {t('venue.location-title')}
          </h2>
          <div className="w-24 h-px bg-amethyst mx-auto"></div>
          <p className="text-base sm:text-lg md:text-xl text-midnight/60 mt-6 max-w-2xl mx-auto font-cormorant">
            {t('venue.location-subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Ceremony Venue */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: inView ? 1 : 0, x: inView ? 0 : -50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-gradient-to-br from-amethyst/5 to-amethyst/10 rounded-3xl p-8 shadow-lg border border-amethyst/10"
          >
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-amethyst-dark rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Church className="w-8 h-8 text-snow" />
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-playfair text-midnight mb-2">
                {t('venue.ceremony-time')}
              </h3>
              <div className="w-16 h-px bg-amethyst mx-auto"></div>
            </div>

            <div className="space-y-6">
              <div className="text-center">
                <h4 className="text-lg sm:text-xl md:text-2xl font-semibold text-midnight mb-2 font-playfair">
                  {venue.ceremony.name}
                </h4>
                <p className="text-sm sm:text-base md:text-lg text-midnight/60 mb-4 font-dm-sans">
                  {venue.ceremony.address}
                </p>
                <div className="inline-flex items-center gap-2 bg-snow/60 rounded-lg px-4 py-2 shadow-sm">
                  <Calendar className="w-4 h-4 text-amethyst-dark" />
                  <p className="text-amethyst-dark font-medium text-sm sm:text-base font-dm-sans">
                    {venue.ceremony.time}
                  </p>
                </div>
              </div>

              <div className="bg-snow/50 rounded-2xl p-6 space-y-4">
                <h5 className="font-semibold text-midnight mb-3 text-sm sm:text-base font-dm-sans">
                  {t('venue.ceremony-details')}
                </h5>
                <div className="space-y-2 text-xs sm:text-sm text-midnight/60 font-dm-sans">
                  <p>• {t('venue.arrive-early')}</p>
                  <p>• {t('venue.unplugged')}</p>
                  <p>• {t('venue.parking')}</p>
                  <p>• {t('venue.wheelchair')}</p>
                </div>
              </div>

              <button
                onClick={() =>
                  window.open(venue.ceremony.link, '_blank')
                }
                className="w-full bg-midnight text-snow py-3 px-6 rounded-xl font-medium hover:bg-midnight-light transition-all duration-300 shadow-lg hover:shadow-xl text-sm sm:text-base cursor-pointer font-dm-sans"
              >
                {t('venue.view-map')}
              </button>
            </div>
          </motion.div>

          {/* Reception Venue */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: inView ? 1 : 0, x: inView ? 0 : 50 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-gradient-to-br from-midnight/5 to-midnight/8 rounded-3xl p-8 shadow-lg border border-midnight/10"
          >
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-midnight rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Wine className="w-8 h-8 text-snow" />
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-playfair text-midnight mb-2">
                {t('venue.reception-time')}
              </h3>
              <div className="w-16 h-px bg-midnight/30 mx-auto"></div>
            </div>

            <div className="space-y-6">
              <div className="text-center">
                <h4 className="text-lg sm:text-xl md:text-2xl font-semibold text-midnight mb-2 font-playfair">
                  {venue.reception.name}
                </h4>
                <p className="text-sm sm:text-base md:text-lg text-midnight/60 mb-4 font-dm-sans">
                  {venue.reception.address}
                </p>
                <div className="inline-flex items-center gap-2 bg-snow/60 rounded-lg px-4 py-2 shadow-sm">
                  <Utensils className="w-4 h-4 text-midnight" />
                  <p className="text-midnight font-medium text-sm sm:text-base font-dm-sans">
                    {venue.reception.time}
                  </p>
                </div>
              </div>

              <div className="bg-snow/50 rounded-2xl p-6 space-y-4">
                <h5 className="font-semibold text-midnight mb-3 text-sm sm:text-base font-dm-sans">
                  {t('venue.reception-details')}
                </h5>
                <div className="space-y-2 text-xs sm:text-sm text-midnight/60 font-dm-sans">
                  <p>• {t('venue.welcome-drink')}</p>
                  <p>• {t('venue.open-bar')}</p>
                  <p>• {t('venue.dancing')}</p>
                  <p>• {t('venue.valet')}</p>
                </div>
              </div>

              <button
                onClick={() =>
                  window.open(venue.reception.link, '_blank')
                }
                className="w-full bg-amethyst-dark text-snow py-3 px-6 rounded-xl font-medium hover:bg-amethyst transition-all duration-300 shadow-lg hover:shadow-xl text-sm sm:text-base cursor-pointer font-dm-sans"
              >
                {t('venue.view-map')}
              </button>
            </div>
          </motion.div>
        </div>

        {/* Transportation Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 30 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <div className="bg-snow-warm rounded-2xl p-8 max-w-3xl mx-auto border border-amethyst/10">
            <h4 className="text-lg sm:text-xl md:text-2xl font-semibold text-midnight mb-4 flex items-center justify-center font-playfair">
              <Bus className="w-5 h-5 mr-2 text-amethyst" />
              {t('venue.transportation')}
            </h4>
            <p className="text-midnight/60 mb-4 text-sm sm:text-base font-dm-sans">
              {t('venue.shuttle-service')}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm text-midnight/60 font-dm-sans">
              <div className="bg-snow/50 rounded-lg p-4">
                <p className="font-medium">{t('venue.shuttle-schedule')}</p>
                <p>{t('venue.departure')}</p>
                <p>{t('venue.return-trips')}</p>
              </div>
              <div className="bg-snow/50 rounded-lg p-4">
                <p className="font-medium">{t('venue.alternative')}</p>
                <p>{t('venue.taxi-uber')}</p>
                <p>{t('venue.public-parking')}</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
