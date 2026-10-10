import React, { useState } from 'react';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { AnnouncementBar } from './components/AnnouncementBar';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { CategorySection } from './components/CategorySection';
import { FarmFreshBanner } from './components/FarmFreshBanner';
import { PromoCardsRow } from './components/PromoCardsRow';
import { ProductSection } from './components/ProductSection';
import { AppPromotion } from './components/AppPromotion';
import { MostSellingSection } from './components/MostSellingSection';
import { TrustBar } from './components/TrustBar';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { LocationModal } from './components/LocationModal';
import { ProductQuickViewModal } from './components/ProductQuickViewModal';
import { CheckoutModal } from './components/CheckoutModal';
import { ToastNotification } from './components/ToastNotification';
import { useGsapScroll } from './hooks/useGsapScroll';
import type { Product } from './types';

export const AppContent: React.FC = () => {
  useGsapScroll();
  const [selectedPostalCode, setSelectedPostalCode] =
    useState('Hatfield, AL10');
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [selectedProductForQuickView, setSelectedProductForQuickView] =
    useState<Product | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isWishlistFilterActive, setIsWishlistFilterActive] = useState(false);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);

  const handleSelectProduct = (product: Product) => {
    setSelectedProductForQuickView(product);
  };

  const handleFilterWishlist = () => {
    setIsWishlistFilterActive((prev) => !prev);
    const el = document.getElementById('fresh-picks');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F8F2] text-[#18231E]">
      {/* 1. Announcement Bar */}
      <AnnouncementBar />

      {/* 2. Sticky Header */}
      <Header
        onOpenLocationModal={() => setIsLocationModalOpen(true)}
        selectedPostalCode={selectedPostalCode}
        onSelectProduct={handleSelectProduct}
        onFilterWishlist={handleFilterWishlist}
        isWishlistFilterActive={isWishlistFilterActive}
      />

      {/* Main Landing Page Content matching reference layout */}
      <main className="flex-1">
        {/* 3. Hero Section */}
        <HeroSection />

        {/* 4. Shop by Category */}
        <CategorySection
          selectedCategory={selectedCategory}
          onSelectCategory={(cat) => setSelectedCategory(cat)}
        />

        {/* 5. Farm Fresh Fruits & Vegetables Delivered Daily Banner */}
        <FarmFreshBanner />

        {/* 6. 3 Promo Cards Row (Green 20% OFF, Rose Pink Free Delivery, Butter Yellow Fresh Groceries) */}
        <PromoCardsRow />

        {/* 7. Today's Fresh Picks (5 Products) */}
        <ProductSection
          onQuickView={handleSelectProduct}
          isWishlistFilterActive={isWishlistFilterActive}
          onClearWishlistFilter={() => setIsWishlistFilterActive(false)}
        />

        {/* 8. Get the Varam stores App Banner */}
        <AppPromotion />

        {/* 9. Most Selling Products (5 Products) */}
        <MostSellingSection onQuickView={handleSelectProduct} />

        {/* 10. 4 Brand Trust Features Bar */}
        <TrustBar />
      </main>

      {/* 11. Footer with Newsletter Subscription */}
      <Footer />

      {/* Interactive Cart Drawer, Location Modal, Quick View, and Checkout */}
      <CartDrawer onCheckout={() => setIsCheckoutModalOpen(true)} />

      <LocationModal
        isOpen={isLocationModalOpen}
        onClose={() => setIsLocationModalOpen(false)}
        selectedPostalCode={selectedPostalCode}
        onSelectPostalCode={setSelectedPostalCode}
      />

      <ProductQuickViewModal
        product={selectedProductForQuickView}
        onClose={() => setSelectedProductForQuickView(null)}
      />

      <CheckoutModal
        isOpen={isCheckoutModalOpen}
        onClose={() => setIsCheckoutModalOpen(false)}
        postalCode={selectedPostalCode}
      />

      <ToastNotification />
    </div>
  );
};

export default function App() {
  return (
    <CartProvider>
      <WishlistProvider>
        <AppContent />
      </WishlistProvider>
    </CartProvider>
  );
}
