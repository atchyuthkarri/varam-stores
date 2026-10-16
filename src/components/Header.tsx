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
  Tag,
  Store,
  Info,
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useNavigation } from '../context/NavigationContext';
import { products } from '../data/products';
import type { Product } from '../types';
import { getLenis } from '../hooks/useGsapScroll';
import { motion, AnimatePresence } from 'framer-motion';
import { dropdownVariants, badgePopVariants } from '../motion/variants';

interface HeaderProps {
  onOpenLocationModal: () => void;
  selectedPostalCode: string;
  onSelectProduct: (product: Product) => void;
  onOpenAccountModal?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenLocationModal,
  selectedPostalCode,
  onSelectProduct,
  onOpenAccountModal,
}) => {
  const { totalItems, total, setIsCartOpen } = useCart();
  const { wishlistCount } = useWishlist();
  const { currentView, filterOnSale, goToHome, goToShop, goToWishlist, goToAccount, scrollToSection } = useNavigation();

  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const searchContainerRef = useRef<HTMLDivElement>(null);
  const mobileSearchRef = useRef<HTMLDivElement>(null);

  const searchResults = searchQuery.trim()
    ? products
        .filter(
          (p) =>
            p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.categoryLabel.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.description.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .slice(0, 6)
    : [];

  const handleSearchSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (searchQuery.trim()) {
      goToShop({ search: searchQuery.trim() });
      setIsSearchFocused(false);
      setIsMobileSearchOpen(false);
    }
  };

  // Track scroll position for subtle backdrop blur/border styling
  useEffect(() => {
    const handleScroll = (y?: number) => {
      const scrollPos = typeof y === 'number' ? y : window.scrollY;
      setIsScrolled(scrollPos > 10);
    };

    window.addEventListener('scroll', () => handleScroll(), { passive: true });
    handleScroll();

    let offLenis: (() => void) | null = null;
    const lenis = getLenis();
    if (lenis) {
      const lenisHandler = ({ scroll }: { scroll: number }) => handleScroll(scroll);
      lenis.on('scroll', lenisHandler);
      offLenis = () => lenis.off('scroll', lenisHandler);
    }

    return () => {
      window.removeEventListener('scroll', () => handleScroll());
      if (offLenis) offLenis();
    };
  }, []);

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

  const navLinks: {
    label: string;
    action: () => void;
    icon: React.ComponentType<{ className?: string }>;
    active?: boolean;
    badge?: string;
  }[] = [
    {
      label: 'Home',
      action: () => goToHome(),
      icon: Store,
      active: currentView === 'home',
    },
    {
      label: 'Shop',
      action: () => goToShop({ category: 'all', filterOnSale: false, search: '' }),
      icon: Store,
      active: currentView === 'shop' && !filterOnSale,
    },
    {
      label: 'Deals',
      action: () => goToShop({ category: 'all', filterOnSale: true, search: '' }),
      icon: Tag,
      active: currentView === 'shop' && filterOnSale,
      badge: '20% OFF',
    },
    {
      label: 'Our Story',
      action: () => scrollToSection('story'),
      icon: Info,
    },
    {
      label: 'My Account',
      action: () => (onOpenAccountModal ? onOpenAccountModal() : goToAccount()),
      icon: User,
      active: currentView === 'account',
    },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 w-full z-50 transition-colors duration-200 ${
          isScrolled || isMobileMenuOpen || isMobileSearchOpen
            ? 'bg-white/95 backdrop-blur-md border-b border-stone-200/80 shadow-xs'
            : 'bg-white/95 backdrop-blur-md border-b border-stone-200/70 shadow-2xs'
        }`}
      >
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16 gap-3 lg:gap-6 w-full min-w-0">
            {/* 1. Logo & Mobile Hamburger */}
            <div className="flex items-center gap-1.5 sm:gap-2.5 min-w-0 shrink-0">
              {/* Mobile Hamburger Button */}
              <button
                type="button"
                onClick={() => {
                  setIsMobileMenuOpen(!isMobileMenuOpen);
                  if (isMobileSearchOpen) setIsMobileSearchOpen(false);
                }}
                className="lg:hidden p-1.5 -ml-1 rounded-full flex items-center justify-center text-stone-800 hover:text-[#B45309] hover:bg-black/5 transition-all cursor-pointer relative shrink-0"
                aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              >
                <div
                  className={`transition-transform duration-300 transform ${
                    isMobileMenuOpen ? 'rotate-90 scale-105 text-[#18181B]' : 'rotate-0'
                  }`}
                >
                  {isMobileMenuOpen ? (
                    <X className="w-5 h-5 stroke-[2.2]" />
                  ) : (
                    <Menu className="w-5 h-5 stroke-[2.2]" />
                  )}
                </div>
              </button>

              {/* Brand Logo & Name */}
              <button
                type="button"
                onClick={goToHome}
                className="flex items-center group cursor-pointer focus:outline-none py-1"
                aria-label="Varam Foods Home"
              >
                <img
                  src="/varam-logo.png"
                  alt="Varam Foods"
                  className="h-7 sm:h-8.5 w-auto object-contain group-hover:scale-105 transition-transform duration-200 drop-shadow-xs"
                />
              </button>
            </div>

            {/* 2. Desktop Navigation Links */}
            <nav
              aria-label="Main Navigation"
              className="hidden lg:flex items-center gap-5 xl:gap-6 text-xs font-semibold text-[#18181B]"
            >
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  type="button"
                  onClick={link.action}
                  className={`py-1 nav-link-hover transition-colors cursor-pointer ${
                    link.active
                      ? 'text-[#18181B] font-bold'
                      : 'text-[#556059] hover:text-[#B45309]'
                  }`}
                >
                  <span>{link.label}</span>
                </button>
              ))}
            </nav>

            {/* 3. Search Bar (Fluid Center for Desktop) */}
            <div
              ref={searchContainerRef}
              className="relative flex-1 max-w-sm lg:max-w-md xl:max-w-xl mx-2 lg:mx-4 hidden md:block"
            >
              <form onSubmit={handleSearchSubmit} className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  placeholder="Search fresh grocery..."
                  aria-label="Search products"
                  className="w-full text-[#18181B] text-xs placeholder-[#737A72] pl-8 pr-7 py-1.5 rounded-full border border-stone-200/80 bg-white/70 hover:bg-white focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#F5D103]/40 focus:border-[#F5D103] transition-all"
                />
                <Search className="w-3.5 h-3.5 text-[#737A72] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    aria-label="Clear search"
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 cursor-pointer"
                  >
                    <X className="w-3 h-3" />
                  </button>
                )}
              </form>

              {/* Instant Search Dropdown (Desktop) Animated */}
              <AnimatePresence>
                {isSearchFocused && searchQuery.trim().length > 0 && (
                  <motion.div
                    variants={dropdownVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-xl border border-[#E8ECE5] p-3 z-50 max-h-96 overflow-y-auto origin-top"
                  >
                    <div className="text-xs font-semibold uppercase tracking-wider text-[#737A72] px-3 py-1.5 flex items-center justify-between">
                      <span>Found {searchResults.length} matches</span>
                      <button
                        type="button"
                        onClick={() => handleSearchSubmit()}
                        className="text-[11px] text-[#B45309] font-bold hover:underline cursor-pointer"
                      >
                        View All in Catalogue →
                      </button>
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
                            className="w-full flex items-center gap-3 p-2 rounded-xl hover:bg-[#F8FAFC] transition-colors text-left cursor-pointer active:scale-98"
                          >
                            <img
                              src={product.image}
                              alt={product.name}
                              className="w-10 h-10 object-cover rounded-lg flex-shrink-0 bg-stone-50"
                            />
                            <div className="flex-1 min-w-0">
                              <p className="text-xs font-bold text-[#18181B] truncate">
                                {product.name}
                              </p>
                              <p className="text-[11px] text-[#737A72]">
                                {product.categoryLabel}
                              </p>
                            </div>
                            <span className="text-xs font-bold text-[#18181B]">
                              £{product.price.toFixed(2)}
                            </span>
                            <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
                          </button>
                        ))}
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* 4. Right Controls */}
            <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
              {/* Delivery Location (Desktop) */}
              <button
                type="button"
                onClick={onOpenLocationModal}
                className="hidden xl:flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-medium text-[#556059] hover:text-[#B45309] rounded-full border border-stone-200/70 bg-white/60 hover:bg-white transition-colors cursor-pointer"
                title="Change Delivery Location"
              >
                <MapPin className="w-3 h-3 text-[#B45309]" />
                <span className="truncate max-w-[100px]">{selectedPostalCode}</span>
              </button>

              {/* Mobile Right Icons */}
              <div className="flex md:hidden items-center gap-0.5">
                {/* Mobile Search Icon */}
                <button
                  type="button"
                  onClick={() => {
                    setIsMobileSearchOpen(!isMobileSearchOpen);
                    if (isMobileMenuOpen) setIsMobileMenuOpen(false);
                  }}
                  className={`p-1.5 rounded-full transition-colors cursor-pointer text-[#18181B] hover:text-[#B45309] ${
                    isMobileSearchOpen ? 'bg-black/5 text-[#18181B]' : ''
                  }`}
                  aria-label="Toggle Search"
                >
                  <Search className="w-4.5 h-4.5 stroke-[2]" />
                </button>

                {/* Mobile Account Icon */}
                <button
                  type="button"
                  onClick={onOpenAccountModal || goToAccount}
                  className={`p-1.5 rounded-full transition-colors cursor-pointer ${
                    currentView === 'account'
                      ? 'text-[#245E4A] bg-[#245E4A]/10'
                      : 'text-[#18181B] hover:text-[#B45309]'
                  }`}
                  aria-label="User Account"
                >
                  <User className="w-4.5 h-4.5 stroke-[2]" />
                </button>

                {/* Mobile Shopping Cart with Round Badge */}
                <button
                  type="button"
                  id="mobile-header-cart-btn"
                  data-cart-btn="true"
                  onClick={() => setIsCartOpen(true)}
                  className="relative p-1.5 rounded-full transition-transform active:scale-95 cursor-pointer text-[#18181B] hover:text-[#B45309]"
                  aria-label={`Shopping basket with ${totalItems} items`}
                >
                  <ShoppingBag className="w-4.5 h-4.5 stroke-[2]" />
                  <AnimatePresence mode="popLayout">
                    {totalItems > 0 && (
                      <motion.span
                        key={`mobile-cart-${totalItems}`}
                        variants={badgePopVariants}
                        initial="initial"
                        animate="animate"
                        className="absolute top-0 right-0 w-3.5 h-3.5 rounded-full bg-[#18181B] text-[#F5D103] text-[8.5px] font-bold flex items-center justify-center border border-white shadow-2xs"
                      >
                        {totalItems}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </button>
              </div>

              {/* Desktop Right Controls (Tablet & Up) */}
              <div className="hidden md:flex items-center gap-1.5">
                {/* Desktop Account Icon */}
                <button
                  type="button"
                  onClick={onOpenAccountModal || goToAccount}
                  className={`p-1.5 rounded-full transition-colors cursor-pointer active:scale-90 ${
                    currentView === 'account'
                      ? 'text-[#245E4A] bg-[#245E4A]/10 ring-1 ring-[#245E4A]/20'
                      : 'text-stone-600 hover:text-[#B45309] hover:bg-stone-100/70'
                  }`}
                  aria-label="User Account Profile"
                  title="My Account & Orders"
                >
                  <User className="w-4 h-4" />
                </button>

                {/* Wishlist Icon */}
                <button
                  type="button"
                  onClick={() => goToWishlist()}
                  className={`relative p-1.5 rounded-full transition-colors cursor-pointer active:scale-90 ${
                    currentView === 'wishlist'
                      ? 'text-rose-600 bg-rose-50'
                      : 'text-stone-600 hover:text-[#B45309] hover:bg-stone-100/70'
                  }`}
                  aria-label="Wishlist"
                  title="View Saved Wishlist"
                >
                  <Heart className={`w-4 h-4 ${currentView === 'wishlist' ? 'fill-current' : ''}`} />
                  <AnimatePresence mode="popLayout">
                    {wishlistCount > 0 && (
                      <motion.span
                        key={`wishlist-badge-${wishlistCount}`}
                        variants={badgePopVariants}
                        initial="initial"
                        animate="animate"
                        className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-[#18181B] text-[#F5D103] text-[9px] font-bold flex items-center justify-center border border-white"
                      >
                        {wishlistCount}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </button>

                {/* Desktop Shopping Basket Button - Minimal Pill */}
                <button
                  type="button"
                  id="desktop-cart-btn"
                  data-cart-btn="true"
                  onClick={() => setIsCartOpen(true)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#F5D103] text-[#18181B] hover:bg-[#E5A800] active:scale-95 transition-all text-xs font-semibold shadow-2xs cursor-pointer group"
                  aria-label={`Shopping basket with ${totalItems} items`}
                >
                  <ShoppingBag className="w-3.5 h-3.5 text-[#18181B]" />
                  <span className="font-bold">£{total.toFixed(2)}</span>
                  <AnimatePresence mode="popLayout">
                    {totalItems > 0 && (
                      <motion.span
                        key={`cart-pill-${totalItems}`}
                        variants={badgePopVariants}
                        initial="initial"
                        animate="animate"
                        className="w-4 h-4 rounded-full bg-[#18181B] text-[#F5D103] text-[9.5px] font-extrabold flex items-center justify-center -ml-0.5"
                      >
                        {totalItems}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </button>

                {/* Tablet Hamburger Button (lg:hidden) */}
                <button
                  type="button"
                  onClick={() => {
                    setIsMobileMenuOpen(!isMobileMenuOpen);
                    if (isMobileSearchOpen) setIsMobileSearchOpen(false);
                  }}
                  className="lg:hidden w-8 h-8 rounded-full flex items-center justify-center text-stone-700 hover:text-[#B45309] hover:bg-black/5 transition-all cursor-pointer relative"
                  aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
                >
                  <div
                    className={`transition-transform duration-300 transform ${
                      isMobileMenuOpen ? 'rotate-90 scale-105 text-[#18181B]' : 'rotate-0'
                    }`}
                  >
                    {isMobileMenuOpen ? (
                      <X className="w-4.5 h-4.5 stroke-[2.2]" />
                    ) : (
                      <Menu className="w-4.5 h-4.5 stroke-[2]" />
                    )}
                  </div>
                </button>
              </div>
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
          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search produce, bakery, dairy..."
              aria-label="Search products"
              className="w-full bg-white text-xs pl-9 pr-8 py-2.5 rounded-full border border-stone-200/90 focus:outline-none focus:ring-2 focus:ring-[#F5D103]/40 focus:border-[#F5D103] shadow-2xs"
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
          </form>
        </div>

        {/* Floating Mobile Navigation Drawer */}
        <div
          className={`xl:hidden overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isMobileMenuOpen
              ? 'max-h-[500px] opacity-100 px-3 sm:px-4 pb-4'
              : 'max-h-0 opacity-0 px-3 sm:px-4 pb-0 pointer-events-none'
          }`}
        >
          <div className="bg-white/95 backdrop-blur-xl border border-stone-200/80 rounded-3xl shadow-xl p-4 flex flex-col gap-1.5">
            {navLinks.map((link, idx) => {
              const Icon = link.icon;
              return (
                <button
                  key={link.label}
                  type="button"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    link.action();
                  }}
                  style={{
                    transitionDelay: isMobileMenuOpen ? `${idx * 30}ms` : '0ms',
                  }}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-[#18181B] hover:text-[#B45309] hover:bg-[#F0F5EC] transition-all duration-200 group w-full text-left cursor-pointer ${
                    isMobileMenuOpen
                      ? 'translate-y-0 opacity-100'
                      : 'translate-y-2 opacity-0'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-xl bg-stone-100 flex items-center justify-center text-stone-600 group-hover:bg-[#F5D103] group-hover:text-[#18181B] transition-colors">
                      <Icon className="w-4 h-4" />
                    </span>
                    <span className="font-semibold text-sm">{link.label}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    {link.badge && (
                      <span className="px-1.5 py-0.5 rounded-md text-[10px] font-extrabold bg-[#F5D103] text-[#18181B]">
                        {link.badge}
                      </span>
                    )}
                    <ChevronRight className="w-4 h-4 text-stone-400 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </button>
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
                className="w-full flex items-center justify-between px-3.5 py-2 rounded-2xl bg-stone-50 hover:bg-[#F0F5EC] text-xs font-semibold text-[#18181B] transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <MapPin className="w-4 h-4 text-[#B45309]" />
                  <span>Deliver to: <strong className="text-[#18181B]">{selectedPostalCode}</strong></span>
                </div>
                <span className="text-[11px] font-bold text-[#B45309] hover:underline">Change</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Click-Away Overlay */}
      <div
        className={`fixed inset-0 top-14 sm:top-16 bg-black/15 z-30 lg:hidden transition-opacity duration-300 ${
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

