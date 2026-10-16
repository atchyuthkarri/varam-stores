import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Leaf, Sparkles } from 'lucide-react';

export const Preloader: React.FC = () => {
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);
  const [isRendered, setIsRendered] = useState(true);

  useEffect(() => {
    // Fast, smooth luxury progress over ~650ms
    const startTime = Date.now();
    const duration = 650;

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const rawProgress = Math.min(100, Math.round((elapsed / duration) * 100));

      // Ease-out cubic curve for natural deceleration
      const t = rawProgress / 100;
      const eased = Math.round((1 - Math.pow(1 - t, 3)) * 100);

      setProgress(eased);

      if (rawProgress >= 100) {
        clearInterval(interval);
        setTimeout(() => setIsDone(true), 120);
        setTimeout(() => setIsRendered(false), 750);
      }
    }, 25);

    return () => clearInterval(interval);
  }, []);

  const handleSkip = () => {
    setIsDone(true);
    setTimeout(() => setIsRendered(false), 300);
  };

  if (!isRendered) return null;

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          key="preloader-overlay"
          initial={{ opacity: 1, y: 0 }}
          exit={{
            y: '-100%',
            transition: {
              duration: 0.65,
              ease: [0.76, 0, 0.24, 1], // Luxury curtain wipe
            },
          }}
          onClick={handleSkip}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white text-[#18181B] cursor-pointer select-none overflow-hidden"
          aria-label="Loading Varam Foods"
          role="status"
        >
          {/* Subtle warm sunlit ambient background */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(245,209,3,0.12)_0%,_rgba(255,255,255,0.95)_60%,_#FFFFFF_100%)] pointer-events-none" />

          {/* Delicate luxury mesh lines */}
          <div
            className="absolute inset-0 opacity-[0.025] pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(circle at 1px 1px, #18181B 1px, transparent 0)',
              backgroundSize: '32px 32px',
            }}
          />

          {/* Centerpiece Branding Content */}
          <div className="relative z-10 flex flex-col items-center px-6 max-w-sm mx-auto text-center">
            {/* Organic Brand Pill Badge */}
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="inline-flex items-center gap-1.5 text-[#245E4A] text-xs font-bold uppercase tracking-widest mb-4"
            >
              <Leaf className="w-3.5 h-3.5 fill-[#245E4A]" />
              <span>Varam Foods</span>
            </motion.div>

            {/* Official Brand Logo with gentle breathing pulse */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 6 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="relative mb-5"
            >
              <img
                src="/varam-logo-clean.png"
                alt="Varam Foods"
                className="w-48 sm:w-56 h-auto object-contain drop-shadow-xs"
              />
            </motion.div>

            {/* Editorial Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.15, ease: 'easeOut' }}
              className="font-serif-heading text-sm text-stone-600 tracking-wide mb-6 font-normal"
            >
              Good Food. <span className="italic font-normal text-[#245E4A]">Brighter Days.</span>
            </motion.p>

            {/* Ultra-Slim Hairline Progress Track */}
            <div className="w-44 sm:w-52 h-[3px] bg-stone-100 rounded-full overflow-hidden p-0 mb-3 shadow-inner relative">
              <motion.div
                className="h-full bg-gradient-to-r from-[#245E4A] via-[#F5D103] to-[#245E4A] rounded-full"
                style={{ width: `${progress}%` }}
                transition={{ ease: 'linear' }}
              />
            </div>

            {/* Micro Status Label */}
            <div className="flex items-center justify-between w-44 sm:w-52 text-[10.5px] text-stone-600 font-mono">
              <span className="flex items-center gap-1 text-[#245E4A] font-semibold">
                <Sparkles className="w-2.5 h-2.5" />
                <span>Harvest Fresh</span>
              </span>
              <span className="font-bold text-[#18181B]">{progress}%</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
