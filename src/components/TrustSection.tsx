import React, { useRef, useState } from 'react';
import { Star, CheckCircle, Quote, ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';
import { customerReviews } from '../data/reviews';

export const TrustSection: React.FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  // Duplicate reviews array for infinite seamless looping
  const doubledReviews = [...customerReviews, ...customerReviews];

  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -380 : 380;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section 
      aria-label="Customer Testimonials and Reviews"
      className="py-16 sm:py-24 bg-white border-b border-stone-200 overflow-hidden"
    >
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-10 2xl:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 sm:mb-14">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.18em] text-[#B45309] mb-2.5">
              <CheckCircle className="w-3.5 h-3.5 text-[#B45309]" />
              <span>Verified Customer Stories</span>
            </div>

            <h2 className="text-3xl sm:text-4xl text-[#18181B] font-extrabold tracking-tight mb-3">
              Loved by Thousands
            </h2>

            <p className="text-sm sm:text-base text-stone-600 leading-relaxed font-normal">
              Fresh groceries, happier homes. Here is what our community across Hertfordshire says about their weekly Varam Foods deliveries.
            </p>
          </div>

          {/* Interactive Navigation Controls */}
          <div className="flex items-center gap-2 self-start md:self-end shrink-0">
            {/* Play/Pause Button */}
            <button
              type="button"
              onClick={() => setIsPaused(!isPaused)}
              aria-label={isPaused ? "Resume moving cards" : "Pause moving cards"}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-full border border-stone-200 bg-[#F8FAFC] hover:bg-white text-xs font-semibold text-[#18181B] transition-colors shadow-2xs cursor-pointer mr-1"
              title={isPaused ? "Resume auto-scroll" : "Pause auto-scroll"}
            >
              {isPaused ? (
                <>
                  <Play className="w-3.5 h-3.5 text-[#B45309] fill-current" />
                  <span>Resume</span>
                </>
              ) : (
                <>
                  <Pause className="w-3.5 h-3.5 text-[#B45309] fill-current" />
                  <span>Pause</span>
                </>
              )}
            </button>

            {/* Prev Arrow */}
            <button
              type="button"
              onClick={() => handleScroll('left')}
              aria-label="Scroll testimonials left"
              className="w-10 h-10 rounded-full border border-stone-200 bg-[#F8FAFC] hover:bg-white flex items-center justify-center text-[#18181B] hover:text-[#B45309] transition-all shadow-2xs hover:shadow-xs active:scale-95 cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {/* Next Arrow */}
            <button
              type="button"
              onClick={() => handleScroll('right')}
              aria-label="Scroll testimonials right"
              className="w-10 h-10 rounded-full border border-stone-200 bg-[#F8FAFC] hover:bg-white flex items-center justify-center text-[#18181B] hover:text-[#B45309] transition-all shadow-2xs hover:shadow-xs active:scale-95 cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* FULL WIDTH MOVING CARDS MARQUEE TRACK */}
      {/* ========================================================================= */}
      <div 
        ref={scrollContainerRef}
        className="relative w-full overflow-x-auto no-scrollbar group-testimonials select-none"
      >
        {/* Left Edge Gradient Fade */}
        <div 
          className="absolute left-0 top-0 bottom-0 w-12 sm:w-28 z-10 pointer-events-none bg-gradient-to-r from-white via-white/85 to-transparent" 
          aria-hidden="true" 
        />

        {/* Right Edge Gradient Fade */}
        <div 
          className="absolute right-0 top-0 bottom-0 w-12 sm:w-28 z-10 pointer-events-none bg-gradient-to-l from-white via-white/85 to-transparent" 
          aria-hidden="true" 
        />

        {/* Moving Track */}
        <div 
          style={{ animationPlayState: isPaused ? 'paused' : undefined }}
          className="animate-testimonials-infinite flex items-stretch gap-5 sm:gap-6 py-4 px-4 sm:px-8"
        >
          {doubledReviews.map((review, idx) => (
            <div
              key={`${review.id}-${idx}`}
              className="w-[300px] xs:w-[340px] sm:w-[380px] md:w-[420px] shrink-0 bg-white rounded-3xl p-6 sm:p-7 border border-stone-200 shadow-2xs hover:shadow-md hover:border-[#F5D103] transition-all duration-300 flex flex-col justify-between group/card"
            >
              <div>
                {/* Header: Stars & Quote Icon */}
                <div className="flex items-center justify-between mb-4">
                  {/* 5 Warm Gold Stars */}
                  <div className="flex items-center gap-1 text-[#F5D103]">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-[#F5D103] text-[#B45309]"
                      />
                    ))}
                  </div>

                  {/* Decorative Quote Icon */}
                  <Quote className="w-6 h-6 text-stone-200 group-hover/card:text-[#F5D103] transition-colors" />
                </div>

                {/* Review Text */}
                <p className="text-sm sm:text-[15px] text-[#18181B] leading-relaxed font-normal mb-6">
                  &ldquo;{review.text}&rdquo;
                </p>
              </div>

              {/* Reviewer Details */}
              <div className="flex items-center gap-3.5 pt-4 border-t border-stone-100 mt-auto">
                <img
                  src={review.avatar}
                  alt={review.name}
                  loading="lazy"
                  className="w-11 h-11 rounded-full object-cover border border-stone-200 shrink-0"
                />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <h4 className="text-xs sm:text-sm font-bold text-[#18181B] truncate">
                      {review.name}
                    </h4>
                    {review.verified && (
                      <span className="text-[10px] font-semibold text-[#92400E] bg-amber-100 px-2 py-0.5 rounded border border-amber-200/60 shrink-0">
                        Verified
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-1.5 text-[11px] text-stone-500 font-normal truncate mt-0.5">
                    <span className="truncate">{review.location}</span>
                    <span>•</span>
                    <span className="shrink-0">{review.date}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* TRUSTPILOT / DELIVERY ASSURANCE BANNER */}
      {/* ========================================================================= */}
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-10 2xl:px-12 mt-10">
        <div className="bg-[#F8FAFC] rounded-2xl border border-stone-200 p-4 sm:p-5 flex flex-wrap items-center justify-between gap-4 max-w-4xl mx-auto shadow-2xs">
          <div className="flex items-center gap-3">
            <div className="flex items-center text-[#18181B] bg-white border border-stone-200 px-3 py-1 rounded-lg font-bold text-sm shadow-2xs">
              <Star className="w-4 h-4 fill-[#F5D103] text-[#B45309] mr-1.5" />
              <span>4.9 / 5.0</span>
            </div>
            <span className="text-xs sm:text-sm text-stone-600 font-medium">
              Based on <strong className="text-[#18181B] font-bold">12,400+</strong> verified local deliveries
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs font-semibold text-[#18181B]">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#F5D103] inline-block" />
              99.4% On-Time Delivery
            </span>
            <span className="text-stone-300">|</span>
            <span>100% Satisfaction Guarantee</span>
          </div>
        </div>
      </div>
    </section>
  );
};
