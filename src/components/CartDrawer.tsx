import React, { useState } from 'react';
import {
  X,
  Plus,
  Minus,
  Trash2,
  ShoppingBag,
  ArrowRight,
  Sparkles,
  Truck,
} from 'lucide-react';
import { useCart } from '../context/CartContext';

interface CartDrawerProps {
  onCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ onCheckout }) => {
  const {
    items,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    subtotal,
    discountAmount,
    deliveryFee,
    total,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    freeDeliveryThreshold,
    amountNeededForFreeDelivery,
  } = useCart();

  const [promoInput, setPromoInput] = useState('');
  const [promoError, setPromoError] = useState('');

  if (!isCartOpen) return null;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError('');
    if (!promoInput.trim()) return;

    const success = applyCoupon(promoInput);
    if (!success) {
      setPromoError('Invalid code. Try FRESH20 for 20% off.');
    } else {
      setPromoInput('');
    }
  };

  const deliveryProgressPercent = Math.min(
    100,
    (subtotal / freeDeliveryThreshold) * 100
  );

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-fadeIn">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between">
          {/* Header */}
          <div className="p-5 sm:p-6 border-b border-[#E8ECE5] bg-[#F8F8F2]">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[#123F32] text-[#D6F36A] flex items-center justify-center">
                  <ShoppingBag className="w-4 h-4" />
                </div>
                <h3 className="font-serif-heading text-xl font-bold text-[#123F32]">
                  Your Fresh Basket
                </h3>
              </div>

              <button
                type="button"
                onClick={() => setIsCartOpen(false)}
                className="w-8 h-8 rounded-full bg-white hover:bg-stone-200 text-stone-600 flex items-center justify-center transition-colors"
                aria-label="Close basket"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Free Delivery Progress Bar */}
            <div className="bg-white p-3 rounded-2xl border border-[#E8ECE5]">
              <div className="flex items-center justify-between text-xs mb-1.5 font-medium">
                <span className="flex items-center gap-1.5 text-[#18231E]">
                  <Truck className="w-3.5 h-3.5 text-[#2F7654]" />
                  {amountNeededForFreeDelivery === 0 ? (
                    <strong className="text-[#2F7654]">
                      You qualify for Free Delivery! 🎉
                    </strong>
                  ) : (
                    <span>
                      Add <strong>£{amountNeededForFreeDelivery.toFixed(2)}</strong> more for free delivery
                    </span>
                  )}
                </span>
                <span className="text-[#737A72] text-[11px]">
                  Goal: £{freeDeliveryThreshold}
                </span>
              </div>

              <div className="w-full h-2 bg-stone-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#2F7654] transition-all duration-300"
                  style={{ width: `${deliveryProgressPercent}%` }}
                />
              </div>
            </div>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-5 sm:p-6 divide-y divide-stone-100">
            {items.length === 0 ? (
              <div className="text-center py-16 px-4">
                <div className="w-16 h-16 rounded-full bg-[#F4F7F2] text-[#2F7654] flex items-center justify-center mx-auto mb-4">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h4 className="font-serif-heading text-xl font-bold text-[#18231E] mb-2">
                  Your basket is empty
                </h4>
                <p className="text-sm text-[#737A72] mb-6 max-w-xs mx-auto">
                  Explore today&apos;s harvest of farm-fresh fruits, vegetables, and artisan breads.
                </p>
                <button
                  type="button"
                  onClick={() => setIsCartOpen(false)}
                  className="px-6 py-3 rounded-full bg-[#123F32] text-white text-sm font-bold hover:bg-[#1B5746] transition-colors"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div key={item.product.id} className="py-4 flex gap-4 items-center">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-16 h-16 rounded-xl object-contain bg-[#FBFBFA] p-1 border border-stone-100 flex-shrink-0"
                  />

                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-bold text-[#18231E] truncate">
                      {item.product.name}
                    </h4>
                    <p className="text-xs text-[#737A72]">
                      £{item.product.price.toFixed(2)} / {item.product.unit}
                    </p>

                    {/* Stepper */}
                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex items-center bg-[#F4F7F2] rounded-lg border border-[#DCE3D6] p-0.5">
                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(item.product.id, item.quantity - 1)
                          }
                          className="w-6 h-6 rounded bg-white text-[#123F32] flex items-center justify-center hover:bg-stone-100 text-xs"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-bold px-2.5 text-[#18231E]">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(item.product.id, item.quantity + 1)
                          }
                          className="w-6 h-6 rounded bg-[#123F32] text-[#D6F36A] flex items-center justify-center text-xs"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => removeFromCart(item.product.id)}
                        className="text-stone-400 hover:text-rose-500 p-1 transition-colors"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-sm font-extrabold text-[#123F32]">
                      £{(item.product.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer with promo code & checkout */}
          {items.length > 0 && (
            <div className="p-5 sm:p-6 border-t border-[#E8ECE5] bg-[#F8F8F2] space-y-4">
              {/* Promo code field */}
              {appliedCoupon ? (
                <div className="flex items-center justify-between bg-emerald-50 border border-emerald-200 px-3 py-2 rounded-xl text-xs">
                  <span className="flex items-center gap-1.5 text-emerald-800 font-semibold">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                    Code {appliedCoupon} applied (20% OFF)
                  </span>
                  <button
                    type="button"
                    onClick={removeCoupon}
                    className="text-emerald-700 hover:text-rose-600 font-bold ml-2"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyPromo} className="space-y-1">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={promoInput}
                      onChange={(e) => setPromoInput(e.target.value)}
                      placeholder="Promo code (try FRESH20)"
                      className="flex-1 text-xs uppercase font-medium px-3 py-2 rounded-xl bg-white border border-[#DCE2D8] focus:outline-none focus:border-[#123F32]"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 rounded-xl bg-white hover:bg-stone-50 border border-[#DCE2D8] text-xs font-bold text-[#18231E]"
                    >
                      Apply
                    </button>
                  </div>
                  {promoError && (
                    <p className="text-[11px] text-rose-500 pl-1">{promoError}</p>
                  )}
                </form>
              )}

              {/* Price Calculations */}
              <div className="space-y-1.5 text-xs text-[#737A72]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-[#18231E]">
                    £{subtotal.toFixed(2)}
                  </span>
                </div>

                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-medium">
                    <span>Discount (20%)</span>
                    <span>-£{discountAmount.toFixed(2)}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Delivery Fee</span>
                  <span>
                    {deliveryFee === 0 ? (
                      <span className="text-[#2F7654] font-bold">FREE</span>
                    ) : (
                      `£${deliveryFee.toFixed(2)}`
                    )}
                  </span>
                </div>

                <div className="flex justify-between text-base font-bold text-[#123F32] pt-2 border-t border-[#E8ECE5]">
                  <span>Total</span>
                  <span className="text-lg">£{total.toFixed(2)}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                type="button"
                onClick={() => {
                  setIsCartOpen(false);
                  onCheckout();
                }}
                className="w-full py-4 rounded-full bg-[#123F32] hover:bg-[#1B5746] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-md transition-all group"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4 text-[#D6F36A] group-hover:translate-x-1 transition-transform" />
              </button>

              <p className="text-[11px] text-center text-[#737A72]">
                Safe &amp; encrypted 256-bit payment checkout
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
