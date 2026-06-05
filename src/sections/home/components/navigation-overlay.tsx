'use client';

import { ReactNode } from 'react';
import { useScrollSpy } from '@/hooks/use-scroll-spy';
import { NAVIGATION_SECTIONS } from '@/constants';
import FloatingNavigation from './floating-navigation';
import UnifiedFAB from './unified-fab';
import ScrollProgressIndicator from './scroll-progress-indicator';

interface NavigationOverlayProps {
  children: ReactNode;
  onScrollToSection: (sectionId: string) => void;
}

export const NavigationOverlay = ({ children, onScrollToSection }: NavigationOverlayProps) => {
  // Auto-detect active section using scroll spy
  const activeSection = useScrollSpy(
    NAVIGATION_SECTIONS.map((section) => section.id)
  );

  return (
    <>
      <FloatingNavigation
        activeSection={activeSection}
        onScrollToSection={onScrollToSection}
      />

      {children}

      <UnifiedFAB
        activeSection={activeSection}
        onScrollToSection={onScrollToSection}
      />
      <ScrollProgressIndicator activeSection={activeSection} />
    </>
  );
};
