import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import {
  X,
  Search,
  SlidersHorizontal,
  ChevronRight,
  Leaf,
  Tag,
  RotateCcw,
  ArrowUpDown,
} from 'lucide-react';
import { products } from '../data/products';
import { categories } from '../data/categories';
import { popularBrands } from '../data/brands';
import { ProductCard } from './ProductCard';
import { useNavigation } from '../context/NavigationContext';
import { backdropVariants, MOTION_DURATIONS, MOTION_EASINGS } from '../motion';
import type { Product } from '../types';

interface ShopCataloguePageProps {
  onQuickView: (product: Product) => void;
  onSelectProduct?: (product: Product) => void;
}

// 3D Page Opening / Unfolding Variants
const pageOpeningContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.045,
      delayChildren: 0.02,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.15,
      ease: 'easeIn',
    },
  },
};

const pageOpeningCardVariants: Variants = {
  hidden: {
    opacity: 0,
    rotateY: -22,
    x: -16,
    scale: 0.94,
    transformOrigin: 'left center',
  },
  visible: {
    opacity: 1,
    rotateY: 0,
    x: 0,
    scale: 1,
    transformOrigin: 'left center',
    transition: {
      duration: 0.42,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export const ShopCataloguePage: React.FC<ShopCataloguePageProps> = ({
  onQuickView,
  onSelectProduct,
}) => {
  const {
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
    sortOption,
    setSortOption,
    filterOrganic,
    setFilterOrganic,
    filterOnSale,
    setFilterOnSale,
    maxPrice,
    setMaxPrice,
    resetFilters,
    goToHome,
  } = useNavigation();

  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [minRating, setMinRating] = useState<number>(0);
  const [visibleCount, setVisibleCount] = useState(12);

  // Track filter key to reset pagination count cleanly during render
  const currentFilterKey = `${selectedCategory}-${sortOption}-${filterOrganic}-${filterOnSale}-${minRating}-${maxPrice}-${searchQuery}`;
  const [prevFilterKey, setPrevFilterKey] = useState(currentFilterKey);
  if (prevFilterKey !== currentFilterKey) {
    setPrevFilterKey(currentFilterKey);
    setVisibleCount(12);
  }

  // Ensure the catalogue page always starts from the top whenever category, search, or filters change
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    const frame = requestAnimationFrame(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    });
    return () => cancelAnimationFrame(frame);
  }, [selectedCategory, searchQuery, filterOrganic, filterOnSale, maxPrice, minRating]);

  // Handle body scroll lock & Escape for mobile filter
  useEffect(() => {
    if (isMobileFilterOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') setIsMobileFilterOpen(false);
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = originalOverflow;
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [isMobileFilterOpen]);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // Category filter
      if (selectedCategory !== 'all' && product.category !== selectedCategory) {
        return false;
      }

      // Search filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchesName = product.name.toLowerCase().includes(query);
        const matchesCategory = product.categoryLabel.toLowerCase().includes(query);
        const matchesDesc = product.description.toLowerCase().includes(query);
        if (!matchesName && !matchesCategory && !matchesDesc) {
          return false;
        }
      }

      // Organic filter
      if (filterOrganic && !product.isOrganic) {
        return false;
      }

      // On sale / badge filter
      if (filterOnSale && !product.badge && !product.originalPrice) {
        return false;
      }

      // Max price filter
      if (product.price > maxPrice) {
        return false;
      }

      // Min rating filter
      if (minRating > 0 && product.rating < minRating) {
        return false;
      }

      return true;
    });
  }, [selectedCategory, searchQuery, filterOrganic, filterOnSale, maxPrice, minRating]);

  // Sorted products
  const sortedProducts = useMemo(() => {
    const list = [...filteredProducts];
    switch (sortOption) {
      case 'price-asc':
        return list.sort((a, b) => a.price - b.price);
      case 'price-desc':
        return list.sort((a, b) => b.price - a.price);
      case 'rating':
        return list.sort((a, b) => b.rating - a.rating);
      case 'name-asc':
        return list.sort((a, b) => a.name.localeCompare(b.name));
      case 'name-desc':
        return list.sort((a, b) => b.name.localeCompare(a.name));
      default: // 'featured'
        return list;
    }
  }, [filteredProducts, sortOption]);

  const activeCategoryObject = categories.find((c) => c.id === selectedCategory);
  const currentCategoryName = activeCategoryObject ? activeCategoryObject.name : 'All Groceries & Produce';

  const activeFiltersCount =
    (selectedCategory !== 'all' ? 1 : 0) +
    (filterOrganic ? 1 : 0) +
    (filterOnSale ? 1 : 0) +
    (maxPrice < 25 ? 1 : 0) +
    (minRating > 0 ? 1 : 0) +
    (searchQuery.trim() ? 1 : 0);

  const displayedProducts = sortedProducts.slice(0, visibleCount);

  return (
    <div className="w-full bg-white min-h-screen">
      {/* 1. Desktop Fixed Left Sidebar Filters - Permanently Fixed Position */}
      <aside
        data-lenis-prevent
        className="hidden lg:block fixed left-0 top-14 sm:top-16 bottom-0 w-72 xl:w-80 z-30 bg-white border-r border-stone-200/80 p-5 xl:p-6 overflow-y-auto scrollbar-none shadow-xs"
      >
            <div className="flex items-center justify-between pb-4 border-b border-stone-100 mb-5">
              <h3 className="font-serif-heading font-bold text-lg text-[#18181B] flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-[#B45309]" />
                <span>Filters</span>
              </h3>
              {activeFiltersCount > 0 && (
                <button
                  type="button"
                  onClick={resetFilters}
                  className="text-xs text-[#B45309] hover:underline font-semibold cursor-pointer"
                >
                  Reset All
                </button>
              )}
            </div>

            {/* Filter Group: Categories */}
            <div className="mb-6">
              <h4 className="text-xs font-extrabold text-[#18181B] uppercase tracking-wider mb-3">
                Aisles &amp; Categories
              </h4>
              <div className="space-y-1">
                <button
                  type="button"
                  onClick={() => setSelectedCategory('all')}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                    selectedCategory === 'all'
                      ? 'bg-[#18181B] text-[#F5D103]'
                      : 'text-[#18181B] hover:bg-amber-100'
                  }`}
                >
                  <span>All Categories</span>
                  <span className={`text-[11px] ${selectedCategory === 'all' ? 'text-[#F5D103]' : 'text-stone-400'}`}>
                    {products.length}
                  </span>
                </button>

                {categories.map((cat) => {
                  const count = products.filter((p) => p.category === cat.id).length;
                  const isSelected = selectedCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                        isSelected
                          ? 'bg-[#18181B] text-[#F5D103]'
                          : 'text-[#18181B] hover:bg-amber-100'
                      }`}
                    >
                      <span>{cat.name}</span>
                      <span className={`text-[11px] ${isSelected ? 'text-[#F5D103]' : 'text-stone-400'}`}>
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Filter Group: Authentic Indian Brands */}
            <div className="mb-6 pt-5 border-t border-stone-100">
              <div className="flex items-center justify-between mb-2.5">
                <h4 className="text-xs font-extrabold text-[#18181B] uppercase tracking-wider">
                  Popular Brands
                </h4>
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="text-[10px] text-[#B45309] font-bold hover:underline cursor-pointer"
                  >
                    Clear
                  </button>
                )}
              </div>
              <div className="flex flex-wrap gap-1.5">
                {popularBrands.slice(0, 15).map((brand) => {
                  const isSelected = searchQuery.toLowerCase() === brand.name.toLowerCase();
                  return (
                    <button
                      key={brand.id}
                      type="button"
                      onClick={() => {
                        if (isSelected) {
                          setSearchQuery('');
                        } else {
                          setSearchQuery(brand.name);
                        }
                      }}
                      className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-[#18181B] text-[#F5D103] shadow-xs'
                          : 'bg-stone-50 border border-stone-200/80 text-stone-700 hover:text-[#B45309] hover:bg-amber-100 hover:border-[#F5D103]'
                      }`}
                    >
                      {brand.name}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Filter Group: Dietary & Deals */}
            <div className="mb-6 pt-5 border-t border-stone-100">
              <h4 className="text-xs font-extrabold text-[#18181B] uppercase tracking-wider mb-3">
                Dietary &amp; Deals
              </h4>
              <div className="space-y-2.5">
                <label className="flex items-center gap-2.5 cursor-pointer text-xs font-medium text-[#18181B]">
                  <input
                    type="checkbox"
                    checked={filterOrganic}
                    onChange={(e) => setFilterOrganic(e.target.checked)}
                    className="w-4 h-4 rounded text-[#B45309] focus:ring-[#F5D103] border-stone-300 cursor-pointer accent-[#F5D103]"
                  />
                  <span>100% Organic Only</span>
                </label>

                <label className="flex items-center gap-2.5 cursor-pointer text-xs font-medium text-[#18181B]">
                  <input
                    type="checkbox"
                    checked={filterOnSale}
                    onChange={(e) => setFilterOnSale(e.target.checked)}
                    className="w-4 h-4 rounded text-[#B45309] focus:ring-[#F5D103] border-stone-300 cursor-pointer accent-[#F5D103]"
                  />
                  <span>On Sale &amp; Special Offers</span>
                </label>
              </div>
            </div>

            {/* Filter Group: Max Price Slider */}
            <div className="mb-6 pt-5 border-t border-stone-100">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-xs font-extrabold text-[#18181B] uppercase tracking-wider">
                  Price Limit
                </h4>
                <span className="text-xs font-bold text-[#18181B]">
                  Up to £{maxPrice.toFixed(2)}
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="25"
                step="0.5"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-[#F5D103] cursor-pointer"
                aria-label="Filter maximum price"
              />
              <div className="flex justify-between text-[10px] text-stone-400 mt-1">
                <span>£1.00</span>
                <span>£25.00</span>
              </div>
            </div>

            {/* Filter Group: Minimum Rating */}
            <div className="pt-5 border-t border-stone-100">
              <h4 className="text-xs font-extrabold text-[#18181B] uppercase tracking-wider mb-2.5">
                Customer Rating
              </h4>
              <div className="space-y-1.5">
                {[
                  { label: 'All Ratings', value: 0 },
                  { label: '4.8 ★ & Above', value: 4.8 },
                  { label: '4.5 ★ & Above', value: 4.5 },
                ].map((r) => (
                  <button
                    key={r.value}
                    type="button"
                    onClick={() => setMinRating(r.value)}
                    className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                      minRating === r.value
                        ? 'bg-amber-100 text-[#B45309] font-bold border border-amber-200/60'
                        : 'text-stone-500 hover:bg-stone-50'
                    }`}
                  >
                    {r.label}
                  </button>
                ))}
              </div>
            </div>
          </aside>

      {/* 2. Scrollable Products Area */}
      <div className="w-full lg:pl-72 xl:pl-80">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-10 2xl:px-12 pt-4 sm:pt-6 pb-20">
          <main className="w-full min-w-0">
            {/* 1. Editorial Catalogue Breadcrumb & Header Banner */}
            <div className="bg-gradient-to-b from-white to-[#F8FAFC] rounded-3xl border border-stone-200/90 p-5 sm:p-7 mb-5 shadow-2xs">
              {/* Breadcrumbs */}
              <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-stone-500 mb-3">
                <button
                  type="button"
                  onClick={goToHome}
                  className="hover:text-[#B45309] transition-colors cursor-pointer"
                >
                  Home
                </button>
                <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
                <button
                  type="button"
                  onClick={() => setSelectedCategory('all')}
                  className={`hover:text-[#B45309] transition-colors cursor-pointer ${
                    selectedCategory === 'all' ? 'text-[#18181B] font-bold' : ''
                  }`}
                >
                  Catalogue
                </button>
                {selectedCategory !== 'all' && (
                  <>
                    <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
                    <span className="text-[#18181B] font-bold truncate">
                      {currentCategoryName}
                    </span>
                  </>
                )}
              </nav>

              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedCategory}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.22, ease: 'easeOut' }}
                  >
                    <span className="text-xs font-bold uppercase tracking-[0.16em] text-[#B45309] block mb-1">
                      Thoughtfully Sourced Everyday Market
                    </span>
                    <h1 className="font-serif-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-[#18181B] leading-tight">
                      {currentCategoryName}
                    </h1>
                  </motion.div>
                </AnimatePresence>

                <p className="text-xs sm:text-sm text-stone-500 max-w-sm">
                  Fresh produce, grass-fed dairy, warm sourdough, and organic pantry items delivered straight to your door in Hatfield.
                </p>
              </div>

              {/* Quick Category Tabs Bar */}
              <div className="mt-5 flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
                <button
                  type="button"
                  onClick={() => setSelectedCategory('all')}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                    selectedCategory === 'all'
                      ? 'bg-[#18181B] text-[#F5D103] shadow-xs'
                      : 'bg-white text-[#18181B] border border-stone-200 hover:bg-stone-50'
                  }`}
                >
                  All Items ({products.length})
                </button>

                {categories.map((cat) => {
                  const count = products.filter((p) => p.category === cat.id).length;
                  const isSelected = selectedCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-[#18181B] text-[#F5D103] shadow-xs'
                          : 'bg-white text-[#18181B] border border-stone-200 hover:bg-stone-50'
                      }`}
                    >
                      {cat.name} ({count})
                    </button>
                  );
                })}
              </div>
            </div>
            {/* Top Control Bar: Search, Mobile Filter Trigger & Sort Dropdown */}
            <div className="bg-white rounded-2xl border border-stone-200 p-3.5 sm:p-4 mb-5 shadow-2xs flex flex-wrap items-center justify-between gap-3">
              {/* Search Input */}
              <div className="relative flex-1 min-w-[200px] max-w-md">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products in catalogue..."
                  className="w-full pl-9 pr-8 py-2 text-xs sm:text-sm rounded-xl bg-stone-50 border border-stone-200 text-[#18181B] placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-[#F5D103]/20 focus:border-[#F5D103]"
                />
                <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 cursor-pointer"
                    aria-label="Clear catalogue search"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              <div className="flex items-center gap-2.5 ml-auto">
                {/* Mobile Filter Toggle Button */}
                <button
                  type="button"
                  onClick={() => setIsMobileFilterOpen(true)}
                  className="lg:hidden flex items-center gap-2 px-3.5 py-2 rounded-xl border border-stone-200 bg-stone-50 text-xs font-bold text-[#18181B] hover:bg-stone-100 transition-colors cursor-pointer"
                >
                  <SlidersHorizontal className="w-3.5 h-3.5 text-[#18181B]" />
                  <span>Filters</span>
                  {activeFiltersCount > 0 && (
                    <span className="w-4 h-4 rounded-full bg-[#18181B] text-[#F5D103] text-[10px] font-bold flex items-center justify-center">
                      {activeFiltersCount}
                    </span>
                  )}
                </button>

                {/* Sort Dropdown */}
                <div className="flex items-center gap-2">
                  <span className="hidden sm:inline text-xs text-stone-500 font-medium">
                    Sort by:
                  </span>
                  <div className="relative">
                    <select
                      value={sortOption}
                      onChange={(e) => setSortOption(e.target.value)}
                      className="appearance-none bg-stone-50 text-[#18181B] text-xs font-bold pl-3 pr-8 py-2 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-[#F5D103]/20 cursor-pointer"
                      aria-label="Sort products"
                    >
                      <option value="featured">Featured Picks</option>
                      <option value="price-asc">Price: Low to High</option>
                      <option value="price-desc">Price: High to Low</option>
                      <option value="rating">Highest Rated</option>
                      <option value="name-asc">Alphabetical (A - Z)</option>
                      <option value="name-desc">Alphabetical (Z - A)</option>
                    </select>
                    <ArrowUpDown className="w-3.5 h-3.5 text-stone-500 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>
              </div>
            </div>

            {/* Active Filter Chips Row */}
            {activeFiltersCount > 0 && (
              <div className="flex flex-wrap items-center gap-2 mb-5">
                <span className="text-xs text-stone-500 font-semibold">Active filters:</span>

                {selectedCategory !== 'all' && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-amber-100 text-[#B45309] text-xs font-semibold border border-amber-200/60">
                    Category: {currentCategoryName}
                    <button
                      type="button"
                      onClick={() => setSelectedCategory('all')}
                      className="hover:text-rose-600 cursor-pointer"
                      aria-label="Remove category filter"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}

                {filterOrganic && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-amber-100 text-[#B45309] text-xs font-semibold border border-amber-200/60">
                    <Leaf className="w-3 h-3 text-[#B45309]" />
                    100% Organic
                    <button
                      type="button"
                      onClick={() => setFilterOrganic(false)}
                      className="hover:text-rose-600 cursor-pointer"
                      aria-label="Remove organic filter"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}

                {filterOnSale && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-amber-100 text-[#B45309] text-xs font-semibold border border-amber-200/60">
                    <Tag className="w-3 h-3" />
                    Special Offers
                    <button
                      type="button"
                      onClick={() => setFilterOnSale(false)}
                      className="hover:text-rose-600 cursor-pointer"
                      aria-label="Remove on sale filter"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}

                {maxPrice < 25 && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-stone-100 text-stone-800 text-xs font-semibold">
                    Under £{maxPrice.toFixed(2)}
                    <button
                      type="button"
                      onClick={() => setMaxPrice(25)}
                      className="hover:text-rose-600 cursor-pointer"
                      aria-label="Reset price filter"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}

                {minRating > 0 && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-stone-100 text-stone-800 text-xs font-semibold">
                    {minRating}+ Stars
                    <button
                      type="button"
                      onClick={() => setMinRating(0)}
                      className="hover:text-rose-600 cursor-pointer"
                      aria-label="Reset rating filter"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}

                {searchQuery.trim() && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-100 text-stone-800 text-xs font-semibold">
                    &ldquo;{searchQuery}&rdquo;
                    <button
                      type="button"
                      onClick={() => setSearchQuery('')}
                      className="hover:text-rose-600 cursor-pointer"
                      aria-label="Clear search query"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </span>
                )}

                <button
                  type="button"
                  onClick={resetFilters}
                  className="text-xs font-bold text-[#B45309] hover:underline ml-1 cursor-pointer flex items-center gap-1"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Clear all</span>
                </button>
              </div>
            )}
            <div className="flex items-center justify-between mb-5">
              <p className="text-xs sm:text-sm font-semibold text-[#18181B]">
                Showing <strong className="text-[#18181B]">{sortedProducts.length}</strong> fresh grocery item{sortedProducts.length === 1 ? '' : 's'}
              </p>

              {sortedProducts.length > 0 && (
                <span className="text-xs text-[#B45309] font-medium hidden sm:inline">
                  ✓ Freshly picked &amp; temperature controlled
                </span>
              )}
            </div>

            {sortedProducts.length === 0 ? (
              /* Empty Results State */
              <div className="bg-white rounded-3xl border border-stone-200/80 p-8 sm:p-14 text-center max-w-lg mx-auto shadow-xs">
                <div className="w-16 h-16 rounded-full bg-amber-100 text-[#B45309] flex items-center justify-center mx-auto mb-4">
                  <Search className="w-7 h-7" />
                </div>
                <h3 className="font-serif-heading font-bold text-2xl text-[#18181B] mb-2">
                  No matching items found
                </h3>
                <p className="text-xs sm:text-sm text-stone-500 mb-6">
                  We could not find any groceries matching your active filters. Try clearing your search query or loosening dietary filters.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={resetFilters}
                    className="px-6 py-2.5 rounded-full bg-[#18181B] text-[#F5D103] text-xs font-bold hover:bg-[#E5A800] hover:text-[#18181B] transition-colors cursor-pointer"
                  >
                    Reset All Filters
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedCategory('all')}
                    className="px-6 py-2.5 rounded-full bg-stone-100 text-[#18181B] text-xs font-bold hover:bg-stone-200 transition-colors cursor-pointer"
                  >
                    Browse All Aisles
                  </button>
                </div>
              </div>
            ) : (
              /* Responsive Product Grid with 3D Page Opening Unfold Animation */
              <div>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`${selectedCategory}-${sortOption}-${filterOrganic}-${filterOnSale}-${minRating}-${searchQuery}`}
                    variants={pageOpeningContainerVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    style={{ perspective: 1200 }}
                    className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-3 gap-3.5 sm:gap-5"
                  >
                    {displayedProducts.map((product) => (
                      <motion.div
                        key={product.id}
                        variants={pageOpeningCardVariants}
                        className="h-full will-change-transform"
                      >
                        <ProductCard
                          product={product}
                          onQuickView={onQuickView}
                          onSelectProduct={onSelectProduct}
                        />
                      </motion.div>
                    ))}
                  </motion.div>
                </AnimatePresence>

                {/* Load More Button if items exceed visible count */}
                {visibleCount < sortedProducts.length && (
                  <div className="text-center mt-10">
                    <button
                      type="button"
                      onClick={() => setVisibleCount((prev) => prev + 12)}
                      className="px-8 py-3 rounded-full bg-white hover:bg-stone-50 text-[#18181B] border border-stone-300 text-xs sm:text-sm font-bold shadow-2xs hover:shadow-sm transition-all cursor-pointer btn-magnetic"
                    >
                      Load More Products ({sortedProducts.length - visibleCount} remaining)
                    </button>
                  </div>
                )}
              </div>
            )}
          </main>
        </div>
      </div>

      {/* 3. Mobile Filter Modal Drawer (Bottom Sheet) */}
      <AnimatePresence>
        {isMobileFilterOpen && (
          <div className="fixed inset-0 z-50 flex flex-col justify-end lg:hidden">
            {/* Backdrop */}
            <motion.div
              variants={backdropVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={() => setIsMobileFilterOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-xs cursor-pointer"
              aria-hidden="true"
            />

            {/* Bottom Sheet Modal */}
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{
                duration: MOTION_DURATIONS.STANDARD,
                ease: MOTION_EASINGS.EASE_OUT,
              }}
              className="relative z-10 bg-white rounded-t-3xl max-h-[85vh] flex flex-col shadow-2xl border-t border-stone-200"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between p-4 border-b border-stone-100">
                <div className="flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4 text-[#18181B]" />
                  <h3 className="font-serif-heading font-bold text-lg text-[#18181B]">
                    Filter Groceries
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center text-stone-600 hover:bg-stone-200 cursor-pointer"
                  aria-label="Close filters"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Scrollable Filter Body */}
              <div className="p-5 overflow-y-auto space-y-6">
                {/* Category Pills */}
                <div>
                  <h4 className="text-xs font-extrabold text-[#18181B] uppercase tracking-wider mb-2.5">
                    Category
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    <button
                      type="button"
                      onClick={() => setSelectedCategory('all')}
                      className={`px-3 py-1.5 rounded-full text-xs font-semibold cursor-pointer ${
                        selectedCategory === 'all'
                          ? 'bg-[#18181B] text-[#F5D103]'
                          : 'bg-stone-100 text-[#18181B]'
                      }`}
                    >
                      All Aisles
                    </button>
                    {categories.map((cat) => (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => setSelectedCategory(cat.id)}
                        className={`px-3 py-1.5 rounded-full text-xs font-semibold cursor-pointer ${
                          selectedCategory === cat.id
                            ? 'bg-[#18181B] text-[#F5D103]'
                            : 'bg-stone-100 text-[#18181B]'
                        }`}
                      >
                        {cat.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Popular Brands Pills in Mobile Modal */}
                <div className="pt-4 border-t border-stone-100">
                  <div className="flex items-center justify-between mb-2.5">
                    <h4 className="text-xs font-extrabold text-[#18181B] uppercase tracking-wider">
                      Popular Indian Brands
                    </h4>
                    {searchQuery && (
                      <button
                        type="button"
                        onClick={() => setSearchQuery('')}
                        className="text-[11px] text-[#B45309] font-bold hover:underline"
                      >
                        Clear
                      </button>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {popularBrands.slice(0, 16).map((brand) => {
                      const isSelected = searchQuery.toLowerCase() === brand.name.toLowerCase();
                      return (
                        <button
                          key={brand.id}
                          type="button"
                          onClick={() => {
                            if (isSelected) {
                              setSearchQuery('');
                            } else {
                              setSearchQuery(brand.name);
                            }
                          }}
                          className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-[#18181B] text-[#F5D103]'
                              : 'bg-stone-100 text-stone-800'
                          }`}
                        >
                          {brand.name}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Dietary Toggles */}
                <div className="pt-4 border-t border-stone-100 space-y-3">
                  <h4 className="text-xs font-extrabold text-[#18181B] uppercase tracking-wider mb-2">
                    Special Badges
                  </h4>
                  <label className="flex items-center gap-3 text-xs font-medium text-[#18181B]">
                    <input
                      type="checkbox"
                      checked={filterOrganic}
                      onChange={(e) => setFilterOrganic(e.target.checked)}
                      className="w-4 h-4 rounded accent-[#F5D103]"
                    />
                    <span>100% Organic Certified</span>
                  </label>
                  <label className="flex items-center gap-3 text-xs font-medium text-[#18181B]">
                    <input
                      type="checkbox"
                      checked={filterOnSale}
                      onChange={(e) => setFilterOnSale(e.target.checked)}
                      className="w-4 h-4 rounded accent-[#F5D103]"
                    />
                    <span>On Sale &amp; Discounts</span>
                  </label>
                </div>

                {/* Price range */}
                <div className="pt-4 border-t border-stone-100">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-xs font-extrabold text-[#18181B] uppercase tracking-wider">
                      Max Price
                    </h4>
                    <span className="text-xs font-bold text-[#18181B]">
                      £{maxPrice.toFixed(2)}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="25"
                    step="0.5"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(Number(e.target.value))}
                    className="w-full accent-[#F5D103]"
                  />
                </div>
              </div>

              {/* Sticky Modal Bottom Actions */}
              <div className="p-4 border-t border-stone-100 bg-stone-50 flex items-center gap-3">
                <button
                  type="button"
                  onClick={resetFilters}
                  className="flex-1 py-3 rounded-xl border border-stone-300 text-xs font-bold text-[#18181B] hover:bg-stone-100 cursor-pointer text-center"
                >
                  Reset
                </button>
                <button
                  type="button"
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="flex-[2] py-3 rounded-xl bg-[#18181B] text-[#F5D103] text-xs font-bold shadow-md hover:bg-[#E5A800] hover:text-[#18181B] cursor-pointer text-center"
                >
                  Show {sortedProducts.length} Results
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
