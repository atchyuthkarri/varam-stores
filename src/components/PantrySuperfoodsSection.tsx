import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { pantrySuperfoodProducts } from '../data/products';
import type { Product } from '../types';
import { ProductCard } from './ProductCard';
import { useNavigation } from '../context/NavigationContext';

interface PantrySuperfoodsSectionProps {
  onQuickView: (product: Product) => void;
}

export const PantrySuperfoodsSection: React.FC<PantrySuperfoodsSectionProps> = ({
  onQuickView,
}) => {
  const { goToShop } = useNavigation();

  return (
    <section id="pantry-superfoods" className="py-8 sm:py-12 bg-white">
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-10 2xl:px-12">
        {/* Section Header */}
        <div className="gsap-section-header flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
          <div>
            <div className="inline-flex items-center gap-2 mb-1.5 text-xs font-extrabold uppercase tracking-widest text-[#18181B]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Gourmet &amp; Nutrition</span>
            </div>
            <h2 className="font-sans font-extrabold text-2xl sm:text-3xl text-[#18181B] tracking-tight">
              Pantry Staples &amp; Superfoods
            </h2>
          </div>

          <button
            type="button"
            onClick={() => goToShop({ category: 'pantry' })}
            className="group inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#18181B] hover:text-[#B45309] transition-colors cursor-pointer"
          >
            <span>View All Pantry</span>
            <ArrowRight className="w-4 h-4 text-stone-500 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* 5 Product Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-5">
          {pantrySuperfoodProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onQuickView={onQuickView}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
