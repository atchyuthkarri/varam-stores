import React, { useRef } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight, Leaf, Sparkles, ShieldCheck, Zap } from 'lucide-react';
import { categories } from '../data/categories';
import { CategoryCard } from './CategoryCard';

interface CategorySectionProps {
  selectedCategory: string;
  onSelectCategory: (categoryId: string) => void;
}

export const CategorySection: React.FC<CategorySectionProps> = ({
  selectedCategory,
  onSelectCategory,
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleCategoryClick = (categoryId: string) => {
    onSelectCategory(categoryId);
    const el = document.getElementById('fresh-picks');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -320 : 320;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section id="categories" className="py-12 sm:py-18 bg-[#FAF8F5] border-y border-black/[0.04] relative overflow-hidden">
      {/* Decorative ambient background glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-100/40 rounded-full blur-3xl pointer-events-none -translate-y-1/2" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-100/30 rounded-full blur-3xl pointer-events-none translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* ========================================================================= */}
        {/* SECTION HEADER */}
        {/* ========================================================================= */}
        <div className="gsap-section-header flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 sm:mb-10">
          <div>
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#123F32]/10 border border-[#123F32]/15 text-[#123F32] mb-3">
              <Leaf className="w-3.5 h-3.5 fill-current" />
              <span className="text-[11px] font-extrabold uppercase tracking-[0.2em]">
                Shop by Category
              </span>
            </div>

            {/* Title with Handcrafted Accent */}
            <div className="relative">
              <h2 className="font-serif-heading font-bold text-3xl sm:text-4xl lg:text-[46px] text-[#18231E] tracking-tight leading-[1.1]">
                Everything You Need
              </h2>
              <p className="mt-2 text-sm sm:text-base text-[#556059] max-w-xl leading-relaxed">
                Hand-picked organic produce, daily staples, and artisan bakery delights delivered straight from local farms to your kitchen.
              </p>
            </div>
          </div>

          {/* Controls: Prev/Next Carousel Arrows + View All Pill */}
          <div className="flex items-center gap-2.5 self-start md:self-end shrink-0">
            {/* Navigation Carousel Buttons (visible on all screens for convenient scrolling) */}
            <div className="flex items-center gap-1.5 bg-white p-1 rounded-full border border-black/10 shadow-2xs">
              <button
                type="button"
                onClick={() => scroll('left')}
                aria-label="Scroll categories left"
                className="w-8 h-8 rounded-full flex items-center justify-center text-[#18231E] hover:bg-[#F2F5F0] hover:text-[#123F32] transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4 stroke-[2.5]" />
              </button>
              <button
                type="button"
                onClick={() => scroll('right')}
                aria-label="Scroll categories right"
                className="w-8 h-8 rounded-full flex items-center justify-center text-[#18231E] hover:bg-[#F2F5F0] hover:text-[#123F32] transition-colors cursor-pointer"
              >
                <ChevronRight className="w-4 h-4 stroke-[2.5]" />
              </button>
            </div>

            {/* View All Categories Button */}
            <button
              type="button"
              onClick={() => handleCategoryClick('all')}
              className="btn-magnetic inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#123F32] hover:bg-[#1A5443] text-white text-xs sm:text-[13px] font-bold shadow-sm hover:shadow-md transition-all cursor-pointer group"
            >
              <span>All Aisles</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* INTERACTIVE CATEGORY FILTER CHIPS BAR */}
        {/* ========================================================================= */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 scrollbar-none">
          <button
            type="button"
            onClick={() => handleCategoryClick('all')}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all shrink-0 cursor-pointer ${
              selectedCategory === 'all'
                ? 'bg-[#123F32] text-white shadow-xs'
                : 'bg-white hover:bg-[#EFEFEA] text-[#455048] border border-black/8'
            }`}
          >
            All Categories ({categories.reduce((acc, cat) => acc + parseInt(cat.itemCount), 0)}+)
          </button>
          {categories.map((cat) => (
            <button
              key={`chip-${cat.id}`}
              type="button"
              onClick={() => handleCategoryClick(cat.id)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all shrink-0 cursor-pointer flex items-center gap-1.5 ${
                selectedCategory === cat.id
                  ? 'bg-[#123F32] text-white shadow-xs font-bold'
                  : 'bg-white hover:bg-[#EFEFEA] text-[#455048] border border-black/8'
              }`}
            >
              <span>{cat.name}</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  selectedCategory === cat.id
                    ? 'bg-white/20 text-white'
                    : 'bg-black/5 text-[#556059]'
                }`}
              >
                {cat.itemCount.replace(' Items', '')}
              </span>
            </button>
          ))}
        </div>

        {/* ========================================================================= */}
        {/* CATEGORY CARDS CONTAINER (RESPONSIVE GRID + MOBILE HORIZONTAL SCROLL) */}
        {/* ========================================================================= */}
        <div
          ref={scrollContainerRef}
          className="flex lg:grid lg:grid-cols-7 gap-3.5 sm:gap-4 md:gap-4.5 overflow-x-auto lg:overflow-visible pb-4 pt-1 snap-x scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0"
        >
          {categories.map((cat) => (
            <div
              key={cat.id}
              className="w-[200px] sm:w-[220px] lg:w-auto shrink-0 lg:shrink snap-start h-full"
            >
              <CategoryCard
                category={cat}
                isSelected={selectedCategory === cat.id}
                onSelect={handleCategoryClick}
              />
            </div>
          ))}
        </div>

        {/* ========================================================================= */}
        {/* VALUE PROPOSITION BADGES */}
        {/* ========================================================================= */}
        <div className="mt-8 pt-6 border-t border-black/[0.06] grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="flex items-center justify-center gap-2 text-xs font-bold text-[#18231E]">
            <Sparkles className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>100% Farm Sourced</span>
          </div>
          <div className="flex items-center justify-center gap-2 text-xs font-bold text-[#18231E]">
            <Zap className="w-4 h-4 text-amber-500 shrink-0" />
            <span>15-Min Express Delivery</span>
          </div>
          <div className="flex items-center justify-center gap-2 text-xs font-bold text-[#18231E]">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Cold-Chain Guaranteed</span>
          </div>
          <div className="flex items-center justify-center gap-2 text-xs font-bold text-[#18231E]">
            <Leaf className="w-4 h-4 text-emerald-700 shrink-0" />
            <span>Eco-Friendly Packaging</span>
          </div>
        </div>
      </div>
    </section>
  );
};
