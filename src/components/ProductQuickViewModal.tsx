import React, { useState } from 'react';
import { X, Heart, Plus, Minus, Star, MapPin } from 'lucide-react';
import type { Product } from '../types';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

interface ProductQuickViewModalProps {
  product: Product | null;
  onClose: () => void;
}

export const ProductQuickViewModal: React.FC<ProductQuickViewModalProps> = ({
  product,
  onClose,
}) => {
  const [qty, setQty] = useState(1);
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  if (!product) return null;

  const isFavorited = isInWishlist(product.id);

  const handleAddToCart = () => {
    addToCart(product, qty);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-stone-200 relative flex flex-col md:flex-row">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-white/90 hover:bg-white text-stone-700 flex items-center justify-center shadow-md transition-colors"
          aria-label="Close modal"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Product Image Container: Edge-to-edge full fitting */}
        <div className="md:w-1/2 relative bg-[#F8F9F7] overflow-hidden min-h-[300px] md:min-h-[440px] flex items-center justify-center border-b md:border-b-0 md:border-r border-[#E8ECE5]">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-500"
          />

          {product.badge && (
            <span className="absolute top-4 left-4 text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full bg-[#123F32] text-[#D6F36A] shadow-md z-10">
              {product.badge}
            </span>
          )}
        </div>

        {/* Product Details */}
        <div className="md:w-1/2 p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-xs font-semibold text-[#2F7654] uppercase tracking-wider">
                {product.categoryLabel}
              </span>
              {product.isOrganic && (
                <span className="text-[10px] bg-[#EAF0E6] text-[#123F32] font-bold px-2 py-0.5 rounded-full">
                  100% Organic
                </span>
              )}
            </div>

            <h3 className="font-serif-heading text-2xl font-bold text-[#18231E] leading-tight mb-2">
              {product.name}
            </h3>

            {/* Rating and Reviews */}
            <div className="flex items-center gap-2 text-xs text-[#737A72] mb-3">
              <div className="flex items-center text-amber-500">
                <Star className="w-3.5 h-3.5 fill-current" />
                <span className="font-bold text-[#18231E] ml-1">
                  {product.rating}
                </span>
              </div>
              <span>•</span>
              <span>{product.reviewsCount} verified reviews</span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-2 mb-4">
              <span className="text-2xl font-extrabold text-[#123F32]">
                £{product.price.toFixed(2)}
              </span>
              <span className="text-sm text-[#737A72]">
                /{product.unit}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-stone-400 line-through">
                  £{product.originalPrice.toFixed(2)}
                </span>
              )}
            </div>

            {/* Origin */}
            {product.origin && (
              <div className="flex items-center gap-1.5 text-xs text-[#2F7654] font-medium mb-3">
                <MapPin className="w-3.5 h-3.5" />
                <span>Origin: {product.origin}</span>
              </div>
            )}

            {/* Description */}
            <p className="text-xs sm:text-sm text-[#737A72] leading-relaxed mb-4">
              {product.description}
            </p>

            {/* Nutritional Info Pills if available */}
            {product.nutrition && (
              <div className="bg-[#F8F8F2] p-3 rounded-2xl border border-[#E8ECE5] mb-5">
                <p className="text-[11px] font-bold uppercase text-[#123F32] mb-1.5">
                  Nutritional Breakdown:
                </p>
                <div className="grid grid-cols-4 gap-1 text-center text-[10px]">
                  <div className="bg-white p-1 rounded-lg">
                    <span className="text-[#737A72] block">Energy</span>
                    <span className="font-bold text-[#18231E]">
                      {product.nutrition.calories.split(' ')[0]}
                    </span>
                  </div>
                  <div className="bg-white p-1 rounded-lg">
                    <span className="text-[#737A72] block">Carbs</span>
                    <span className="font-bold text-[#18231E]">
                      {product.nutrition.carbs}
                    </span>
                  </div>
                  <div className="bg-white p-1 rounded-lg">
                    <span className="text-[#737A72] block">Protein</span>
                    <span className="font-bold text-[#18231E]">
                      {product.nutrition.protein}
                    </span>
                  </div>
                  <div className="bg-white p-1 rounded-lg">
                    <span className="text-[#737A72] block">Fat</span>
                    <span className="font-bold text-[#18231E]">
                      {product.nutrition.fat}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Action Row */}
          <div className="pt-3 border-t border-stone-100 flex items-center gap-3">
            {/* Quantity Stepper */}
            <div className="flex items-center bg-[#F4F7F2] rounded-xl border border-[#DCE3D6] p-1">
              <button
                type="button"
                onClick={() => setQty(Math.max(1, qty - 1))}
                className="w-8 h-8 rounded-lg bg-white text-[#123F32] flex items-center justify-center hover:bg-stone-100 font-bold"
                aria-label="Decrease quantity"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="w-8 text-center text-sm font-bold text-[#18231E]">
                {qty}
              </span>
              <button
                type="button"
                onClick={() => setQty(qty + 1)}
                className="w-8 h-8 rounded-lg bg-[#123F32] text-[#D6F36A] flex items-center justify-center font-bold"
                aria-label="Increase quantity"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Add to Basket Button */}
            <button
              type="button"
              onClick={handleAddToCart}
              className="flex-1 py-3 px-4 rounded-xl bg-[#123F32] hover:bg-[#1B5746] text-white text-sm font-bold flex items-center justify-center gap-2 transition-colors shadow-sm"
            >
              <span>Add to Basket</span>
              <span className="text-xs text-[#D6F36A]">
                • £{(product.price * qty).toFixed(2)}
              </span>
            </button>

            {/* Wishlist Button */}
            <button
              type="button"
              onClick={() => toggleWishlist(product.id)}
              className={`p-3 rounded-xl border transition-colors ${
                isFavorited
                  ? 'bg-rose-50 border-rose-200 text-rose-500'
                  : 'border-[#DCE2D8] text-stone-400 hover:text-stone-700'
              }`}
              aria-label="Toggle wishlist"
            >
              <Heart className={`w-4 h-4 ${isFavorited ? 'fill-current' : ''}`} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
