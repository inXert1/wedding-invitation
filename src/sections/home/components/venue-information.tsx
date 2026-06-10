'use client';

import { useState, useCallback, useEffect } from 'react';
import type { WeddingConfigType } from '@/types';
import { motion, AnimatePresence } from 'motion/react';
import { useInView } from 'react-intersection-observer';
import { useTranslation } from 'react-i18next';
import { generateMapLink } from '@/lib/wedding-utils';
import { Church, Wine, Calendar, Utensils, Bus, X, Navigation, MapPin } from 'lucide-react';

interface VenueInformationProps {
  venue: WeddingConfigType['venue'];
}

// Map embed URLs for each venue
const VENUE_EMBEDS = {
  ceremony: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2370.655397273248!2d120.86971019216236!3d14.90229941456296!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x339654e90d6b2b15%3A0x78a0778fe25b9e97!2sSto%20Cristo%20Parish%20Church!5e1!3m2!1sen!2sph!4v1780652731391!5m2!1sen!2sph',
  reception: 'https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d4091.7755073789094!2d120.8705765133264!3d14.90231012714401!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x339655ed954a7431%3A0xe5b3ca98ad2096fe!2sCasa%20Alpedro!5e1!3m2!1sen!2sph!4v1780486393514!5m2!1sen!2sph',
};

type VenueType = 'ceremony' | 'reception';

