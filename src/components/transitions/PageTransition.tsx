import React from 'react';
import { motion } from 'framer-motion';
import { pageVariants, reducedMotionPageVariants } from '../../motion/variants';
import { usePrefersReducedMotion } from '../../motion/hooks';

interface PageTransitionProps {
  children: React.ReactNode;
  className?: string;
}

export const PageTransition: React.FC<PageTransitionProps> = ({
  children,
  className = 'w-full',
}) => {
  const prefersReducedMotion = usePrefersReducedMotion();

  React.useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    const frame = requestAnimationFrame(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <motion.div
      variants={prefersReducedMotion ? reducedMotionPageVariants : pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className={className}
    >
      {children}
    </motion.div>
  );
};
