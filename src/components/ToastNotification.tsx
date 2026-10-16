import React from 'react';
import { CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { toastVariants } from '../motion/variants';

export const ToastNotification: React.FC = () => {
  const { toastMessage } = useCart();

  return (
    <AnimatePresence>
      {toastMessage && (
        <aside
          aria-live="polite"
          aria-atomic="true"
          className="fixed bottom-6 right-6 z-50 pointer-events-none"
        >
          <motion.div
            variants={toastVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="bg-[#18181B] text-white px-5 py-3.5 rounded-2xl shadow-2xl border border-[#F5D103]/30 flex items-center gap-3 max-w-sm pointer-events-auto"
            role="status"
          >
            <div className="w-6 h-6 rounded-full bg-[#F5D103] text-[#18181B] flex items-center justify-center shrink-0 shadow-xs">
              <CheckCircle className="w-4 h-4 fill-current" />
            </div>
            <p className="text-xs sm:text-sm font-semibold tracking-wide text-stone-100">
              {toastMessage}
            </p>
          </motion.div>
        </aside>
      )}
    </AnimatePresence>
  );
};
