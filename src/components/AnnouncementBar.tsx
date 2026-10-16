import React from 'react';
import { Leaf, ChevronRight } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const AnnouncementBar: React.FC = () => {
  const { applyCoupon } = useCart();

  return (
    <aside
      aria-label="Announcements and special offers"
      className="bg-[#F5D103] text-[#18181B] text-xs py-2 px-3 sm:px-6 lg:px-10 xl:px-12 border-b border-black/10"
    >
      <div className="w-full flex items-center justify-between gap-2">
        {/* Left: Offer and Promo Code Pill */}
        <div className="flex items-center gap-2 text-[#18181B] flex-1 justify-between sm:justify-start min-w-0">
          <div className="flex items-center gap-2 min-w-0">
            <Leaf className="w-3.5 h-3.5 text-[#18181B] fill-[#18181B] shrink-0" />
            <span className="text-[#18181B] font-semibold text-[10.5px] xs:text-[11px] sm:text-xs truncate">
              Get <strong className="font-extrabold">20% OFF</strong> on your first order <span className="text-black/30 mx-1">|</span> Free delivery over £50
            </span>
          </div>
          <button
            type="button"
            onClick={() => applyCoupon('FRESH20')}
            className="hidden sm:inline-block px-2 py-0.5 rounded-md bg-[#18181B] text-[#F5D103] font-mono font-bold text-[11px] hover:bg-stone-800 hover:scale-105 transition-all shadow-2xs ml-1 cursor-pointer"
            title="Click to apply FRESH20"
          >
            FRESH20
          </button>
        </div>

        {/* Mobile Right Chevron */}
        <div className="sm:hidden text-[#18181B] shrink-0">
          <ChevronRight className="w-3.5 h-3.5" />
        </div>

        {/* Right: Quick Links */}
        <div className="hidden sm:flex items-center gap-4 sm:gap-6 text-[#18181B]/80 text-xs font-semibold">
          <a
            href="#track"
            className="hover:text-[#18181B] transition-colors"
          >
            Track Order
          </a>
          <span className="w-1 h-1 rounded-full bg-black/20" />
          <a
            href="#help"
            className="hover:text-[#18181B] transition-colors"
          >
            Help
          </a>
        </div>
      </div>
    </aside>
  );
};
