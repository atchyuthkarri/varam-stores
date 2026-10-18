import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { marqueeBrands } from '../data/brands';
import { useNavigation } from '../context/NavigationContext';

interface BrandMarqueeProps {
  onOpenBrandsMenu?: () => void;
}

export const BrandMarquee: React.FC<BrandMarqueeProps> = ({ onOpenBrandsMenu }) => {
  const { goToShop } = useNavigation();

  // Duplicate for seamless 0 to -50% infinite translation
  const doubledBrands = [...marqueeBrands, ...marqueeBrands];

  const handleBrandClick = (brandName: string) => {
    goToShop({ search: brandName });
  };

  return (
    <section 
      id="trusted-brands"
      aria-label="Shop by Trusted Brands"
      className="relative w-full bg-white py-8 sm:py-10 overflow-hidden border-b border-stone-200"
    >
      {/* Section Header */}
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-10 2xl:px-12 mb-5 sm:mb-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 mb-1 text-xs font-bold uppercase tracking-widest text-[#B45309]">
              <Sparkles className="w-3.5 h-3.5 text-[#B45309]" />
              <span>Authentic Heritage Brands</span>
            </div>
            <h2 className="font-sans font-extrabold text-2xl sm:text-3xl text-[#18181B] tracking-tight">
              Shop by Trusted Brands
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden md:inline-block text-xs font-medium text-stone-500">
              Over 90+ authentic brands direct to your doorstep
            </span>
            <button
              type="button"
              onClick={() => {
                if (onOpenBrandsMenu) {
                  onOpenBrandsMenu();
                } else {
                  goToShop({ search: '' });
                }
              }}
              className="group inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#B45309] hover:text-[#D97706] transition-colors cursor-pointer"
            >
              <span>View All Brands</span>
              <ArrowRight className="w-4 h-4 text-[#B45309] group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>

      {/* Marquee Ticker Container - ONLY THE LOGOS, NO CARDS */}
      <div className="relative w-full overflow-hidden group-marquee">
        {/* Left Gradient Edge Fade */}
        <div 
          className="absolute left-0 top-0 bottom-0 w-16 sm:w-28 z-10 pointer-events-none bg-gradient-to-r from-white via-white/90 to-transparent" 
          aria-hidden="true" 
        />

        {/* Right Gradient Edge Fade */}
        <div 
          className="absolute right-0 top-0 bottom-0 w-16 sm:w-28 z-10 pointer-events-none bg-gradient-to-l from-white via-white/90 to-transparent" 
          aria-hidden="true" 
        />

        {/* Scrolling Track */}
        <div className="animate-marquee-infinite flex items-center gap-8 sm:gap-12 md:gap-14 py-2 px-4">
          {doubledBrands.map((brand, idx) => (
            <button
              key={`${brand.id}-${idx}`}
              type="button"
              onClick={() => handleBrandClick(brand.name)}
              title={`Shop ${brand.name}`}
              className="shrink-0 inline-flex items-center justify-center p-2 cursor-pointer transition-all duration-300 hover:scale-110 focus:outline-none"
            >
              <img
                src={brand.logo}
                alt={`${brand.name} logo`}
                loading="lazy"
                className="h-10 sm:h-12 md:h-14 w-auto max-w-[130px] sm:max-w-[160px] object-contain select-none drop-shadow-xs"
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
