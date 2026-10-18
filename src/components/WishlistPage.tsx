import React from 'react';
import { Heart, ShoppingCart, Trash2, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { products } from '../data/products';
import { ProductCard } from './ProductCard';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { useNavigation } from '../context/NavigationContext';
import type { Product } from '../types';

interface WishlistPageProps {
  onQuickView: (product: Product) => void;
}

export const WishlistPage: React.FC<WishlistPageProps> = ({ onQuickView }) => {
  const { wishlistIds, clearWishlist } = useWishlist();
  const { addToCart, showToast } = useCart();
  const { goToHome, goToShop, goToProduct } = useNavigation();

  // Favorited products
  const favoritedProducts = products.filter((p) => wishlistIds.includes(p.id));

  const handleAddAllToCart = () => {
    favoritedProducts.forEach((p) => addToCart(p, 1));
    showToast(`Added all ${favoritedProducts.length} saved items to your basket!`);
  };

  return (
    <div className="w-full bg-white min-h-screen pb-24 animate-fadeIn">
      {/* Breadcrumb Header */}
      <section className="bg-white border-b border-stone-200/80 py-8 sm:py-12 px-4 sm:px-6 lg:px-10">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-10 2xl:px-12">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-[#737A72] mb-3">
            <button
              type="button"
              onClick={goToHome}
              className="hover:text-[#B45309] transition-colors cursor-pointer"
            >
              Home
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
            <span className="text-[#18181B] font-bold">Saved Wishlist</span>
          </nav>

          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#B45309] block mb-1">
                Your Curated Favourites
              </span>
              <h1 className="font-serif-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-[#18181B]">
                My Saved Wishlist
              </h1>
            </div>

            {favoritedProducts.length > 0 && (
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={clearWishlist}
                  className="px-4 py-2.5 rounded-full border border-stone-300 bg-white hover:bg-stone-50 text-xs font-bold text-stone-700 transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <Trash2 className="w-3.5 h-3.5 text-stone-500" />
                  <span>Clear All</span>
                </button>
                <button
                  type="button"
                  onClick={handleAddAllToCart}
                  className="px-6 py-2.5 rounded-full bg-[#F5D103] text-[#18181B] hover:bg-[#E5A800] text-xs font-bold transition-all cursor-pointer flex items-center gap-2 shadow-sm btn-magnetic"
                >
                  <ShoppingCart className="w-4 h-4 text-[#18181B]" />
                  <span>Add All ({favoritedProducts.length}) to Basket</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Main Grid or Empty State */}
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-10 2xl:px-12 pt-8 sm:pt-12">
        {favoritedProducts.length === 0 ? (
          <div className="bg-white rounded-3xl border border-stone-200/80 p-8 sm:p-16 text-center max-w-lg mx-auto shadow-xs">
            <div className="w-16 h-16 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center mx-auto mb-4">
              <Heart className="w-8 h-8" />
            </div>
            <h2 className="font-serif-heading font-bold text-2xl text-[#18181B] mb-2">
              Your Wishlist is Empty
            </h2>
            <p className="text-xs sm:text-sm text-[#737A72] mb-6">
              Save your favorite fresh veggies, artisan bakery loaves, and pantry essentials here by clicking the heart icon on any product card.
            </p>
            <button
              type="button"
              onClick={() => goToShop()}
              className="px-7 py-3 rounded-full bg-[#18181B] text-[#F5D103] text-xs font-bold hover:bg-[#E5A800] hover:text-[#18181B] transition-colors cursor-pointer shadow-sm btn-magnetic"
            >
              Browse Fresh Catalogue
            </button>
          </div>
        ) : (
          <div>
            <p className="text-xs sm:text-sm font-semibold text-[#18181B] mb-6">
              You have <strong className="text-[#18181B]">{favoritedProducts.length}</strong> saved grocery item{favoritedProducts.length === 1 ? '' : 's'}
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              <AnimatePresence>
                {favoritedProducts.map((product) => (
                  <motion.div
                    key={product.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                  >
                    <ProductCard
                      product={product}
                      onQuickView={onQuickView}
                      onSelectProduct={(p) => goToProduct(p.id)}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
