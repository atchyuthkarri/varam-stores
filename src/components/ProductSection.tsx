import React from 'react';
import { ArrowRight, Heart } from 'lucide-react';
import { freshPicksProducts } from '../data/products';
import type { Product } from '../types';
import { ProductCard } from './ProductCard';
import { useWishlist } from '../context/WishlistContext';
import { useNavigation } from '../context/NavigationContext';

interface ProductSectionProps {
  onQuickView: (product: Product) => void;
  isWishlistFilterActive: boolean;
  onClearWishlistFilter: () => void;
}

export const ProductSection: React.FC<ProductSectionProps> = ({
  onQuickView,
  isWishlistFilterActive,
  onClearWishlistFilter,
}) => {
  const { wishlistIds } = useWishlist();
  const { goToShop } = useNavigation();

  const displayedProducts = isWishlistFilterActive
    ? freshPicksProducts.filter((p) => wishlistIds.includes(p.id))
    : freshPicksProducts;

  return (
    <section id="fresh-picks" className="py-8 sm:py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Wishlist Active Notification */}
        {isWishlistFilterActive && (
          <div className="mb-6 p-4 bg-white rounded-2xl border border-rose-200 shadow-sm flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Heart className="w-4 h-4 text-rose-500 fill-current" />
              <p className="text-xs sm:text-sm font-semibold text-[#18181B]">
                Showing your saved items
              </p>
            </div>
            <button
              type="button"
              onClick={onClearWishlistFilter}
              className="text-xs font-bold text-[#18181B] hover:underline"
            >
              Show all products
            </button>
          </div>
        )}

        {/* Section Header */}
        <div className="gsap-section-header flex items-center justify-between mb-6">
          <h2 className="font-sans font-extrabold text-2xl sm:text-3xl text-[#18181B] tracking-tight">
            Today&apos;s Fresh Picks
          </h2>

          <button
            type="button"
            onClick={() => goToShop({ category: 'all' })}
            className="group inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#18181B] hover:text-[#B45309] transition-colors cursor-pointer"
          >
            <span>View All</span>
            <ArrowRight className="w-4 h-4 text-stone-500 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* 5 Product Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-5">
          {displayedProducts.map((product) => (
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
