import React from 'react';
import { Truck, ShieldCheck, Layers, Lock } from 'lucide-react';

export const TrustBar: React.FC = () => {
  const trustItems = [
    {
      icon: Truck,
      title: 'Same-day Delivery',
      subtitle: 'Get your groceries fast',
    },
    {
      icon: ShieldCheck,
      title: 'Quality Guaranteed',
      subtitle: '100% fresh or your money back',
    },
    {
      icon: Layers,
      title: 'Wide Selection',
      subtitle: '10,000+ products',
    },
    {
      icon: Lock,
      title: 'Secure Payments',
      subtitle: 'Safe & encrypted checkout',
    },
  ];

  return (
    <section className="gsap-trust-bar py-8 bg-white">
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-10 2xl:px-12">
        <div className="bg-white rounded-2xl border border-stone-200 p-5 sm:p-6 shadow-sm">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {trustItems.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="gsap-trust-item group flex items-center gap-3.5 cursor-pointer">
                  <div className="w-10 h-10 rounded-xl bg-white border border-stone-200 flex items-center justify-center text-[#B45309] flex-shrink-0 shadow-2xs group-hover:scale-110 group-hover:bg-amber-100 transition-all duration-300">
                    <Icon className="w-5 h-5 text-[#B45309]" />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-[#18181B] group-hover:text-[#B45309] transition-colors">
                      {item.title}
                    </h4>
                    <p className="text-[11px] text-stone-600 font-medium">
                      {item.subtitle}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
