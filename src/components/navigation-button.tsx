import { NAVIGATION_ANIMATIONS } from '@/constants/navigation';
import type { NavigationSection } from '@/types/navigation';
import { motion, AnimatePresence } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { Home, Heart, Calendar, MapPin, Mail } from 'lucide-react';
import type { NavIconId } from '@/constants/navigation';

const NAV_ICONS: Record<NavIconId, React.ElementType> = {
  home: Home,
  heart: Heart,
  calendar: Calendar,
  'map-pin': MapPin,
  mail: Mail,
};

interface NavigationButtonProps {
  section: NavigationSection;
  index: number;
  isActive: boolean;
  onClick: () => void;
}

export function NavigationButton({
  section,
  index,
  isActive,
  onClick,
}: NavigationButtonProps) {
  const { t } = useTranslation('home');

  const IconComponent = NAV_ICONS[section.iconId];

  const baseClasses =
    'relative flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-4 py-2 sm:py-2.5 rounded-lg sm:rounded-xl text-xs sm:text-sm font-medium transition-all duration-300 group overflow-hidden cursor-pointer';

  const activeClasses = 'text-snow shadow-lg';

  const inactiveClasses =
    'text-midnight/60 hover:text-amethyst-dark hover:bg-amethyst/10';

  return (
    <motion.button
      onClick={onClick}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, delay: 0.1 * index }}
      whileHover={{ ...NAVIGATION_ANIMATIONS.button.hover }}
      whileTap={{ ...NAVIGATION_ANIMATIONS.button.tap }}
      className={`${baseClasses} ${isActive ? activeClasses : inactiveClasses}`}
    >
      {/* Animated Background for Active State */}
      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ ...NAVIGATION_ANIMATIONS.background.initial }}
            animate={{ ...NAVIGATION_ANIMATIONS.background.animate }}
            exit={{ ...NAVIGATION_ANIMATIONS.background.exit }}
            transition={{ ...NAVIGATION_ANIMATIONS.background.transition }}
            className={`absolute inset-0 bg-gradient-to-r ${section.gradient} rounded-lg sm:rounded-xl`}
          />
        )}
      </AnimatePresence>

      {/* Glow Effect for Active State */}
      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ ...NAVIGATION_ANIMATIONS.background.initial }}
            animate={{ scale: 1.2, opacity: 0.3 }}
            exit={{ ...NAVIGATION_ANIMATIONS.background.exit }}
            transition={{ duration: 0.3 }}
            className={`absolute inset-0 bg-gradient-to-r ${section.gradient} rounded-lg sm:rounded-xl blur-sm -z-10`}
          />
        )}
      </AnimatePresence>

      {/* Icon */}
      <motion.span
        className="relative z-10"
        animate={isActive ? {
          rotate: [...NAVIGATION_ANIMATIONS.icon.active.rotate],
          scale: [...NAVIGATION_ANIMATIONS.icon.active.scale],
        } : {}}
        transition={NAVIGATION_ANIMATIONS.icon.transition}
        whileHover={{ ...NAVIGATION_ANIMATIONS.icon.hover }}
      >
        <IconComponent className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
      </motion.span>

      {/* Label with Slide Animation */}
      <motion.span
        className="hidden sm:inline-block whitespace-nowrap relative z-10 text-xs sm:text-sm"
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3, delay: 0.1 * index }}
      >
        {
          // @ts-expect-error - err
          t(section.labelKey)
        }
      </motion.span>

      {/* Active Indicator Dot with Pulse */}
      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ ...NAVIGATION_ANIMATIONS.background.initial }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ ...NAVIGATION_ANIMATIONS.background.exit }}
            transition={{ ...NAVIGATION_ANIMATIONS.background.transition }}
            className="absolute -bottom-0.5 sm:-bottom-1 left-1/2 -translate-x-1/2 w-0.5 sm:w-1 h-0.5 sm:h-1 bg-snow rounded-full shadow-lg z-10"
          >
            <motion.div
              animate={{ scale: [...NAVIGATION_ANIMATIONS.pulse.animate.scale] }}
              transition={{ ...NAVIGATION_ANIMATIONS.pulse.transition }}
              className="w-full h-full bg-snow rounded-full"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hover Ripple Effect */}
      <motion.div
        className="absolute inset-0 rounded-lg sm:rounded-xl opacity-0 group-hover:opacity-10 transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle at center, #C087B0 0%, transparent 70%)`,
        }}
      />
    </motion.button>
  );
}
