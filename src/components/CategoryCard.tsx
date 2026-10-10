import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import type { Category } from '../types';

interface CategoryCardProps {
  category: Category;
  isSelected?: boolean;
  onSelect: (categoryId: string) => void;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({
  category,
  isSelected,
  onSelect,
}) => {
  return (
    <div className="gsap-category-card h-full">
      <button
        type="button"
        onClick={() => onSelect(category.id)}
        className={`group relative w-full h-full min-h-[220px] sm:min-h-[240px] rounded-2xl sm:rounded-3xl overflow-hidden flex flex-col justify-between p-3.5 sm:p-4 text-left transition-all duration-300 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#123F32] ${
          isSelected
            ? 'ring-3 ring-[#D6F36A] shadow-xl scale-[1.02]'
            : 'hover:-translate-y-1.5 hover:shadow-xl shadow-sm hover:shadow-emerald-950/20'
        }`}
      >
        {/* 1. Full-Bleed High-Res Photographic Image Background */}
        <img
          src={category.image}
          alt={category.name}
          className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-110"
          loading="lazy"
        />

        {/* 2. Rich Culinary Gradient Scrim Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10 group-hover:from-black/95 group-hover:via-black/50 transition-colors duration-300 pointer-events-none" />

        {/* 3. Subtle Inner Border Glow */}
        <div className="absolute inset-0 rounded-2xl sm:rounded-3xl border border-white/20 group-hover:border-[#D6F36A]/60 transition-colors duration-300 pointer-events-none" />

        {/* 4. Top Row: Frosted Glass Item Count Badge & Floating Diagonal Arrow */}
        <div className="relative z-10 w-full flex items-center justify-between gap-1.5">
          <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-[10px] sm:text-[11px] font-bold text-white tracking-wide shadow-2xs group-hover:border-[#D6F36A]/60 group-hover:text-[#D6F36A] transition-colors">
            {category.itemCount}
          </span>

          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/20 backdrop-blur-md border border-white/25 flex items-center justify-center text-white group-hover:bg-[#D6F36A] group-hover:text-[#123F32] group-hover:border-[#D6F36A] group-hover:rotate-45 transition-all duration-300 shadow-2xs">
            <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.5]" />
          </div>
        </div>

        {/* 5. Bottom Row: Category Title & Dynamic Lime Underline Accent */}
        <div className="relative z-10 w-full mt-auto pt-4">
          <h3 className="font-serif-heading font-bold text-sm sm:text-base text-white leading-tight drop-shadow-sm group-hover:text-[#D6F36A] transition-colors">
            {category.name}
          </h3>
          <div className="h-0.5 w-6 bg-[#D6F36A] rounded-full mt-2 group-hover:w-12 transition-all duration-300 opacity-80" />
        </div>
      </button>
    </div>
  );
};
