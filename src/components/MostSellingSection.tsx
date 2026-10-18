import React from 'react';
import { ArrowRight } from 'lucide-react';
import { mostSellingProducts } from '../data/products';
import type { Product } from '../types';
import { ProductCard } from './ProductCard';
import { useNavigation } from '../context/NavigationContext';

interface MostSellingSectionProps {
  onQuickView: (product: Product) => void;
}

export const MostSellingSection: React.FC<MostSellingSectionProps> = ({
  onQuickView,
}) => {
  const { goToShop } = useNavigation();

  return (
    <section id="most-selling" className="py-8 sm:py-12 bg-white">
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-10 2xl:px-12">
        {/* Section Header */}
        <div className="gsap-section-header flex items-center justify-between mb-6">
          <h2 className="font-sans font-extrabold text-2xl sm:text-3xl text-[#18181B] tracking-tight">
            Most Selling Products
          </h2>

          <button
            type="button"
            onClick={() => goToShop({ category: 'all', sort: 'rating' })}
            className="group inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#18181B] hover:text-[#B45309] transition-colors cursor-pointer"
          >
            <span>View All</span>
            <ArrowRight className="w-4 h-4 text-stone-500 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* 5 Product Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-5">
          {mostSellingProducts.map((product) => (
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
