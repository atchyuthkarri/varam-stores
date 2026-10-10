import React, { useState } from 'react';
import { Sparkles, ArrowRight, Check, Copy } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const PromotionalBanner: React.FC = () => {
  const { applyCoupon, appliedCoupon } = useCart();
  const [copied, setCopied] = useState(false);

  const handleApplyCoupon = () => {
    applyCoupon('FRESH20');
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section
      id="promotions"
      className="w-full relative min-h-[520px] lg:min-h-[580px] flex items-center bg-[#123F32] text-white overflow-hidden"
    >
      {/* 1. Full-Bleed Panoramic Background Image */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
        <img
          src="https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=2400&q=85"
          alt="Fresh wholesome artisan vegetable bowl with sliced avocados and vine tomatoes"
          className="w-full h-full object-cover object-right lg:object-center transform scale-102"
        />

        {/* Cinematic Dark Forest Green Gradient Overlay for perfect text clarity */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#123F32] via-[#123F32]/95 via-50% to-[#123F32]/25 hidden md:block" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#123F32] via-[#123F32]/90 to-[#123F32]/60 md:hidden" />
      </div>

      {/* 2. Full-Width Container Content */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Offer Details */}
          <div className="lg:col-span-7 xl:col-span-8 flex flex-col items-start max-w-2xl">
            {/* Limited Time Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-[#D6F36A] text-xs font-bold tracking-wider uppercase mb-5 backdrop-blur-md border border-white/15">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Limited Time Offer</span>
            </div>

            {/* Headline */}
            <h2 className="font-serif-heading text-4xl sm:text-6xl lg:text-[68px] font-bold tracking-tight text-white mb-5 leading-[1.08]">
              Get 20% OFF <br />
              <span className="italic font-normal text-[#D6F36A]">
                Your First Order
              </span>
            </h2>

            <p className="text-stone-200 text-base sm:text-xl mb-8 max-w-xl font-normal leading-relaxed">
              Enjoy farm-to-table freshness delivered directly to your doorstep.
              Enter promo code <strong className="text-[#D6F36A] font-semibold">FRESH20</strong> during checkout to claim your welcome reward.
            </p>

            {/* Promo Code Box and CTA */}
            <div className="flex flex-wrap items-center gap-4 mb-8">
              <div className="inline-flex items-center gap-3 bg-white/10 border border-white/20 rounded-full py-2.5 px-5 backdrop-blur-md shadow-md">
                <span className="text-xs uppercase text-stone-300 font-semibold">
                  Code:
                </span>
                <span className="font-mono text-lg font-bold text-[#D6F36A] tracking-wider">
                  FRESH20
                </span>
                <button
                  type="button"
                  onClick={handleApplyCoupon}
                  className="ml-2 px-3.5 py-1.5 bg-white text-[#123F32] hover:bg-[#D6F36A] rounded-full text-xs font-bold flex items-center gap-1.5 transition-all shadow-xs"
                  title="Copy and apply discount to your basket"
                >
                  {copied || appliedCoupon === 'FRESH20' ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-[#123F32]" />
                      <span>Applied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Apply Code</span>
                    </>
                  )}
                </button>
              </div>

              <a
                href="#products"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#D6F36A] text-[#123F32] font-bold text-sm hover:bg-white hover:shadow-lg transition-all shadow-md group"
              >
                <span>Shop Now</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>

            {/* Handwritten script annotation */}
            <div className="flex items-center gap-3">
              <p className="font-script-accent text-3xl text-[#D6F36A] font-medium">
                Healthy Choice, Happier You ✨
              </p>
            </div>
          </div>

          {/* Right Column: Floating Circular Freshness Badge */}
          <div className="lg:col-span-5 xl:col-span-4 flex justify-end items-center">
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border-2 border-dashed border-[#D6F36A]/60 bg-[#123F32]/85 backdrop-blur-md flex flex-col items-center justify-center text-center p-3 text-white shadow-2xl">
              <span className="text-[10px] uppercase tracking-widest text-[#D6F36A] font-extrabold">
                100%
              </span>
              <span className="text-xs font-bold leading-tight tracking-wider">
                NATURAL
              </span>
              <span className="text-[9px] text-stone-300 tracking-wider">
                HARVEST
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
