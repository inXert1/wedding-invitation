'use client';

import { motion } from 'motion/react';
import { useInView } from 'react-intersection-observer';
import { useTranslation } from 'react-i18next';

export const EventSchedule = () => {
  const { t } = useTranslation('home');

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const scheduleItems = [
    {
      time: '3:30 PM',
      event: t('schedule.guest-arrival'),
      description: t('schedule.welcome-drinks'),
    },
    {
      time: '4:00 PM',
      event: t('schedule.wedding-ceremony'),
      description: t('schedule.vows'),
    },
    {
      time: '4:30 PM',
      event: t('schedule.photography'),
      description: t('schedule.welcome-drink'),
    },
    {
      time: '6:30 PM',
      event: t('schedule.reception-begins'),
      description: t('schedule.dinner-celebration'),
    },
    {
      time: '7:30 PM',
      event: t('schedule.first-dance'),
      description: t('schedule.special-moment'),
    },
    {
      time: '8:00 PM',
      event: t('schedule.dancing-party'),
      description: t('schedule.celebration-continues'),
    },
    {
      time: '12:00 AM',
      event: t('schedule.send-off'),
      description: t('schedule.sparkler-farewell'),
    },
  ];

  return (
    <div
      ref={ref}
      className="py-16 px-4 bg-gradient-to-b from-snow to-snow-warm"
    >
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-playfair text-midnight mb-4">
            {t('schedule.title')}
          </h3>
          <div className="w-20 h-px bg-amethyst mx-auto"></div>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 top-0 bottom-0 w-px bg-amethyst/20"></div>

          <div className="space-y-8">
            {scheduleItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 30 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`relative flex items-center ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                } flex-row`}
              >
                {/* Timeline dot */}
                <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 w-4 h-4 bg-amethyst rounded-full border-4 border-snow shadow-lg z-10"></div>

                {/* Content */}
                <div
                  className={`flex-1 ${
                    index % 2 === 0
                      ? 'md:text-right md:pr-8'
                      : 'md:text-left md:pl-8'
                  } pl-12 md:pl-0`}
                >
                  <div className="bg-snow rounded-2xl p-6 shadow-lg border border-amethyst/10">
                    <div className="flex items-center mb-2">
                      <span className="bg-amethyst/10 text-amethyst-dark px-3 py-1 rounded-full text-xs sm:text-sm font-medium font-dm-sans">
                        {item.time}
                      </span>
                    </div>
                    <h4 className="text-base sm:text-lg md:text-xl font-semibold text-midnight mb-1 font-playfair">
                      {item.event}
                    </h4>
                    <p className="text-midnight/60 text-xs sm:text-sm md:text-base font-dm-sans">
                      {item.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
