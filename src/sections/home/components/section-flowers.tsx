'use client';

import Image from 'next/image';

interface FlowerDecoration {
  src: string;
  alt: string;
  position: 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right';
  /** CSS width using clamp() for viewport-proportional sizing */
  width?: string;
  /** Responsive Tailwind class name for custom styling */
  className?: string;
  /** Pass priority to next/image for critical above-the-fold images */
  priority?: boolean;
}

interface SectionFlowersProps {
  flowers: FlowerDecoration[];
}

/**
 * Renders absolutely-positioned decorative flower images within a section.
 * The parent section must have `relative` and `overflow-hidden` classes.
 */
export const SectionFlowers = ({ flowers }: SectionFlowersProps) => {
  return (
    <>
      {flowers.map((flower, index) => {
        const positionClasses = {
          'bottom-left': 'absolute bottom-0 left-0',
          'bottom-right': 'absolute bottom-0 right-0',
          'top-left': 'absolute top-0 left-0',
          'top-right': 'absolute top-0 right-0',
        }[flower.position];

        return (
          <div
            key={index}
            className={`${positionClasses} z-10 pointer-events-none ${flower.className || ''}`}
            style={flower.className ? undefined : { width: flower.width || 'clamp(240px, 25vw, 400px)' }}
          >
            <Image
              src={flower.src}
              alt={flower.alt}
              width={600}
              height={600}
              className="w-full h-auto animate-fade-in"
              priority={flower.priority}
              sizes={flower.className ? undefined : "(max-width: 768px) 50vw, 33vw"}
            />
          </div>
        );
      })}
    </>
  );
};

