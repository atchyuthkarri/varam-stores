import React from 'react';
import { Leaf, ChevronRight } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const AnnouncementBar: React.FC = () => {
  const { applyCoupon } = useCart();

  return (
    <aside
      aria-label="Announcements and special offers"
      className="bg-[#123F32] text-white text-xs py-2 px-3 sm:px-6 lg:px-10 xl:px-12 border-b border-[#1A4F40]"
    >
      <div className="w-full flex items-center justify-between gap-2">
        {/* Left: Offer and Promo Code Pill */}
        <div className="flex items-center gap-2 text-stone-200 flex-1 justify-between sm:justify-start min-w-0">
          <div className="flex items-center gap-2 min-w-0">
            <Leaf className="w-3.5 h-3.5 text-[#D6F36A] fill-[#D6F36A] shrink-0" />
            <span className="text-white font-medium text-[10.5px] xs:text-[11px] sm:text-xs truncate">
              Get <strong>20% OFF</strong> on your first order <span className="text-stone-400 mx-1">|</span> Free delivery over £50
            </span>
          </div>
          <button
            type="button"
            onClick={() => applyCoupon('FRESH20')}
            className="hidden sm:inline-block px-2.5 py-0.5 rounded-full bg-[#D6F36A] text-[#123F32] font-mono font-bold text-[11px] hover:bg-white hover:scale-105 transition-all shadow-2xs ml-1"
            title="Click to apply FRESH20"
          >
            FRESH20
          </button>
        </div>

        {/* Mobile Right Chevron */}
        <div className="sm:hidden text-stone-300 shrink-0">
          <ChevronRight className="w-3.5 h-3.5" />
        </div>

        {/* Right: Quick Links */}
        <div className="hidden sm:flex items-center gap-4 sm:gap-6 text-stone-300 text-xs font-medium">
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
