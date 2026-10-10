import React, { useState } from 'react';
import {
  ArrowRight,
  Play,
  Truck,
  Leaf,
  Layers,
  ShieldCheck,
} from 'lucide-react';
import { VideoModal } from './VideoModal';

export const HeroSection: React.FC = () => {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  return (
    <>
      {/* ========================================================================= */}
      {/* MOBILE HERO (MATCHING EXACT REFERENCE MOCKUP SCREENSHOT)                  */}
      {/* ========================================================================= */}
      <section className="block md:hidden relative w-full bg-[#FAF6EF] overflow-hidden">
        <div className="relative w-full max-w-[500px] mx-auto select-none">
          {/* Exact Mobile Hero Artwork */}
          <img
            src="/hero-mobile-exact.png"
            alt="Varam stores Good Food Brighter Days - Fresh Everyday Groceries"
            className="w-full h-auto block pointer-events-none"
            width={490}
            height={816}
            fetchPriority="high"
          />

          {/* Interactive Hotspot: "Shop Now →" Button */}
          <a
            href="#products"
            aria-label="Shop Now - View Fresh Groceries"
            className="absolute top-[51.8%] left-[6.8%] w-[38%] h-[6.5%] rounded-full cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#8EBC45] transition-transform active:scale-95"
            title="Shop Now"
          />

          {/* Interactive Hotspot: "▶ Watch Video" Button */}
          <button
            type="button"
            onClick={() => setIsVideoModalOpen(true)}
            aria-label="Watch Video about Fresh Groceries"
            className="absolute top-[60.4%] left-[6.8%] w-[44%] h-[6.2%] rounded-full cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#8EBC45] transition-transform active:scale-95"
            title="Watch Video"
          />

          {/* Interactive Hotspots: 4 Trust Badges at Bottom */}
          <div className="absolute bottom-[2.5%] left-[4%] right-[4%] h-[12%] grid grid-cols-4 pointer-events-none">
            <a
              href="#products"
              className="pointer-events-auto rounded-xl active:bg-black/5 transition-colors"
              title="Same-day Delivery"
              aria-label="Same-day Delivery"
            />
            <a
              href="#categories"
              className="pointer-events-auto rounded-xl active:bg-black/5 transition-colors"
              title="100% Fresh Produce"
              aria-label="100% Fresh Produce"
            />
            <a
              href="#categories"
              className="pointer-events-auto rounded-xl active:bg-black/5 transition-colors"
              title="Wide Selection"
              aria-label="Wide Selection"
            />
            <a
              href="#story"
              className="pointer-events-auto rounded-xl active:bg-black/5 transition-colors"
              title="Quality Guaranteed"
              aria-label="Quality Guaranteed"
            />
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* DESKTOP & TABLET HERO SECTION (MD AND ABOVE)                              */}
      {/* ========================================================================= */}
      <section className="hidden md:flex relative w-full h-[calc(100vh-80px)] min-h-[620px] max-h-[840px] lg:min-h-[680px] lg:max-h-[880px] flex-col justify-between overflow-hidden bg-[#FAF6EF]">
        {/* Full-bleed desktop background */}
        <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
          <img
            src="/hero-banner.jpg?v=8"
            alt="Varam stores Canvas Grocery Tote filled with fresh vegetables, artisan bread, and produce"
            className="w-full h-full object-cover object-[82%_center] will-change-transform"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#FAF6EF] via-[#FAF6EF]/60 via-40% to-transparent pointer-events-none" />
        </div>

        {/* Content container */}
        <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full relative z-10 pt-8 lg:pt-14 flex-1 flex flex-col justify-between">
          <div className="w-full">
            <div className="max-w-md lg:max-w-xl flex flex-col items-start">
              {/* Eyebrow */}
              <div className="mb-3">
                <span className="text-xs font-bold tracking-[0.16em] uppercase text-[#455048] block leading-tight">
                  Fresh Groceries,
                </span>
                <span className="text-xs font-bold tracking-[0.16em] uppercase text-[#455048] block leading-tight">
                  Delivered Daily
                </span>
                <div className="w-9 h-0.5 bg-[#8EBC45] rounded-full mt-1.5" />
              </div>

              {/* Main Headline */}
              <h1 className="font-serif-heading text-5xl lg:text-[72px] leading-[1.04] tracking-tight text-[#18231E] mb-4">
                <span className="block font-bold">Good Food</span>
                <span className="block italic font-normal text-[#235E49]">
                  Brighter
                </span>
                <span className="block italic font-normal text-[#235E49]">
                  Days
                </span>
              </h1>

              {/* Subtitle */}
              <p className="text-sm lg:text-base text-[#556059] leading-relaxed mb-6 font-normal max-w-sm">
                Fresh fruits, vegetables, dairy and more — delivered to your door,
                fresh and hassle-free.
              </p>

              {/* Action Buttons */}
              <div className="flex items-center gap-4 mb-2">
                <a
                  href="#products"
                  className="btn-magnetic inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#123F32] hover:bg-[#1B5746] text-white text-sm font-bold shadow-md hover:shadow-lg transition-all cursor-pointer group"
                >
                  <span>Shop Now</span>
                  <ArrowRight className="w-3.5 h-3.5 text-white group-hover:translate-x-1 transition-transform" />
                </a>

                <button
                  type="button"
                  onClick={() => setIsVideoModalOpen(true)}
                  className="inline-flex items-center gap-2.5 text-sm font-bold text-[#18231E] hover:text-[#123F32] cursor-pointer group transition-colors py-1"
                >
                  <div className="w-8 h-8 rounded-full bg-white shadow-sm border border-black/5 flex items-center justify-center text-[#18231E] group-hover:scale-108 transition-all">
                    <Play className="w-3 h-3 fill-[#18231E] ml-0.5 text-[#18231E]" />
                  </div>
                  <span>Watch Video</span>
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Trust Cards */}
          <div className="w-full mt-auto pb-4">
            <div className="flex items-center justify-center gap-1.5 mb-3">
              <span className="w-7 h-1 rounded-full bg-white/90 shadow-2xs" />
              <span className="w-2 h-1 rounded-full bg-white/50" />
              <span className="w-2 h-1 rounded-full bg-white/50" />
            </div>

            <div className="w-full bg-white/95 backdrop-blur-md rounded-3xl shadow-xl border border-black/[0.06] p-4">
              <div className="grid grid-cols-4 divide-x divide-stone-200/80">
                <div className="flex flex-col items-center text-center px-2">
                  <Truck className="w-5 h-5 text-[#18231E] mb-1.5 stroke-[1.8]" />
                  <p className="text-xs font-bold text-[#18231E] leading-tight">Same-day</p>
                  <p className="text-[10.5px] text-[#737A72] leading-tight mt-0.5">Delivery</p>
                </div>
                <div className="flex flex-col items-center text-center px-2">
                  <Leaf className="w-5 h-5 text-[#18231E] mb-1.5 stroke-[1.8]" />
                  <p className="text-xs font-bold text-[#18231E] leading-tight">100%</p>
                  <p className="text-[10.5px] text-[#737A72] leading-tight mt-0.5">Fresh Produce</p>
                </div>
                <div className="flex flex-col items-center text-center px-2">
                  <Layers className="w-5 h-5 text-[#18231E] mb-1.5 stroke-[1.8]" />
                  <p className="text-xs font-bold text-[#18231E] leading-tight">Wide</p>
                  <p className="text-[10.5px] text-[#737A72] leading-tight mt-0.5">Selection</p>
                </div>
                <div className="flex flex-col items-center text-center px-2">
                  <ShieldCheck className="w-5 h-5 text-[#18231E] mb-1.5 stroke-[1.8]" />
                  <p className="text-xs font-bold text-[#18231E] leading-tight">Quality</p>
                  <p className="text-[10.5px] text-[#737A72] leading-tight mt-0.5">Guaranteed</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <VideoModal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
      />
    </>
  );
};
