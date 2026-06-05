'use client';

import { NAVIGATION_SECTIONS } from '@/constants';
import { motion } from 'motion/react';

interface ScrollProgressIndicatorProps {
  activeSection: string;
}

const sections = NAVIGATION_SECTIONS.map((section) => section.id);

export default function ScrollProgressIndicator({
  activeSection,
}: ScrollProgressIndicatorProps) {
  const progress = (sections.indexOf(activeSection) + 1) / sections.length;

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-amethyst origin-left z-40"
      initial={{ scaleX: 0 }}
      animate={{ scaleX: progress }}
      transition={{ duration: 0.3 }}
    />
  );
}
