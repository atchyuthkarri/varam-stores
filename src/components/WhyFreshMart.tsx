import React from 'react';
import { Truck, Sprout, ShoppingBag, ShieldCheck } from 'lucide-react';
import { useNavigation } from '../context/NavigationContext';
import { Link001 } from './ui/skiper40';

export const WhyFreshMart: React.FC = () => {
  const { goToShop, goToStory } = useNavigation();

  const benefits = [
    {
      icon: Truck,
      title: 'Same-day Delivery',
      desc: 'Swift, temperature-controlled delivery straight to your doorstep across Hertfordshire.',
      cta: 'Check 2hr time slots',
      action: () => goToShop({ category: 'all' }),
    },
    {
      icon: Sprout,
      title: '100% Fresh Produce',
      desc: 'Harvested directly from certified local growers and ethical organic farms.',
      cta: 'Browse fresh harvest',
      action: () => goToShop({ category: 'vegetables-fruits' }),
    },
    {
      icon: ShoppingBag,
      title: 'Wide Selection',
      desc: 'Over 10,000 curated items spanning pantry staples, authentic spices, and daily essentials.',
      cta: 'Explore all 12 aisles',
      action: () => goToShop({ category: 'all' }),
    },
    {
      icon: ShieldCheck,
      title: 'Ethical Quality Guarantee',
      desc: 'Transparent sourcing and 100% money-back freshness guarantee on every order.',
      cta: 'Read our standards',
      action: () => goToStory(),
    },
  ];

  return (
    <section className="py-16 sm:py-20 bg-white border-y border-stone-200">
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-10 2xl:px-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-14">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#B45309] block mb-1">
              The Varam Foods Promise
            </span>
            <h2 className="text-3xl sm:text-4xl text-[#18181B] font-extrabold tracking-tight">
              Why Choose Varam Foods?
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm sm:text-base text-stone-500 font-medium">
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
                className="bg-[#F8FAFC] rounded-2xl p-6 border border-stone-200 hover:border-[#F5D103] hover:shadow-md transition-all duration-200 flex flex-col items-start justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-white border border-stone-200 text-[#18181B] flex items-center justify-center mb-5 shadow-2xs">
                    <Icon className="w-6 h-6 text-[#B45309]" />
                  </div>
                  <h3 className="text-base font-bold text-[#18181B] mb-2">
                    {b.title}
                  </h3>
                  <p className="text-sm text-stone-600 leading-relaxed font-normal mb-5">
                    {b.desc}
                  </p>
                </div>
                <Link001
                  onClick={b.action}
                  className="text-xs font-bold text-[#B45309] hover:text-[#D97706] transition-colors"
                >
                  {b.cta}
                </Link001>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export const WhyVaramStores = WhyFreshMart;
