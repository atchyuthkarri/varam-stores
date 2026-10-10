import React, { useState } from 'react';
import {
  ArrowRight,
  Play,
  Truck,
  Leaf,
  Layers,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { VideoModal } from './VideoModal';

export const HeroSection: React.FC = () => {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  return (
    <section className="gsap-hero-section relative w-full overflow-hidden bg-[#FAF6EF]">
      {/* ========================================================================= */}
      {/* DESKTOP BACKGROUND ONLY (lg and above): Panoramic Hero Bag on the Right */}
      {/* ========================================================================= */}
      <div className="hidden lg:block absolute inset-0 w-full h-full pointer-events-none z-0">
        <img
          src="/hero-banner.jpg?v=6"
          alt="Varam stores Canvas Grocery Tote filled with fresh vegetables, artisan bread, and produce"
          className="gsap-hero-bg w-full h-full object-cover object-[82%_center] transform scale-100 will-change-transform"
        />
        {/* Subtle gradient vignette to blend into creamy left side */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#FAF6EF] via-[#FAF6EF]/60 via-45% to-transparent pointer-events-none" />
      </div>

      {/* ========================================================================= */}
      {/* MAIN CONTAINER CONTENT */}
      {/* ========================================================================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10 pt-6 pb-12 sm:py-14 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Content Column */}
          <div className="lg:col-span-7 flex flex-col items-start max-w-xl">
            {/* Tag / Eyebrow */}
            <div className="gsap-hero-eyebrow inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#123F32]/10 border border-[#123F32]/15 text-[#123F32] mb-3 sm:mb-4">
              <Leaf className="w-3.5 h-3.5 fill-current" />
              <span className="text-[11px] sm:text-xs font-bold tracking-[0.14em] uppercase">
                Fresh Groceries, Delivered Daily
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="gsap-hero-title font-serif-heading font-normal text-3xl sm:text-5xl lg:text-[72px] leading-[1.1] sm:leading-[1.06] tracking-tight text-[#18231E] mb-3 sm:mb-4">
              Good Food. <br />
              <span className="italic font-normal">Brighter Days.</span>
            </h1>

            {/* Subtitle */}
            <p className="gsap-hero-desc text-sm sm:text-base lg:text-lg text-[#556059] leading-relaxed mb-6 sm:mb-7 font-normal max-w-md">
              Fresh fruits, vegetables, dairy and more — delivered straight to your door,
              fresh and hassle-free.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 mb-8 sm:mb-10 w-full sm:w-auto">
              <a
                href="#fresh-picks"
                className="gsap-hero-cta btn-magnetic inline-flex items-center justify-center gap-2.5 px-7 sm:px-8 py-3.5 sm:py-4 rounded-full bg-[#123F32] text-white text-sm font-semibold hover:bg-[#1B5746] shadow-md hover:shadow-lg transition-all cursor-pointer group"
              >
                <span>Shop Fresh Produce</span>
                <ArrowRight className="w-4 h-4 text-[#D6F36A] group-hover:translate-x-1.5 transition-transform" />
              </a>

              <button
                type="button"
                onClick={() => setIsVideoModalOpen(true)}
                className="gsap-hero-cta btn-magnetic inline-flex items-center justify-center gap-3 px-6 py-3.5 sm:py-4 rounded-full bg-white hover:bg-[#F4F6F2] text-[#18231E] hover:text-[#123F32] text-sm font-semibold shadow-xs hover:shadow-sm border border-stone-200/90 cursor-pointer group transition-all"
              >
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-stone-100 border border-stone-200 flex items-center justify-center text-[#18231E] group-hover:scale-105 group-hover:bg-[#123F32] group-hover:text-white transition-all">
                  <Play className="w-3 sm:w-3.5 h-3 sm:h-3.5 fill-current ml-0.5" />
                </div>
                <span>Watch Video</span>
              </button>
            </div>

            {/* ========================================================================= */}
            {/* MOBILE ONLY HERO SHOWCASE IMAGE (Clean, framed card below CTAs) */}
            {/* ========================================================================= */}
            <div className="lg:hidden w-full mb-8">
              <div className="relative w-full aspect-[16/11] rounded-3xl overflow-hidden shadow-lg border border-black/5 bg-white">
                <img
                  src="/hero-banner.jpg?v=6"
                  alt="Varam stores organic grocery tote with fresh vegetables and fruits"
                  className="w-full h-full object-cover object-[75%_center]"
                />
                {/* 100% Organic floating badge on top right */}
                <div className="absolute top-3.5 right-3.5 px-3 py-1.5 rounded-full bg-[#123F32]/90 backdrop-blur-md text-[#D6F36A] border border-white/20 text-[11px] font-bold flex items-center gap-1.5 shadow-md">
                  <Sparkles className="w-3 h-3" />
                  <span>Farm Fresh Harvest</span>
                </div>
              </div>
            </div>

            {/* ========================================================================= */}
            {/* 4 USPs with clean elevated cards */}
            {/* ========================================================================= */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 w-full">
              <div className="gsap-hero-usp flex items-center gap-2.5 p-2.5 sm:p-3 rounded-2xl bg-white/85 sm:bg-transparent backdrop-blur-xs sm:backdrop-blur-none border border-stone-200/80 sm:border-0 shadow-2xs sm:shadow-none">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-stone-100 sm:bg-white border border-stone-200/80 flex items-center justify-center text-[#123F32] shrink-0 shadow-2xs">
                  <Truck className="w-4 h-4 text-[#123F32]" />
                </div>
                <div className="leading-tight">
                  <p className="text-xs font-bold text-[#18231E]">Same-day</p>
                  <p className="text-[10px] sm:text-[11px] text-[#737A72]">Delivery</p>
                </div>
              </div>

              <div className="gsap-hero-usp flex items-center gap-2.5 p-2.5 sm:p-3 rounded-2xl bg-white/85 sm:bg-transparent backdrop-blur-xs sm:backdrop-blur-none border border-stone-200/80 sm:border-0 shadow-2xs sm:shadow-none">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-stone-100 sm:bg-white border border-stone-200/80 flex items-center justify-center text-[#123F32] shrink-0 shadow-2xs">
                  <Leaf className="w-4 h-4 text-[#123F32]" />
                </div>
                <div className="leading-tight">
                  <p className="text-xs font-bold text-[#18231E]">100%</p>
                  <p className="text-[10px] sm:text-[11px] text-[#737A72]">Fresh Produce</p>
                </div>
              </div>

              <div className="gsap-hero-usp flex items-center gap-2.5 p-2.5 sm:p-3 rounded-2xl bg-white/85 sm:bg-transparent backdrop-blur-xs sm:backdrop-blur-none border border-stone-200/80 sm:border-0 shadow-2xs sm:shadow-none">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-stone-100 sm:bg-white border border-stone-200/80 flex items-center justify-center text-[#123F32] shrink-0 shadow-2xs">
                  <Layers className="w-4 h-4 text-[#123F32]" />
                </div>
                <div className="leading-tight">
                  <p className="text-xs font-bold text-[#18231E]">Wide</p>
                  <p className="text-[10px] sm:text-[11px] text-[#737A72]">Selection</p>
                </div>
              </div>

              <div className="gsap-hero-usp flex items-center gap-2.5 p-2.5 sm:p-3 rounded-2xl bg-white/85 sm:bg-transparent backdrop-blur-xs sm:backdrop-blur-none border border-stone-200/80 sm:border-0 shadow-2xs sm:shadow-none">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-stone-100 sm:bg-white border border-stone-200/80 flex items-center justify-center text-[#123F32] shrink-0 shadow-2xs">
                  <ShieldCheck className="w-4 h-4 text-[#123F32]" />
                </div>
                <div className="leading-tight">
                  <p className="text-xs font-bold text-[#18231E]">Quality</p>
                  <p className="text-[10px] sm:text-[11px] text-[#737A72]">Guaranteed</p>
                </div>
              </div>
            </div>
          </div>

          {/* Desktop Right Column Spacer */}
          <div className="lg:col-span-5 relative hidden lg:flex items-center justify-end min-h-[460px] pointer-events-none" />
        </div>
      </div>

      <VideoModal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
      />
    </section>
  );
};
