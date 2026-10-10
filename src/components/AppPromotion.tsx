import React, { useState, useEffect } from 'react';
import {
  Leaf,
  Apple,
  Play,
  QrCode,
  ShoppingCart,
  Tag,
  MapPin,
  CreditCard,
  X,
  Smartphone,
  Star,
  Bike,
  Sparkles,
  ArrowRight,
  Plus,
} from 'lucide-react';

export const AppPromotion: React.FC = () => {
  const [showQrModal, setShowQrModal] = useState(false);
  const [activeModalStore, setActiveModalStore] = useState<'apple' | 'google'>('apple');

  const openModal = (store: 'apple' | 'google') => {
    setActiveModalStore(store);
    setShowQrModal(true);
  };

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setShowQrModal(false);
    };
    if (showQrModal) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showQrModal]);

  const features = [
    {
      icon: ShoppingCart,
      title: 'Easy Ordering',
      description: 'Browse & checkout 2,000+ fresh items in under 60 seconds.',
    },
    {
      icon: Tag,
      title: 'Exclusive Deals',
      description: 'Up to 25% OFF weekly specials available only on the mobile app.',
    },
    {
      icon: MapPin,
      title: 'Live Order Tracking',
      description: 'Real-time GPS delivery updates straight from the local farm to your door.',
    },
    {
      icon: CreditCard,
      title: 'Secure Payments',
      description: '1-tap encrypted checkout with Apple Pay, Google Pay & cards.',
    },
  ];

  return (
    <section
      id="app-section"
      className="py-12 sm:py-16 lg:py-20 bg-[#F8F8F2] relative select-none overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ========================================================================= */}
        {/* MASTER VECTOR BANNER — 100% Crisp Native Typography & Interactive Mockups */}
        {/* ========================================================================= */}
        <div className="gsap-app-card relative rounded-3xl sm:rounded-[36px] lg:rounded-[44px] overflow-hidden bg-gradient-to-br from-[#072418] via-[#0E3524] to-[#04170E] border border-[#235841]/40 shadow-2xl text-white p-5 sm:p-8 lg:p-14 xl:p-16">
          {/* Ambient Lighting Gradients & Subtle Radial Glows */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-[#1A4F38]/40 blur-3xl" />
            <div className="absolute top-1/2 -right-24 w-[420px] h-[420px] rounded-full bg-[#D6F36A]/10 blur-[100px]" />
            <div className="absolute -bottom-28 left-1/3 w-80 h-80 rounded-full bg-[#2F7654]/30 blur-3xl" />
            {/* Subtle luxury mesh grid lines */}
            <div
              className="absolute inset-0 opacity-[0.03]"
              style={{
                backgroundImage:
                  'radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)',
                backgroundSize: '32px 32px',
              }}
            />
          </div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 xl:gap-12 items-center">
            {/* ===================================================================== */}
            {/* LEFT COLUMN: Editorial Typography, Benefits & Download CTAs           */}
            {/* ===================================================================== */}
            <div className="lg:col-span-7 xl:col-span-7 flex flex-col items-start">
              {/* Brand Eyebrow Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-[#D6F36A]/15 border border-[#D6F36A]/30 text-[#D6F36A] text-[11px] sm:text-xs font-bold uppercase tracking-wider mb-4 sm:mb-5 shadow-xs">
                <Leaf className="w-3.5 h-3.5 fill-current" />
                <span>Varam stores Mobile App</span>
              </div>

              {/* Main Headline */}
              <h2 className="font-serif-heading font-bold text-2xl sm:text-4xl lg:text-[46px] xl:text-5xl text-white leading-[1.15] sm:leading-[1.12] tracking-tight mb-3 sm:mb-4">
                Shop Fresh Anywhere.{' '}
                <br className="hidden sm:block" />
                Get the{' '}
                <span className="font-serif italic text-[#D6F36A] font-normal">
                  Varam stores
                </span>{' '}
                App.
              </h2>

              {/* Body Description */}
              <p className="text-stone-300 text-xs sm:text-sm lg:text-base leading-relaxed mb-6 sm:mb-8 max-w-xl">
                Experience Hertfordshire &amp; London's fastest grocery delivery. Browse seasonal
                organic produce, unlock app-exclusive discounts, and track your driver live on the
                interactive map.
              </p>

              {/* 4 Feature Badges Grid (Responsive: 2 columns on all devices) */}
              <div className="grid grid-cols-2 gap-2 sm:gap-3.5 w-full mb-6 sm:mb-8">
                {features.map((item, idx) => {
                  const IconComp = item.icon;
                  return (
                    <div
                      key={idx}
                      className="flex flex-col sm:flex-row items-start gap-2 sm:gap-3.5 p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-white/[0.06] hover:bg-white/[0.1] border border-white/10 backdrop-blur-xs transition-all duration-300 group"
                    >
                      <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-[#D6F36A]/15 border border-[#D6F36A]/30 text-[#D6F36A] flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:bg-[#D6F36A] group-hover:text-[#0B2618] transition-all">
                        <IconComp className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      </div>
                      <div className="flex flex-col">
                        <h3 className="font-serif-heading font-bold text-white text-xs sm:text-[15px] leading-tight mb-0.5 sm:mb-1">
                          {item.title}
                        </h3>
                        <p className="text-stone-300/85 text-[10px] sm:text-xs leading-snug line-clamp-2">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Download Buttons Row & Quick Scan QR */}
              <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center gap-2.5 sm:gap-3.5 w-full mb-5 sm:mb-6">
                {/* Apple App Store Button */}
                <button
                  type="button"
                  onClick={() => openModal('apple')}
                  className="btn-magnetic inline-flex items-center justify-center sm:justify-start gap-2 sm:gap-3 px-3.5 py-2.5 sm:px-5 sm:py-3 rounded-xl sm:rounded-2xl bg-black/90 hover:bg-black text-white border border-white/20 shadow-lg hover:shadow-2xl hover:border-[#D6F36A]/60 transition-all cursor-pointer group"
                  aria-label="Download on the App Store"
                >
                  <Apple className="w-5 h-5 sm:w-6 sm:h-6 text-white group-hover:text-[#D6F36A] transition-colors shrink-0" />
                  <div className="text-left leading-tight">
                    <span className="text-[8px] sm:text-[10px] uppercase tracking-wider text-stone-300 block">
                      Download on the
                    </span>
                    <span className="text-xs sm:text-sm font-bold font-sans tracking-tight">App Store</span>
                  </div>
                </button>

                {/* Google Play Store Button */}
                <button
                  type="button"
                  onClick={() => openModal('google')}
                  className="btn-magnetic inline-flex items-center justify-center sm:justify-start gap-2 sm:gap-3 px-3.5 py-2.5 sm:px-5 sm:py-3 rounded-xl sm:rounded-2xl bg-black/90 hover:bg-black text-white border border-white/20 shadow-lg hover:shadow-2xl hover:border-[#D6F36A]/60 transition-all cursor-pointer group"
                  aria-label="Get it on Google Play"
                >
                  <Play className="w-4 h-4 sm:w-5 sm:h-5 text-white fill-current group-hover:text-[#D6F36A] transition-colors shrink-0" />
                  <div className="text-left leading-tight">
                    <span className="text-[8px] sm:text-[10px] uppercase tracking-wider text-stone-300 block">
                      GET IT ON
                    </span>
                    <span className="text-xs sm:text-sm font-bold font-sans tracking-tight">Google Play</span>
                  </div>
                </button>

                {/* Quick Scan QR Code Pill (hidden on small phone, visible on tablet/desktop) */}
                <button
                  type="button"
                  onClick={() => openModal('apple')}
                  className="hidden sm:inline-flex btn-magnetic items-center gap-2.5 px-4 py-3 rounded-2xl bg-white/10 hover:bg-white/15 text-stone-200 hover:text-white border border-white/15 backdrop-blur-md transition-all cursor-pointer group"
                  title="Scan QR Code with your smartphone"
                >
                  <QrCode className="w-5 h-5 text-[#D6F36A] group-hover:scale-110 transition-transform" />
                  <span className="text-xs font-semibold">Scan QR Code</span>
                </button>
              </div>

              {/* Social Proof Rating & Platform Support */}
              <div className="flex flex-wrap items-center justify-between sm:justify-start gap-2 sm:gap-4 text-[10px] sm:text-xs text-stone-300/80 pt-3 border-t border-white/10 w-full">
                <div className="flex items-center gap-1.5 text-[#D6F36A]">
                  <div className="flex items-center gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3 sm:w-3.5 h-3 sm:h-3.5 fill-current" />
                    ))}
                  </div>
                  <span className="font-bold text-white text-[11px] sm:text-xs">4.9 / 5.0</span>
                </div>
                <span className="hidden sm:inline text-stone-500">•</span>
                <span>25,000+ Reviews</span>
                <span className="hidden sm:inline text-stone-500">•</span>
                <span className="text-[#D6F36A] font-medium">Free iOS &amp; Android</span>
              </div>
            </div>

            {/* ===================================================================== */}
            {/* RIGHT COLUMN: Razor-Sharp Dual Smartphone Mockup & Live Widgets       */}
            {/* ===================================================================== */}
            <div className="lg:col-span-5 xl:col-span-5 relative flex justify-center items-center py-6 lg:py-0">
              {/* Dual Phones Presentation Container */}
              <div className="relative flex items-center justify-center">
                {/* ----------------------------------------------------------------- */}
                {/* BACK PHONE: Active Basket & Checkout Screen (Offset to right)     */}
                {/* ----------------------------------------------------------------- */}
                <div className="hidden sm:block absolute -right-12 sm:-right-16 top-4 w-[235px] sm:w-[255px] h-[480px] sm:h-[530px] rounded-[38px] bg-white border-[6px] border-[#18231E] shadow-2xl ring-1 ring-white/15 overflow-hidden rotate-[7deg] z-0 opacity-90 hover:opacity-100 hover:rotate-[5deg] transition-all duration-500">
                  {/* Dynamic Island Notch */}
                  <div className="w-20 h-4.5 bg-black rounded-full mx-auto mt-2 flex items-center justify-end pr-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#1C2420]" />
                  </div>

                  {/* Status Bar */}
                  <div className="px-5 pt-1 pb-2 flex justify-between items-center text-[10px] font-bold text-stone-800">
                    <span>9:41</span>
                    <span className="text-[9px] text-stone-500">5G 100%</span>
                  </div>

                  {/* Cart Header */}
                  <div className="px-4 pb-2 border-b border-stone-100 flex justify-between items-center">
                    <div>
                      <h4 className="font-serif-heading font-bold text-xs text-[#123F32]">
                        Your Basket
                      </h4>
                      <span className="text-[10px] text-stone-500">3 fresh items</span>
                    </div>
                    <span className="text-[10px] text-[#2F7654] font-semibold">Clear All</span>
                  </div>

                  {/* Cart Items List */}
                  <div className="p-3 space-y-2.5">
                    {/* Item 1 */}
                    <div className="flex items-center gap-2 p-1.5 rounded-xl bg-stone-50 border border-stone-100">
                      <img
                        src="/product-tomatoes.jpg"
                        alt="Tomatoes"
                        className="w-9 h-9 rounded-lg object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <span className="text-[11px] font-bold text-stone-800 block truncate">
                          Organic Tomatoes
                        </span>
                        <span className="text-[10px] text-stone-500 font-semibold">£1.33 / kg</span>
                      </div>
                      <span className="text-[11px] font-bold text-[#123F32]">£1.33</span>
                    </div>

                    {/* Item 2 */}
                    <div className="flex items-center gap-2 p-1.5 rounded-xl bg-stone-50 border border-stone-100">
                      <img
                        src="/product-bananas.jpg"
                        alt="Bananas"
                        className="w-9 h-9 rounded-lg object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <span className="text-[11px] font-bold text-stone-800 block truncate">
                          Fresh Bananas
                        </span>
                        <span className="text-[10px] text-stone-500 font-semibold">£0.79 / kg</span>
                      </div>
                      <span className="text-[11px] font-bold text-[#123F32]">£1.58</span>
                    </div>

                    {/* Item 3 */}
                    <div className="flex items-center gap-2 p-1.5 rounded-xl bg-stone-50 border border-stone-100">
                      <img
                        src="/product-broccoli.jpg"
                        alt="Broccoli"
                        className="w-9 h-9 rounded-lg object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <span className="text-[11px] font-bold text-stone-800 block truncate">
                          Fresh Broccoli
                        </span>
                        <span className="text-[10px] text-stone-500 font-semibold">£1.20 / kg</span>
                      </div>
                      <span className="text-[11px] font-bold text-[#123F32]">£1.20</span>
                    </div>
                  </div>

                  {/* Delivery Badge */}
                  <div className="mx-3 p-2 rounded-xl bg-[#EAF2E8] border border-[#DCE8DB] flex items-center justify-between">
                    <span className="text-[10px] font-bold text-[#123F32]">Standard Delivery</span>
                    <span className="text-[10px] font-bold text-[#2F7654]">FREE</span>
                  </div>

                  {/* Total & Checkout Button */}
                  <div className="p-3 mt-2 border-t border-stone-100">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-[11px] text-stone-500">Estimated Total</span>
                      <span className="text-xs font-bold text-stone-900">£4.11</span>
                    </div>
                    <div className="w-full py-2 rounded-xl bg-[#123F32] text-white text-[11px] font-bold text-center flex items-center justify-center gap-1.5 shadow-md">
                      <span>Checkout</span>
                      <ArrowRight className="w-3 h-3 text-[#D6F36A]" />
                    </div>
                  </div>
                </div>

                {/* ----------------------------------------------------------------- */}
                {/* FRONT PHONE: Main Storefront Shopping App (Crisp Vector DOM)      */}
                {/* ----------------------------------------------------------------- */}
                <div className="relative z-10">
                  <div className="relative w-[250px] sm:w-[285px] h-[510px] sm:h-[570px] rounded-[38px] sm:rounded-[44px] bg-[#FAF9F5] border-[6px] sm:border-[7px] border-[#1C2621] shadow-2xl ring-1 ring-white/20 overflow-hidden flex flex-col transition-transform duration-500 hover:scale-[1.02]">
                    {/* Dynamic Island Notch */}
                    <div className="w-20 sm:w-24 h-4.5 sm:h-5 bg-black rounded-full mx-auto mt-2 flex items-center justify-end pr-2 shrink-0">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#18231E]" />
                    </div>

                    {/* Status Bar */}
                    <div className="px-4 sm:px-5 pt-1 pb-1.5 flex justify-between items-center text-[10px] font-bold text-stone-800 shrink-0">
                      <span>9:41</span>
                      <div className="flex items-center gap-1.5 text-[9px] text-stone-600 font-semibold">
                        <span>5G</span>
                        <span>100%</span>
                      </div>
                    </div>

                    {/* App Header with Brand Logo */}
                    <div className="px-3.5 sm:px-4 py-1.5 flex justify-between items-center shrink-0">
                      <div className="flex items-center gap-1.5">
                        <span className="w-5 h-5 rounded-full bg-[#123F32] flex items-center justify-center text-[#D6F36A]">
                          <Leaf className="w-3 h-3 fill-current" />
                        </span>
                        <span className="font-serif-heading font-bold text-xs text-[#123F32] tracking-tight">
                          Varam stores
                        </span>
                      </div>
                      <span className="text-[9px] font-medium text-stone-500 bg-stone-100 px-2 py-0.5 rounded-full">
                        Hatfield, AL10 ▾
                      </span>
                    </div>

                    {/* Mini Search Bar */}
                    <div className="px-3.5 sm:px-4 py-1.5 shrink-0">
                      <div className="w-full px-2.5 py-1.5 rounded-xl bg-white border border-stone-200 text-stone-400 text-[10px] flex items-center gap-1.5 shadow-2xs">
                        <span>🔍</span>
                        <span className="truncate">Search fresh fruits, dairy...</span>
                      </div>
                    </div>

                    {/* Promo Mini Banner */}
                    <div className="mx-3.5 sm:mx-4 my-1 sm:my-1.5 p-2 sm:p-2.5 rounded-2xl bg-gradient-to-r from-[#123F32] to-[#1E5745] text-white flex items-center justify-between shrink-0 shadow-xs">
                      <div>
                        <span className="text-[8px] font-bold uppercase tracking-wider text-[#D6F36A] block">
                          Fresh Deals
                        </span>
                        <span className="text-xs font-bold leading-tight block">
                          Up to 25% OFF
                        </span>
                        <span className="inline-block mt-1 px-2 py-0.5 rounded-full bg-[#D6F36A] text-[#123F32] text-[8px] font-bold">
                          Shop Now ➔
                        </span>
                      </div>
                      <img
                        src="/product-tomatoes.jpg"
                        alt="Produce"
                        className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl object-cover shadow-xs border border-white/20"
                      />
                    </div>

                    {/* Category Pills Row */}
                    <div className="px-3.5 sm:px-4 py-1 shrink-0">
                      <div className="flex justify-between items-center text-[10px] font-bold text-stone-700 mb-1.5">
                        <span>Shop by Category</span>
                        <span className="text-[9px] text-[#2F7654]">View All</span>
                      </div>
                      <div className="grid grid-cols-4 gap-1.5">
                        {[
                          { name: 'Veggies', emoji: '🥦' },
                          { name: 'Fruits', emoji: '🍎' },
                          { name: 'Dairy', emoji: '🥛' },
                          { name: 'Bakery', emoji: '🥖' },
                        ].map((cat, i) => (
                          <div
                            key={i}
                            className="flex flex-col items-center p-1 rounded-xl bg-white border border-stone-200/80 shadow-2xs"
                          >
                            <span className="text-xs mb-0.5">{cat.emoji}</span>
                            <span className="text-[8px] font-semibold text-stone-600">
                              {cat.name}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Today's Fresh Picks Mini Grid */}
                    <div className="px-3.5 sm:px-4 py-1 sm:py-1.5 flex-1 min-h-0">
                      <div className="flex justify-between items-center text-[10px] font-bold text-stone-700 mb-1">
                        <span>Today's Fresh Picks</span>
                        <span className="text-[9px] text-[#2F7654]">View All</span>
                      </div>
                      <div className="grid grid-cols-2 gap-1.5 sm:gap-2">
                        <div className="p-1.5 sm:p-2 rounded-xl bg-white border border-stone-200/80 shadow-2xs flex flex-col">
                          <img
                            src="/product-tomatoes.jpg"
                            alt="Tomatoes"
                            className="w-full h-12 sm:h-14 rounded-lg object-cover mb-1"
                          />
                          <span className="text-[9px] font-bold text-stone-800 truncate">
                            Tomatoes
                          </span>
                          <div className="flex justify-between items-center mt-auto pt-1">
                            <span className="text-[9px] font-bold text-[#123F32]">£1.33</span>
                            <span className="w-4 h-4 rounded-full bg-[#123F32] text-white flex items-center justify-center text-[9px]">
                              <Plus className="w-2.5 h-2.5" />
                            </span>
                          </div>
                        </div>

                        <div className="p-1.5 sm:p-2 rounded-xl bg-white border border-stone-200/80 shadow-2xs flex flex-col">
                          <img
                            src="/product-bananas.jpg"
                            alt="Bananas"
                            className="w-full h-12 sm:h-14 rounded-lg object-cover mb-1"
                          />
                          <span className="text-[9px] font-bold text-stone-800 truncate">
                            Bananas
                          </span>
                          <div className="flex justify-between items-center mt-auto pt-1">
                            <span className="text-[9px] font-bold text-[#123F32]">£0.79</span>
                            <span className="w-4 h-4 rounded-full bg-[#123F32] text-white flex items-center justify-center text-[9px]">
                              <Plus className="w-2.5 h-2.5" />
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* App Tab Bar */}
                    <div className="px-4 py-1.5 sm:py-2 border-t border-stone-200/80 bg-white flex justify-between items-center text-[9px] font-bold text-stone-400 shrink-0">
                      <div className="flex flex-col items-center text-[#123F32]">
                        <span>🏠</span>
                        <span className="text-[8px] font-bold">Home</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <span>📂</span>
                        <span className="text-[8px]">Categories</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <span>🏷️</span>
                        <span className="text-[8px]">Deals</span>
                      </div>
                      <div className="flex flex-col items-center relative">
                        <span className="w-2 h-2 rounded-full bg-red-500 absolute -top-0.5 right-1" />
                        <span>🛒</span>
                        <span className="text-[8px]">Basket</span>
                      </div>
                    </div>
                  </div>

                  {/* FLOATING WIDGET 1 (Top-Left): Real-Time Live Order Tracking */}
                  <div className="absolute top-2.5 -left-2 sm:-left-12 z-20 px-3 py-2 sm:px-3.5 sm:py-2.5 rounded-xl sm:rounded-2xl bg-black/85 backdrop-blur-md border border-white/20 text-white shadow-2xl flex items-center gap-2.5 sm:gap-3">
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg sm:rounded-xl bg-[#D6F36A] text-[#0B2618] flex items-center justify-center shrink-0 shadow-xs">
                      <Bike className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#D6F36A] animate-ping" />
                        <span className="text-[9px] sm:text-[10px] uppercase tracking-wider text-stone-300 font-bold">
                          Live Tracking
                        </span>
                      </div>
                      <span className="text-[11px] sm:text-xs font-bold text-white block">
                        Arriving in 11 mins
                      </span>
                    </div>
                  </div>

                  {/* FLOATING WIDGET 2 (Bottom-Right): App Exclusive £10 Voucher */}
                  <div className="absolute -bottom-2.5 -right-2 sm:-right-6 z-20 px-3 py-2 sm:px-4 sm:py-2.5 rounded-xl sm:rounded-2xl bg-[#D6F36A] text-[#0B2618] border-2 border-white shadow-2xl flex items-center gap-2 sm:gap-2.5 transition-transform hover:scale-105">
                    <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current text-[#0B2618]" />
                    <div className="text-left leading-tight">
                      <span className="text-[8px] sm:text-[9px] uppercase tracking-wider font-extrabold block text-[#0B2618]/80">
                        Code: VARAM20
                      </span>
                      <span className="text-[11px] sm:text-xs font-extrabold tracking-tight">
                        20% OFF 1st Order
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* INTERACTIVE QR CODE DOWNLOAD MODAL                                        */}
      {/* ========================================================================= */}
      {showQrModal && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setShowQrModal(false)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-3xl p-6 sm:p-8 max-w-sm w-full text-center border border-stone-200 shadow-2xl relative"
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setShowQrModal(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-700 flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Close QR Modal"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Brand Header */}
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="w-6 h-6 rounded-full bg-[#123F32] flex items-center justify-center text-[#D6F36A]">
                <Leaf className="w-3.5 h-3.5 fill-current" />
              </span>
              <span className="font-serif-heading font-bold text-xl text-[#123F32]">
                Varam stores App
              </span>
            </div>

            <h3 className="font-serif-heading text-2xl font-bold text-[#123F32] mb-1">
              Scan to Download
            </h3>
            <p className="text-xs text-[#737A72] mb-5">
              Point your smartphone camera to install Varam stores directly from the{' '}
              <strong className="text-[#123F32]">
                {activeModalStore === 'apple' ? 'Apple App Store' : 'Google Play Store'}
              </strong>
            </p>

            {/* Store Toggle */}
            <div className="flex rounded-xl bg-stone-100 p-1 mb-5">
              <button
                type="button"
                onClick={() => setActiveModalStore('apple')}
                className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  activeModalStore === 'apple'
                    ? 'bg-white text-[#123F32] shadow-xs'
                    : 'text-stone-500 hover:text-stone-800'
                }`}
              >
                Apple iOS
              </button>
              <button
                type="button"
                onClick={() => setActiveModalStore('google')}
                className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  activeModalStore === 'google'
                    ? 'bg-white text-[#123F32] shadow-xs'
                    : 'text-stone-500 hover:text-stone-800'
                }`}
              >
                Google Android
              </button>
            </div>

            {/* QR Code Canvas */}
            <div className="bg-[#F8F8F2] p-4 rounded-2xl inline-block border border-stone-200 mb-4 shadow-inner">
              <div className="w-44 h-44 bg-white p-3 rounded-xl border border-stone-300 flex flex-col justify-between items-center shadow-xs">
                <QrCode className="w-32 h-32 text-[#123F32]" />
                <span className="text-[9px] font-mono text-stone-500 font-bold tracking-wider">
                  VARAMSTORES-{activeModalStore.toUpperCase()}-APP
                </span>
              </div>
            </div>

            <div className="flex items-center justify-center gap-2 text-xs text-[#2F7654] font-semibold">
              <Smartphone className="w-3.5 h-3.5" />
              <span>Available for iOS 16+ &amp; Android 12+</span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
