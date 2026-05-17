'use client';

import { motion } from 'motion/react';
import { Heart } from 'lucide-react';

interface NavigationFABProps {
  activeSection: string;
  onScrollToSection: (sectionId: string) => void;
}

const sections = [
  'hero',
  'couple',
  'details',
  'venue',
  'rsvp',
  'closing',
];

export default function NavigationFAB({
  activeSection,
  onScrollToSection,
}: NavigationFABProps) {
  const handleNextSection = () => {
    const currentIndex = sections.indexOf(activeSection);
    const nextSection = sections[(currentIndex + 1) % sections.length];

    onScrollToSection(nextSection);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0, y: 100 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.8, type: 'spring', stiffness: 200 }}
      className="fixed bottom-6 right-6 z-50"
    >
      {/* Progress Ring */}
      <div className="relative">
        <svg
          className="w-14 h-14 transform -rotate-90 absolute inset-0"
          viewBox="0 0 64 64"
        >
          {/* Background circle */}
          <circle
            cx="32"
            cy="32"
            r="28"
            fill="none"
            stroke="rgba(192, 135, 176, 0.1)"
            strokeWidth="2"
          />
          {/* Progress circle */}
          <motion.circle
            cx="32"
            cy="32"
            r="28"
            fill="none"
            stroke="url(#gradient)"
            strokeWidth="2"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{
              pathLength:
                (sections.indexOf(activeSection) + 1) / sections.length,
            }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
            style={{
              strokeDasharray: '175.93',
              strokeDashoffset: 0,
            }}
          />
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#C087B0" />
              <stop offset="50%" stopColor="#A06B94" />
              <stop offset="100%" stopColor="#31081F" />
            </linearGradient>
          </defs>
        </svg>

        {/* Main Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative w-14 h-14 bg-snow/95 backdrop-blur-md border border-amethyst/20 rounded-full shadow-2xl hover:shadow-amethyst/20 transition-all duration-300 group overflow-hidden cursor-pointer"
          onClick={handleNextSection}
        >
          {/* Button background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-amethyst/5 to-midnight/5 opacity-80 group-hover:opacity-100 transition-opacity duration-300"></div>

          {/* Animated background effect */}
          <motion.div
            className="absolute inset-0 rounded-full"
            animate={{
              background: [
                'linear-gradient(45deg, rgba(192, 135, 176, 0.1), rgba(160, 107, 148, 0.1), rgba(49, 8, 31, 0.05))',
                'linear-gradient(135deg, rgba(49, 8, 31, 0.05), rgba(192, 135, 176, 0.1), rgba(160, 107, 148, 0.1))',
                'linear-gradient(225deg, rgba(160, 107, 148, 0.1), rgba(49, 8, 31, 0.05), rgba(192, 135, 176, 0.1))',
                'linear-gradient(315deg, rgba(192, 135, 176, 0.1), rgba(160, 107, 148, 0.1), rgba(49, 8, 31, 0.05))',
              ],
            }}
            transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
          />

          {/* Icon container */}
          <div className="relative z-10 flex items-center justify-center w-full h-full">
            <motion.div
              animate={{
                rotate: 360,
                scale: [1, 1.1, 1],
              }}
              transition={{
                rotate: { duration: 8, repeat: Infinity, ease: 'linear' },
                scale: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
              }}
              className="text-amethyst-dark"
            >
              <Heart className="w-5 h-5" fill="currentColor" />
            </motion.div>
          </div>

          {/* Ripple effect on click */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-amethyst/30 to-midnight/20 rounded-full"
            initial={{ scale: 0, opacity: 0 }}
            whileTap={{ scale: 2, opacity: [0, 0.3, 0] }}
            transition={{ duration: 0.4 }}
          />
        </motion.button>

        {/* Section indicator tooltip */}
        <motion.div
          initial={{ opacity: 0, x: 10 }}
          whileHover={{ opacity: 1, x: 0 }}
          className="absolute right-full top-1/2 -translate-y-1/2 mr-4 bg-midnight/90 text-snow text-xs px-3 py-2 rounded-lg shadow-lg backdrop-blur-sm whitespace-nowrap pointer-events-none"
        >
          <div className="font-medium capitalize font-dm-sans">
            {activeSection === 'hero' ? 'Home' : activeSection}
          </div>
          <div className="text-snow/70 text-xs font-dm-sans">
            {sections.indexOf(activeSection) + 1} of {sections.length}
          </div>

          {/* Tooltip arrow */}
          <div className="absolute left-full top-1/2 -translate-y-1/2 border-l-4 border-l-midnight/90 border-y-4 border-y-transparent"></div>
        </motion.div>
      </div>
    </motion.div>
  );
}
