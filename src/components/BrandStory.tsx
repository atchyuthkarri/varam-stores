import React, { useState } from 'react';
import { ArrowRight, Play, CheckCircle2 } from 'lucide-react';
import { VideoModal } from './VideoModal';

export const BrandStory: React.FC = () => {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  return (
    <section id="story" className="py-16 sm:py-24 bg-[#F8F8F2] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          {/* Left Column: Editorial Story Copy */}
          <div className="lg:col-span-5 flex flex-col items-start gsap-story-content">
            <span className="text-xs font-bold uppercase tracking-widest text-[#2F7654] mb-3">
              Ethical Sourcing & Heritage
            </span>

            <h2 className="font-serif-heading text-4xl sm:text-5xl text-[#123F32] font-bold leading-tight mb-6">
              From Local Farms <br />
              <span className="italic font-normal text-[#2F7654]">
                to Your Table
              </span>
            </h2>

            <p className="text-base sm:text-lg text-[#737A72] leading-relaxed mb-6 font-normal">
              We work directly with certified family growers across the British
              countryside to bring you the freshest produce, sustainably grown and
              delivered with genuine care.
            </p>

            {/* Sourcing commitments list */}
            <div className="space-y-3 mb-8 w-full">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#2F7654] flex-shrink-0 mt-0.5" />
                <p className="text-sm text-[#18231E]">
                  <strong>Zero air-mile produce:</strong> prioritizing seasonal regional farms in Hertfordshire, Kent, and Suffolk.
                </p>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#2F7654] flex-shrink-0 mt-0.5" />
                <p className="text-sm text-[#18231E]">
                  <strong>100% plastic-free packaging:</strong> biodegradable cornstarch bags and recyclable cardboard trays.
                </p>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#2F7654] flex-shrink-0 mt-0.5" />
                <p className="text-sm text-[#18231E]">
                  <strong>48-hour farm to door:</strong> harvested, cooled, and dispatched within two days of picking.
                </p>
              </div>
            </div>

            <a
              href="#products"
              className="inline-flex items-center gap-3 px-8 py-3.5 rounded-full bg-[#123F32] text-white font-semibold text-sm hover:bg-[#1B5746] transition-colors group btn-magnetic"
            >
              <span>Our Story</span>
              <ArrowRight className="w-4 h-4 text-[#D6F36A] group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

          {/* Right Column: Editorial Photo with Play Button & Handwritten Script */}
          <div className="lg:col-span-7 relative gsap-story-image">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-stone-200 aspect-[16/10] sm:aspect-[16/11] card-hover-elevate">
              <img
                src="https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?auto=format&fit=crop&w=1200&q=80"
                alt="Smiling organic farmer holding a wooden crate overflowing with freshly harvested vegetables"
                className="w-full h-full object-cover object-center transform hover:scale-102 transition-transform duration-700"
              />

              {/* Gradient scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

              {/* Handwritten script annotation in top-right */}
              <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-md px-4 py-2 rounded-2xl shadow-lg border border-white/60 -rotate-2">
                <p className="font-script-accent text-2xl text-[#123F32] font-bold">
                  Support Local Farmers 🌾
                </p>
              </div>

              {/* Interactive Video Play Button */}
              <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setIsVideoModalOpen(true)}
                  className="inline-flex items-center gap-3 px-5 py-3 rounded-full bg-white/95 hover:bg-white text-[#123F32] text-sm font-bold shadow-lg hover:scale-105 transition-all group btn-magnetic"
                  aria-label="Watch our farm to table story video"
                >
                  <div className="w-8 h-8 rounded-full bg-[#123F32] text-[#D6F36A] flex items-center justify-center group-hover:bg-[#2F7654] transition-colors">
                    <Play className="w-4 h-4 fill-current ml-0.5" />
                  </div>
                  <span>Watch Our Story</span>
                </button>

                <div className="hidden sm:block text-right text-white">
                  <p className="text-xs font-semibold">Broadwater Organic Farm</p>
                  <p className="text-[11px] text-stone-300">Partner since 2021</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <VideoModal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
      />
    </section>
  );
};
