import React from 'react';
import { ArrowRight, Leaf } from 'lucide-react';
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
  const handleCategoryClick = (categoryId: string) => {
    onSelectCategory(categoryId);
    const el = document.getElementById('fresh-picks');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="categories" className="py-10 sm:py-14 bg-[#F8F8F2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ========================================================================= */}
        {/* SECTION HEADER: EYEBROW, TITLE WITH LIME ACCENT, AND VIEW ALL PILL BUTTON */}
        {/* ========================================================================= */}
        <div className="gsap-section-header flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-7 sm:mb-8">
          <div>
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 mb-2">
              <span className="w-5 h-5 rounded-full bg-[#123F32]/10 flex items-center justify-center text-[#123F32]">
                <Leaf className="w-3.5 h-3.5 fill-current" />
              </span>
              <span className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-[#556059]">
                Shop by Category
              </span>
            </div>

            {/* Title with Playful Lime Curved Underline */}
            <div className="relative inline-block">
              <h2 className="font-serif-heading font-bold text-3xl sm:text-4xl lg:text-[44px] text-[#18231E] tracking-tight leading-[1.08]">
                Everything You Need
              </h2>
              {/* Lime Curved Underline Accent */}
              <svg
                className="w-14 sm:w-16 h-2 text-[#D6F36A] mt-1"
                viewBox="0 0 60 8"
                fill="none"
                stroke="currentColor"
                strokeWidth="3.5"
                strokeLinecap="round"
                aria-hidden="true"
              >
                <path d="M3 5 C 18 2, 42 2, 57 5" />
              </svg>
            </div>
          </div>

          {/* View All Categories Pill Button */}
          <button
            type="button"
            onClick={() => handleCategoryClick('all')}
            className="btn-magnetic self-start sm:self-auto inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#E2F59E] hover:bg-[#D6F36A] text-[#123F32] text-xs sm:text-[13px] font-bold shadow-2xs transition-all cursor-pointer group"
          >
            <span>View All Categories</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* ========================================================================= */}
        {/* 7 CATEGORY CARDS GRID — UNIFORM ALIGNMENT */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3 sm:gap-4 items-stretch">
          {categories.map((cat, idx) => (
            <div
              key={cat.id}
              className={`h-full ${idx === 6 ? 'col-span-2 sm:col-span-1' : ''}`}
            >
              <CategoryCard
                category={cat}
                isSelected={selectedCategory === cat.id}
                onSelect={handleCategoryClick}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
