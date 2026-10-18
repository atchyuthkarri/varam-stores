import React, { useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronRight, 
  ArrowRight, 
  Sparkles, 
  Tag,
  ShieldCheck,
  Truck
} from 'lucide-react';
import { categories } from '../data/categories';

interface ShopMegaMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectCategory: (categoryId: string) => void;
  onViewAllShop: () => void;
}

export const ShopMegaMenu: React.FC<ShopMegaMenuProps> = ({
  isOpen,
  onClose,
  onSelectCategory,
  onViewAllShop,
}) => {
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  const handleCategoryClick = (catId: string) => {
    onSelectCategory(catId);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Subtle Page Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.16 }}
            onClick={onClose}
            className="fixed inset-0 top-14 sm:top-16 bg-black/25 backdrop-blur-[1px] z-40"
            aria-hidden="true"
          />

          {/* Full-Width Shop Mega Menu Attached Beneath Header */}
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className="absolute top-full left-0 right-0 w-full bg-white border-b border-stone-200 shadow-2xl z-50"
          >
            {/* Scrollable Container with data-lenis-prevent */}
            <div
              ref={scrollAreaRef}
              data-lenis-prevent="true"
              style={{ overscrollBehavior: 'contain' }}
              className="w-full max-h-[82vh] overflow-y-auto py-6 sm:py-7 px-4 sm:px-6 lg:px-8 xl:px-10 2xl:px-12"
            >
              <div className="w-full">
                {/* Header Row */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-6 border-b border-stone-200 gap-3">
                  <div className="flex items-center gap-3">
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-100 text-[#B45309] text-[11px] font-bold uppercase tracking-wider border border-amber-200/60">
                      <Sparkles className="w-3 h-3 text-[#B45309]" />
                      <span>All Aisles &amp; Departments</span>
                    </div>
                    <h3 className="font-sans font-extrabold text-lg sm:text-xl text-[#18181B] tracking-tight">
                      Explore All Categories
                    </h3>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="hidden md:flex items-center gap-1.5 text-xs text-stone-500 font-medium">
                      <Tag className="w-3.5 h-3.5 text-[#B45309]" />
                      <span>Use code <strong className="text-[#B45309]">FRESH20</strong> for 20% off</span>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        onViewAllShop();
                        onClose();
                      }}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#18181B] hover:bg-[#E5A800] bg-[#F5D103] px-4 py-2 rounded-full shadow-2xs transition-colors cursor-pointer shrink-0"
                    >
                      <span>View Full Catalogue (10,000+ Items)</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* 12 Categories Clean Grid: 4 Columns on lg/xl, 3 on md, 2 on sm */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-4">
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => handleCategoryClick(cat.id)}
                      className="group text-left p-3.5 sm:p-4 rounded-2xl border border-stone-200 bg-white hover:border-[#F5D103] hover:shadow-md transition-all duration-200 flex items-center gap-3.5 cursor-pointer shadow-2xs"
                    >
                      {/* Category Image Box */}
                      <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-white flex items-center justify-center p-1.5 overflow-hidden shrink-0 border border-stone-200 group-hover:scale-105 transition-transform duration-200">
                        <img
                          src={cat.image}
                          alt={cat.name}
                          loading="lazy"
                          className="w-full h-full object-contain"
                        />
                      </div>

                      {/* Category Information */}
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-1">
                          <h4 className="text-sm sm:text-[15px] font-extrabold text-[#18181B] group-hover:text-[#B45309] transition-colors truncate">
                            {cat.name}
                          </h4>
                          <ChevronRight className="w-4 h-4 text-[#18181B]/60 group-hover:text-[#B45309] group-hover:translate-x-0.5 transition-all shrink-0" />
                        </div>

                        <p className="text-xs font-bold text-[#B45309] mt-0.5">
                          {cat.itemCount}
                        </p>

                        {cat.subcategories && cat.subcategories.length > 0 && (
                          <p className="text-xs font-medium text-[#18181B]/75 group-hover:text-[#18181B] truncate mt-1">
                            {cat.subcategories.slice(0, 2).join(' • ')}
                          </p>
                        )}
                      </div>
                    </button>
                  ))}
                </div>

                {/* Quick Shortcuts Pill Bar */}
                <div className="mt-6 pt-4 border-t border-stone-200 flex items-center gap-2 flex-wrap">
                  <span className="text-xs font-extrabold text-[#18181B] uppercase tracking-wider mr-1">
                    Popular Departments:
                  </span>
                  <button
                    type="button"
                    onClick={() => handleCategoryClick('vegetables-fruits')}
                    className="px-3.5 py-1.5 rounded-full bg-white border border-stone-200 hover:bg-[#F5D103] hover:text-[#18181B] hover:border-[#F5D103] text-xs font-bold text-[#18181B] shadow-2xs transition-all cursor-pointer"
                  >
                    🥬 Fresh Vegetables &amp; Fruits
                  </button>
                  <button
                    type="button"
                    onClick={() => handleCategoryClick('rice-millets')}
                    className="px-3.5 py-1.5 rounded-full bg-white border border-stone-200 hover:bg-[#F5D103] hover:text-[#18181B] hover:border-[#F5D103] text-xs font-bold text-[#18181B] shadow-2xs transition-all cursor-pointer"
                  >
                    🍚 Sona Masoori &amp; Basmati Rice
                  </button>
                  <button
                    type="button"
                    onClick={() => handleCategoryClick('edible-oils')}
                    className="px-3.5 py-1.5 rounded-full bg-white border border-stone-200 hover:bg-[#F5D103] hover:text-[#18181B] hover:border-[#F5D103] text-xs font-bold text-[#18181B] shadow-2xs transition-all cursor-pointer"
                  >
                    🥥 Cold-Pressed Oils &amp; Desi Ghee
                  </button>
                  <button
                    type="button"
                    onClick={() => handleCategoryClick('atta-flours')}
                    className="px-3.5 py-1.5 rounded-full bg-white border border-stone-200 hover:bg-[#F5D103] hover:text-[#18181B] hover:border-[#F5D103] text-xs font-bold text-[#18181B] shadow-2xs transition-all cursor-pointer"
                  >
                    🌾 Chakki Fresh Atta &amp; Flours
                  </button>
                  <button
                    type="button"
                    onClick={() => handleCategoryClick('spices-masala')}
                    className="px-3.5 py-1.5 rounded-full bg-white border border-stone-200 hover:bg-[#F5D103] hover:text-[#18181B] hover:border-[#F5D103] text-xs font-bold text-[#18181B] shadow-2xs transition-all cursor-pointer"
                  >
                    🌶️ Spices &amp; Authentic Masalas
                  </button>
                  <button
                    type="button"
                    onClick={() => handleCategoryClick('sweets-snacks')}
                    className="px-3.5 py-1.5 rounded-full bg-white border border-stone-200 hover:bg-[#F5D103] hover:text-[#18181B] hover:border-[#F5D103] text-xs font-bold text-[#18181B] shadow-2xs transition-all cursor-pointer"
                  >
                    🥮 Sweets &amp; Savoury Snacks
                  </button>
                </div>

                {/* Bottom Assurance Bar */}
                <div className="mt-5 pt-4 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#18181B]">
                  <div className="flex items-center gap-4 flex-wrap">
                    <span className="flex items-center gap-1.5 font-semibold text-[#18181B]">
                      <Truck className="w-4 h-4 text-[#B45309]" />
                      Free same-day delivery over £50 across Hertfordshire
                    </span>
                    <span className="text-stone-300 hidden sm:inline">|</span>
                    <span className="flex items-center gap-1.5 font-semibold text-[#18181B]">
                      <ShieldCheck className="w-4 h-4 text-[#B45309]" />
                      Cold-chain freshness guarantee on every order
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      onViewAllShop();
                      onClose();
                    }}
                    className="text-xs font-extrabold text-[#B45309] hover:text-[#D97706] hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <span>Browse All 10,000+ Products</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
