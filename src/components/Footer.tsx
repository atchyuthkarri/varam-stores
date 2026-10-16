import React, { useState } from 'react';
import {
  Sprout,
  ShieldCheck,
  ArrowRight,
  MapPin,
  Mail,
  Phone,
  Clock,
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useNavigation } from '../context/NavigationContext';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const { showToast } = useCart();
  const { goToShop, scrollToSection } = useNavigation();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim() || !emailRegex.test(email)) {
      showToast('Please enter a valid email address');
      return;
    }
    setIsSubscribed(true);
    showToast('Subscribed! Use code FRESH20 for 20% off your next order.');
    setEmail('');
  };

  const shopLinks = [
    { label: 'All Aisles', action: () => goToShop({ category: 'all' }) },
    { label: 'Vegetables & Fruits', action: () => goToShop({ category: 'vegetables-fruits' }) },
    { label: 'Rice & Millets', action: () => goToShop({ category: 'rice-millets' }) },
    { label: 'Spices & Masalas', action: () => goToShop({ category: 'spices-masala' }) },
    { label: 'Lentils & Pulses', action: () => goToShop({ category: 'lentils-pulses' }) },
    { label: 'Atta & Flours', action: () => goToShop({ category: 'atta-flours' }) },
    { label: 'Sweets & Snacks', action: () => goToShop({ category: 'sweets-snacks' }) },
    { label: 'Pooja Essentials', action: () => goToShop({ category: 'pooja-essentials' }) },
  ];

  const companyLinks = [
    { label: 'About Us', action: () => scrollToSection('story') },
    { label: 'Our Story', action: () => scrollToSection('story') },
    { label: 'Sustainability', action: () => showToast('Our packaging is 100% compostable and certified.') },
    { label: 'Careers', action: () => showToast('FreshMart is growing! Send CVs to careers@freshmart.co.uk') },
    { label: 'Press & Media', action: () => showToast('For media inquiries: press@freshmart.co.uk') },
  ];

  const helpLinks = [
    { label: 'Track Order', href: '#track' },
    { label: 'Returns & Refunds', href: '#returns' },
    { label: 'Shipping Information', href: '#shipping' },
    { label: 'FAQs', href: '#faq' },
    { label: 'Contact Us', href: '#contact' },
    { label: 'Size Guide', href: '#guide' },
    { label: 'Health & Nutrition Tips', href: '#tips' },
  ];

  return (
    <footer className="w-full bg-white text-[#18181B] border-t border-stone-200/80">
      {/* ========================================================================= */}
      {/* 1. TOP NEWSLETTER BANNER (STAY FRESH WITH EXCLUSIVE UPDATES) */}
      {/* ========================================================================= */}
      <section className="relative w-full bg-white border-b border-stone-200/80 overflow-hidden py-10 sm:py-12 lg:py-14 opacity-100">
        {/* Right Photographic Culinary Herbs Image (Desktop Only to protect mobile typography contrast) */}
        <div className="hidden lg:block absolute right-0 top-0 bottom-0 h-full w-full lg:w-1/2 pointer-events-none overflow-hidden select-none">
          <img
            src="/footer-herbs-clean.png"
            alt="Fresh aromatic basil, rosemary and mint herbs"
            className="absolute right-0 top-1/2 -translate-y-1/2 h-full w-auto max-w-none object-contain object-right opacity-90 sm:opacity-100"
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-6 xl:col-span-7 flex flex-col items-start">
              {/* Eyebrow with Sprout Icon */}
              <div className="inline-flex items-center gap-2 mb-2.5">
                <span className="w-5 h-5 rounded-full bg-[#F8BE17] flex items-center justify-center text-[#18181B]">
                  <Sprout className="w-3.5 h-3.5" />
                </span>
                <span className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-[#18181B]">
                  Stay Connected
                </span>
              </div>

              {/* Headline */}
              <h2 className="font-serif-heading font-bold text-3xl sm:text-4xl lg:text-[42px] text-[#18181B] leading-[1.12] tracking-tight mb-3">
                Stay Fresh with <br />
                <span className="italic font-normal text-[#18181B]">Exclusive Updates</span>
              </h2>

              {/* Subtitle */}
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed max-w-lg">
                Get seasonal offers, new arrivals, healthy living tips and stories
                from our farmers — straight to your inbox.
              </p>
            </div>

            {/* Right Form Column */}
            <div className="lg:col-span-6 xl:col-span-5 flex flex-col items-start lg:items-end">
              <form onSubmit={handleSubscribe} className="w-full max-w-lg">
                <div className="flex items-center bg-white rounded-full p-1.5 border border-stone-300/80 shadow-sm hover:border-stone-400/80 focus-within:border-[#F5D103] focus-within:ring-2 focus-within:ring-[#F5D103]/30 transition-all">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="w-full bg-transparent px-4 py-2.5 text-xs sm:text-sm text-[#18181B] placeholder-stone-400 focus:outline-none"
                    aria-label="Enter your email address for newsletter updates"
                  />

                  <button
                    type="submit"
                    className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-full bg-[#F5D103] hover:bg-[#E5A800] text-[#18181B] text-xs sm:text-sm font-extrabold transition-all shadow-xs shrink-0 cursor-pointer group btn-magnetic"
                  >
                    <span>{isSubscribed ? 'Subscribed' : 'Subscribe'}</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>

                {/* Trust / Anti-Spam Guarantee */}
                <div className="flex items-center gap-2 mt-2.5 pl-3 text-[11px] sm:text-xs text-stone-500">
                  <ShieldCheck className="w-4 h-4 text-[#18181B] shrink-0" />
                  <span>No spam. Only fresh updates. You can unsubscribe anytime.</span>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. MAIN 6-COLUMN FOOTER NAVIGATION */}
      {/* ========================================================================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-10">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-12 gap-8 lg:gap-6 pb-12 border-b border-stone-200/80">
          {/* Column 1: Brand & Socials (lg:col-span-4) */}
          <div className="col-span-2 md:col-span-3 lg:col-span-4 flex flex-col items-start pr-0 lg:pr-6">
            <a href="#" className="inline-flex items-center gap-2.5 mb-3 group" aria-label="Varam Foods Home">
              <img
                src="/varam-logo.png"
                alt="Varam Foods"
                className="h-10 w-auto object-contain group-hover:scale-105 transition-transform duration-200"
              />
            </a>

            <p className="text-xs text-stone-600 leading-relaxed mb-4 max-w-sm">
              <strong className="text-[#18181B]">Good food. Brighter days.</strong>
              <br />
              Fresh groceries, everyday essentials and more delivered to your door. Healthy living made simple.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-2 text-stone-700 mt-1">
              {/* Instagram */}
              <a
                href="#social"
                className="w-8 h-8 rounded-full bg-stone-100 hover:bg-[#F5D103] hover:text-[#18181B] hover:text-white flex items-center justify-center border border-stone-200/60 shadow-2xs transition-colors"
                aria-label="Instagram"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>

              {/* Facebook */}
              <a
                href="#social"
                className="w-8 h-8 rounded-full bg-stone-100 hover:bg-[#F5D103] hover:text-[#18181B] hover:text-white flex items-center justify-center border border-stone-200/60 shadow-2xs transition-colors"
                aria-label="Facebook"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>

              {/* YouTube */}
              <a
                href="#social"
                className="w-8 h-8 rounded-full bg-stone-100 hover:bg-[#F5D103] hover:text-[#18181B] hover:text-white flex items-center justify-center border border-stone-200/60 shadow-2xs transition-colors"
                aria-label="YouTube"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>

              {/* X Twitter */}
              <a
                href="#social"
                className="w-8 h-8 rounded-full bg-stone-100 hover:bg-[#F5D103] hover:text-[#18181B] hover:text-white flex items-center justify-center border border-stone-200/60 shadow-2xs transition-colors"
                aria-label="X Twitter"
              >
                <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>

              {/* LinkedIn */}
              <a
                href="#social"
                className="w-8 h-8 rounded-full bg-stone-100 hover:bg-[#F5D103] hover:text-[#18181B] hover:text-white flex items-center justify-center border border-stone-200/60 shadow-2xs transition-colors"
                aria-label="LinkedIn"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2: Shop (lg:col-span-2) */}
          <div className="lg:col-span-2">
            <h3 className="text-sm font-bold text-[#18181B] tracking-tight mb-3.5">
              Shop
            </h3>
            <ul className="space-y-2 text-xs text-stone-600">
              {shopLinks.map((link, idx) => (
                <li key={idx}>
                  <button
                    type="button"
                    onClick={link.action}
                    className="hover:text-[#B45309] hover:underline transition-colors text-left cursor-pointer"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Company (lg:col-span-2) */}
          <div className="lg:col-span-2">
            <h3 className="text-sm font-bold text-[#18181B] tracking-tight mb-3.5">
              Company
            </h3>
            <ul className="space-y-2 text-xs text-stone-600">
              {companyLinks.map((link, idx) => (
                <li key={idx}>
                  <button
                    type="button"
                    onClick={link.action}
                    className="hover:text-[#B45309] hover:underline transition-colors text-left cursor-pointer"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Help (lg:col-span-2) */}
          <div className="lg:col-span-2">
            <h3 className="text-sm font-bold text-[#18181B] tracking-tight mb-3.5">
              Help
            </h3>
            <ul className="space-y-2 text-xs text-stone-600">
              {helpLinks.map((link, idx) => (
                <li key={idx}>
                  <a href={link.href} className="hover:text-[#B45309] hover:underline transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 5: Contact (lg:col-span-2) */}
          <div className="lg:col-span-2">
            <h3 className="text-sm font-bold text-[#18181B] tracking-tight mb-3.5">
              Contact
            </h3>
            <ul className="space-y-3 text-xs text-stone-600">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#18181B] shrink-0 mt-0.5" />
                <span>Hatfield, AL10, UK</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-[#18181B] shrink-0 mt-0.5" />
                <a href="mailto:support@freshmart.co.uk" className="hover:text-[#B45309] hover:underline transition-colors">
                  support@freshmart.co.uk
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-[#18181B] shrink-0 mt-0.5" />
                <a href="tel:+441234567890" className="hover:text-[#B45309] hover:underline transition-colors">
                  +44 1234 567890
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-[#18181B] shrink-0 mt-0.5" />
                <div className="leading-tight">
                  <p>Mon - Sat: 8AM - 8PM</p>
                  <p className="text-stone-500 mt-0.5">Sun: 9AM - 6PM</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 3. BOTTOM COPYRIGHT & LEGAL BAR */}
        {/* ========================================================================= */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <p>© 2026 Varam Foods. All rights reserved.</p>

          <div className="flex items-center gap-4 sm:gap-6 text-stone-500">
            <a href="#privacy" className="hover:text-[#B45309] hover:underline transition-colors">
              Privacy Policy
            </a>
            <span className="text-stone-300">|</span>
            <a href="#terms" className="hover:text-[#B45309] hover:underline transition-colors">
              Terms of Service
            </a>
            <span className="text-stone-300">|</span>
            <a href="#cookies" className="hover:text-[#B45309] hover:underline transition-colors">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
