import React from 'react';
import { Heart, ShoppingCart, Plus, Minus, Star, Eye } from 'lucide-react';
import type { Product } from '../types';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

interface ProductCardProps {
  product: Product;
  onQuickView: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onQuickView,
}) => {
  const { items, addToCart, updateQuantity } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const cartItem = items.find((i) => i.product.id === product.id);
  const quantityInCart = cartItem ? cartItem.quantity : 0;
  const isFavorited = isInWishlist(product.id);

  return (
    <div className="gsap-product-card card-hover-elevate group bg-white rounded-2xl border border-stone-200/90 p-3 sm:p-3.5 shadow-2xs flex flex-col justify-between relative h-full">
      {/* Clean Product Image Container with refined catalog presentation */}
      <div className="relative w-full aspect-square overflow-hidden rounded-xl bg-[#F8F9F7] flex items-center justify-center p-3 mb-3 group/img">
        <img
          src={product.image}
          alt={product.name}
          className="img-zoom-hover w-full h-full object-contain drop-shadow-2xs"
          loading="lazy"
        />

        {/* Floating Top Badges overlaid cleanly on the image */}
        <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between pointer-events-none z-10">
          {product.badge ? (
            <span className="text-[10px] sm:text-[11px] font-black uppercase px-2.5 py-0.5 rounded-full bg-[#D6F36A] text-[#123F32] shadow-sm pointer-events-auto">
              {product.badge}
            </span>
          ) : (
            <span />
          )}

          <button
            type="button"
            onClick={() => toggleWishlist(product.id)}
            className={`w-8 h-8 rounded-full flex items-center justify-center shadow-xs backdrop-blur-xs transition-all pointer-events-auto active:scale-125 ${
              isFavorited
                ? 'text-rose-500 bg-white shadow-sm'
                : 'text-stone-500 bg-white/90 hover:text-stone-900 hover:bg-white'
            }`}
            aria-label={isFavorited ? 'Remove from wishlist' : 'Save to wishlist'}
            title={isFavorited ? 'Remove from wishlist' : 'Save to wishlist'}
          >
            <Heart
              className={`w-4 h-4 ${isFavorited ? 'fill-current text-rose-500' : ''}`}
            />
          </button>
        </div>

        {/* Quick View Button on Hover */}
        <button
          type="button"
          onClick={() => onQuickView(product)}
          className="absolute inset-x-3 bottom-2.5 bg-white/95 backdrop-blur-xs text-[#123F32] text-xs font-bold py-2 rounded-xl shadow-md border border-stone-200/80 opacity-0 translate-y-2 group-hover/img:opacity-100 group-hover/img:translate-y-0 transition-all duration-200 flex items-center justify-center gap-1.5 hover:bg-[#123F32] hover:text-white cursor-pointer"
        >
          <Eye className="w-3.5 h-3.5" />
          <span>Quick View</span>
        </button>
      </div>

      {/* Product Details */}
      <div className="flex flex-col flex-1 justify-between">
        <div>
          <h4 className="text-sm font-bold text-[#18231E] group-hover:text-[#123F32] transition-colors line-clamp-1">
            {product.name}
          </h4>

          {/* Pricing */}
          <div className="flex items-baseline gap-1.5 mt-1">
            <span className="text-base font-extrabold text-[#18231E]">
              £{product.price.toFixed(2)}
            </span>
            <span className="text-xs text-[#737A72]">
              /{product.unit}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-stone-400 line-through ml-1">
                £{product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>

          {/* Star Rating */}
          <div className="flex items-center gap-1 text-xs text-[#737A72] mt-1 mb-3">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span className="font-bold text-[#18231E]">{product.rating}</span>
            <span>({product.reviewsCount})</span>
          </div>
        </div>

        {/* Signature Light Citrus-Green Add to Cart Button */}
        <div>
          {quantityInCart > 0 ? (
            <div className="flex items-center justify-between bg-[#F4F7F2] rounded-xl p-1 border border-[#DCE3D6]">
              <button
                type="button"
                onClick={() => updateQuantity(product.id, quantityInCart - 1)}
                className="w-7 h-7 rounded-lg bg-white text-[#123F32] hover:bg-stone-100 flex items-center justify-center text-xs font-bold shadow-2xs"
                aria-label="Decrease quantity"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="text-xs font-bold text-[#18231E]">
                {quantityInCart} in cart
              </span>
              <button
                type="button"
                onClick={() => updateQuantity(product.id, quantityInCart + 1)}
                className="w-7 h-7 rounded-lg bg-[#123F32] text-[#D6F36A] hover:bg-[#1B5746] flex items-center justify-center text-xs font-bold shadow-2xs"
                aria-label="Increase quantity"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => addToCart(product)}
              className="btn-magnetic w-full py-2.5 px-3 rounded-xl bg-[#E5F5D0] hover:bg-[#D6F36A] text-[#123F32] text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all shadow-2xs hover:shadow-xs group/btn cursor-pointer"
            >
              <ShoppingCart className="w-4 h-4 text-[#123F32]" />
              <span>Add to Cart</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
