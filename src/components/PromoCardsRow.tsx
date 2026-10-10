import React from 'react';
import { ArrowRight, Leaf, Truck } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const PromoCardsRow: React.FC = () => {
  const { applyCoupon, setIsCartOpen } = useCart();

  return (
    <section id="promotions" className="py-10 sm:py-14 bg-[#F8F8F2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-7">
          {/* Card 1: 20% OFF First Order */}
          <div
            onClick={() => applyCoupon('FRESH20')}
            className="gsap-promo-card card-hover-elevate group relative rounded-[28px] overflow-hidden shadow-xs min-h-[360px] sm:min-h-[380px] p-7 sm:p-8 flex flex-col justify-between cursor-pointer border border-stone-200/70"
          >
            {/* Background image */}
            <div className="absolute inset-0 z-0 pointer-events-none">
              <img
                src="/promo-card-bag.jpg?v=5"
                alt="Varam stores Grocery Bag filled with vegetables and bread on sunlit stone table"
                className="img-zoom-hover w-full h-full object-cover object-center"
              />
            </div>

            {/* Content Left */}
            <div className="relative z-10 max-w-[64%] sm:max-w-[62%] flex flex-col items-start">
              <div className="inline-flex items-center gap-1.5 text-[11px] font-bold text-[#18231E] uppercase tracking-[0.14em] mb-3">
                <Leaf className="w-3.5 h-3.5 fill-[#18231E] text-[#18231E]" />
                <span>A Fresh Beginning</span>
              </div>

              <h3 className="font-serif-heading font-bold text-2xl lg:text-[27px] leading-[1.1] text-[#18231E] uppercase tracking-tight mb-3">
                New Here? <br />
                Enjoy 20% Off <br />
                Your First Order
              </h3>

              <p className="text-[12.5px] lg:text-[13px] text-[#4F5B54] leading-relaxed font-normal">
                Fresh groceries, everyday essentials and more — delivered to your door.
              </p>
            </div>

            {/* Voucher Pill */}
            <div className="relative z-10 mt-6 pt-1">
              <div className="btn-magnetic inline-flex items-center gap-3.5 px-4 py-2.5 rounded-2xl bg-white/95 backdrop-blur-md border border-dashed border-stone-300/90 shadow-xs hover:shadow-md transition-all">
                <div className="text-left">
                  <p className="text-[10px] text-stone-500 font-medium leading-tight">
                    Use code
                  </p>
                  <p className="text-sm font-sans font-bold text-[#18231E] tracking-wider leading-none mt-0.5">
                    FRESH20
                  </p>
                </div>
                <div className="w-8 h-8 rounded-full bg-[#123F32] group-hover:bg-[#1B5746] text-white flex items-center justify-center shadow-xs transition-colors">
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Free Delivery Over £50 */}
          <div
            onClick={() => setIsCartOpen(true)}
            className="gsap-promo-card card-hover-elevate group relative rounded-[28px] overflow-hidden shadow-xs min-h-[360px] sm:min-h-[380px] p-7 sm:p-8 flex flex-col justify-between cursor-pointer border border-[#123F32]/30"
          >
            {/* Background image */}
            <div className="absolute inset-0 z-0 pointer-events-none">
              <img
                src="/promo-card-basket.jpg?v=3"
                alt="Wicker harvest basket filled with fresh farm produce"
                className="img-zoom-hover w-full h-full object-cover object-center"
              />
            </div>

            {/* Content Left */}
            <div className="relative z-10 max-w-[64%] sm:max-w-[62%] flex flex-col items-start text-white">
              <div className="inline-flex items-center gap-1.5 text-[11px] font-bold text-stone-200 uppercase tracking-[0.14em] mb-3">
                <Truck className="w-3.5 h-3.5" />
                <span>Groceries, Delivered Fresh</span>
              </div>

              <h3 className="font-serif-heading font-bold text-2xl lg:text-[27px] leading-[1.1] text-white uppercase tracking-tight mb-3">
                Free Delivery <br />
                On Orders Over £50
              </h3>

              <p className="text-[12.5px] lg:text-[13px] text-stone-200/90 leading-relaxed font-normal">
                Stock up on your favourites with fast, reliable delivery to your doorstep.
              </p>
            </div>

            {/* Action Button */}
            <div className="relative z-10 mt-6 pt-1">
              <button
                type="button"
                className="btn-magnetic inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white text-[#123F32] hover:bg-stone-100 text-xs font-bold shadow-md transition-all cursor-pointer"
              >
                <span>Shop Now</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Card 3: Fresh Groceries Without Hassle */}
          <a
            href="#fresh-picks"
            className="gsap-promo-card card-hover-elevate group relative rounded-[28px] overflow-hidden shadow-xs min-h-[360px] sm:min-h-[380px] p-7 sm:p-8 flex flex-col justify-between cursor-pointer border border-stone-200/70 block"
          >
            {/* Background image */}
            <div className="absolute inset-0 z-0 pointer-events-none">
              <img
                src="/promo-card-family.jpg?v=3"
                alt="Rustic ceramic bowl of fresh lemons, garlic and basil"
                className="img-zoom-hover w-full h-full object-cover object-center"
              />
            </div>

            {/* Content Left */}
            <div className="relative z-10 max-w-[64%] sm:max-w-[62%] flex flex-col items-start">
              <div className="inline-flex items-center gap-1.5 text-[11px] font-bold text-[#18231E] uppercase tracking-[0.14em] mb-3">
                <Leaf className="w-3.5 h-3.5 fill-[#18231E] text-[#18231E]" />
                <span>Healthy Homes. Happier Days.</span>
              </div>

              <h3 className="font-serif-heading font-bold text-2xl lg:text-[27px] leading-[1.1] text-[#18231E] uppercase tracking-tight mb-3">
                Fresh Groceries <br />
                For Your Family, <br />
                <span className="italic font-normal">Without Hassle.</span>
              </h3>

              <p className="text-[12.5px] lg:text-[13px] text-[#4F5B54] leading-relaxed font-normal">
                Carefully selected produce, trusted brands and everyday essentials — all in one place.
              </p>
            </div>

            {/* Action Button */}
            <div className="relative z-10 mt-6 pt-1">
              <div className="btn-magnetic inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-stone-900/5 border border-[#18231E]/60 text-[#18231E] group-hover:bg-[#123F32] group-hover:text-white group-hover:border-[#123F32] text-xs font-bold transition-all shadow-2xs">
                <span>Learn More</span>
              </div>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
};
