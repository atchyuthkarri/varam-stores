import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  ArrowRight,
  Play,
  Truck,
  Leaf,
  Layers,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  Tag,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { VideoModal } from './VideoModal';
import { useNavigation } from '../context/NavigationContext';

interface HeroSlide {
  id: string;
  badge: string;
  titleRegular: string;
  titleItalicLine1: string;
  titleItalicLine2?: string;
  description: string;
  primaryCtaText: string;
  primaryAction: 'shopAll' | 'shopProduce' | 'shopBakery';
  secondaryCtaText: string;
  secondaryAction: 'video' | 'story' | 'deals';
  desktopImage: string;
  mobileImage: string;
  floatingBadge: string;
}

const SLIDES: HeroSlide[] = [
  {
    id: 'groceries',
    badge: 'Fresh Groceries, Delivered Daily',
    titleRegular: 'Good Food',
    titleItalicLine1: 'Brighter',
    titleItalicLine2: 'Days',
    description:
      'Fresh fruits, vegetables, dairy and more — delivered to your door in Hatfield and beyond, fresh and hassle-free.',
    primaryCtaText: 'Shop Groceries',
    primaryAction: 'shopAll',
    secondaryCtaText: 'Watch Video',
    secondaryAction: 'video',
    desktopImage: '/hero-banner.jpg?v=8',
    mobileImage: '/hero-bag.jpg',
    floatingBadge: '100% Farm Fresh',
  },
  {
    id: 'organic',
    badge: '100% Certified Organic Harvest',
    titleRegular: 'Crisp Harvest',
    titleItalicLine1: 'Farm to',
    titleItalicLine2: 'Table',
    description:
      'Cultivated by certified family growers across Hertfordshire, Kent & Suffolk. Hand-harvested and dispatched at peak morning freshness.',
    primaryCtaText: 'Shop Fresh Produce',
    primaryAction: 'shopProduce',
    secondaryCtaText: 'Our Story',
    secondaryAction: 'story',
    desktopImage: '/hero-slide-organic.jpg',
    mobileImage: '/hero-slide-organic.jpg',
    floatingBadge: 'Local British Farms',
  },
  {
    id: 'bakery',
    badge: 'Baked Before Dawn & Farmhouse Dairy',
    titleRegular: 'Warm Loaves',
    titleItalicLine1: 'Fresh',
    titleItalicLine2: 'Mornings',
    description:
      'Slow-fermented artisan sourdough, flaky French butter croissants, grass-fed organic milk, and free-range eggs straight from pasture.',
    primaryCtaText: 'Shop Bakery & Dairy',
    primaryAction: 'shopBakery',
    secondaryCtaText: 'Special Deals',
    secondaryAction: 'deals',
    desktopImage: '/hero-slide-bakery.jpg',
    mobileImage: '/hero-slide-bakery.jpg',
    floatingBadge: 'Oven-Fresh Daily',
  },
];

const AUTOPLAY_DURATION = 6000;

