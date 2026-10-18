import React from 'react';
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
  };

  return (
    <section id="categories" className="py-12 sm:py-16 md:py-20 bg-white border-y border-stone-100 relative overflow-hidden">
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-10 2xl:px-12 relative z-10">
        {/* ========================================================================= */}
        {/* SECTION HEADER (EXACT LAKSHMI STORES REFERENCE STYLE) */}
        {/* ========================================================================= */}
        <div className="text-center mb-8 sm:mb-12 md:mb-14">
          <h2 className="font-serif-heading font-bold text-2xl sm:text-3xl md:text-4xl text-[#18181B] tracking-tight">
            Shop by Popular <span className="text-[#EA580C]">Categories</span>
          </h2>
        </div>

        {/* ========================================================================= */}
        {/* 6-COLUMN RESPONSIVE GRID OF TRANSPARENT CATEGORIES */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-x-4 sm:gap-x-6 md:gap-x-8 gap-y-7 sm:gap-y-9 md:gap-y-10 items-start">
          {categories.map((cat) => (
            <CategoryCard
              key={cat.id}
              category={cat}
              isSelected={selectedCategory === cat.id}
              onSelect={handleCategoryClick}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
