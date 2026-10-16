import React, { useState } from 'react';
import { ArrowRight, Play, CheckCircle2, Sparkles, Volume2, VolumeX } from 'lucide-react';
import { VideoModal } from './VideoModal';

export const BrandStory: React.FC = () => {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  return (
    <section id="story" className="relative w-full min-h-[580px] sm:min-h-[640px] lg:min-h-[700px] flex items-center overflow-hidden bg-stone-100">
      {/* Full-bleed ambient background video (pure natural brightness, no dark overlay) */}
      <video
        autoPlay
        loop
        muted={isMuted}
        playsInline
        poster="https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?auto=format&fit=crop&w=1920&q=80"
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source
          src="https://assets.mixkit.co/videos/preview/mixkit-farmer-walking-in-a-crop-field-at-sunset-41221-large.mp4"
          type="video/mp4"
        />
      </video>

      {/* Main Content Container with Typography Directly on Video */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Main Editorial Typography & Commitments */}
          <div className="lg:col-span-8 flex flex-col items-start gsap-story-content">
            {/* Clean Eyebrow */}
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-[#F5D103] drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)] mb-3">
              <Sparkles className="w-3.5 h-3.5 fill-current" />
              <span>Ethical Sourcing &amp; Heritage</span>
            </div>

            {/* Hero Heading */}
            <h2 className="font-serif-heading text-4xl sm:text-5xl lg:text-6xl text-white font-bold leading-[1.1] mb-6 tracking-tight drop-shadow-[0_3px_12px_rgba(0,0,0,0.85)]">
              From Local Farms <br />
              <span className="italic font-normal text-[#F5D103] font-im-fell drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)]">
                to Your Table
              </span>
            </h2>

            {/* Lead Narrative */}
            <p className="text-base sm:text-lg text-white leading-relaxed mb-8 max-w-2xl font-medium drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)]">
              We work directly with certified family growers across the British
              countryside to bring you the freshest produce, sustainably grown and
              delivered with genuine care.
            </p>

            {/* 3 Core Commitments on clean frosted glass cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 mb-10 w-full max-w-3xl">
              <div className="p-4 rounded-2xl bg-white/90 backdrop-blur-md border border-white shadow-md flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#B45309] shrink-0 mt-0.5" />
                <div className="text-xs text-stone-700">
                  <strong className="text-[#18181B] block font-bold mb-0.5">Zero air-mile:</strong>
                  Regional farms in Hertfordshire, Kent & Suffolk.
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white/90 backdrop-blur-md border border-white shadow-md flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#B45309] shrink-0 mt-0.5" />
                <div className="text-xs text-stone-700">
                  <strong className="text-[#18181B] block font-bold mb-0.5">100% plastic-free:</strong>
                  Cornstarch bags & recyclable cardboard trays.
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white/90 backdrop-blur-md border border-white shadow-md flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#B45309] shrink-0 mt-0.5" />
                <div className="text-xs text-stone-700">
                  <strong className="text-[#18181B] block font-bold mb-0.5">48-hour farm to door:</strong>
                  Harvested, cooled & dispatched in 48h.
                </div>
              </div>
            </div>

            {/* Action Buttons Row */}
            <div className="flex flex-wrap items-center gap-4">
              <a
                href="#products"
                className="btn-magnetic inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#F5D103] hover:bg-[#E5A800] text-[#18181B] font-extrabold text-sm transition-all shadow-lg hover:shadow-xl hover:scale-105 group"
              >
                <span>Our Story</span>
                <ArrowRight className="w-4 h-4 text-[#18181B] group-hover:translate-x-1 transition-transform" />
              </a>

              <button
                type="button"
                onClick={() => setIsVideoModalOpen(true)}
                className="inline-flex items-center gap-3 px-6 py-4 rounded-full bg-white/90 hover:bg-white backdrop-blur-md text-[#18181B] text-sm font-bold border border-white transition-all hover:scale-105 group cursor-pointer shadow-lg"
                aria-label="Watch our farm to table story video in full screen"
              >
                <div className="w-7 h-7 rounded-full bg-[#F5D103] text-[#18181B] flex items-center justify-center group-hover:scale-110 transition-transform shadow-xs">
                  <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                </div>
                <span>Watch Documentary</span>
              </button>
            </div>
          </div>

          {/* Right Column: Floating Trust Badge & Video Controls */}
          <div className="lg:col-span-4 flex flex-col lg:items-end justify-between h-full gap-6 gsap-story-image">
            {/* Handwritten Script Stamp */}
            <div className="bg-white/90 backdrop-blur-md px-5 py-3 rounded-2xl border border-white shadow-lg -rotate-2 self-start lg:self-end">
              <p className="font-script-accent text-2xl sm:text-3xl text-[#18181B] font-bold">
                Support Local Farmers 🌾
              </p>
            </div>

            {/* Farm Origin Stamp & Audio Mute Toggle */}
            <div className="flex items-center gap-3 bg-white/90 backdrop-blur-md p-3 px-4 rounded-2xl border border-white shadow-lg self-start lg:self-end">
              <div className="text-right">
                <p className="text-xs font-bold text-[#18181B]">Broadwater Organic Farm</p>
                <p className="text-[11px] text-[#B45309] font-medium">Partner since 2021 · Hertfordshire</p>
              </div>

              <button
                type="button"
                onClick={() => setIsMuted(!isMuted)}
                className="w-9 h-9 rounded-full bg-stone-100 hover:bg-stone-200 text-[#18181B] flex items-center justify-center transition-all cursor-pointer"
                aria-label={isMuted ? 'Unmute video audio' : 'Mute video audio'}
                title={isMuted ? 'Unmute' : 'Mute'}
              >
                {isMuted ? <VolumeX className="w-4 h-4 text-stone-500" /> : <Volume2 className="w-4 h-4 text-[#B45309]" />}
              </button>
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
