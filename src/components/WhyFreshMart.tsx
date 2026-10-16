import React from 'react';
import { Truck, Sprout, ShoppingBag, ShieldCheck } from 'lucide-react';

export const WhyFreshMart: React.FC = () => {
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
    <section className="py-16 sm:py-20 bg-white border-y border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with handwritten accent */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-14">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#B45309] block mb-1">
              The FreshMart Promise
            </span>
            <h2 className="font-serif-heading text-3xl sm:text-4xl text-[#18181B] font-bold">
              Why Choose FreshMart?
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <span className="font-script-accent text-2xl sm:text-3xl text-[#B45309] font-medium -rotate-2">
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
                className="bg-white rounded-2xl p-6 border border-stone-200 hover:border-[#F5D103] hover:shadow-md transition-all duration-200 flex flex-col items-start"
              >
                <div className="w-12 h-12 rounded-xl bg-white border border-stone-200 text-[#18181B] flex items-center justify-center mb-5 shadow-2xs">
                  <Icon className="w-6 h-6 text-[#B45309]" />
                </div>
                <h3 className="text-base font-bold text-[#18181B] mb-2">
                  {b.title}
                </h3>
                <p className="text-sm text-stone-600 leading-relaxed font-normal">
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

export const WhyVaramStores = WhyFreshMart;
