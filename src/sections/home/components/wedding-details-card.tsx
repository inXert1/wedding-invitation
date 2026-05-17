'use client';

import { motion } from 'motion/react';
import {
  formatWeddingTime,
  generateGoogleCalendarLink,
  generateMapLink,
} from '@/lib/wedding-utils';
import type { WeddingConfigType } from '@/types';
import { useTranslation } from 'react-i18next';
import { useTranslate } from '@/locales';
import { Heart, Calendar, Church, PartyPopper, MapPin, Shirt, Car, Smartphone, CalendarDays, ArrowRight } from 'lucide-react';

interface WeddingDetailsCardProps {
  date: Date;
  venue: WeddingConfigType['venue'];
}

export const WeddingDetailsCard = ({
  date,
  venue,
}: WeddingDetailsCardProps) => {
  const { currentLang } = useTranslate();
  const { t } = useTranslation('home');

  const calendarEvent = {
    title: t('details.our-wedding-day'),
    start: date,
    end: new Date(date.getTime() + 5 * 60 * 60 * 1000),
    description: t('details.join-us'),
    location: venue.ceremony.address,
  };

  return (
    <div className="py-20 bg-gradient-to-br from-snow to-snow-warm">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-playfair text-midnight mb-4">
            {t('details.title')}
          </h2>
          <div className="w-24 h-px bg-amethyst mx-auto mb-6"></div>
          <p className="text-lg sm:text-xl md:text-2xl text-midnight/60 max-w-2xl mx-auto font-cormorant">
            {t('details.join-us-text')}
          </p>
        </motion.div>

        {/* Date Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative bg-snow rounded-3xl shadow-2xl p-8 sm:p-10 md:p-12 mb-12 border border-amethyst/10 overflow-hidden group"
        >
          {/* Background Decorations */}
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-amethyst/5 rounded-full blur-3xl group-hover:scale-110 transition-transform duration-500"></div>
          <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-midnight/5 rounded-full blur-3xl group-hover:scale-110 transition-transform duration-500"></div>

          <div className="relative z-10">
            {/* Save the Date Header */}
            <div className="text-center mb-8">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="inline-flex items-center gap-3 bg-amethyst/10 rounded-full px-6 py-3 mb-6 border border-amethyst/20"
              >
                <Heart className="w-5 h-5 text-amethyst" fill="currentColor" />
                <span className="text-sm sm:text-base font-semibold text-amethyst-dark tracking-wide uppercase font-dm-sans">
                  {t('details.date')}
                </span>
              </motion.div>
            </div>

            {/* Date Display */}
            <div className="flex flex-col sm:flex-row items-stretch justify-center gap-6 sm:gap-8 md:gap-12 mb-8">
              {/* Day */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="text-center group-hover:scale-105 transition-transform duration-300 flex-1 sm:flex-none"
              >
                <div className="bg-midnight text-snow rounded-2xl p-4 sm:p-6 shadow-lg mb-2 h-24 sm:h-28 md:h-32 lg:h-36 flex flex-col items-center justify-center min-w-[100px] sm:min-w-[120px] md:min-w-[140px]">
                  <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-none font-playfair">
                    {date.getDate()}
                  </div>
                </div>
                <p className="text-xs sm:text-sm font-medium text-midnight/50 uppercase tracking-wider mt-3 font-dm-sans">
                  {t('details.day')}
                </p>
              </motion.div>

              {/* Month */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="text-center group-hover:scale-105 transition-transform duration-300 flex-1 sm:flex-none"
              >
                <div className="bg-amethyst-dark text-snow rounded-2xl p-4 sm:p-6 shadow-lg mb-2 h-24 sm:h-28 md:h-32 lg:h-36 flex flex-col items-center justify-center min-w-[100px] sm:min-w-[120px] md:min-w-[140px]">
                  <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-none mb-1 font-playfair">
                    {date
                      .toLocaleDateString(currentLang.numberFormat.code, {
                        month: 'short',
                      })
                      .toUpperCase()}
                  </div>
                  <div className="text-sm sm:text-base md:text-lg font-medium opacity-90 font-dm-sans">
                    {date.getFullYear()}
                  </div>
                </div>
                <p className="text-xs sm:text-sm font-medium text-midnight/50 uppercase tracking-wider mt-3 font-dm-sans">
                  {t('details.month')} & {t('details.year')}
                </p>
              </motion.div>

              {/* Time */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="text-center group-hover:scale-105 transition-transform duration-300 flex-1 sm:flex-none"
              >
                <div className="bg-amethyst text-snow rounded-2xl p-4 sm:p-6 shadow-lg mb-2 h-24 sm:h-28 md:h-32 lg:h-36 flex flex-col items-center justify-center min-w-[100px] sm:min-w-[120px] md:min-w-[140px]">
                  <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold leading-none font-playfair">
                    {formatWeddingTime(date, currentLang.numberFormat.code)}
                  </div>
                </div>
                <p className="text-xs sm:text-sm font-medium text-midnight/50 uppercase tracking-wider mt-3 font-dm-sans">
                  {t('details.time')}
                </p>
              </motion.div>
            </div>

            {/* Weekday Display */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="text-center mb-8 px-2"
            >
              <div className="relative inline-block w-full max-w-sm sm:max-w-md md:max-w-lg bg-snow-warm rounded-2xl sm:rounded-3xl px-4 py-4 sm:px-6 sm:py-5 md:px-8 md:py-6 shadow-xl border border-amethyst/10 group/weekday hover:shadow-2xl transition-all duration-300">
                {/* Decorative elements */}
                <div className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 w-4 h-4 sm:w-6 sm:h-6 bg-amethyst rounded-full opacity-60 group-hover/weekday:scale-110 transition-transform duration-300"></div>
                <div className="absolute -bottom-1 -left-1 sm:-bottom-2 sm:-left-2 w-3 h-3 sm:w-4 sm:h-4 bg-midnight rounded-full opacity-40 group-hover/weekday:scale-110 transition-transform duration-300"></div>

                <div className="relative z-10">
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 mb-3">
                    <CalendarDays className="w-6 h-6 sm:w-7 sm:h-7 text-amethyst" />
                    <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-playfair text-midnight font-bold text-center leading-tight">
                      {date.toLocaleDateString(currentLang.numberFormat.code, {
                        weekday: 'long',
                      })}
                    </p>
                    <CalendarDays className="w-6 h-6 sm:w-7 sm:h-7 text-amethyst hidden sm:block" />
                  </div>
                  <div className="w-16 sm:w-20 md:w-24 h-px bg-gradient-to-r from-transparent via-amethyst to-transparent mx-auto mb-3"></div>
                  <p className="text-sm sm:text-base md:text-lg lg:text-xl text-midnight/60 font-medium font-cormorant">
                    {date.toLocaleDateString(currentLang.numberFormat.code, {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </p>
                  <p className="text-xs sm:text-sm md:text-base text-amethyst-dark font-semibold mt-2 font-dm-sans">
                    {t('details.mark-calendar')}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Call to Action */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="text-center"
            >
              <motion.a
                href={generateGoogleCalendarLink(calendarEvent)}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-3 bg-midnight text-snow px-8 py-4 rounded-2xl font-semibold text-base sm:text-lg shadow-xl hover:shadow-2xl transition-all duration-300 group/btn font-dm-sans"
              >
                <Calendar className="w-5 h-5 group-hover/btn:scale-110 transition-transform duration-200" />
                <span>{t('details.add-to-calendar')}</span>
                <motion.span
                  className="text-sm opacity-75"
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ArrowRight className="w-4 h-4" />
                </motion.span>
              </motion.a>

              <p className="text-xs sm:text-sm text-midnight/40 mt-4 max-w-md mx-auto font-dm-sans">
                {t('details.message')}
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* Venue Cards */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Ceremony Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-snow rounded-3xl shadow-xl p-8 border border-amethyst/10 group hover:shadow-2xl transition-all duration-300"
          >
            <div className="text-center mb-6">
              <div className="inline-block bg-amethyst/10 rounded-full p-4 mb-4 group-hover:scale-110 transition-transform duration-300">
                <Church className="w-8 h-8 text-amethyst-dark" />
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-midnight mb-2 font-playfair">
                {t('details.ceremony')}
              </h3>
              <div className="w-16 h-px bg-amethyst mx-auto"></div>
            </div>

            <div className="space-y-4 text-center">
              <div>
                <h4 className="font-semibold text-midnight mb-1 text-sm sm:text-base font-dm-sans">
                  {venue.ceremony.name}
                </h4>
                <p className="text-midnight/60 text-xs sm:text-sm font-dm-sans">
                  {venue.ceremony.address}
                </p>
              </div>

              <div className="bg-snow-warm rounded-xl p-4">
                <p className="font-medium text-midnight text-sm sm:text-base font-dm-sans">
                  {t('details.time')}
                </p>
                <p className="text-amethyst-dark font-semibold text-sm sm:text-base font-dm-sans">
                  {venue.ceremony.time}
                </p>
              </div>

              <motion.a
                href={generateMapLink(venue.ceremony.name)}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 bg-midnight text-snow px-4 py-2 rounded-full text-sm font-medium hover:shadow-lg transition-all duration-300 font-dm-sans"
              >
                <MapPin className="w-4 h-4" /> {t('details.get-directions')}
              </motion.a>
            </div>
          </motion.div>

          {/* Reception Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="bg-snow rounded-3xl shadow-xl p-8 border border-amethyst/10 group hover:shadow-2xl transition-all duration-300"
          >
            <div className="text-center mb-6">
              <div className="inline-block bg-midnight/10 rounded-full p-4 mb-4 group-hover:scale-110 transition-transform duration-300">
                <PartyPopper className="w-8 h-8 text-midnight" />
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-midnight mb-2 font-playfair">
                {t('details.reception')}
              </h3>
              <div className="w-16 h-px bg-midnight/30 mx-auto"></div>
            </div>

            <div className="space-y-4 text-center">
              <div>
                <h4 className="font-semibold text-midnight mb-1 text-sm sm:text-base font-dm-sans">
                  {venue.reception.name}
                </h4>
                <p className="text-midnight/60 text-xs sm:text-sm font-dm-sans">
                  {venue.reception.address}
                </p>
              </div>

              <div className="bg-snow-warm rounded-xl p-4">
                <p className="font-medium text-midnight text-sm sm:text-base font-dm-sans">
                  {t('details.time')}
                </p>
                <p className="text-amethyst-dark font-semibold text-sm sm:text-base font-dm-sans">
                  {venue.reception.time}
                </p>
              </div>

              <motion.a
                href={generateMapLink(venue.reception.name)}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 bg-amethyst-dark text-snow px-4 py-2 rounded-full text-sm font-medium hover:shadow-lg transition-all duration-300 font-dm-sans"
              >
                <MapPin className="w-4 h-4" /> {t('details.get-directions')}
              </motion.a>
            </div>
          </motion.div>
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-12 text-center"
        >
          <div className="bg-snow-warm rounded-2xl p-8 border border-amethyst/10">
            <h4 className="text-lg sm:text-xl md:text-2xl font-semibold text-midnight mb-4 font-playfair">
              {t('details.please-note')}
            </h4>
            <div className="grid md:grid-cols-3 gap-6 text-xs sm:text-sm text-midnight/60 font-dm-sans">
              <div className="flex flex-col items-center">
                <Shirt className="w-6 h-6 mb-2 text-amethyst" />
                <p className="font-medium">{t('details.dress-code')}</p>
                <p>{t('details.formal-attire')}</p>
              </div>
              <div className="flex flex-col items-center">
                <Car className="w-6 h-6 mb-2 text-amethyst" />
                <p className="font-medium">{t('details.parking')}</p>
                <p>{t('details.valet-available')}</p>
              </div>
              <div className="flex flex-col items-center">
                <Smartphone className="w-6 h-6 mb-2 text-amethyst" />
                <p className="font-medium">{t('details.contact')}</p>
                <p>+63 XXX XXX XXXX</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
