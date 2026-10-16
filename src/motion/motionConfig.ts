// Central motion tokens, timing, and easing curves for Varam Foods / FreshMart

export const TIMING = {
  INSTANT: 0.12, // 120ms - icon states, toggle switches, micro feedback
  FAST: 0.18,    // 180ms - dropdowns, tooltips, button hover/press
  STANDARD: 0.28, // 280ms - modals, card hover, tab indicators
  SMOOTH: 0.38,   // 380ms - drawers, page transitions, accordion expands
  CINEMATIC: 0.55 // 550ms - hero reveals, large promotional entrances
} as const;

export const EASING = {
  // Smooth deceleration curve for natural entrances
  EASE_OUT: [0.22, 1, 0.36, 1],
  // Symmetrical luxurious curve for bidirectional moves
  EASE_IN_OUT: [0.16, 1, 0.3, 1],
  // Snappy curve for quick UI exits
  EASE_IN: [0.4, 0, 1, 1],
  // Tactile feedback curve with a gentle overshoot
  SPRING_SUBTLE: [0.34, 1.35, 0.64, 1],
} as const;

export const SPRINGS = {
  gentle: {
    type: 'spring',
    stiffness: 260,
    damping: 24,
    mass: 1,
  },
  snappy: {
    type: 'spring',
    stiffness: 380,
    damping: 26,
    mass: 0.8,
  },
  tactile: {
    type: 'spring',
    stiffness: 500,
    damping: 32,
    mass: 0.6,
  },
  bouncy: {
    type: 'spring',
    stiffness: 340,
    damping: 18,
    mass: 0.9,
  },
} as const;
