import React, { useState } from 'react';
import { 
  ChevronRight, 
  Sparkles, 
  Leaf, 
  Heart, 
  Truck, 
  Award, 
  CheckCircle2, 
  Play, 
  ArrowRight, 
  ShoppingBag,
  Users
} from 'lucide-react';
import { useNavigation } from '../context/NavigationContext';
import { VideoModal } from './VideoModal';

export const OurStoryPage: React.FC = () => {
  const { goToHome, goToShop } = useNavigation();
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  const pillars = [
    {
      icon: Award,
      badge: 'Heritage & Purity',
      title: 'Direct Brand Relationships',
      desc: 'We procure directly from certified heritage mills and master food makers across India — including Aashirvaad, GRB, Sakthi, Aachi, Priya, and Grand Sweets. Never middlemen, never diluted quality.',
    },
    {
      icon: Leaf,
      badge: 'Zero Air-Miles',
      title: 'Local British Farm Partnerships',
      desc: 'For fresh seasonal greens, herbs, and organic dairy, we partner directly with independent family farms across Hertfordshire, Kent, and Suffolk. Harvested at sunrise, delivered to you by afternoon.',
    },
    {
      icon: Truck,
      badge: 'Cold-Chain Integrity',
      title: 'Chilled Temperature Control',
      desc: 'Fresh curry leaves, moringa drumsticks, and freshly ground idli-dosa batter require specialized care. Our refrigerated vehicles and thermal insulation preserve garden-fresh vitality.',
    },
    {
      icon: Heart,
      badge: 'Sustainable Living',
      title: 'Eco-Conscious Packaging',
      desc: 'From 100% compostable bio-bags to FSC-certified recyclable cardboard outer cartons, our goal is to nurture both your family and the earth we all share.',
    },
  ];

  const milestones = [
    {
      year: '2021',
      title: 'The Seed is Planted in Hatfield',
      desc: 'Frustrated by the lack of authentic, unadulterated South Indian staples in Hertfordshire, our founders started Varam Foods with just 50 curated items from a small family hub.',
    },
    {
      year: '2022',
      title: 'Cold-Chain Fleet Launch',
      desc: 'Rolled out dedicated temperature-controlled delivery vans across Hatfield, St Albans, and Welwyn Garden City, ensuring fresh vegetables and batter arrive in peak condition.',
    },
    {
      year: '2024',
      title: '90+ Heritage Brands & Direct Mill Sourcing',
      desc: 'Formed verified supply partnerships with over 90 premier Indian brands, expanding our catalog to over 8,000 authentic regional delicacies and organic staples.',
    },
    {
      year: '2026',
      title: '12,000+ UK Households Served',
      desc: 'Today, Varam Foods is the trusted culinary partner for thousands of families across Hertfordshire and the wider London commuter belt, delivering same-day freshness daily.',
    },
  ];

  return (
    <div className="w-full bg-white min-h-screen text-[#18181B] pb-24 animate-fadeIn">
      {/* ========================================================================= */}
      {/* 1. BREADCRUMBS BAR */}
      {/* ========================================================================= */}
      <div className="border-b border-stone-200 bg-[#F8FAFC] py-3.5 px-4 sm:px-6 lg:px-8 xl:px-10 2xl:px-12">
        <div className="w-full flex items-center justify-between">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-stone-600">
            <button
              type="button"
              onClick={goToHome}
              className="hover:text-[#B45309] transition-colors cursor-pointer"
            >
              Home
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
            <span className="text-[#18181B] font-bold">Our Story</span>
          </nav>

          <span className="text-xs text-stone-500 hidden sm:inline-block">
            Varam Foods • Established in Hertfordshire
          </span>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. EDITORIAL HERO SECTION */}
      {/* ========================================================================= */}
      <section className="relative w-full bg-[#F8FAFC] border-b border-stone-200 py-16 sm:py-24 lg:py-28 overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#F5D103]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-[#FEF08A]/40 rounded-full blur-3xl pointer-events-none" />

        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-10 2xl:px-12 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Eyebrow badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-stone-200 shadow-2xs text-[#B45309] text-xs font-bold uppercase tracking-widest mb-6">
              <Sparkles className="w-3.5 h-3.5 text-[#B45309]" />
              <span>The Varam Foods Heritage • Founded 2021</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#18181B] tracking-tight leading-[1.08] mb-6">
              Rooted in Tradition, <br />
              Committed to <span className="underline decoration-[#F5D103] decoration-4 underline-offset-8">Freshness</span>.
            </h1>

            {/* Narrative Subtitle */}
            <p className="text-base sm:text-xl text-stone-600 leading-relaxed font-normal max-w-2xl mx-auto mb-10">
              We bridge the warmth of authentic South Indian kitchens with the crisp purity of British farms. No compromises on flavour, no artificial fillers, and zero guesswork.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-4">
              <button
                type="button"
                onClick={() => goToShop({ category: 'all' })}
                className="btn-magnetic inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#F5D103] hover:bg-[#E5A800] text-[#18181B] text-sm font-bold shadow-sm transition-all cursor-pointer group"
              >
                <span>Explore Our Produce</span>
                <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                type="button"
                onClick={() => setIsVideoModalOpen(true)}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white hover:bg-stone-50 border border-stone-200 text-[#18181B] text-sm font-bold shadow-2xs transition-all cursor-pointer"
              >
                <Play className="w-4 h-4 fill-current text-[#B45309]" />
                <span>Watch Brand Film</span>
              </button>
            </div>
          </div>

          {/* Quick Metrics Strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mt-16 sm:mt-20 max-w-5xl mx-auto">
            <div className="bg-white rounded-2xl p-5 border border-stone-200/90 shadow-2xs text-center">
              <p className="text-3xl sm:text-4xl font-extrabold text-[#18181B] mb-1">90+</p>
              <p className="text-xs sm:text-sm text-stone-500 font-medium">Authentic Brands</p>
            </div>
            <div className="bg-white rounded-2xl p-5 border border-stone-200/90 shadow-2xs text-center">
              <p className="text-3xl sm:text-4xl font-extrabold text-[#18181B] mb-1">10,000+</p>
              <p className="text-xs sm:text-sm text-stone-500 font-medium">Curated Items</p>
            </div>
            <div className="bg-white rounded-2xl p-5 border border-stone-200/90 shadow-2xs text-center">
              <p className="text-3xl sm:text-4xl font-extrabold text-[#18181B] mb-1">12,400+</p>
              <p className="text-xs sm:text-sm text-stone-500 font-medium">Happy Families</p>
            </div>
            <div className="bg-white rounded-2xl p-5 border border-stone-200/90 shadow-2xs text-center">
              <p className="text-3xl sm:text-4xl font-extrabold text-[#18181B] mb-1">100%</p>
              <p className="text-xs sm:text-sm text-stone-500 font-medium">Cold-Chain Fresh</p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. THE MEANING OF "VARAM" & OUR GENESIS */}
      {/* ========================================================================= */}
      <section className="py-16 sm:py-24 bg-white border-b border-stone-200/80">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-10 2xl:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Visual Column */}
            <div className="lg:col-span-6 order-2 lg:order-1">
              <div className="relative rounded-3xl overflow-hidden shadow-xl border border-stone-200/90 aspect-[4/3] group">
                <img
                  src="/promo-basket-delivery.jpg"
                  alt="Harvest of fresh ingredients and groceries in rustic basket"
                  className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <p className="text-xs font-bold uppercase tracking-widest text-[#F5D103] mb-1">
                    Authentic Culinary Heritage
                  </p>
                  <p className="text-lg font-bold">
                    Hand-picked ingredients that evoke the aromas of home.
                  </p>
                </div>
              </div>
            </div>

            {/* Narrative Column */}
            <div className="lg:col-span-6 order-1 lg:order-2 flex flex-col items-start">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-[#B45309] mb-3">
                <Heart className="w-3.5 h-3.5 text-[#B45309]" />
                <span>Our Genesis</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#18181B] tracking-tight mb-5 leading-[1.15]">
                Why We Named It <span className="bg-amber-100 text-[#B45309] px-2 py-0.5 rounded-lg">&ldquo;Varam&rdquo;</span>
              </h2>

              <div className="space-y-4 text-stone-600 text-sm sm:text-base leading-relaxed font-normal">
                <p>
                  In Tamil and Telugu, the word <strong>Varam (வரம் / వరం)</strong> translates to <em>&ldquo;A Blessing&rdquo;</em> or <em>&ldquo;A Precious Gift.&rdquo;</em>
                </p>
                <p>
                  Living in the UK, many of us struggled with the same weekly chore: driving miles across multiple shops to find genuine sambar onions, cold-pressed gingelly oil, fresh curry leaves, and authentic Sona Masoori rice. Supermarket shelves frequently stocked stale spices that had lost their volatile essential oils months prior.
                </p>
                <p>
                  We created <strong>Varam Foods</strong> to be the definitive answer. An obsessive commitment to sourcing directly from the source, storing under immaculate climate-controlled conditions, and delivering directly to your door with warmth and care.
                </p>
              </div>

              {/* Core Checklist */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mt-8 w-full">
                <div className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-[#18181B]">
                  <CheckCircle2 className="w-4 h-4 text-[#B45309] shrink-0" />
                  <span>Unpolished pulses &amp; natural grains</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-[#18181B]">
                  <CheckCircle2 className="w-4 h-4 text-[#B45309] shrink-0" />
                  <span>Cold-pressed virgin cooking oils</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-[#18181B]">
                  <CheckCircle2 className="w-4 h-4 text-[#B45309] shrink-0" />
                  <span>Same-day harvested greens</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-[#18181B]">
                  <CheckCircle2 className="w-4 h-4 text-[#B45309] shrink-0" />
                  <span>Strict zero-adulteration policy</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. CINEMATIC VIDEO INTERLUDE */}
      {/* ========================================================================= */}
      <section className="py-16 sm:py-20 bg-[#18181B] text-white relative overflow-hidden">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-10 2xl:px-12 relative z-10">
          <div className="max-w-4xl mx-auto text-center mb-10">
            <span className="text-xs font-bold uppercase tracking-widest text-[#F5D103] block mb-2">
              Inside Our Journey
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4 text-white">
              From Soil to Doorstep: Watch Our Story
            </h2>
            <p className="text-sm sm:text-base text-white/80 max-w-xl mx-auto">
              Follow our daily journey through rural grower fields, spice testing laboratories, and our temperature-controlled packing hub in Hatfield.
            </p>
          </div>

          {/* Video Container Box */}
          <div className="relative max-w-4xl mx-auto rounded-3xl overflow-hidden shadow-2xl border border-stone-700 aspect-[16/9] bg-stone-950 group">
            <video
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover opacity-80 group-hover:scale-102 transition-transform duration-700"
            >
              <source
                src="https://assets.mixkit.co/videos/preview/mixkit-farmer-walking-in-a-crop-field-at-sunset-41221-large.mp4"
                type="video/mp4"
              />
            </video>
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <button
                type="button"
                onClick={() => setIsVideoModalOpen(true)}
                className="w-20 h-20 rounded-full bg-[#F5D103] text-[#18181B] hover:bg-[#E5A800] hover:text-[#18181B] flex items-center justify-center hover:scale-110 active:scale-95 transition-all shadow-2xl cursor-pointer group/btn"
                aria-label="Play full brand film"
              >
                <Play className="w-8 h-8 fill-current ml-1 group-hover/btn:scale-110 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. OUR 4 CORE SOURCING PILLARS */}
      {/* ========================================================================= */}
      <section className="py-16 sm:py-24 bg-white border-b border-stone-200/80">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-10 2xl:px-12">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-[#B45309] block mb-2">
              Our Sourcing Philosophy
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#18181B] tracking-tight mb-3">
              How We Deliver Unmatched Quality
            </h2>
            <p className="text-sm sm:text-base text-stone-600">
              Four non-negotiable principles that shape every single product carton we pack.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {pillars.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="bg-white rounded-3xl p-7 border border-stone-200/90 hover:border-stone-400 hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-stone-50 border border-stone-200 flex items-center justify-center text-[#B45309] mb-5 group-hover:bg-[#F5D103] group-hover:text-[#18181B] transition-colors">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-stone-600 block mb-1">
                      {item.badge}
                    </span>
                    <h3 className="text-lg font-bold text-[#18181B] mb-3">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-normal">
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. OUR MILESTONES TIMELINE */}
      {/* ========================================================================= */}
      <section className="py-16 sm:py-24 bg-[#F8FAFC] border-b border-stone-200">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-10 2xl:px-12">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-14">
              <span className="text-xs font-bold uppercase tracking-widest text-[#B45309] block mb-2">
                Our Journey
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#18181B] tracking-tight mb-3">
                Growing Step by Step
              </h2>
              <p className="text-sm sm:text-base text-stone-600">
                From our first home delivery in Hatfield to becoming a regional favourite.
              </p>
            </div>

            <div className="space-y-6">
              {milestones.map((m) => (
                <div
                  key={m.year}
                  className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-2xs flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-8 hover:shadow-md transition-shadow"
                >
                  <div className="shrink-0 flex items-center gap-3">
                    <span className="text-2xl sm:text-3xl font-extrabold text-[#B45309] bg-amber-100 px-4 py-2 rounded-2xl">
                      {m.year}
                    </span>
                  </div>

                  <div className="flex-1">
                    <h3 className="text-base sm:text-lg font-bold text-[#18181B] mb-1.5">
                      {m.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-normal">
                      {m.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 7. FOUNDER'S PLEDGE & INVITATION */}
      {/* ========================================================================= */}
      <section className="py-16 sm:py-24 bg-[#F8FAFC]">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-10 2xl:px-12">
          <div className="max-w-3xl mx-auto bg-stone-50 rounded-3xl p-8 sm:p-12 border border-stone-200 text-center shadow-xs">
            <div className="w-14 h-14 rounded-full bg-[#F5D103] text-white flex items-center justify-center mx-auto mb-6 shadow-xs">
              <Users className="w-7 h-7" />
            </div>

            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#18181B] mb-4">
              A Personal Promise to Every Customer
            </h3>

            <p className="text-sm sm:text-base text-stone-600 leading-relaxed font-normal mb-8">
              &ldquo;We treat every bag of groceries as if it were destined for our own family&apos;s dinner table. If something isn&apos;t as fresh or delicious as you expected, let us know within minutes, and we will replace or refund it immediately — no hassle, ever.&rdquo;
            </p>

            <div className="pt-6 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                type="button"
                onClick={() => goToShop({ category: 'all' })}
                className="btn-magnetic px-8 py-3 rounded-full bg-[#F5D103] hover:bg-[#E5A800] text-[#18181B] text-xs font-bold transition-all shadow-md cursor-pointer flex items-center gap-2"
              >
                <ShoppingBag className="w-4 h-4 text-[#F5D103]" />
                <span>Shop Today&apos;s Arrivals</span>
              </button>

              <button
                type="button"
                onClick={goToHome}
                className="px-6 py-3 rounded-full bg-white hover:bg-stone-50 border border-stone-200 text-xs font-bold text-[#18181B] transition-all cursor-pointer"
              >
                Return to Home
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Video Modal Trigger */}
      <VideoModal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
      />
    </div>
  );
};
