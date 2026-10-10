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
    <section className="gsap-hero-section relative w-full min-h-[calc(100vh-116px)] sm:min-h-[calc(100vh-116px)] lg:min-h-[calc(100vh-116px)] flex items-center overflow-hidden bg-[#FAF6EF]">
      {/* 1. Panoramic Hero Banner Image with subtle parallax */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
        <img
          src="/hero-banner.jpg?v=6"
          alt="Varam stores Canvas Grocery Tote filled with fresh vegetables, artisan bread, and produce"
          className="gsap-hero-bg w-full h-full object-cover object-[78%_center] sm:object-right transform scale-100 transition-transform duration-1000 ease-out will-change-transform"
        />

        {/* Soft mobile gradient for crystal-clear text readability on small viewports */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#FAF6EF]/95 via-[#FAF6EF]/85 via-50% to-[#FAF6EF]/30 md:hidden" />
      </div>

      {/* 2. Banner Content Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10 py-8 sm:py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Headline and CTAs */}
          <div className="lg:col-span-7 flex flex-col items-start max-w-xl">
            {/* Tag / Eyebrow */}
            <div className="gsap-hero-eyebrow inline-flex items-center gap-2 mb-3 sm:mb-4 text-[#2F7654]">
              <Leaf className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-[#2F7654]/20 text-[#2F7654]" />
              <span className="text-[11px] sm:text-sm font-bold tracking-[0.14em] uppercase">
                Fresh Groceries, Delivered Daily
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="gsap-hero-title font-serif-heading font-normal text-4xl sm:text-6xl lg:text-[76px] leading-[1.08] sm:leading-[1.05] tracking-tight text-[#18231E] mb-4 sm:mb-5">
              Good Food. <br />
              <span className="italic font-normal">Brighter Days.</span>
            </h1>

            {/* Subtitle */}
            <p className="gsap-hero-desc text-sm sm:text-base lg:text-lg text-[#556059] leading-relaxed mb-6 sm:mb-8 font-normal max-w-md">
              Fresh fruits, vegetables, dairy and more — delivered straight to your door,
              fresh and hassle-free.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 mb-8 sm:mb-10 w-full sm:w-auto">
              <a
                href="#fresh-picks"
                className="gsap-hero-cta btn-magnetic inline-flex items-center justify-center gap-2.5 px-7 sm:px-8 py-3.5 sm:py-4 rounded-full bg-[#123F32] text-white text-sm font-semibold hover:bg-[#1B5746] shadow-md group cursor-pointer"
              >
                <span>Shop Fresh Produce</span>
                <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1.5 transition-transform" />
              </a>

              <button
                type="button"
                onClick={() => setIsVideoModalOpen(true)}
                className="gsap-hero-cta btn-magnetic inline-flex items-center justify-center gap-3 px-6 py-3.5 sm:py-4 rounded-full bg-white/80 hover:bg-white text-[#18231E] hover:text-[#123F32] text-sm font-semibold shadow-2xs hover:shadow-xs border border-stone-200/80 cursor-pointer group"
              >
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white border border-stone-200/80 flex items-center justify-center text-[#18231E] group-hover:scale-105 group-hover:border-[#123F32] shadow-2xs transition-all">
                  <Play className="w-3 sm:w-3.5 h-3 sm:h-3.5 fill-[#18231E] ml-0.5 text-[#18231E]" />
                </div>
                <span>Watch Video</span>
              </button>
            </div>

            {/* 4 USPs matching reference design */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 pt-6 border-t border-stone-200/80 w-full">
              <div className="gsap-hero-usp flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white border border-stone-200/80 flex items-center justify-center text-[#18231E] flex-shrink-0 shadow-2xs hover:scale-108 transition-transform">
                  <Truck className="w-4 h-4 text-[#2F7654]" />
                </div>
                <div className="leading-tight">
                  <p className="text-xs font-bold text-[#18231E]">Same-day</p>
                  <p className="text-[11px] text-[#737A72]">Delivery</p>
                </div>
              </div>

              <div className="gsap-hero-usp flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white border border-stone-200/80 flex items-center justify-center text-[#18231E] flex-shrink-0 shadow-2xs hover:scale-108 transition-transform">
                  <Leaf className="w-4 h-4 text-[#2F7654]" />
                </div>
                <div className="leading-tight">
                  <p className="text-xs font-bold text-[#18231E]">100%</p>
                  <p className="text-[11px] text-[#737A72]">Fresh Produce</p>
                </div>
              </div>

              <div className="gsap-hero-usp flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white border border-stone-200/80 flex items-center justify-center text-[#18231E] flex-shrink-0 shadow-2xs hover:scale-108 transition-transform">
                  <Layers className="w-4 h-4 text-[#2F7654]" />
                </div>
                <div className="leading-tight">
                  <p className="text-xs font-bold text-[#18231E]">Wide</p>
                  <p className="text-[11px] text-[#737A72]">Selection</p>
                </div>
              </div>

              <div className="gsap-hero-usp flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white border border-stone-200/80 flex items-center justify-center text-[#18231E] flex-shrink-0 shadow-2xs hover:scale-108 transition-transform">
                  <ShieldCheck className="w-4 h-4 text-[#2F7654]" />
                </div>
                <div className="leading-tight">
                  <p className="text-xs font-bold text-[#18231E]">Quality</p>
                  <p className="text-[11px] text-[#737A72]">Guaranteed</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Natural sunlit groceries and fresh produce in hero banner */}
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
