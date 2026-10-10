import React from 'react';
import { ArrowRight, Leaf } from 'lucide-react';

export const FarmFreshBanner: React.FC = () => {
  return (
    <section className="py-6 sm:py-8 bg-[#F8F8F2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="gsap-farm-banner relative rounded-3xl overflow-hidden bg-[#EAF2E8] border border-[#DCE8DB] p-8 sm:p-12 lg:p-14 shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Content */}
            <div className="lg:col-span-6 flex flex-col items-start z-10">
              <h2 className="font-sans font-extrabold text-3xl sm:text-4xl lg:text-5xl text-[#18231E] leading-[1.12] tracking-tight mb-4">
                Farm Fresh <br />
                Fruits &amp; Vegetables <br />
                Delivered Daily.
              </h2>

              <p className="text-sm sm:text-base text-[#556059] leading-relaxed mb-8 max-w-md">
                We source everything you need straight to your door.
              </p>

              <a
                href="#fresh-picks"
                className="btn-magnetic inline-flex items-center gap-3 px-8 py-3.5 rounded-full bg-[#123F32] text-white text-sm font-bold hover:bg-[#1B5746] shadow-md group cursor-pointer"
              >
                <span>Shop Fresh Produce</span>
                <ArrowRight className="w-4 h-4 text-[#D6F36A] group-hover:translate-x-1.5 transition-transform" />
              </a>
            </div>

            {/* Right: Rustic Wicker Basket Photo & 100% Fresh Badge */}
            <div className="lg:col-span-6 relative flex justify-center items-center">
              <div className="relative w-full max-w-lg aspect-[16/10] rounded-2xl overflow-hidden shadow-lg border border-stone-200/50 group">
                <img
                  src="/promo-basket-delivery.jpg"
                  alt="Farm Fresh Fruits and Vegetables in rustic wicker basket"
                  className="gsap-farm-img img-zoom-hover w-full h-full object-cover object-center will-change-transform"
                />

                {/* 100% Fresh Circular Lime Stamp Badge */}
                <div className="absolute top-4 right-4 w-20 h-20 rounded-full bg-[#D6F36A] text-[#123F32] flex flex-col items-center justify-center text-center p-2 shadow-xl border-2 border-white hover:scale-105 transition-transform">
                  <Leaf className="w-4 h-4 fill-current mb-0.5" />
                  <span className="text-[10px] font-extrabold uppercase leading-none">
                    100%
                  </span>
                  <span className="text-xs font-bold leading-tight">Fresh</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
