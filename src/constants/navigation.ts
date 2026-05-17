export const NAVIGATION_ANIMATIONS = {
  navigation: {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay: 0.2 },
  },
  button: {
    hover: { scale: 1.05 },
    tap: { scale: 0.95 },
    transition: { duration: 0.3 },
  },
  background: {
    initial: { scale: 0, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 0, opacity: 0 },
    transition: { duration: 0.3, type: 'spring' as const, stiffness: 300 },
  },
  icon: {
    active: {
      rotate: [0, -10, 10, -10, 0],
      scale: [1, 1.1, 1],
    },
    hover: { scale: 1.2, rotate: 5 },
    transition: { duration: 0.5 },
  },
  pulse: {
    animate: { scale: [1, 1.5, 1] },
    transition: { duration: 2, repeat: Infinity, ease: 'easeInOut' as const },
  },
} as const;

export type NavIconId = 'home' | 'heart' | 'calendar' | 'map-pin' | 'mail' | 'shirt';

export const NAVIGATION_SECTIONS = [
  {
    id: 'hero',
    labelKey: 'navigation.home',
    iconId: 'home' as NavIconId,
    gradient: 'from-amethyst to-amethyst-dark',
  },
  {
    id: 'couple',
    labelKey: 'navigation.couple',
    iconId: 'heart' as NavIconId,
    gradient: 'from-amethyst-dark to-midnight-light',
  },
  {
    id: 'details',
    labelKey: 'navigation.details',
    iconId: 'calendar' as NavIconId,
    gradient: 'from-midnight-light to-midnight',
  },
  {
    id: 'venue',
    labelKey: 'navigation.venue',
    iconId: 'map-pin' as NavIconId,
    gradient: 'from-midnight to-amethyst-dark',
  },
  {
    id: 'attire',
    labelKey: 'navigation.attire',
    iconId: 'shirt' as NavIconId,
    gradient: 'from-amethyst to-amethyst-dark',
  },
  {
    id: 'rsvp',
    labelKey: 'navigation.rsvp',
    iconId: 'mail' as NavIconId,
    gradient: 'from-amethyst-dark to-amethyst',
  },
];
