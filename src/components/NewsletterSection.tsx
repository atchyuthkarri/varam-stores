import React, { useState } from 'react';
import { Mail, Check, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const NewsletterSection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const { showToast } = useCart();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMsg('Please enter a valid email address');
      return;
    }

    setStatus('loading');
    setTimeout(() => {
      setStatus('success');
      showToast('Thank you for subscribing! Your 20% discount code is FRESH20.');
      setEmail('');
    }, 800);
  };

  return (
    <section className="py-12 sm:py-16 bg-[#F5D103] text-[#18181B] relative overflow-hidden">
      {/* Background botanical foliage ambiance */}
      <div className="absolute left-0 top-0 bottom-0 w-64 bg-gradient-to-r from-[#B45309]/40 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
          {/* Left Text */}
          <div className="max-w-xl text-center lg:text-left">
            <span className="text-[11px] font-black uppercase tracking-widest text-[#18181B]/80 block mb-2">
              Stay Updated
            </span>

            <h2 className="font-serif-heading text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#18181B] leading-tight mb-2">
              Fresh Deals, New Arrivals &amp; Healthy Living Tips
            </h2>

            <p className="text-xs sm:text-sm text-[#18181B]/80 font-medium">
              Receive seasonal recipes, farm harvests, and members-only weekend discounts.
            </p>
          </div>

          {/* Form & Script Annotation */}
          <div className="w-full lg:max-w-md">
            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative flex items-center bg-white rounded-full p-1.5 shadow-lg border border-black/10">
                <Mail className="w-4 h-4 text-stone-500 ml-3 pointer-events-none" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errorMsg) setErrorMsg('');
                  }}
                  placeholder="Enter your email address"
                  disabled={status === 'loading'}
                  className="w-full bg-transparent text-sm text-[#18181B] placeholder-stone-500 pl-3 pr-2 py-2 focus:outline-none"
                  aria-label="Email for newsletter"
                />

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="px-5 py-2.5 rounded-full bg-[#18181B] hover:bg-stone-800 text-[#F5D103] text-xs sm:text-sm font-extrabold flex items-center gap-1.5 transition-all flex-shrink-0 shadow-xs cursor-pointer active:scale-95"
                >
                  {status === 'loading' ? (
                    <span>Subscribing...</span>
                  ) : status === 'success' ? (
                    <>
                      <Check className="w-4 h-4 text-[#F5D103]" />
                      <span>Subscribed</span>
                    </>
                  ) : (
                    <>
                      <span>Subscribe</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#F5D103]" />
                    </>
                  )}
                </button>
              </div>

              {errorMsg && (
                <p className="text-xs text-rose-700 font-bold pl-4">{errorMsg}</p>
              )}

              <div className="flex items-center justify-between px-3 pt-1">
                <span className="text-[11px] text-[#18181B]/70 font-semibold">
                  Unsubscribe anytime with one click.
                </span>

                <span className="font-script-accent text-xl text-[#18181B] font-bold hidden sm:inline">
                  Good Food, Good Mood ✨
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
