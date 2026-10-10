import React from 'react';
import { useCart } from '../context/CartContext';

export const AnnouncementBar: React.FC = () => {
  const { applyCoupon } = useCart();

  return (
    <aside
      aria-label="Announcements and special offers"
      className="bg-[#123F32] text-white text-xs py-2 px-4 sm:px-6 lg:px-10 xl:px-12 border-b border-[#1A4F40]"
    >
      <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-2">
        {/* Left: Offer and Promo Code Pill */}
        <div className="flex items-center gap-2 text-stone-200">
          <span className="text-white font-medium">
            Get <strong>20% OFF</strong> on your first order
          </span>
          <span className="text-stone-400">|</span>
          <span className="text-stone-300">Use code</span>
          <button
            type="button"
            onClick={() => applyCoupon('FRESH20')}
            className="px-2.5 py-0.5 rounded-full bg-[#D6F36A] text-[#123F32] font-mono font-bold text-[11px] hover:bg-white hover:scale-105 transition-all shadow-2xs"
            title="Click to apply FRESH20"
          >
            FRESH20
          </button>
        </div>

        {/* Right: Quick Links */}
        <div className="flex items-center gap-4 sm:gap-6 text-stone-300 text-xs font-medium">
          <a
            href="#app-section"
            className="hover:text-[#D6F36A] transition-colors"
          >
            Download App
          </a>
          <span className="w-1 h-1 rounded-full bg-stone-500" />
          <a
            href="#track"
            className="hover:text-[#D6F36A] transition-colors"
          >
            Track Order
          </a>
          <span className="w-1 h-1 rounded-full bg-stone-500" />
          <a
            href="#help"
            className="hover:text-[#D6F36A] transition-colors"
          >
            Help
          </a>
        </div>
      </div>
    </aside>
  );
};
