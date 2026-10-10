import React from 'react';
import { Truck, Sprout, ShoppingBag, ShieldCheck } from 'lucide-react';

export const WhyVaramStores: React.FC = () => {
  const benefits = [
    {
      icon: Truck,
      title: 'Same-day Delivery',
      desc: 'Swift, temperature-controlled delivery straight to your doorstep.',
    },
    {
      icon: Sprout,
      title: '100% Fresh Produce',
      desc: 'Harvested directly from certified local and organic farms.',
    },
    {
      icon: ShoppingBag,
      title: 'Wide Selection',
      desc: 'Over 10,000 curated items spanning pantry, bakery, and produce.',
    },
    {
      icon: ShieldCheck,
      title: 'Secure Payments',
      desc: 'Safe, 256-bit encrypted checkout with Apple Pay and major cards.',
    },
  ];

  return (
    <section className="py-16 sm:py-20 bg-white border-y border-[#E8ECE5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with handwritten accent */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-14">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#2F7654] block mb-1">
              The Varam stores Promise
            </span>
            <h2 className="font-serif-heading text-3xl sm:text-4xl text-[#123F32] font-bold">
              Why Choose Varam stores?
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <span className="font-script-accent text-2xl sm:text-3xl text-[#2F7654] font-medium -rotate-2">
              Because fresh just hits different 🌿
            </span>
          </div>
        </div>

        {/* 4 Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((b) => {
            const Icon = b.icon;
            return (
              <div
                key={b.title}
                className="bg-[#F8F8F2] rounded-2xl p-6 border border-[#E8ECE5] hover:border-[#123F32]/40 hover:shadow-md transition-all duration-200 flex flex-col items-start"
              >
                <div className="w-12 h-12 rounded-xl bg-white border border-[#DCE2D8] text-[#123F32] flex items-center justify-center mb-5 shadow-2xs">
                  <Icon className="w-6 h-6 text-[#2F7654]" />
                </div>
                <h3 className="text-base font-bold text-[#18231E] mb-2">
                  {b.title}
                </h3>
                <p className="text-sm text-[#737A72] leading-relaxed">
                  {b.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
