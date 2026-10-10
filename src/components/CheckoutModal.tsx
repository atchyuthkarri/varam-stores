import React, { useState } from 'react';
import { X, CheckCircle2, ShieldCheck, CreditCard } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  postalCode: string;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  postalCode,
}) => {
  const { total, items, clearCart } = useCart();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'apple' | 'card'>('apple');

  if (!isOpen) return null;

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      clearCart();
    }, 1500);
  };

  const handleClose = () => {
    setIsSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-stone-200 relative">
        <button
          type="button"
          onClick={handleClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-700 flex items-center justify-center transition-colors"
          aria-label="Close checkout"
        >
          <X className="w-4 h-4" />
        </button>

        {!isSubmitted ? (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-full bg-[#123F32] text-[#D6F36A] flex items-center justify-center">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <h3 className="font-serif-heading text-2xl font-bold text-[#123F32]">
                Complete Your Order
              </h3>
            </div>

            <p className="text-xs text-[#737A72] mb-6">
              Review your delivery slot and preferred payment method.
            </p>

            <div className="bg-[#F8F8F2] p-4 rounded-2xl border border-[#E8ECE5] space-y-2 mb-6 text-xs">
              <div className="flex justify-between">
                <span className="text-[#737A72]">Destination:</span>
                <span className="font-bold text-[#18231E]">{postalCode}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#737A72]">Delivery Window:</span>
                <span className="font-bold text-[#2F7654]">Today, 6:00 PM - 8:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#737A72]">Basket Items:</span>
                <span className="font-semibold text-[#18231E]">{items.length} unique produce</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-stone-200 text-sm font-bold text-[#123F32]">
                <span>Order Total:</span>
                <span>£{total.toFixed(2)}</span>
              </div>
            </div>

            <form onSubmit={handlePlaceOrder} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-[#18231E] block mb-2">
                  Select Payment Method:
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('apple')}
                    className={`p-3 rounded-xl border flex items-center justify-center gap-2 text-xs font-bold transition-all ${
                      paymentMethod === 'apple'
                        ? 'border-[#123F32] bg-[#123F32] text-white shadow-xs'
                        : 'border-stone-200 text-[#18231E] hover:bg-stone-50'
                    }`}
                  >
                    <span> Apple Pay</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`p-3 rounded-xl border flex items-center justify-center gap-2 text-xs font-bold transition-all ${
                      paymentMethod === 'card'
                        ? 'border-[#123F32] bg-[#123F32] text-white shadow-xs'
                        : 'border-stone-200 text-[#18231E] hover:bg-stone-50'
                    }`}
                  >
                    <CreditCard className="w-4 h-4" />
                    <span>Credit / Debit Card</span>
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-full bg-[#123F32] hover:bg-[#1B5746] text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2"
              >
                <span>Pay &amp; Place Order (£{total.toFixed(2)})</span>
              </button>

              <p className="text-[11px] text-center text-[#737A72]">
                🔒 256-bit SSL encrypted checkout. No card details stored.
              </p>
            </form>
          </div>
        ) : (
          <div className="text-center py-6">
            <div className="w-16 h-16 rounded-full bg-[#EAF0E6] text-[#2F7654] flex items-center justify-center mx-auto mb-4 animate-bounce">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <h3 className="font-serif-heading text-2xl font-bold text-[#123F32] mb-2">
              Order Confirmed!
            </h3>

            <p className="text-sm text-[#737A72] mb-6 max-w-xs mx-auto">
              Your farm-fresh groceries are being picked by our Hertfordshire
              team for delivery to <strong>{postalCode}</strong> today.
            </p>

            <div className="bg-[#F8F8F2] p-4 rounded-2xl border border-[#E8ECE5] text-xs text-left mb-6 space-y-1">
              <p>
                <strong>Order Ref:</strong> #FM-{(Math.random() * 89999 + 10000).toFixed(0)}
              </p>
              <p>
                <strong>Confirmation email:</strong> Sent with live courier link
              </p>
            </div>

            <button
              type="button"
              onClick={handleClose}
              className="px-8 py-3 rounded-full bg-[#123F32] text-white text-xs font-bold hover:bg-[#1B5746]"
            >
              Continue Browsing
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
