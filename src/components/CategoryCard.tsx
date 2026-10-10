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
        className={`group relative w-full h-full min-h-[260px] sm:min-h-[290px] rounded-[26px] sm:rounded-[30px] p-4 sm:p-5 flex flex-col justify-between text-left transition-all duration-400 ease-out cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#123F32] overflow-hidden bg-gradient-to-b ${
          category.cardBg || 'from-[#F8F9F6] to-[#EFF2ED]'
        } border ${
          isSelected
            ? 'border-[#123F32] shadow-xl ring-2 ring-[#123F32]/20 scale-[1.02] bg-white'
            : 'border-black/[0.06] hover:border-black/15 hover:shadow-xl hover:shadow-black/8 hover:-translate-y-2'
        }`}
      >
        {/* Subtle Ambient Radial Highlight */}
        <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full bg-white/60 blur-2xl pointer-events-none" />

        {/* Top Bar: Badge & Action Arrow */}
        <div className="relative z-10 w-full flex items-center justify-between gap-2">
          {category.badge ? (
            <span
              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] sm:text-[11px] font-bold tracking-wide shadow-2xs backdrop-blur-md bg-white/80 border border-white/60"
              style={{ color: category.accentColor || '#123F32' }}
            >
              {category.badge}
            </span>
          ) : (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] sm:text-[11px] font-bold text-[#556059] bg-white/80 border border-white/60">
              {category.itemCount}
            </span>
          )}

          <div
            className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center transition-all duration-300 shadow-2xs ${
              isSelected
                ? 'bg-[#123F32] text-white rotate-45'
                : 'bg-white/90 text-[#18231E] border border-black/5 group-hover:bg-[#123F32] group-hover:text-white group-hover:rotate-45 group-hover:border-transparent'
            }`}
          >
            <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.5]" />
          </div>
        </div>

        {/* Center: Produce Hero Stage */}
        <div className="relative z-10 my-auto py-2 flex items-center justify-center">
          {/* Soft Organic White Stage Disk */}
          <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-white/85 shadow-xs border border-white flex items-center justify-center p-2 group-hover:scale-105 group-hover:shadow-md transition-all duration-400 ease-out">
            <img
              src={category.image}
              alt={category.name}
              className="w-full h-full object-cover rounded-full group-hover:scale-110 group-hover:-translate-y-1 transition-transform duration-500 ease-out drop-shadow-sm"
              loading="lazy"
            />
          </div>
        </div>

        {/* Bottom: Title, Tagline & Item Count */}
        <div className="relative z-10 w-full pt-1">
          <div className="flex items-center justify-between gap-1 mb-0.5">
            <h3 className="font-serif-heading font-bold text-[15px] sm:text-[17px] text-[#18231E] group-hover:text-[#123F32] transition-colors leading-tight">
              {category.name}
            </h3>
          </div>
          
          <div className="flex items-center justify-between gap-2 mt-1">
            <span className="text-[11px] sm:text-xs text-[#556059] font-medium truncate">
              {category.tagline || category.itemCount}
            </span>
            <span className="text-[10px] sm:text-[11px] font-bold text-[#123F32] opacity-80 shrink-0">
              {category.itemCount}
            </span>
          </div>

          {/* Interactive Progress / Accent Line on Hover */}
          <div
            className={`h-0.5 rounded-full mt-2.5 transition-all duration-300 ${
              isSelected
                ? 'w-full bg-[#123F32]'
                : 'w-6 bg-black/10 group-hover:w-full group-hover:bg-[#123F32]'
            }`}
          />
        </div>
      </button>
    </div>
  );
};
