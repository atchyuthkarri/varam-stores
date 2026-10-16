import type { Variants } from 'framer-motion';
import { TIMING, EASING } from './motionConfig';

// 1. Page Transition Variants (Smooth subtle fade + minor 10px translate)
export const pageVariants: Variants = {
  initial: {
    opacity: 0,
    y: 10,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: TIMING.STANDARD,
      ease: EASING.EASE_OUT,
    },
  },
  exit: {
    opacity: 0,
    y: -6,
    transition: {
      duration: TIMING.FAST,
      ease: EASING.EASE_IN,
    },
  },
};

// 2. Modal Overlay / Backdrop Variants
export const backdropVariants: Variants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: TIMING.STANDARD,
      ease: 'easeOut',
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: TIMING.FAST,
      ease: 'easeIn',
    },
  },
};

// 3. Modal Dialog Content Variants (Scale 0.96 -> 1, y: 12 -> 0)
export const modalDialogVariants: Variants = {
  initial: {
    opacity: 0,
    scale: 0.96,
    y: 12,
  },
  animate: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: TIMING.STANDARD,
      ease: EASING.EASE_OUT,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.97,
    y: 8,
    transition: {
      duration: TIMING.FAST,
      ease: EASING.EASE_IN,
    },
  },
};

// 4. Slide Drawer Right (Cart Drawer, Mobile Navigation)
export const drawerRightVariants: Variants = {
  initial: {
    x: '100%',
  },
  animate: {
    x: 0,
    transition: {
      duration: TIMING.SMOOTH,
      ease: EASING.EASE_OUT,
    },
  },
  exit: {
    x: '100%',
    transition: {
      duration: TIMING.STANDARD,
      ease: EASING.EASE_IN,
    },
  },
};

// 5. Dropdown Menu Variants (Search Dropdown, Profile Menu)
export const dropdownVariants: Variants = {
  initial: {
    opacity: 0,
    scale: 0.96,
    y: -8,
  },
  animate: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: TIMING.FAST,
      ease: EASING.EASE_OUT,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.96,
    y: -6,
    transition: {
      duration: TIMING.INSTANT,
      ease: EASING.EASE_IN,
    },
  },
};

// 6. Toast Notification Variants
export const toastVariants: Variants = {
  initial: {
    opacity: 0,
    y: 16,
    scale: 0.95,
  },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: TIMING.FAST,
      ease: EASING.EASE_OUT,
    },
  },
  exit: {
    opacity: 0,
    y: 10,
    scale: 0.95,
    transition: {
      duration: TIMING.INSTANT,
      ease: EASING.EASE_IN,
    },
  },
};

// 7. Staggered Container & Item Variants
export const staggerContainer = (staggerChildren = 0.05, delayChildren = 0): Variants => ({
  initial: {},
  animate: {
    transition: {
      staggerChildren,
      delayChildren,
    },
  },
});

export const staggerItem: Variants = {
  initial: {
    opacity: 0,
    y: 14,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: TIMING.STANDARD,
      ease: EASING.EASE_OUT,
    },
  },
};

// 8. Micro-Interactions: Badge Pop when quantity changes
export const badgePopVariants: Variants = {
  initial: { scale: 0.8, opacity: 0 },
  animate: {
    scale: [0.8, 1.25, 1],
    opacity: 1,
    transition: {
      duration: TIMING.FAST,
      ease: EASING.EASE_OUT,
    },
  },
};

// 9. Reduced Motion Variants (Instant or opacity-only transitions)
export const reducedMotionPageVariants: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: TIMING.INSTANT } },
  exit: { opacity: 0, transition: { duration: TIMING.INSTANT } },
};
