import React, { useState, useRef, useEffect } from 'react';
import {
  Search,
  Heart,
  ShoppingBag,
  MapPin,
  Menu,
  X,
  User,
  ChevronRight,
  Sparkles,
  Tag,
  Leaf,
  Store,
  Info,
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { products } from '../data/products';
import type { Product } from '../types';
import { getLenis } from '../hooks/useGsapScroll';

interface HeaderProps {
  onOpenLocationModal: () => void;
  selectedPostalCode: string;
  onSelectProduct: (product: Product) => void;
  onFilterWishlist: () => void;
  isWishlistFilterActive: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenLocationModal,
  selectedPostalCode,
  onSelectProduct,
  onFilterWishlist,
  isWishlistFilterActive,
}) => {
  const { totalItems, total, setIsCartOpen } = useCart();
  const { wishlistCount } = useWishlist();

  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  const searchContainerRef = useRef<HTMLDivElement>(null);
  const mobileSearchRef = useRef<HTMLDivElement>(null);
  const lastScrollYRef = useRef(0);

  const searchResults = searchQuery.trim()
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.categoryLabel.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  // Scroll detection for smart hide/reveal navbar
  useEffect(() => {
    const handleScroll = (y?: number) => {
      const scrollPos = typeof y === 'number' ? y : window.scrollY;
      setIsScrolled(scrollPos > 15);

      const diff = scrollPos - lastScrollYRef.current;
      if (scrollPos > 120) {
        if (diff > 8 && !isMobileMenuOpen && !isMobileSearchOpen) {
          setIsVisible(false);
        } else if (diff < -8) {
          setIsVisible(true);
        }
      } else {
        setIsVisible(true);
      }

      lastScrollYRef.current = scrollPos;
    };

    window.addEventListener('scroll', () => handleScroll(), { passive: true });
    handleScroll();

    let offLenis: (() => void) | null = null;
    const lenis = getLenis();
    if (lenis) {
      const lenisHandler = ({ scroll }: { scroll: number }) => handleScroll(scroll);
      lenis.on('scroll', lenisHandler);
      offLenis = () => lenis.off('scroll', lenisHandler);
    } else {
      const timer = setTimeout(() => {
        const l = getLenis();
        if (l) {
          const lenisHandler = ({ scroll }: { scroll: number }) => handleScroll(scroll);
          l.on('scroll', lenisHandler);
          offLenis = () => l.off('scroll', lenisHandler);
        }
      }, 150);
      return () => {
        clearTimeout(timer);
        window.removeEventListener('scroll', () => handleScroll());
        if (offLenis) offLenis();
      };
    }

    return () => {
      window.removeEventListener('scroll', () => handleScroll());
      if (offLenis) offLenis();
    };
  }, [isMobileMenuOpen, isMobileSearchOpen]);

  // Click outside search
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      const clickedDesktop = searchContainerRef.current?.contains(target);
      const clickedMobile = mobileSearchRef.current?.contains(target);
      if (!clickedDesktop && !clickedMobile) {
        setIsSearchFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Lock navbar visible when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen || isMobileSearchOpen) {
      setIsVisible(true);
    }
  }, [isMobileMenuOpen, isMobileSearchOpen]);

  const navLinks = [
    { label: 'Shop', href: '#products', icon: Store },
    { label: 'Categories', href: '#categories', icon: Leaf },
    { label: 'Deals', href: '#promotions', icon: Tag, badge: '20% OFF' },
    { label: 'Fresh Picks', href: '#fresh-picks', icon: Sparkles, badge: 'Daily' },
    { label: 'About', href: '#story', icon: Info },
  ];

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ease-in-out transform will-change-transform ${
          isVisible ? 'translate-y-0' : '-translate-y-full'
        } ${
          isScrolled || isMobileMenuOpen || isMobileSearchOpen
            ? 'bg-[#FAF6EF]/95 backdrop-blur-md border-b border-stone-200/80 shadow-xs'
            : 'bg-transparent border-b border-transparent shadow-none'
        }`}
      >
        <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-12">
          <div className="flex items-center justify-between h-16 sm:h-20 gap-3 lg:gap-8 w-full">
            {/* 1. Logo (Left End) */}
            <a
              href="#"
              className="flex items-center gap-2.5 flex-shrink-0 group cursor-pointer"
              aria-label="Varam stores Home"
            >
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#123F32] flex items-center justify-center text-[#D6F36A] shadow-xs group-hover:scale-108 group-hover:rotate-3 transition-transform duration-300">
                <svg
                  className="w-4.5 h-4.5 sm:w-5 sm:h-5 fill-current"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1-2.3A9.49 9.49 0 0 0 12 21a10 10 0 0 0 10-10V3h-8c-4.42 0-8 3.58-8 8v1h2v-1a6 6 0 0 1 6-6h6v3a8 8 0 0 1-8 8c-.68 0-1.35-.07-2-.2 1.34-3.72 3.5-7.8 7-9.8z" />
                </svg>
              </div>
              <span className="font-serif-heading text-xl sm:text-2xl font-bold tracking-tight text-[#18231E] group-hover:text-[#123F32] transition-colors">
                Varam stores
              </span>
            </a>

            {/* 2. Desktop Navigation Links */}
            <nav
              aria-label="Main Navigation"
              className="hidden xl:flex items-center gap-7 text-[14.5px] font-semibold text-[#18231E]"
            >
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-[#18231E] hover:text-[#123F32] transition-colors py-1 nav-link-hover"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* 3. Search Bar (Fluid Center for Desktop) */}
            <div
              ref={searchContainerRef}
              className="relative flex-1 max-w-md lg:max-w-lg hidden md:block"
            >
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  placeholder="Search for fresh fruits, vegetables, dairy..."
                  aria-label="Search products"
                  className={`w-full text-[#18231E] text-xs sm:text-sm placeholder-[#737A72] pl-10 pr-4 py-2.5 rounded-full border focus:outline-none focus:ring-2 focus:ring-[#123F32]/15 focus:border-[#123F32] transition-all ${
                    isScrolled
                      ? 'bg-white/90 border-stone-200/90'
                      : 'bg-white/85 backdrop-blur-xs border-stone-200/80 shadow-2xs hover:bg-white'
                  }`}
                />
                <Search className="w-4 h-4 text-[#737A72] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    aria-label="Clear search"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Instant Search Dropdown (Desktop) */}
              <div
                className={`absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-xl border border-[#E8ECE5] p-3 z-50 max-h-96 overflow-y-auto transition-all duration-200 origin-top transform ${
                  isSearchFocused && searchQuery.trim().length > 0
                    ? 'opacity-100 scale-100 pointer-events-auto'
                    : 'opacity-0 scale-95 pointer-events-none'
                }`}
              >
                <div className="text-xs font-semibold uppercase tracking-wider text-[#737A72] px-3 py-1.5 flex items-center justify-between">
                  <span>Found {searchResults.length} items</span>
                  <span className="text-[11px] text-[#2F7654]">Fresh Daily</span>
                </div>

                {searchResults.length === 0 ? (
                  <div className="text-center py-6 px-4 text-xs text-[#737A72]">
                    No items match &quot;{searchQuery}&quot;. Try &apos;tomatoes&apos; or &apos;bananas&apos;.
                  </div>
                ) : (
                  <div className="divide-y divide-stone-100">
                    {searchResults.map((product) => (
                      <button
                        key={product.id}
                        type="button"
                        onClick={() => {
                          onSelectProduct(product);
                          setIsSearchFocused(false);
                          setSearchQuery('');
                        }}
                        className="w-full flex items-center gap-3 p-2 rounded-xl hover:bg-[#F8F8F2] transition-colors text-left cursor-pointer"
                      >
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-10 h-10 object-cover rounded-lg flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-bold text-[#18231E] truncate">
                            {product.name}
                          </p>
                          <p className="text-[11px] text-[#737A72]">
                            {product.categoryLabel}
                          </p>
                        </div>
                        <span className="text-xs font-bold text-[#123F32]">
                          £{product.price.toFixed(2)}
                        </span>
                        <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* 4. Right Controls */}
            <div className="flex items-center gap-1.5 sm:gap-3 flex-shrink-0">
              {/* Delivery Location (Desktop) */}
              <button
                type="button"
                onClick={onOpenLocationModal}
                className={`hidden lg:flex items-center gap-2 px-3.5 py-1.5 text-xs font-medium text-[#18231E] hover:text-[#123F32] rounded-full border transition-all hover:scale-103 cursor-pointer ${
                  isScrolled
                    ? 'bg-white/80 border-stone-200'
                    : 'bg-white/85 backdrop-blur-xs border-stone-200/80 shadow-2xs hover:bg-white'
                }`}
                title="Change Delivery Location"
              >
                <MapPin className="w-3.5 h-3.5 text-[#2F7654]" />
                <div className="text-left leading-tight">
                  <span className="text-[9px] text-[#737A72] block">Deliver to</span>
                  <span className="font-bold text-[11px]">{selectedPostalCode}</span>
                </div>
              </button>

              {/* Mobile Search Toggle Icon */}
              <button
                type="button"
                onClick={() => {
                  setIsMobileSearchOpen(!isMobileSearchOpen);
                  if (isMobileMenuOpen) setIsMobileMenuOpen(false);
                }}
                className={`md:hidden p-2 rounded-full transition-colors cursor-pointer ${
                  isMobileSearchOpen
                    ? 'bg-[#123F32] text-white'
                    : 'text-stone-700 hover:text-[#123F32] hover:bg-black/5'
                }`}
                aria-label="Toggle Search"
              >
                <Search className="w-4.5 h-4.5" />
              </button>

              {/* Account Icon (Desktop) */}
              <button
                type="button"
                className="p-2 text-stone-700 hover:text-[#123F32] hover:bg-white/90 rounded-full transition-all hover:scale-110 active:scale-95 cursor-pointer hidden sm:block"
                aria-label="User Account"
              >
                <User className="w-4.5 h-4.5" />
              </button>

              {/* Wishlist Icon */}
              <button
                type="button"
                onClick={onFilterWishlist}
                className={`relative p-2 rounded-full transition-all hover:scale-110 active:scale-95 cursor-pointer ${
                  isWishlistFilterActive
                    ? 'text-rose-600 bg-rose-50'
                    : 'text-stone-700 hover:text-[#123F32] hover:bg-white/90'
                }`}
                aria-label="Wishlist"
                title={
                  isWishlistFilterActive
                    ? 'Showing saved items (Click to clear)'
                    : 'View Saved Wishlist'
                }
              >
                <Heart className="w-4.5 h-4.5" />
                {wishlistCount > 0 && (
                  <span className="absolute top-0.5 right-0.5 w-3.5 h-3.5 rounded-full bg-[#123F32] text-[#D6F36A] text-[9px] font-bold flex items-center justify-center border border-white">
                    {wishlistCount}
                  </span>
                )}
              </button>

              {/* Shopping Basket Pill Button */}
              <button
                type="button"
                onClick={() => setIsCartOpen(true)}
                className="btn-magnetic flex items-center gap-2 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-full bg-[#123F32] text-white hover:bg-[#1B5746] transition-all shadow-xs hover:shadow-md cursor-pointer group"
                aria-label={`Shopping basket with ${totalItems} items`}
              >
                <div className="relative">
                  <ShoppingBag className="w-4 h-4 text-[#D6F36A] group-hover:scale-110 transition-transform" />
                  {totalItems > 0 && (
                    <span className="absolute -top-1.5 -right-2 w-3.5 h-3.5 rounded-full bg-[#D6F36A] text-[#123F32] text-[9px] font-extrabold flex items-center justify-center">
                      {totalItems}
                    </span>
                  )}
                </div>
                <span className="font-bold text-xs sm:text-sm tracking-tight">
                  £{total.toFixed(2)}
                </span>
              </button>

              {/* Mobile Hamburger / Close Button */}
              <button
                type="button"
                onClick={() => {
                  setIsMobileMenuOpen(!isMobileMenuOpen);
                  if (isMobileSearchOpen) setIsMobileSearchOpen(false);
                }}
                className="xl:hidden w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-stone-700 hover:text-[#123F32] hover:bg-black/5 transition-all cursor-pointer relative"
                aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              >
                <div
                  className={`transition-transform duration-300 transform ${
                    isMobileMenuOpen ? 'rotate-90 scale-105 text-[#123F32]' : 'rotate-0'
                  }`}
                >
                  {isMobileMenuOpen ? (
                    <X className="w-5 h-5 stroke-[2.4]" />
                  ) : (
                    <Menu className="w-5 h-5 stroke-[2.2]" />
                  )}
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Search Bar Expandable Drawer */}
        <div
          ref={mobileSearchRef}
          className={`md:hidden overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isMobileSearchOpen ? 'max-h-24 opacity-100 px-4 pb-3' : 'max-h-0 opacity-0 px-4 pb-0 pointer-events-none'
          }`}
        >
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              placeholder="Search produce, bakery, eggs..."
              aria-label="Search products"
              className="w-full bg-white text-xs pl-9 pr-8 py-2.5 rounded-full border border-stone-200/90 focus:outline-none focus:ring-2 focus:ring-[#123F32]/15 focus:border-[#123F32] shadow-2xs"
            />
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                aria-label="Clear search"
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 p-1 cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Floating Mobile Navigation Card (Clean, modern iOS-style floating modal sheet) */}
        <div
          className={`xl:hidden overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isMobileMenuOpen
              ? 'max-h-[460px] opacity-100 px-3 sm:px-4 pb-4'
              : 'max-h-0 opacity-0 px-3 sm:px-4 pb-0 pointer-events-none'
          }`}
        >
          <div className="bg-white/95 backdrop-blur-xl border border-stone-200/80 rounded-3xl shadow-xl p-4 flex flex-col gap-1.5">
            {navLinks.map((link, idx) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  style={{
                    transitionDelay: isMobileMenuOpen ? `${idx * 30}ms` : '0ms',
                  }}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-[#18231E] hover:text-[#123F32] hover:bg-[#F0F5EC] transition-all duration-200 group ${
                    isMobileMenuOpen
                      ? 'translate-y-0 opacity-100'
                      : 'translate-y-2 opacity-0'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-xl bg-stone-100 flex items-center justify-center text-stone-600 group-hover:bg-[#123F32] group-hover:text-[#D6F36A] transition-colors">
                      <Icon className="w-4 h-4" />
                    </span>
                    <span className="font-semibold text-sm">{link.label}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    {link.badge && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-[#D6F36A] text-[#123F32]">
                        {link.badge}
                      </span>
                    )}
                    <ChevronRight className="w-4 h-4 text-stone-400 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </a>
              );
            })}

            {/* Delivery address button inside mobile menu */}
            <div className="pt-2 mt-1 border-t border-stone-100">
              <button
                type="button"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenLocationModal();
                }}
                className="w-full flex items-center justify-between px-3.5 py-2 rounded-2xl bg-stone-50 hover:bg-[#F0F5EC] text-xs font-semibold text-[#18231E] transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <MapPin className="w-4 h-4 text-[#2F7654]" />
                  <span>Deliver to: <strong className="text-[#123F32]">{selectedPostalCode}</strong></span>
                </div>
                <span className="text-[11px] font-bold text-[#2F7654] hover:underline">Change</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Gentle Click-Away Overlay (Non-blurry, subtle soft scrim) */}
      <div
        className={`fixed inset-0 top-16 sm:top-20 bg-black/15 z-30 xl:hidden transition-opacity duration-300 ${
          isMobileMenuOpen || isMobileSearchOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => {
          setIsMobileMenuOpen(false);
          setIsMobileSearchOpen(false);
        }}
      />
    </>
  );
};