export const HeroSection: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const { goToShop, scrollToSection } = useNavigation();

  // Touch tracking for mobile swipe
  const touchStartXRef = useRef<number | null>(null);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  }, []);

  const goToIndex = (index: number) => {
    setCurrentSlide(index);
  };

  // Autoplay timer
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      nextSlide();
    }, AUTOPLAY_DURATION);
    return () => clearInterval(interval);
  }, [isPaused, nextSlide]);

  const handlePrimaryClick = (action: HeroSlide['primaryAction']) => {
    if (action === 'shopAll') {
      goToShop({ category: 'all' });
    } else if (action === 'shopProduce') {
      goToShop({ category: 'vegetables' });
    } else if (action === 'shopBakery') {
      goToShop({ category: 'bakery' });
    }
  };

  const handleSecondaryClick = (action: HeroSlide['secondaryAction']) => {
    if (action === 'video') {
      setIsVideoModalOpen(true);
    } else if (action === 'story') {
      scrollToSection('story');
    } else if (action === 'deals') {
      goToShop({ filterOnSale: true });
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartXRef.current - touchEndX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }
    touchStartXRef.current = null;
  };

  const activeSlide = SLIDES[currentSlide];

  return (
    <>
      {/* ========================================================================= */}
      {/* MOBILE HERO (RESPONSIVE CAROUSEL SLIDER WITH TOUCH SWIPE)                  */}
      {/* ========================================================================= */}
      <section
        className="block md:hidden relative w-full bg-white overflow-hidden pt-6 pb-8 px-4 border-b border-stone-200/60"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div className="max-w-md mx-auto flex flex-col items-start">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSlide.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="w-full"
            >
              {/* Clean Editorial Eyebrow */}
              <div className="inline-flex items-center gap-1.5 text-[11px] font-bold tracking-wider uppercase text-[#245E4A] mb-2.5">
                <Leaf className="w-3.5 h-3.5 fill-[#245E4A]" />
                <span>{activeSlide.badge}</span>
              </div>

              {/* Large Editorial Headline */}
              <h1 className="font-serif-heading text-4xl sm:text-5xl font-medium text-[#18231E] leading-[1.04] tracking-tight mb-3">
                <span className="block font-medium">{activeSlide.titleRegular}</span>
                <span className="block italic font-normal text-[#245E4A] font-im-fell">
                  {activeSlide.titleItalicLine1} {activeSlide.titleItalicLine2}
                </span>
              </h1>

              {/* Supporting Description */}
              <p className="text-xs sm:text-sm text-[#556059] leading-relaxed mb-5 max-w-sm font-normal">
                {activeSlide.description}
              </p>

              {/* Action CTAs */}
              <div className="flex items-center gap-3 w-full mb-6">
                <button
                  type="button"
                  onClick={() => handlePrimaryClick(activeSlide.primaryAction)}
                  className="flex-1 py-3.5 px-5 rounded-full bg-[#F5D103] hover:bg-[#E5A800] text-[#18181B] text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-md active:scale-98 transition-all cursor-pointer"
                >
                  <span>{activeSlide.primaryCtaText}</span>
                  <ArrowRight className="w-4 h-4 text-[#18181B]" />
                </button>

                <button
                  type="button"
                  onClick={() => handleSecondaryClick(activeSlide.secondaryAction)}
                  className="py-3.5 px-4 rounded-full bg-white border border-stone-200 text-[#18181B] text-xs font-bold flex items-center justify-center gap-2 shadow-2xs hover:bg-stone-50 active:scale-98 transition-all cursor-pointer shrink-0"
                  aria-label={activeSlide.secondaryCtaText}
                >
                  {activeSlide.secondaryAction === 'video' ? (
                    <div className="w-5 h-5 rounded-full bg-[#18181B] text-[#F5D103] flex items-center justify-center">
                      <Play className="w-2.5 h-2.5 fill-current ml-0.5" />
                    </div>
                  ) : activeSlide.secondaryAction === 'story' ? (
                    <div className="w-5 h-5 rounded-full bg-[#245E4A]/15 text-[#245E4A] flex items-center justify-center">
                      <BookOpen className="w-2.5 h-2.5" />
                    </div>
                  ) : (
                    <div className="w-5 h-5 rounded-full bg-[#F5D103] text-[#18181B] flex items-center justify-center">
                      <Tag className="w-2.5 h-2.5" />
                    </div>
                  )}
                  <span>{activeSlide.secondaryCtaText}</span>
                </button>
              </div>

              {/* Grocery Hero Imagery Showcase */}
              <div className="w-full relative rounded-2xl overflow-hidden bg-white border border-stone-200/90 shadow-md mb-4 aspect-[4/3] flex items-center justify-center">
                <img
                  src={activeSlide.mobileImage}
                  alt={activeSlide.titleRegular}
                  className="w-full h-full object-cover object-center"
                  width={400}
                  height={300}
                />
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Mobile Carousel Indicators */}
          <div className="flex items-center justify-center gap-1.5 w-full mb-6">
            {SLIDES.map((slide, idx) => (
              <button
                key={slide.id}
                type="button"
                onClick={() => goToIndex(idx)}
                className={`transition-all duration-300 rounded-full cursor-pointer ${idx === currentSlide
                    ? 'w-7 h-1.5 bg-[#18181B]'
                    : 'w-2 h-1.5 bg-stone-300 hover:bg-stone-400'
                  }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

          {/* 4 Mobile Trust Indicators Grid */}
          <div className="w-full bg-white rounded-2xl border border-stone-200/80 p-3 shadow-2xs grid grid-cols-4 divide-x divide-stone-100 text-center">
            <div className="flex flex-col items-center px-1">
              <Truck className="w-4 h-4 text-[#245E4A] mb-1" />
              <span className="text-[10px] font-bold text-[#18181B] leading-tight">Same-day</span>
              <span className="text-[8.5px] text-[#737A72]">Delivery</span>
            </div>
            <div className="flex flex-col items-center px-1">
              <Leaf className="w-4 h-4 text-[#245E4A] mb-1" />
              <span className="text-[10px] font-bold text-[#18181B] leading-tight">100%</span>
              <span className="text-[8.5px] text-[#737A72]">Organic</span>
            </div>
            <div className="flex flex-col items-center px-1">
              <Layers className="w-4 h-4 text-[#245E4A] mb-1" />
              <span className="text-[10px] font-bold text-[#18181B] leading-tight">10k+</span>
              <span className="text-[8.5px] text-[#737A72]">Products</span>
            </div>
            <div className="flex flex-col items-center px-1">
              <ShieldCheck className="w-4 h-4 text-[#245E4A] mb-1" />
              <span className="text-[10px] font-bold text-[#18181B] leading-tight">Quality</span>
              <span className="text-[8.5px] text-[#737A72]">Guaranteed</span>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* DESKTOP & TABLET HERO CAROUSEL SECTION (MD AND ABOVE)                     */}
      {/* ========================================================================= */}
      <section
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        className="hidden md:flex relative w-full h-[calc(100vh-80px)] min-h-[620px] max-h-[840px] lg:min-h-[680px] lg:max-h-[880px] flex-col justify-between overflow-hidden bg-white select-none group/hero"
      >
        {/* Carousel Background Crossfade Layers */}
        <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
          {SLIDES.map((slide, idx) => (
            <motion.div
              key={slide.id}
              initial={false}
              animate={{
                opacity: idx === currentSlide ? 1 : 0,
                scale: idx === currentSlide ? 1 : 1.04,
              }}
              transition={{ duration: 0.9, ease: [0.25, 1, 0.5, 1] }}
              className="absolute inset-0 w-full h-full"
            >
              <img
                src={slide.desktopImage}
                alt={slide.titleRegular}
                className="w-full h-full object-cover object-[82%_center]"
              />
            </motion.div>
          ))}
          {/* Subtle reduced white gradient allowing rich hero imagery to shine */}
          <div className="absolute inset-0 bg-gradient-to-r from-white/50 via-white/15 via-32% to-transparent pointer-events-none" />
        </div>

        {/* Carousel Navigation Arrow: Left */}
        <button
          type="button"
          onClick={prevSlide}
          className="absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/85 hover:bg-white text-[#18181B] shadow-lg hover:shadow-xl border border-stone-200/80 backdrop-blur-md flex items-center justify-center transition-all duration-200 opacity-0 group-hover/hero:opacity-100 hover:scale-108 active:scale-95 cursor-pointer"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Carousel Navigation Arrow: Right */}
        <button
          type="button"
          onClick={nextSlide}
          className="absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/85 hover:bg-white text-[#18181B] shadow-lg hover:shadow-xl border border-stone-200/80 backdrop-blur-md flex items-center justify-center transition-all duration-200 opacity-0 group-hover/hero:opacity-100 hover:scale-108 active:scale-95 cursor-pointer"
          aria-label="Next slide"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Content container */}
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-10 2xl:px-12 relative z-10 pt-8 lg:pt-14 flex-1 flex flex-col justify-between">
          <div className="w-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSlide.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="max-w-md lg:max-w-xl flex flex-col items-start"
              >
                {/* Clean Editorial Eyebrow */}
                <div className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.16em] uppercase text-[#245E4A] mb-3">
                  <Leaf className="w-3.5 h-3.5 fill-[#245E4A]" />
                  <span>{activeSlide.badge}</span>
                </div>

                {/* Main Headline: Sophisticated Editorial Serif */}
                <h1 className="font-serif-heading text-5xl sm:text-6xl lg:text-[76px] xl:text-[80px] leading-[0.98] tracking-[-0.025em] text-[#18231E] mb-5">
                  <span className="block font-medium text-[#18231E]">{activeSlide.titleRegular}</span>
                  <span className="block italic font-normal text-[#245E4A] font-im-fell">
                    {activeSlide.titleItalicLine1}
                  </span>
                  {activeSlide.titleItalicLine2 && (
                    <span className="block italic font-normal text-[#245E4A] font-im-fell">
                      {activeSlide.titleItalicLine2}
                    </span>
                  )}
                </h1>

                {/* Subtitle */}
                <p className="text-sm lg:text-base text-[#556059] leading-relaxed mb-7 font-normal max-w-md">
                  {activeSlide.description}
                </p>

                {/* Action Buttons */}
                <div className="flex items-center gap-4 mb-2">
                  <button
                    type="button"
                    onClick={() => handlePrimaryClick(activeSlide.primaryAction)}
                    className="btn-magnetic inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#F5D103] hover:bg-[#E5A800] text-[#18181B] text-sm font-bold shadow-md hover:shadow-lg transition-all cursor-pointer group"
                  >
                    <span>{activeSlide.primaryCtaText}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#18181B] group-hover:translate-x-1 transition-transform" />
                  </button>

                  <button
                    type="button"
                    onClick={() => handleSecondaryClick(activeSlide.secondaryAction)}
                    className="inline-flex items-center gap-2.5 text-sm font-bold text-[#18231E] hover:text-[#245E4A] cursor-pointer group transition-colors py-1"
                  >
                    {activeSlide.secondaryAction === 'video' ? (
                      <div className="w-8 h-8 rounded-full bg-white shadow-sm border border-black/5 flex items-center justify-center text-[#18181B] group-hover:scale-108 transition-all">
                        <Play className="w-3 h-3 fill-[#18181B] ml-0.5 text-[#18181B]" />
                      </div>
                    ) : activeSlide.secondaryAction === 'story' ? (
                      <div className="w-8 h-8 rounded-full bg-white shadow-sm border border-black/5 flex items-center justify-center text-[#245E4A] group-hover:scale-108 transition-all">
                        <BookOpen className="w-3.5 h-3.5" />
                      </div>
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-white shadow-sm border border-black/5 flex items-center justify-center text-[#245E4A] group-hover:scale-108 transition-all">
                        <Tag className="w-3.5 h-3.5" />
                      </div>
                    )}
                    <span>{activeSlide.secondaryCtaText}</span>
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Bottom Trust Cards & Carousel Pill Dots */}
          <div className="w-full mt-auto pb-4">
            {/* Interactive Carousel Indicators */}
            <div className="flex items-center justify-center gap-2 mb-3.5">
              {SLIDES.map((slide, idx) => {
                const isActive = idx === currentSlide;
                return (
                  <button
                    key={slide.id}
                    type="button"
                    onClick={() => goToIndex(idx)}
                    className={`relative rounded-full transition-all duration-300 cursor-pointer overflow-hidden ${isActive
                        ? 'w-8 h-2 bg-[#18181B] shadow-sm'
                        : 'w-2 h-2 bg-stone-300 hover:bg-stone-500'
                      }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  >
                    {/* Animated Progress Fill on Active Pill */}
                    {isActive && !isPaused && (
                      <motion.span
                        key={`progress-${idx}`}
                        initial={{ width: '0%' }}
                        animate={{ width: '100%' }}
                        transition={{ duration: AUTOPLAY_DURATION / 1000, ease: 'linear' }}
                        className="absolute inset-y-0 left-0 bg-[#F5D103] rounded-full"
                      />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Trust Cards Grid */}
            <div className="w-full bg-white/95 backdrop-blur-md rounded-3xl shadow-xl border border-black/[0.06] p-4">
              <div className="grid grid-cols-4 divide-x divide-stone-200/80">
                <div className="flex flex-col items-center text-center px-2">
                  <Truck className="w-5 h-5 text-[#245E4A] mb-1.5 stroke-[1.8]" />
                  <p className="text-xs font-bold text-[#18181B] leading-tight">Same-day</p>
                  <p className="text-[10.5px] text-[#737A72] leading-tight mt-0.5">Delivery</p>
                </div>
                <div className="flex flex-col items-center text-center px-2">
                  <Leaf className="w-5 h-5 text-[#245E4A] mb-1.5 stroke-[1.8]" />
                  <p className="text-xs font-bold text-[#18181B] leading-tight">100%</p>
                  <p className="text-[10.5px] text-[#737A72] leading-tight mt-0.5">Fresh Produce</p>
                </div>
                <div className="flex flex-col items-center text-center px-2">
                  <Layers className="w-5 h-5 text-[#245E4A] mb-1.5 stroke-[1.8]" />
                  <p className="text-xs font-bold text-[#18181B] leading-tight">Wide</p>
                  <p className="text-[10.5px] text-[#737A72] leading-tight mt-0.5">Selection</p>
                </div>
                <div className="flex flex-col items-center text-center px-2">
                  <ShieldCheck className="w-5 h-5 text-[#245E4A] mb-1.5 stroke-[1.8]" />
                  <p className="text-xs font-bold text-[#18181B] leading-tight">Quality</p>
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
