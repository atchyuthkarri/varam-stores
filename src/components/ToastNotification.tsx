import React from 'react';
import { CheckCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const ToastNotification: React.FC = () => {
  const { toastMessage } = useCart();

  if (!toastMessage) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-bounce">
      <div className="bg-[#123F32] text-white px-5 py-3 rounded-2xl shadow-2xl border border-[#2F7654] flex items-center gap-3">
        <div className="w-6 h-6 rounded-full bg-[#D6F36A] text-[#123F32] flex items-center justify-center flex-shrink-0">
          <CheckCircle className="w-4 h-4 fill-current" />
        </div>
        <p className="text-xs sm:text-sm font-semibold">{toastMessage}</p>
      </div>
    </div>
  );
};
