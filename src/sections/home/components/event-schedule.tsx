'use client';

import { motion } from 'motion/react';
import { useInView } from 'react-intersection-observer';
import { useTranslation } from 'react-i18next';
import {
  Users,
  Church,
  Camera,
  UtensilsCrossed,
  Music,
  PartyPopper,
  Sparkles,
  type LucideIcon,
} from 'lucide-react';

interface ScheduleItem {
  time: string;
  event: string;
  description: string;
  icon: LucideIcon;
}

export const EventSchedule = () => {
  const { t } = useTranslation('home');

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const scheduleItems: ScheduleItem[] = [
    {
      time: '1:30 PM',
      event: t('schedule.guest-arrival'),
      description: t('schedule.welcome-drinks'),
      icon: Users,
    },
    {
      time: '2:00 PM',
      event: t('schedule.wedding-ceremony'),
      description: t('schedule.vows'),
      icon: Church,
    },
    {
      time: '3:00 PM',
      event: t('schedule.photography'),
      description: t('schedule.welcome-drink'),
      icon: Camera,
    },
    {
      time: '4:00 PM',
      event: t('schedule.reception-begins'),
      description: t('schedule.dinner-celebration'),
      icon: UtensilsCrossed,
    },
    {
      time: '11:00 PM',
      event: t('schedule.send-off'),
      description: t('schedule.sparkler-farewell'),
      icon: Sparkles,
    },
  ];

  return (
    <div
      ref={ref}
      className="py-16 px-4 bg-snow"
    >
      <div className="max-w-4xl mx-auto overflow-hidden px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h3 className="text-4xl sm:text-5xl md:text-5xl lg:text-6xl font-bruney text-midnight mb-4">
            {t('schedule.title')}
          </h3>
          <div className="w-20 h-px bg-amethyst mx-auto"></div>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 top-0 bottom-0 w-px bg-amethyst/20"></div>

          <div className="space-y-8">
            {scheduleItems.map((item, index) => {
              const IconComponent = item.icon;
              const isEven = index % 2 === 0;

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 30 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`relative flex items-center ${
                    isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                  } flex-row`}
                >
                  {/* Timeline dot */}
                  <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 w-4 h-4 bg-amethyst rounded-full border-4 border-snow shadow-lg z-10"></div>

                  {/* Content side */}
                  <div
                    className={`flex-1 ${
                      isEven
                        ? 'md:text-right md:pr-8'
                        : 'md:text-left md:pl-8'
                    } pl-10 sm:pl-12 md:pl-0`}
                  >
                    <div className="bg-snow rounded-2xl p-6 shadow-lg border border-amethyst/10">
                      <div className="flex items-center mb-2">
                        <span className="bg-amethyst/10 text-amethyst-dark px-3 py-1 rounded-full text-xs sm:text-sm font-medium font-dm-sans">
                          {item.time}
                        </span>
                      </div>
                      <h4 className="text-base sm:text-lg md:text-xl font-semibold text-midnight mb-1 font-bruney">
                        {item.event}
                      </h4>
                      <p className="text-midnight/60 text-xs sm:text-sm md:text-base font-dm-sans">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  {/* Icon side — visible only on md+ (the opposite empty space) */}
                  <div
                    className={`hidden md:flex flex-1 ${
                      isEven
                        ? 'justify-start pl-8'
                        : 'justify-end pr-8'
                    }`}
                  >
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{
                        scale: inView ? 1 : 0,
                        opacity: inView ? 1 : 0,
                      }}
                      transition={{
                        duration: 0.4,
                        delay: index * 0.1 + 0.3,
                        type: 'spring',
                        stiffness: 200,
                      }}
                      className="w-14 h-14 bg-amethyst/8 rounded-2xl flex items-center justify-center border border-amethyst/10 shadow-sm"
                    >
                      <IconComponent className="w-6 h-6 text-amethyst-dark" />
                    </motion.div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
