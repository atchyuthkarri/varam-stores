import React from 'react';
import { Star, CheckCircle } from 'lucide-react';
import { customerReviews } from '../data/reviews';

export const TrustSection: React.FC = () => {
  return (
    <section className="py-16 sm:py-24 bg-[#F8F8F2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E8EFE5] text-[#2F7654] text-xs font-bold uppercase tracking-wider mb-3">
            <CheckCircle className="w-3.5 h-3.5" />
            <span>Verified Customer Stories</span>
          </div>

          <h2 className="font-serif-heading text-3xl sm:text-4xl text-[#123F32] font-bold mb-3">
            Loved by Thousands
          </h2>

          <p className="text-base text-[#737A72]">
            Fresh groceries, happier homes. Here is what our community says about
            their weekly Varam stores deliveries.
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {customerReviews.slice(0, 3).map((review) => (
            <div
              key={review.id}
              className="bg-white rounded-3xl p-6 sm:p-7 border border-[#E8ECE5] shadow-xs hover:shadow-lg hover:border-[#123F32]/20 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* 5 Stars */}
                <div className="flex items-center gap-1 text-amber-500 mb-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-amber-500 text-amber-500"
                    />
                  ))}
                </div>

                {/* Quote text */}
                <p className="text-sm sm:text-base text-[#18231E] leading-relaxed italic mb-6">
                  &ldquo;{review.text}&rdquo;
                </p>
              </div>

              {/* Reviewer info */}
              <div className="flex items-center gap-3 pt-4 border-t border-stone-100">
                <img
                  src={review.avatar}
                  alt={review.name}
                  className="w-11 h-11 rounded-full object-cover border border-[#DCE2D8]"
                />
                <div>
                  <h4 className="text-sm font-bold text-[#18231E] flex items-center gap-1.5">
                    <span>{review.name}</span>
                    <span className="text-[10px] font-normal text-[#2F7654] bg-[#EAF0E6] px-1.5 py-0.2 rounded">
                      Verified
                    </span>
                  </h4>
                  <p className="text-xs text-[#737A72]">{review.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trustpilot / Rating Footer Banner */}
        <div className="mt-12 bg-white rounded-2xl border border-[#E8ECE5] p-4 sm:p-5 flex flex-wrap items-center justify-between gap-4 max-w-3xl mx-auto shadow-2xs">
          <div className="flex items-center gap-3">
            <div className="flex items-center text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-lg font-bold text-sm">
              <Star className="w-4 h-4 fill-emerald-600 mr-1" />
              <span>4.9 / 5.0</span>
            </div>
            <span className="text-xs sm:text-sm text-[#737A72]">
              Based on <strong>12,400+</strong> verified local deliveries
            </span>
          </div>

          <span className="text-xs font-semibold text-[#2F7654]">
            99.4% On-Time Guarantee
          </span>
        </div>
      </div>
    </section>
  );
};