export const VenueInformation = ({ venue }: VenueInformationProps) => {
  const { t } = useTranslation('home');
  const [activeModal, setActiveModal] = useState<VenueType | null>(null);

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const openModal = useCallback((type: VenueType) => {
    setActiveModal(type);
  }, []);

  const closeModal = useCallback(() => {
    setActiveModal(null);
  }, []);

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal();
    };
    if (activeModal) {
      document.addEventListener('keydown', handleKeyDown);
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = 'hidden';
      if (scrollbarWidth > 0) {
        document.body.style.paddingRight = `${scrollbarWidth}px`;
      }
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    };
  }, [activeModal, closeModal]);

  const getModalData = (type: VenueType) => ({
    name: type === 'ceremony' ? venue.ceremony.name : venue.reception.name,
    address: type === 'ceremony' ? venue.ceremony.address : venue.reception.address,
    link: type === 'ceremony' ? venue.ceremony.link : venue.reception.link,
    embedUrl: VENUE_EMBEDS[type],
    icon: type === 'ceremony' ? Church : Wine,
    title: type === 'ceremony' ? t('venue.ceremony-time') : t('venue.reception-time'),
    accentClass: type === 'ceremony' ? 'bg-amethyst-dark' : 'bg-midnight',
    accentTextClass: type === 'ceremony' ? 'text-amethyst-dark' : 'text-midnight',
    buttonClass: type === 'ceremony'
      ? 'bg-amethyst-dark hover:bg-amethyst'
      : 'bg-midnight hover:bg-midnight-light',
  });

  return (
    <>
      <div ref={ref} className="py-14 px-4 bg-snow">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 30 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-10"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bruney text-midnight mb-4">
              {t('venue.location-title')}
            </h2>
            <div className="w-24 h-px bg-amethyst mx-auto"></div>
            <p className="text-base sm:text-lg md:text-xl text-midnight/60 mt-4 max-w-2xl mx-auto font-cormorant">
              {t('venue.location-subtitle')}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Ceremony Venue */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: inView ? 1 : 0, x: inView ? 0 : -50 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-amethyst/5 rounded-3xl p-6 shadow-lg border border-amethyst/10"
            >
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-amethyst-dark rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Church className="w-8 h-8 text-snow" />
                </div>
                <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bruney text-midnight mb-2">
                  {t('venue.ceremony-time')}
                </h3>
                <div className="w-16 h-px bg-amethyst mx-auto"></div>
              </div>

              <div className="space-y-6">
                <div className="text-center">
                  <h4 className="text-2xl sm:text-3xl md:text-4xl text-midnight mb-2 font-bruney">
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
                  <div className="flex items-center justify-center">
                    <p className="w-full bg-beige border border-amethyst/30 text-amethyst-dark py-3 px-6 rounded-xl font-medium hover:bg-beige-light transition-all duration-300 shadow-lg hover:shadow-xl text-sm sm:text-base cursor-pointer font-dm-sans">
                      {t('venue.promissory')}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => openModal('ceremony')}
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
              className="bg-midnight/5 rounded-3xl p-6 shadow-lg border border-midnight/10"
            >
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-midnight rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Wine className="w-8 h-8 text-snow" />
                </div>
                <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bruney text-midnight mb-2">
                  {t('venue.reception-time')}
                </h3>
                <div className="w-16 h-px bg-midnight/30 mx-auto"></div>
              </div>

              <div className="space-y-6">
                <div className="text-center">
                  <h4 className="text-2xl sm:text-3xl md:text-4xl text-midnight mb-2 font-bruney">
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
                  onClick={() => openModal('reception')}
                  className="w-full bg-amethyst-dark text-snow py-3 px-6 rounded-xl font-medium hover:bg-amethyst transition-all duration-300 shadow-lg hover:shadow-xl text-sm sm:text-base cursor-pointer font-dm-sans"
                >
                  {t('venue.view-map')}
                </button>
              </div>
            </motion.div>
          </div>

          {/* Transportation Info */}

        </div>
      </div>

      {/* Map Modal */}
      <AnimatePresence>
        {activeModal && (() => {
          const data = getModalData(activeModal);
          const IconComponent = data.icon;
          return (
            <motion.div
              key="map-modal-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6"
              onClick={closeModal}
            >
              {/* Backdrop */}
              <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

              {/* Modal Content */}
              <motion.div
                key="map-modal-content"
                initial={{ opacity: 0, scale: 0.9, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 30 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                onClick={(e) => e.stopPropagation()}
                className="relative w-full max-w-2xl bg-snow rounded-3xl shadow-2xl border border-amethyst/15 overflow-hidden"
              >
                {/* Decorative top gradient bar */}
                <div className={`h-1.5 w-full ${data.accentClass}`} />

                {/* Modal Header */}
                <div className="px-6 sm:px-8 pt-6 pb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 ${data.accentClass} rounded-full flex items-center justify-center shadow-md`}>
                        <IconComponent className="w-5 h-5 text-snow" />
                      </div>
                      <div>
                        <h3 className="text-2xl sm:text-3xl font-bruney text-midnight leading-tight">
                          {data.name}
                        </h3>
                        <div className="flex items-center gap-1.5 mt-0.5">
                          <MapPin className={`w-3.5 h-3.5 ${data.accentTextClass}`} />
                          <p className="text-xs sm:text-sm text-midnight/50 font-dm-sans">
                            {data.address}
                          </p>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={closeModal}
                      className="w-9 h-9 rounded-full bg-midnight/5 hover:bg-midnight/10 flex items-center justify-center transition-colors duration-200 cursor-pointer"
                      aria-label="Close modal"
                    >
                      <X className="w-4.5 h-4.5 text-midnight/60" />
                    </button>
                  </div>
                </div>

                {/* Map Embed */}
                <div className="px-6 sm:px-8 pb-4">
                  <div className="relative w-full rounded-2xl overflow-hidden border border-amethyst/10 shadow-inner bg-snow-warm">
                    <div className="aspect-[4/3] sm:aspect-[16/10]">
                      <iframe
                        src={data.embedUrl}
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title={`Map of ${data.name}`}
                        className="absolute inset-0 w-full h-full"
                      />
                    </div>
                  </div>
                </div>

                {/* Modal Footer with Buttons */}
                <div className="px-6 sm:px-8 pb-6 pt-2 flex flex-col sm:flex-row gap-3">
                  <a
                    href={data.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex-1 flex items-center justify-center gap-2 ${data.buttonClass} text-snow py-3 px-6 rounded-xl font-medium transition-all duration-300 shadow-lg hover:shadow-xl text-sm sm:text-base font-dm-sans`}
                  >
                    <Navigation className="w-4 h-4" />
                    {t('venue.get-directions')}
                  </a>
                  <button
                    onClick={closeModal}
                    className="flex-1 flex items-center justify-center gap-2 bg-midnight/5 hover:bg-midnight/10 text-midnight py-3 px-6 rounded-xl font-medium transition-all duration-300 text-sm sm:text-base cursor-pointer font-dm-sans border border-midnight/10"
                  >
                    <X className="w-4 h-4" />
                    {t('venue.close')}
                  </button>
                </div>
              </motion.div>
            </motion.div>
          );
        })()}
      </AnimatePresence>
    </>
  );
};
