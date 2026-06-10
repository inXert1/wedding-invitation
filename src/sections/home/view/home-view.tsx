'use client';

import { useState, useEffect } from 'react';
import { LetterAnimation } from '@/components';
import {
  HeroSection,
  CoupleIntroduction,
  WeddingDetailsCard,
  CountdownTimer,
  VenueInformation,
  EventSchedule,
  AttireGuide,
  RSVP,
  ClosingMessage,
  NavigationOverlay,
  SectionFlowers,
} from '../components';
import { WEDDING_CONFIG } from '@/constants';

export default function HomeView() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [showLetter, setShowLetter] = useState(true);
  const [fadeOutLetter, setFadeOutLetter] = useState(false);

  useEffect(() => {
    if (!showLetter) {
      const timer = setTimeout(() => setIsLoaded(true), 300);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [showLetter]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);

    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  const handleLetterOpen = () => {
    setFadeOutLetter(true);
    setIsLoaded(true);
    setTimeout(() => {
      setShowLetter(false);
    }, 600); // Allow overlay fade-out animation to complete
  };

  return (
    <div className="min-h-screen bg-snow relative">
      <NavigationOverlay onScrollToSection={scrollToSection}>
        {/* Hero Section */}
        <section id="hero" className="relative overflow-hidden">
          <SectionFlowers
            flowers={[
              {
                src: '/assets/images/home-left.png',
                alt: 'Decorative roses',
                position: 'bottom-left',
                width: 'clamp(50vh, 50vw, 650px)',
                priority: true,
              },
              {
                src: '/assets/images/home-right.png',
                alt: 'Decorative flowers',
                position: 'bottom-right',
                width: 'clamp(50vh, 50vw, 600px)',
                priority: true,
              },
            ]}
          />
          <HeroSection
            isLoaded={isLoaded}
            couple={WEDDING_CONFIG}
            onScrollToSection={scrollToSection}
          />
        </section>

        {/* Couple Introduction */}
        <section id="couple" className="relative overflow-hidden">
          <SectionFlowers
            flowers={[
              {
                src: '/assets/images/couple-left-v2.png',
                alt: 'Decorative vintage flowers',
                position: 'top-left',
                width: 'clamp(220px, 35vw, 650px)',
                className: 'max-md:top-[28%] max-md:-left-[16%] md:top-[40%] md:-left-[8%] md:rotate-[160deg]',
              },
              {
                src: '/assets/images/couple-right.png',
                alt: 'Decorative purple flowers with butterfly',
                position: 'bottom-right',
                width: 'clamp(35vh, 45vw, 650px)',
              },
            ]}
          />
          <CoupleIntroduction
            bride={WEDDING_CONFIG.bride}
            groom={WEDDING_CONFIG.groom}
            isVisible={isLoaded}
          />
        </section>

        {/* Wedding Details */}
        <section id="details" className="relative">
          <WeddingDetailsCard
            date={WEDDING_CONFIG.date}
            venue={WEDDING_CONFIG.venue}
          />
          <CountdownTimer targetDate={WEDDING_CONFIG.date} />
        </section>

        {/* Venue Information */}
        <section id="venue" className="relative">
          <VenueInformation venue={WEDDING_CONFIG.venue} />
          <EventSchedule />
        </section>

        {/* Attire Guide Section */}
        <section id="attire" className="relative overflow-hidden">
          <SectionFlowers
            flowers={[
              {
                src: '/assets/images/attire-left.png',
                alt: 'Decorative purple watercolor flowers',
                position: 'bottom-left',
                width: 'clamp(250px, 50vw, 400px)',
              },
              {
                src: '/assets/images/attire-right.png',
                alt: 'Decorative peach flowers',
                position: 'bottom-right',
                width: 'clamp(200px, 25vw, 400px)',
              },
            ]}
          />
          <AttireGuide />
        </section>

        {/* RSVP Section */}
        <section id="rsvp" className="relative overflow-hidden">
          <SectionFlowers
            flowers={[
              {
                src: '/assets/images/RSVP-upper-left.png',
                alt: 'Decorative gold flowers top left',
                position: 'top-left',
                width: 'clamp(180px, 20vw, 350px)',
              },
              {
                src: '/assets/images/RSVP-upper-right.png',
                alt: 'Decorative gold leaves top right',
                position: 'top-right',
                width: 'clamp(150px, 15vw, 300px)',
              },
              {
                src: '/assets/images/RSVP-left.png',
                alt: 'Decorative gold botanical left',
                position: 'bottom-left',
                width: 'clamp(150px, 20vw, 300px)',
              },
              {
                src: '/assets/images/RSVP-right.png',
                alt: 'Decorative gold botanical right',
                position: 'bottom-right',
                width: 'clamp(180px, 25vw, 350px)',
              },
            ]}
          />
          <RSVP />
        </section>

        {/* Closing Message */}
        <section id="closing" className="relative">
          <ClosingMessage
            bride={WEDDING_CONFIG.bride.fullName}
            groom={WEDDING_CONFIG.groom.fullName}
          />
        </section>

      </NavigationOverlay>

      {showLetter && (
        <div
          className={`fixed inset-0 z-50 transition-opacity duration-600 ${fadeOutLetter ? 'opacity-0 pointer-events-none' : 'opacity-100'
            }`}
        >
          <LetterAnimation
            onOpen={handleLetterOpen}
            coupleName={`${WEDDING_CONFIG.groom.name} & ${WEDDING_CONFIG.bride.name}`}
          />
        </div>
      )}
    </div>
  );
}
