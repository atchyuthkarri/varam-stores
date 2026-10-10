import React from 'react';
import { ArrowRight } from 'lucide-react';
import { mostSellingProducts } from '../data/products';
import type { Product } from '../types';
import { ProductCard } from './ProductCard';

interface MostSellingSectionProps {
  onQuickView: (product: Product) => void;
}

export const MostSellingSection: React.FC<MostSellingSectionProps> = ({
  onQuickView,
}) => {
  return (
    <section id="most-selling" className="py-8 sm:py-12 bg-[#F8F8F2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="gsap-section-header flex items-center justify-between mb-6">
          <h2 className="font-sans font-extrabold text-2xl sm:text-3xl text-[#18231E] tracking-tight">
            Most Selling Products
          </h2>

          <a
            href="#products"
            className="group inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#18231E] hover:text-[#123F32] transition-colors"
          >
            <span>View All</span>
            <ArrowRight className="w-4 h-4 text-stone-500 group-hover:translate-x-1 transition-transform" />
          </a>
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
