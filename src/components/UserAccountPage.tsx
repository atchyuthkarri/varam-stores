import React, { useState } from 'react';
import {
  Package,
  MapPin,
  Sparkles,
  ChevronRight,
  Clock,
  Truck,
  CheckCircle2,
  Copy,
  Check,
  Sliders,
  ShoppingBag,
  Heart,
  Plus,
  RefreshCw,
  ShieldCheck,
  Leaf,
  LogOut,
  FileText,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useNavigation } from '../context/NavigationContext';
import { products } from '../data/products';
import type { Product } from '../types';

type AccountTab = 'orders' | 'rewards' | 'addresses' | 'preferences' | 'settings';

interface OrderItem {
  product: Product;
  quantity: number;
}

interface OrderHistoryItem {
  id: string;
  date: string;
  status: 'In Transit' | 'Delivered' | 'Processing';
  total: number;
  items: OrderItem[];
  deliveryAddress: string;
  trackingCode?: string;
  estimatedDelivery?: string;
}

export const UserAccountPage: React.FC = () => {
  const { addToCart, showToast, applyCoupon, appliedCoupon } = useCart();
  const { wishlistCount } = useWishlist();
  const { goToHome, goToShop, goToWishlist, goToProduct } = useNavigation();

  const [activeTab, setActiveTab] = useState<AccountTab>('orders');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [selectedInvoiceOrder, setSelectedInvoiceOrder] = useState<OrderHistoryItem | null>(null);
  const [isEditingProfile, setIsEditingProfile] = useState(false);

  // Profile State
  const [profile, setProfile] = useState({
    firstName: 'Alex',
    lastName: 'Mercer',
    email: 'alex.mercer@varamfoods.co.uk',
    phone: '+44 7700 900821',
    postalCode: 'Hatfield, AL10 9TN',
    membershipTier: 'Gold Organic Patron',
    memberSince: 'May 2023',
    freshPoints: 240,
  });

  // Dietary Preferences State
  const [dietaryPrefs, setDietaryPrefs] = useState({
    organicPriority: true,
    vegetarianVegan: false,
    glutenFree: false,
    nutAllergyAlert: true,
    britishGrownOnly: true,
    plasticFreePackaging: true,
  });

  // Saved Addresses State
  const [addresses, setAddresses] = useState([
    {
      id: 'addr-1',
      label: 'Home (Default)',
      fullName: 'Alex Mercer',
      street: '42 Manor Road',
      city: 'Hatfield, Hertfordshire',
      postcode: 'AL10 9TN',
      country: 'United Kingdom',
      instructions: 'Please ring the doorbell. If not home, leave inside the wooden weather-proof porch box.',
      isDefault: true,
    },
    {
      id: 'addr-2',
      label: 'Office Campus',
      fullName: 'Alex Mercer',
      street: '18 College Lane, Innovation Hub',
      city: 'Hatfield, Hertfordshire',
      postcode: 'AL10 9AB',
      country: 'United Kingdom',
      instructions: 'Deliver to Ground Floor Reception between 9:00 AM - 5:00 PM.',
      isDefault: false,
    },
  ]);

  // Notifications State
  const [notifications, setNotifications] = useState({
    smsDeliveryAlerts: true,
    whatsappDriverLive: true,
    emailWeeklyHarvest: false,
    seasonalPromoAlerts: true,
  });

  // Sample order products from data
  const sampleP1 = products[0] || {
    id: 'prod-1',
    name: 'Organic Red Tomatoes',
    price: 1.33,
    unit: 'kg',
    image: '/product-tomatoes.jpg',
    category: 'vegetables',
    categoryLabel: 'Vegetables',
  };
  const sampleP2 = products[1] || {
    id: 'prod-2',
    name: 'Fresh Bananas',
    price: 0.79,
    unit: 'kg',
    image: '/product-bananas.jpg',
    category: 'fruits',
    categoryLabel: 'Fruits',
  };
  const sampleP3 = products[2] || {
    id: 'prod-3',
    name: 'Organic Broccoli',
    price: 1.20,
    unit: 'kg',
    image: '/product-broccoli.jpg',
    category: 'vegetables',
    categoryLabel: 'Vegetables',
  };
  const sampleP4 = products[3] || {
    id: 'prod-4',
    name: 'Artisan Sourdough Loaf',
    price: 3.50,
    unit: '800g',
    image: '/product-sourdough.jpg',
    category: 'bakery',
    categoryLabel: 'Bakery',
  };

  // Orders Data
  const activeOrder: OrderHistoryItem = {
    id: 'VF-94281',
    date: 'Today, 2:15 PM',
    status: 'In Transit',
    total: 19.85,
    estimatedDelivery: 'Today by 6:30 PM',
    deliveryAddress: '42 Manor Road, Hatfield AL10 9TN',
    trackingCode: 'HAT-EV4-889',
    items: [
      { product: sampleP1, quantity: 2 },
      { product: sampleP4, quantity: 1 },
      { product: sampleP3, quantity: 2 },
    ],
  };

  const pastOrders: OrderHistoryItem[] = [
    {
      id: 'VF-88210',
      date: '12 Oct 2026',
      status: 'Delivered',
      total: 28.40,
      deliveryAddress: '42 Manor Road, Hatfield AL10 9TN',
      items: [
        { product: sampleP1, quantity: 3 },
        { product: sampleP2, quantity: 4 },
        { product: sampleP3, quantity: 2 },
      ],
    },
    {
      id: 'VF-86402',
      date: '28 Sep 2026',
      status: 'Delivered',
      total: 41.20,
      deliveryAddress: '42 Manor Road, Hatfield AL10 9TN',
      items: [
        { product: sampleP4, quantity: 2 },
        { product: sampleP1, quantity: 4 },
        { product: sampleP2, quantity: 2 },
      ],
    },
    {
      id: 'VF-84193',
      date: '15 Sep 2026',
      status: 'Delivered',
      total: 22.50,
      deliveryAddress: '18 College Lane, Hatfield AL10 9AB',
      items: [
        { product: sampleP2, quantity: 5 },
        { product: sampleP3, quantity: 3 },
      ],
    },
  ];

  const handleCopy = (code: string) => {
    navigator.clipboard?.writeText(code);
    setCopiedCode(code);
    showToast(`Copied code "${code}" to clipboard!`);
    setTimeout(() => setCopiedCode(null), 2500);
  };

  const handleApplyVoucher = (code: string) => {
    applyCoupon(code);
    showToast(`Applied voucher "${code}" to your basket!`);
  };

  const handleReorder = (order: OrderHistoryItem) => {
    let count = 0;
    order.items.forEach((item) => {
      addToCart(item.product, item.quantity);
      count += item.quantity;
    });
    showToast(`Added ${count} items from order #${order.id} to your basket!`);
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditingProfile(false);
    showToast('Your profile details have been successfully saved!');
  };

  return (
    <div className="w-full bg-[#FAF9F6] min-h-screen pb-24">
      {/* 1. Breadcrumb & Top Bar */}
      <section className="bg-white border-b border-stone-200/80 py-6 sm:py-8 px-4 sm:px-6 lg:px-10">
        <div className="max-w-7xl mx-auto">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-[#737A72] mb-4">
            <button
              type="button"
              onClick={goToHome}
              className="hover:text-[#B45309] transition-colors cursor-pointer"
            >
              Home
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
            <span className="text-[#18181B] font-bold">My Account</span>
          </nav>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            {/* Customer Header Info */}
            <div className="flex items-start sm:items-center gap-4 sm:gap-5">
              <div className="relative">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-[#18181B] text-[#F5D103] flex items-center justify-center font-bold text-2xl sm:text-3xl shadow-sm border-2 border-white ring-2 ring-stone-200">
                  {profile.firstName[0]}
                  {profile.lastName[0]}
                </div>
                <div
                  className="absolute -bottom-1 -right-1 w-6 h-6 rounded-md bg-[#245E4A] text-white flex items-center justify-center shadow-xs"
                  title="Verified Organic Member"
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                </div>
              </div>

              <div>
                <div className="flex flex-wrap items-center gap-2.5 mb-1">
                  <h1 className="font-serif-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-[#18181B]">
                    {profile.firstName} {profile.lastName}
                  </h1>
                  <span className="px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-[#245E4A]/10 text-[#245E4A] border border-[#245E4A]/20">
                    {profile.membershipTier}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-stone-600 flex flex-wrap items-center gap-x-3 gap-y-1">
                  <span>{profile.email}</span>
                  <span className="text-stone-300">•</span>
                  <span className="flex items-center gap-1 text-stone-700 font-medium">
                    <MapPin className="w-3 h-3 text-[#B45309]" />
                    {profile.postalCode}
                  </span>
                  <span className="text-stone-300">•</span>
                  <span>Joined {profile.memberSince}</span>
                </p>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center gap-2.5 self-start md:self-auto">
              <button
                type="button"
                onClick={() => goToShop()}
                className="px-4 py-2 rounded-xl bg-white border border-stone-200 text-[#18181B] hover:bg-stone-50 text-xs font-bold transition-all flex items-center gap-1.5 shadow-2xs cursor-pointer"
              >
                <ShoppingBag className="w-3.5 h-3.5 text-[#245E4A]" />
                <span>Shop Catalogue</span>
              </button>
              <button
                type="button"
                onClick={() => goToHome()}
                className="px-3 py-2 rounded-xl text-stone-500 hover:text-stone-800 hover:bg-stone-100 text-xs font-semibold transition-colors flex items-center gap-1 cursor-pointer"
                title="Sign out of current session"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Sign Out</span>
              </button>
            </div>
          </div>

          {/* 2. Customer Key Performance Metric Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mt-8">
            {/* Metric 1: FreshPoints */}
            <div className="bg-[#FAF9F6] border border-stone-200/90 rounded-2xl p-4 flex flex-col justify-between hover:border-[#245E4A]/40 transition-colors">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-stone-600">FreshPoints</span>
                <span className="w-7 h-7 rounded-lg bg-[#F5D103]/20 text-[#B45309] flex items-center justify-center">
                  <Sparkles className="w-4 h-4" />
                </span>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-[#18181B] tracking-tight">
                  {profile.freshPoints}{' '}
                  <span className="text-xs font-normal text-stone-500">pts</span>
                </div>
                <div className="flex items-center justify-between text-[11px] text-[#245E4A] font-semibold mt-1">
                  <span>£{(profile.freshPoints * 0.05).toFixed(2)} Store Credit</span>
                  <button
                    type="button"
                    onClick={() => setActiveTab('rewards')}
                    className="hover:underline font-bold text-[#B45309] cursor-pointer"
                  >
                    Redeem &rarr;
                  </button>
                </div>
              </div>
            </div>

            {/* Metric 2: Total Orders */}
            <div className="bg-[#FAF9F6] border border-stone-200/90 rounded-2xl p-4 flex flex-col justify-between hover:border-[#245E4A]/40 transition-colors">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-stone-600">Total Orders</span>
                <span className="w-7 h-7 rounded-lg bg-[#245E4A]/10 text-[#245E4A] flex items-center justify-center">
                  <Package className="w-4 h-4" />
                </span>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-[#18181B] tracking-tight">
                  14{' '}
                  <span className="text-xs font-normal text-stone-500">orders</span>
                </div>
                <div className="text-[11px] text-amber-700 font-semibold mt-1 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                  <span>1 Order Out for Delivery</span>
                </div>
              </div>
            </div>

            {/* Metric 3: Saved Wishlist */}
            <div className="bg-[#FAF9F6] border border-stone-200/90 rounded-2xl p-4 flex flex-col justify-between hover:border-[#245E4A]/40 transition-colors">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-stone-600">Saved Wishlist</span>
                <span className="w-7 h-7 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center">
                  <Heart className="w-4 h-4" />
                </span>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-[#18181B] tracking-tight">
                  {wishlistCount}{' '}
                  <span className="text-xs font-normal text-stone-500">items</span>
                </div>
                <button
                  type="button"
                  onClick={goToWishlist}
                  className="text-[11px] text-[#245E4A] font-semibold mt-1 hover:underline text-left cursor-pointer"
                >
                  View Saved Collection &rarr;
                </button>
              </div>
            </div>

            {/* Metric 4: Eco Impact */}
            <div className="bg-[#FAF9F6] border border-stone-200/90 rounded-2xl p-4 flex flex-col justify-between hover:border-[#245E4A]/40 transition-colors">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-stone-600">Eco Impact</span>
                <span className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
                  <Leaf className="w-4 h-4" />
                </span>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-[#18181B] tracking-tight">
                  38.4{' '}
                  <span className="text-xs font-normal text-stone-500">kg</span>
                </div>
                <div className="text-[11px] text-emerald-700 font-semibold mt-1">
                  Zero Plastic • 100% EV Van Delivery
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Main Tabs Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 mt-8">
        <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-stone-200">
          {[
            { id: 'orders', label: 'Orders & Deliveries', icon: Package, badge: '1 Active' },
            { id: 'rewards', label: 'FreshPoints & Vouchers', icon: Sparkles, badge: '£12 Credit' },
            { id: 'addresses', label: 'Saved Addresses', icon: MapPin },
            { id: 'preferences', label: 'Dietary & Sourcing', icon: Leaf },
            { id: 'settings', label: 'Account & Security', icon: Sliders },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as AccountTab)}
                className={`flex items-center gap-2 px-4 py-3 rounded-t-xl text-xs sm:text-sm font-bold transition-all relative shrink-0 cursor-pointer ${
                  isActive
                    ? 'text-[#18181B] bg-white border-t border-x border-stone-200 shadow-2xs'
                    : 'text-stone-500 hover:text-stone-900 hover:bg-white/60'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-[#245E4A]' : 'text-stone-400'}`} />
                <span>{tab.label}</span>
                {tab.badge && (
                  <span
                    className={`px-1.5 py-0.5 rounded-md text-[10px] font-extrabold ${
                      isActive
                        ? 'bg-[#F5D103] text-[#18181B]'
                        : 'bg-stone-200 text-stone-700'
                    }`}
                  >
                    {tab.badge}
                  </span>
                )}
                {isActive && (
                  <motion.div
                    layoutId="activeTabUnderline"
                    className="absolute -bottom-px inset-x-0 h-0.5 bg-white"
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* 4. Tab Views Container */}
        <div className="mt-8">
          <AnimatePresence mode="wait">
            {/* VIEW 1: ORDERS & DELIVERIES */}
            {activeTab === 'orders' && (
              <motion.div
                key="tab-orders"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.2 }}
                className="space-y-8"
              >
                {/* Active Live Delivery Card */}
                <div className="bg-white border-2 border-[#245E4A]/30 rounded-3xl p-6 sm:p-8 shadow-sm relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-36 h-36 bg-[#245E4A]/5 rounded-bl-full pointer-events-none" />

                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-stone-100">
                    <div>
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-xs font-bold uppercase tracking-wider text-[#245E4A]">
                          Live Order In Progress
                        </span>
                        <span className="text-xs text-stone-400">•</span>
                        <span className="text-xs font-mono font-bold text-stone-600">
                          #{activeOrder.id}
                        </span>
                      </div>
                      <h2 className="font-serif-heading text-xl sm:text-2xl font-bold text-[#18181B]">
                        Estimated Delivery: {activeOrder.estimatedDelivery}
                      </h2>
                      <p className="text-xs sm:text-sm text-stone-500 mt-1">
                        Delivering to <strong className="text-stone-800">{activeOrder.deliveryAddress}</strong>
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => setSelectedInvoiceOrder(activeOrder)}
                        className="px-4 py-2.5 rounded-xl border border-stone-200 hover:bg-stone-50 text-xs font-bold text-[#18181B] transition-colors flex items-center gap-1.5 cursor-pointer"
                      >
                        <FileText className="w-3.5 h-3.5 text-stone-500" />
                        <span>View Receipt</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => showToast('Connecting to Driver David on Hatfield route... (Van #4)')}
                        className="px-5 py-2.5 rounded-xl bg-[#245E4A] hover:bg-[#1B4A3A] text-white text-xs font-bold transition-all flex items-center gap-2 shadow-xs cursor-pointer"
                      >
                        <Truck className="w-3.5 h-3.5 text-[#F5D103]" />
                        <span>Track Driver David</span>
                      </button>
                    </div>
                  </div>

                  {/* 4-Step Animated Delivery Tracker */}
                  <div className="py-6 sm:py-8">
                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 sm:gap-2 relative">
                      {/* Step 1: Order Confirmed */}
                      <div className="flex items-start gap-3 sm:flex-col sm:items-center sm:text-center">
                        <div className="w-9 h-9 rounded-xl bg-[#245E4A] text-white flex items-center justify-center shrink-0 shadow-xs">
                          <CheckCircle2 className="w-4 h-4 text-[#F5D103]" />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-[#18181B]">Order Placed</div>
                          <div className="text-[11px] text-stone-500">Today, 2:15 PM</div>
                        </div>
                      </div>

                      {/* Step 2: Freshly Picked */}
                      <div className="flex items-start gap-3 sm:flex-col sm:items-center sm:text-center">
                        <div className="w-9 h-9 rounded-xl bg-[#245E4A] text-white flex items-center justify-center shrink-0 shadow-xs">
                          <Leaf className="w-4 h-4 text-[#F5D103]" />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-[#18181B]">Picked Fresh</div>
                          <div className="text-[11px] text-stone-500">Today, 3:45 PM</div>
                        </div>
                      </div>

                      {/* Step 3: Out for Delivery (Active) */}
                      <div className="flex items-start gap-3 sm:flex-col sm:items-center sm:text-center">
                        <div className="w-9 h-9 rounded-xl bg-[#F5D103] text-[#18181B] ring-4 ring-[#F5D103]/20 flex items-center justify-center shrink-0 shadow-xs">
                          <Truck className="w-4 h-4 text-[#18181B] animate-bounce" />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-[#18181B]">Out for Delivery</div>
                          <div className="text-[11px] text-[#245E4A] font-semibold">Hatfield AL10 Route</div>
                        </div>
                      </div>

                      {/* Step 4: Delivered */}
                      <div className="flex items-start gap-3 sm:flex-col sm:items-center sm:text-center opacity-45">
                        <div className="w-9 h-9 rounded-xl bg-stone-100 border border-stone-300 text-stone-400 flex items-center justify-center shrink-0">
                          <Clock className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-stone-700">Delivered</div>
                          <div className="text-[11px] text-stone-400">Est. 6:30 PM</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Active Items Thumbnails */}
                  <div className="bg-[#FAF9F6] border border-stone-200/70 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-3 overflow-x-auto">
                      <span className="text-xs font-bold text-stone-700 shrink-0">Order Items:</span>
                      {activeOrder.items.map((item) => (
                        <div
                          key={item.product.id}
                          className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-xl border border-stone-200/80 shrink-0 cursor-pointer hover:border-stone-400 transition-colors"
                          onClick={() => goToProduct(item.product.id)}
                        >
                          <img
                            src={item.product.image}
                            alt={item.product.name}
                            className="w-7 h-7 object-cover rounded-md"
                          />
                          <span className="text-xs font-medium text-stone-800">
                            {item.product.name} <strong className="text-stone-500">×{item.quantity}</strong>
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="text-right shrink-0">
                      <span className="text-xs text-stone-500 mr-2">Total Amount:</span>
                      <span className="text-base font-extrabold text-[#18181B]">
                        £{activeOrder.total.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Past Order History */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-serif-heading text-xl font-bold text-[#18181B]">
                      Past Order History ({pastOrders.length})
                    </h3>
                    <span className="text-xs text-stone-500">Showing last 90 days</span>
                  </div>

                  <div className="space-y-4">
                    {pastOrders.map((order) => (
                      <div
                        key={order.id}
                        className="bg-white border border-stone-200 rounded-2xl p-5 sm:p-6 hover:shadow-md transition-shadow"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-100">
                          <div>
                            <div className="flex items-center gap-3 mb-1">
                              <span className="font-mono text-xs font-bold text-[#18181B]">
                                #{order.id}
                              </span>
                              <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                                {order.status}
                              </span>
                              <span className="text-xs text-stone-400">•</span>
                              <span className="text-xs text-stone-500">{order.date}</span>
                            </div>
                            <p className="text-xs text-stone-500">
                              Delivered to {order.deliveryAddress}
                            </p>
                          </div>

                          <div className="flex items-center gap-3">
                            <span className="text-base font-extrabold text-[#18181B] mr-2">
                              £{order.total.toFixed(2)}
                            </span>
                            <button
                              type="button"
                              onClick={() => setSelectedInvoiceOrder(order)}
                              className="px-3.5 py-2 rounded-xl border border-stone-200 hover:bg-stone-50 text-xs font-semibold text-stone-700 transition-colors cursor-pointer"
                            >
                              Invoice
                            </button>
                            <button
                              type="button"
                              onClick={() => handleReorder(order)}
                              className="px-4 py-2 rounded-xl bg-[#F5D103] hover:bg-[#E5A800] text-[#18181B] text-xs font-bold transition-all flex items-center gap-1.5 shadow-2xs cursor-pointer"
                            >
                              <RefreshCw className="w-3.5 h-3.5" />
                              <span>Reorder All</span>
                            </button>
                          </div>
                        </div>

                        {/* Order Item Thumbnails */}
                        <div className="pt-4 flex flex-wrap items-center gap-3">
                          {order.items.map((item) => (
                            <button
                              key={item.product.id}
                              type="button"
                              onClick={() => goToProduct(item.product.id)}
                              className="flex items-center gap-2 px-2.5 py-1.5 rounded-xl bg-[#FAF9F6] border border-stone-200 hover:bg-stone-100 transition-colors text-left cursor-pointer"
                            >
                              <img
                                src={item.product.image}
                                alt={item.product.name}
                                className="w-8 h-8 rounded-lg object-cover"
                              />
                              <div className="text-xs">
                                <p className="font-semibold text-stone-800 line-clamp-1 max-w-[130px]">
                                  {item.product.name}
                                </p>
                                <p className="text-stone-500 text-[10px]">
                                  Qty: {item.quantity} • £{item.product.price.toFixed(2)}
                                </p>
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* VIEW 2: REWARDS & FRESHPOINTS */}
            {activeTab === 'rewards' && (
              <motion.div
                key="tab-rewards"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.2 }}
                className="space-y-8"
              >
                {/* Rewards Loyalty Status Banner */}
                <div className="bg-gradient-to-br from-[#18181B] via-[#245E4A] to-[#18181B] rounded-3xl p-6 sm:p-10 text-white relative overflow-hidden shadow-lg">
                  <div className="max-w-2xl relative z-10">
                    <div className="inline-flex items-center gap-2 text-[#F5D103] text-xs font-bold tracking-[0.16em] uppercase mb-3">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>FreshPoints Loyalty Club</span>
                    </div>

                    <h2 className="font-serif-heading text-3xl sm:text-4xl font-bold mb-3">
                      Gold Connoisseur Tier
                    </h2>
                    <p className="text-stone-200 text-sm leading-relaxed mb-6">
                      You earn <strong className="text-[#F5D103]">2 points per £1</strong> spent on all fresh farm produce and get exclusive complimentary seasonal harvest drops.
                    </p>

                    {/* Progress Bar to Platinum */}
                    <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 max-w-lg mb-4">
                      <div className="flex items-center justify-between text-xs font-bold mb-2">
                        <span>Current: 240 FreshPoints</span>
                        <span className="text-[#F5D103]">Platinum at 500 pts</span>
                      </div>
                      <div className="w-full bg-white/20 h-2.5 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-[#F5D103] to-[#F8BE17] rounded-full transition-all duration-500"
                          style={{ width: `${(240 / 500) * 100}%` }}
                        />
                      </div>
                      <p className="text-[11px] text-stone-300 mt-2">
                        260 points until your next Platinum perk tier: Free same-day delivery with no minimum basket.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Available Exclusive Coupons */}
                <div>
                  <h3 className="font-serif-heading text-xl font-bold text-[#18181B] mb-4">
                    Your Available Vouchers &amp; Perks
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Voucher 1 */}
                    <div className="bg-white border border-stone-200 rounded-2xl p-5 flex flex-col justify-between hover:shadow-md transition-shadow">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-[#F5D103]/20 text-[#B45309]">
                            Welcome Reward
                          </span>
                          <span className="text-xs text-stone-400">Expires 30 Nov</span>
                        </div>
                        <h4 className="font-serif-heading text-lg font-bold text-[#18181B] mb-1">
                          20% OFF Entire Order
                        </h4>
                        <p className="text-xs text-stone-500 mb-4">
                          Valid on any basket over £20 across fresh produce and bakery.
                        </p>
                      </div>

                      <div className="flex items-center justify-between pt-3 border-t border-stone-100">
                        <span className="font-mono text-sm font-bold text-[#245E4A]">
                          FRESH20
                        </span>
                        <button
                          type="button"
                          onClick={() => handleApplyVoucher('FRESH20')}
                          className="px-3.5 py-1.5 rounded-lg bg-[#245E4A] hover:bg-[#1B4A3A] text-white text-xs font-bold transition-all cursor-pointer"
                        >
                          {appliedCoupon === 'FRESH20' ? 'Applied' : 'Apply Code'}
                        </button>
                      </div>
                    </div>

                    {/* Voucher 2 */}
                    <div className="bg-white border border-stone-200 rounded-2xl p-5 flex flex-col justify-between hover:shadow-md transition-shadow">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-[#245E4A]/10 text-[#245E4A]">
                            Gold Member Perk
                          </span>
                          <span className="text-xs text-stone-400">Expires 15 Nov</span>
                        </div>
                        <h4 className="font-serif-heading text-lg font-bold text-[#18181B] mb-1">
                          £10 OFF Over £45
                        </h4>
                        <p className="text-xs text-stone-500 mb-4">
                          Redeemable on organic vegetables, fruits, and cold-pressed olive oils.
                        </p>
                      </div>

                      <div className="flex items-center justify-between pt-3 border-t border-stone-100">
                        <span className="font-mono text-sm font-bold text-[#245E4A]">
                          GREEN10
                        </span>
                        <button
                          type="button"
                          onClick={() => handleApplyVoucher('GREEN10')}
                          className="px-3.5 py-1.5 rounded-lg bg-[#245E4A] hover:bg-[#1B4A3A] text-white text-xs font-bold transition-all cursor-pointer"
                        >
                          {appliedCoupon === 'GREEN10' ? 'Applied' : 'Apply Code'}
                        </button>
                      </div>
                    </div>

                    {/* Voucher 3 */}
                    <div className="bg-white border border-stone-200 rounded-2xl p-5 flex flex-col justify-between hover:shadow-md transition-shadow">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-amber-50 text-amber-700">
                            Bakery Gift
                          </span>
                          <span className="text-xs text-stone-400">Expires 20 Dec</span>
                        </div>
                        <h4 className="font-serif-heading text-lg font-bold text-[#18181B] mb-1">
                          Free Artisan Sourdough
                        </h4>
                        <p className="text-xs text-stone-500 mb-4">
                          Complimentary country sourdough loaf with your next weekend grocery drop.
                        </p>
                      </div>

                      <div className="flex items-center justify-between pt-3 border-t border-stone-100">
                        <span className="font-mono text-sm font-bold text-[#245E4A]">
                          SOURDOUGH
                        </span>
                        <button
                          type="button"
                          onClick={() => handleApplyVoucher('SOURDOUGH')}
                          className="px-3.5 py-1.5 rounded-lg bg-[#245E4A] hover:bg-[#1B4A3A] text-white text-xs font-bold transition-all cursor-pointer"
                        >
                          {appliedCoupon === 'SOURDOUGH' ? 'Applied' : 'Apply Code'}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Referral Program Box */}
                <div className="bg-white border border-stone-200 rounded-3xl p-6 sm:p-8 flex flex-col lg:flex-row items-center justify-between gap-6 shadow-xs">
                  <div className="max-w-xl">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#B45309] block mb-1">
                      Share The Freshness
                    </span>
                    <h3 className="font-serif-heading text-2xl font-bold text-[#18181B] mb-2">
                      Give £10, Get £10 in FreshPoints
                    </h3>
                    <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                      Invite friends or neighbors in Hatfield to shop farm fresh groceries. They get £10 off their first order, and you get 200 FreshPoints credited automatically upon their first delivery.
                    </p>
                  </div>

                  <div className="flex items-center gap-3 w-full lg:w-auto">
                    <div className="px-4 py-2.5 bg-stone-100 rounded-xl font-mono text-sm font-bold text-stone-800 border border-stone-200 select-all">
                      ALEX-VARAM-2026
                    </div>
                    <button
                      type="button"
                      onClick={() => handleCopy('ALEX-VARAM-2026')}
                      className="px-5 py-2.5 rounded-xl bg-[#F5D103] hover:bg-[#E5A800] text-[#18181B] text-xs font-bold transition-all flex items-center gap-1.5 shadow-2xs cursor-pointer"
                    >
                      {copiedCode === 'ALEX-VARAM-2026' ? (
                        <>
                          <Check className="w-4 h-4" />
                          <span>Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" />
                          <span>Copy Link</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* VIEW 3: SAVED ADDRESSES */}
            {activeTab === 'addresses' && (
              <motion.div
                key="tab-addresses"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h3 className="font-serif-heading text-xl font-bold text-[#18181B]">
                      Saved Delivery Addresses
                    </h3>
                    <p className="text-xs text-stone-500">
                      Manage your home, campus, and office delivery destinations in Hertfordshire.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => showToast('Address creation form modal activated.')}
                    className="px-4 py-2.5 rounded-xl bg-[#245E4A] hover:bg-[#1B4A3A] text-white text-xs font-bold transition-all flex items-center gap-2 shadow-xs cursor-pointer self-start sm:self-auto"
                  >
                    <Plus className="w-4 h-4 text-[#F5D103]" />
                    <span>Add New Address</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {addresses.map((addr) => (
                    <div
                      key={addr.id}
                      className={`bg-white rounded-2xl p-6 border transition-all ${
                        addr.isDefault
                          ? 'border-[#245E4A] ring-2 ring-[#245E4A]/10 shadow-sm'
                          : 'border-stone-200 hover:border-stone-300'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <span className="font-bold text-sm text-[#18181B] flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-[#B45309]" />
                          {addr.label}
                        </span>
                        {addr.isDefault && (
                          <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-[#245E4A]/10 text-[#245E4A] border border-[#245E4A]/20">
                            Primary Default
                          </span>
                        )}
                      </div>

                      <div className="text-xs text-stone-600 space-y-1 mb-4 leading-relaxed">
                        <p className="font-semibold text-stone-800">{addr.fullName}</p>
                        <p>{addr.street}</p>
                        <p>{addr.city}</p>
                        <p className="font-mono font-bold text-stone-800">{addr.postcode}</p>
                        <p>{addr.country}</p>
                      </div>

                      {addr.instructions && (
                        <div className="bg-[#FAF9F6] border border-stone-200/80 rounded-xl p-3 text-[11px] text-stone-600 mb-5">
                          <span className="font-bold text-stone-800 block mb-0.5">
                            Delivery Notes:
                          </span>
                          {addr.instructions}
                        </div>
                      )}

                      <div className="flex items-center justify-between pt-3 border-t border-stone-100 text-xs">
                        {!addr.isDefault ? (
                          <button
                            type="button"
                            onClick={() => {
                              setAddresses(
                                addresses.map((a) => ({
                                  ...a,
                                  isDefault: a.id === addr.id,
                                }))
                              );
                              showToast(`Set "${addr.label}" as default address.`);
                            }}
                            className="text-[#245E4A] font-bold hover:underline cursor-pointer"
                          >
                            Set as Default
                          </button>
                        ) : (
                          <span className="text-[11px] text-stone-400">Default for fast checkout</span>
                        )}

                        <button
                          type="button"
                          onClick={() => showToast(`Editing address "${addr.label}"`)}
                          className="text-stone-500 hover:text-stone-800 font-semibold cursor-pointer"
                        >
                          Edit
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* VIEW 4: DIETARY & SOURCING PREFERENCES */}
            {activeTab === 'preferences' && (
              <motion.div
                key="tab-preferences"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.2 }}
                className="bg-white border border-stone-200 rounded-3xl p-6 sm:p-8 space-y-6"
              >
                <div>
                  <h3 className="font-serif-heading text-xl font-bold text-[#18181B] mb-1">
                    Personalized Grocery Preferences
                  </h3>
                  <p className="text-xs text-stone-500">
                    Set your dietary guidelines to automatically highlight relevant badges across all product catalogues.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    {
                      id: 'organicPriority',
                      title: '100% Certified Organic Priority',
                      desc: 'Highlight soil association certified organic harvest and pasture produce first.',
                      key: 'organicPriority' as const,
                    },
                    {
                      id: 'vegetarianVegan',
                      title: 'Vegetarian & Plant-Based Focus',
                      desc: 'Filter suggestions towards seasonal vegetables, pulses, and dairy-free alternatives.',
                      key: 'vegetarianVegan' as const,
                    },
                    {
                      id: 'glutenFree',
                      title: 'Gluten-Free Filtering',
                      desc: 'Display clear gluten-free safe flags on all bakery, grains, and pantry goods.',
                      key: 'glutenFree' as const,
                    },
                    {
                      id: 'nutAllergyAlert',
                      title: 'Strict Nut Allergy Warnings',
                      desc: 'Highlight alert banners if any chosen items share packing facility with tree nuts.',
                      key: 'nutAllergyAlert' as const,
                    },
                    {
                      id: 'britishGrownOnly',
                      title: 'Local British Farms First',
                      desc: 'Prioritize Hertfordshire, Kent, and Lincolnshire farm harvests.',
                      key: 'britishGrownOnly' as const,
                    },
                    {
                      id: 'plasticFreePackaging',
                      title: 'Zero-Plastic Packaging Only',
                      desc: 'Request 100% biodegradable cornstarch bags and recyclable cardboard berry punnets.',
                      key: 'plasticFreePackaging' as const,
                    },
                  ].map((item) => {
                    const isChecked = dietaryPrefs[item.key];
                    return (
                      <div
                        key={item.id}
                        className="p-4 rounded-2xl border border-stone-200 hover:border-stone-300 transition-colors flex items-start justify-between gap-4"
                      >
                        <div>
                          <div className="text-sm font-bold text-[#18181B] mb-0.5">
                            {item.title}
                          </div>
                          <p className="text-xs text-stone-500 leading-relaxed">
                            {item.desc}
                          </p>
                        </div>

                        <button
                          type="button"
                          role="switch"
                          aria-checked={isChecked}
                          onClick={() => {
                            setDietaryPrefs({
                              ...dietaryPrefs,
                              [item.key]: !isChecked,
                            });
                            showToast(`Updated preference: ${item.title}`);
                          }}
                          className={`w-11 h-6 rounded-full transition-colors relative shrink-0 cursor-pointer ${
                            isChecked ? 'bg-[#245E4A]' : 'bg-stone-200'
                          }`}
                        >
                          <span
                            className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-transform ${
                              isChecked ? 'left-6' : 'left-1'
                            }`}
                          />
                        </button>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* VIEW 5: ACCOUNT & SECURITY SETTINGS */}
            {activeTab === 'settings' && (
              <motion.div
                key="tab-settings"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                {/* Personal Information Form */}
                <div className="bg-white border border-stone-200 rounded-3xl p-6 sm:p-8">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="font-serif-heading text-xl font-bold text-[#18181B]">
                        Personal Profile Details
                      </h3>
                      <p className="text-xs text-stone-500">
                        Update your contact info for order invoices and driver SMS alerts.
                      </p>
                    </div>

                    {!isEditingProfile && (
                      <button
                        type="button"
                        onClick={() => setIsEditingProfile(true)}
                        className="px-4 py-2 rounded-xl border border-stone-200 hover:bg-stone-50 text-xs font-bold text-stone-800 transition-colors cursor-pointer"
                      >
                        Edit Details
                      </button>
                    )}
                  </div>

                  <form onSubmit={handleSaveProfile} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-stone-700 mb-1.5">
                          First Name
                        </label>
                        <input
                          type="text"
                          disabled={!isEditingProfile}
                          value={profile.firstName}
                          onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl border border-stone-200 bg-stone-50 disabled:bg-stone-100 disabled:text-stone-600 text-xs text-[#18181B] focus:outline-none focus:ring-1 focus:ring-[#245E4A] focus:bg-white"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-stone-700 mb-1.5">
                          Last Name
                        </label>
                        <input
                          type="text"
                          disabled={!isEditingProfile}
                          value={profile.lastName}
                          onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl border border-stone-200 bg-stone-50 disabled:bg-stone-100 disabled:text-stone-600 text-xs text-[#18181B] focus:outline-none focus:ring-1 focus:ring-[#245E4A] focus:bg-white"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-stone-700 mb-1.5">
                          Email Address
                        </label>
                        <input
                          type="email"
                          disabled={!isEditingProfile}
                          value={profile.email}
                          onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl border border-stone-200 bg-stone-50 disabled:bg-stone-100 disabled:text-stone-600 text-xs text-[#18181B] focus:outline-none focus:ring-1 focus:ring-[#245E4A] focus:bg-white"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-stone-700 mb-1.5">
                          UK Mobile Phone Number
                        </label>
                        <input
                          type="tel"
                          disabled={!isEditingProfile}
                          value={profile.phone}
                          onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl border border-stone-200 bg-stone-50 disabled:bg-stone-100 disabled:text-stone-600 text-xs text-[#18181B] focus:outline-none focus:ring-1 focus:ring-[#245E4A] focus:bg-white"
                        />
                      </div>
                    </div>

                    {isEditingProfile && (
                      <div className="flex items-center gap-3 pt-2">
                        <button
                          type="submit"
                          className="px-5 py-2.5 rounded-xl bg-[#245E4A] hover:bg-[#1B4A3A] text-white text-xs font-bold transition-all cursor-pointer shadow-xs"
                        >
                          Save Changes
                        </button>
                        <button
                          type="button"
                          onClick={() => setIsEditingProfile(false)}
                          className="px-4 py-2.5 rounded-xl border border-stone-200 text-stone-600 hover:bg-stone-100 text-xs font-semibold cursor-pointer"
                        >
                          Cancel
                        </button>
                      </div>
                    )}
                  </form>
                </div>

                {/* Notification Preferences */}
                <div className="bg-white border border-stone-200 rounded-3xl p-6 sm:p-8 space-y-4">
                  <div>
                    <h3 className="font-serif-heading text-xl font-bold text-[#18181B] mb-1">
                      Delivery Notification Channels
                    </h3>
                    <p className="text-xs text-stone-500">
                      Stay informed when your morning organic produce departs Hatfield Hub.
                    </p>
                  </div>

                  <div className="divide-y divide-stone-100">
                    {[
                      {
                        key: 'smsDeliveryAlerts' as const,
                        label: 'SMS Text Dispatch Updates',
                        desc: 'Receive automated SMS when the electric delivery van enters your postcode.',
                      },
                      {
                        key: 'whatsappDriverLive' as const,
                        label: 'WhatsApp Driver ETA & Gate Chime',
                        desc: 'Live 15-minute delivery window alert on your smartphone.',
                      },
                      {
                        key: 'seasonalPromoAlerts' as const,
                        label: 'FreshPoints Expiry & Flash Crop Drops',
                        desc: 'Timely reminders before your seasonal vouchers or bonus credits expire.',
                      },
                    ].map((item) => (
                      <div key={item.key} className="py-3.5 flex items-center justify-between gap-4">
                        <div>
                          <p className="text-xs font-bold text-[#18181B]">{item.label}</p>
                          <p className="text-[11px] text-stone-500">{item.desc}</p>
                        </div>
                        <input
                          type="checkbox"
                          checked={notifications[item.key]}
                          onChange={(e) => {
                            setNotifications({
                              ...notifications,
                              [item.key]: e.target.checked,
                            });
                            showToast(`Updated notification preference for ${item.label}`);
                          }}
                          className="w-4 h-4 rounded text-[#245E4A] focus:ring-[#245E4A] cursor-pointer"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Payment Methods */}
                <div className="bg-white border border-stone-200 rounded-3xl p-6 sm:p-8 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-serif-heading text-xl font-bold text-[#18181B] mb-1">
                        Saved Payment Methods
                      </h3>
                      <p className="text-xs text-stone-500">
                        Encrypted 256-bit SSL secured payments for one-touch ordering.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => showToast('Opening secure card tokenization portal...')}
                      className="px-3.5 py-2 rounded-xl border border-stone-200 hover:bg-stone-50 text-xs font-bold text-[#18181B] cursor-pointer"
                    >
                      + Add New Card
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <div className="border border-[#245E4A] rounded-2xl p-4 bg-[#FAF9F6] flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-7 rounded-lg bg-[#18181B] text-white flex items-center justify-center font-bold text-[10px]">
                          VISA
                        </div>
                        <div>
                          <p className="text-xs font-bold text-stone-900">Visa Debit •••• 4821</p>
                          <p className="text-[10px] text-stone-500">Expires 08/28 • Default</p>
                        </div>
                      </div>
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-[#245E4A]/10 text-[#245E4A]">
                        Default
                      </span>
                    </div>

                    <div className="border border-stone-200 rounded-2xl p-4 bg-white flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-7 rounded-lg bg-stone-100 border border-stone-200 text-stone-800 flex items-center justify-center font-bold text-[10px]">
                          APPLE
                        </div>
                        <div>
                          <p className="text-xs font-bold text-stone-900">Apple Pay Express</p>
                          <p className="text-[10px] text-stone-500">Linked to Touch ID</p>
                        </div>
                      </div>
                      <span className="text-[11px] text-stone-400">Active</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* 5. Invoice Modal Popup */}
      {selectedInvoiceOrder && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-stone-200 relative animate-scaleUp">
            <div className="flex items-center justify-between pb-4 border-b border-stone-100">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-widest text-[#B45309] block">
                  Official VAT Invoice
                </span>
                <h3 className="font-serif-heading text-xl font-bold text-[#18181B]">
                  Order #{selectedInvoiceOrder.id}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedInvoiceOrder(null)}
                className="w-8 h-8 rounded-full bg-stone-100 text-stone-600 hover:bg-stone-200 flex items-center justify-center transition-colors cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="py-4 space-y-3 text-xs text-stone-600 border-b border-stone-100">
              <div className="flex justify-between">
                <span>Date:</span>
                <span className="font-semibold text-stone-800">{selectedInvoiceOrder.date}</span>
              </div>
              <div className="flex justify-between">
                <span>Customer:</span>
                <span className="font-semibold text-stone-800">Alex Mercer</span>
              </div>
              <div className="flex justify-between">
                <span>Destination:</span>
                <span className="font-semibold text-stone-800">{selectedInvoiceOrder.deliveryAddress}</span>
              </div>
              <div className="flex justify-between">
                <span>Payment Method:</span>
                <span className="font-semibold text-stone-800">Visa Debit •••• 4821</span>
              </div>
            </div>

            {/* Items table */}
            <div className="py-4 space-y-2.5 max-h-48 overflow-y-auto">
              {selectedInvoiceOrder.items.map((item) => (
                <div key={item.product.id} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-stone-800">×{item.quantity}</span>
                    <span className="text-stone-700">{item.product.name}</span>
                  </div>
                  <span className="font-mono font-bold text-stone-900">
                    £{(item.product.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-stone-200 flex items-center justify-between">
              <span className="font-bold text-stone-900 text-sm">Total Paid (VAT incl.):</span>
              <span className="font-extrabold text-lg text-[#18181B]">
                £{selectedInvoiceOrder.total.toFixed(2)}
              </span>
            </div>

            <div className="mt-6 flex items-center gap-3">
              <button
                type="button"
                onClick={() => {
                  showToast(`Invoice for Order #${selectedInvoiceOrder.id} sent to ${profile.email}`);
                  setSelectedInvoiceOrder(null);
                }}
                className="flex-1 py-3 rounded-xl bg-[#F5D103] hover:bg-[#E5A800] text-[#18181B] text-xs font-bold transition-all shadow-xs cursor-pointer text-center"
              >
                Email PDF Receipt
              </button>
              <button
                type="button"
                onClick={() => setSelectedInvoiceOrder(null)}
                className="px-4 py-3 rounded-xl border border-stone-200 text-stone-600 hover:bg-stone-50 text-xs font-semibold cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
