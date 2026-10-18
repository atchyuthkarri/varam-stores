import React, { useState } from 'react';
import {
  MapPin,
  ChevronRight,
  Truck,
  Copy,
  Check,
  ShoppingBag,
  Plus,
  RefreshCw,
  ShieldCheck,
  FileText,
  Edit3,
  X,
  CreditCard,
  Printer,
  Store,
  Sparkles,
  User,
  Sliders,
  Award,
  ExternalLink,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { PieChart, Pie, Cell } from 'recharts';
import { useCart } from '../context/CartContext';
import { useNavigation } from '../context/NavigationContext';
import { products } from '../data/products';
import type { Product } from '../types';
import { Button } from '@/components/ui/button';
import './watermelon/bionis-dashboard/dashboard.css';

type AccountTab = 'overview' | 'orders' | 'addresses' | 'payments' | 'preferences' | 'profile';

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
  courierVan?: string;
  driverName?: string;
  paymentMethod: string;
}

export const UserAccountPage: React.FC = () => {
  const { addToCart, showToast, applyCoupon } = useCart();
  const { goToHome, goToShop } = useNavigation();

  const [activeTab, setActiveTab] = useState<AccountTab>('overview');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [selectedInvoiceOrder, setSelectedInvoiceOrder] = useState<OrderHistoryItem | null>(null);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isAddingAddress, setIsAddingAddress] = useState(false);
  const [isAddingCard, setIsAddingCard] = useState(false);

  // Profile data
  const [profile, setProfile] = useState({
    firstName: 'Atchyuth',
    lastName: 'Karri',
    email: 'atchyuth@varamfoods.co.uk',
    phone: '+44 7911 123456',
    memberSince: 'March 2024',
    loyaltyPoints: 1420,
    loyaltyTier: 'Gold Tier',
  });

  const [draftProfile, setDraftProfile] = useState({ ...profile });

  // Addresses data
  const [addresses, setAddresses] = useState([
    {
      id: 'addr-1',
      label: 'Home (Hatfield)',
      fullName: 'Atchyuth Karri',
      street: '14 College Lane',
      city: 'Hatfield',
      postcode: 'AL10 9AA',
      country: 'United Kingdom',
      isDefault: true,
      notes: 'Leave in porch if not in',
    },
    {
      id: 'addr-2',
      label: 'Office (St Albans)',
      fullName: 'Atchyuth Karri',
      street: 'Unit 4, St Albans Enterprise Hub',
      city: 'St Albans',
      postcode: 'AL1 3RR',
      country: 'United Kingdom',
      isDefault: false,
      notes: 'Reception desk drop-off',
    },
  ]);

  const [newAddressDraft, setNewAddressDraft] = useState({
    label: 'Home',
    fullName: 'Atchyuth Karri',
    street: '',
    city: 'Hatfield',
    postcode: 'AL10 9AB',
    country: 'United Kingdom',
    notes: '',
  });

  // Saved Cards data
  const [savedCards, setSavedCards] = useState([
    {
      id: 'card-1',
      type: 'Visa Debit',
      last4: '4242',
      expiry: '08/28',
      holder: 'ATCHYUTH KARRI',
      isDefault: true,
    },
    {
      id: 'card-2',
      type: 'Mastercard',
      last4: '8819',
      expiry: '11/27',
      holder: 'ATCHYUTH KARRI',
      isDefault: false,
    },
  ]);

  const [newCardDraft, setNewCardDraft] = useState({
    type: 'Visa Debit',
    cardNumber: '',
    expiry: '',
    holder: 'ATCHYUTH KARRI',
  });

  // Preferences toggles
  const [preferences, setPreferences] = useState({
    substitutePolicy: 'smart' as 'smart' | 'strict',
    ripeness: 'ready' as 'ready' | 'shelf_life',
    smsAlerts: true,
    emailInvoices: true,
    doorstepBell: true,
    ecoPackaging: true,
  });

  // Active Live Order
  const activeOrder: OrderHistoryItem = {
    id: 'VF-9842',
    date: 'Today, 18 Oct 2026',
    status: 'In Transit',
    total: 34.80,
    deliveryAddress: '14 College Lane, Hatfield, AL10 9AA',
    trackingCode: 'VAN-04-HTF',
    estimatedDelivery: 'Today, 5:30 PM - 7:30 PM',
    courierVan: 'Refrigerated Sprinter Van #04',
    driverName: 'David M. (Certified Driver)',
    paymentMethod: 'Apple Pay (•••• 4242)',
    items: [
      { product: products[0], quantity: 2 },
      { product: products[1], quantity: 1 },
      { product: products[2], quantity: 1 },
    ],
  };

  // Past Orders History
  const pastOrders: OrderHistoryItem[] = [
    {
      id: 'VF-8910',
      date: '12 Oct 2026',
      status: 'Delivered',
      total: 58.20,
      deliveryAddress: '14 College Lane, Hatfield, AL10 9AA',
      paymentMethod: 'Visa ending in 4242',
      items: [
        { product: products[3] || products[0], quantity: 1 },
        { product: products[4] || products[1], quantity: 3 },
      ],
    },
    {
      id: 'VF-7422',
      date: '28 Sep 2026',
      status: 'Delivered',
      total: 42.15,
      deliveryAddress: '14 College Lane, Hatfield, AL10 9AA',
      paymentMethod: 'Apple Pay',
      items: [
        { product: products[2] || products[0], quantity: 1 },
        { product: products[5] || products[1], quantity: 2 },
      ],
    },
  ];

  // Active Vouchers
  const vouchers = [
    { code: 'FRESH20', title: '20% OFF First Organic Basket', discount: '20% OFF', minSpend: 40, expires: 'Valid till 31 Oct' },
    { code: 'VARAM10', title: '£10 OFF Autumn Harvest', discount: '£10 OFF', minSpend: 50, expires: 'Valid till 15 Nov' },
    { code: 'HERTSFREE', title: 'Free Same-Day Delivery across Hertfordshire', discount: 'FREE DELIVERY', minSpend: 30, expires: 'Always active' },
  ];

  // Handlers
  const handleCopyCode = (code: string) => {
    navigator.clipboard?.writeText(code);
    setCopiedCode(code);
    applyCoupon(code);
    showToast(`Promo code ${code} copied & applied to your basket`);
    setTimeout(() => setCopiedCode(null), 2500);
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setProfile({ ...draftProfile });
    setIsEditingProfile(false);
    showToast('Profile information successfully saved');
  };

  const handleAddAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAddressDraft.street) return;
    const newAddr = {
      ...newAddressDraft,
      id: `addr-${Date.now()}`,
      isDefault: addresses.length === 0,
    };
    setAddresses((prev) => [...prev, newAddr]);
    setIsAddingAddress(false);
    setNewAddressDraft({
      label: 'Home',
      fullName: profile.firstName + ' ' + profile.lastName,
      street: '',
      city: 'Hatfield',
      postcode: 'AL10 9AB',
      country: 'United Kingdom',
      notes: '',
    });
    showToast('New delivery address saved');
  };

  const handleAddCard = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCardDraft.cardNumber) return;
    const newCard = {
      id: `card-${Date.now()}`,
      type: newCardDraft.type,
      last4: newCardDraft.cardNumber.slice(-4) || '8842',
      expiry: newCardDraft.expiry || '12/28',
      holder: newCardDraft.holder,
      isDefault: savedCards.length === 0,
    };
    setSavedCards((prev) => [...prev, newCard]);
    setIsAddingCard(false);
    showToast('New payment card safely saved');
  };

  const handleReorderItems = (order: OrderHistoryItem) => {
    order.items.forEach((item) => {
      addToCart(item.product, item.quantity);
    });
    showToast(`Added ${order.items.length} items from Order #${order.id} to your basket`);
  };

  return (
    <div className="bionis-dashboard min-h-[calc(100vh-4rem)] w-full bg-[#F8FAFC] text-[#18181B] flex flex-col lg:flex-row antialiased">
      {/* 1. Bionis Left Sidebar */}
      <aside className="w-full lg:w-72 xl:w-80 shrink-0 bg-[#F8FAFC] border-r border-stone-200 flex flex-col lg:sticky lg:top-14 sm:lg:top-16 lg:h-[calc(100vh-4rem)] lg:overflow-y-auto">
        {/* User Identity Header */}
        <div className="border-b border-stone-200/70 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#F5D103] text-[#18181B] flex items-center justify-center font-bold text-sm shadow-xs shrink-0">
              {profile.firstName[0]}{profile.lastName[0]}
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-extrabold text-sm text-[#18181B] leading-tight truncate">
                {profile.firstName} {profile.lastName}
              </span>
              <span className="text-[11px] font-bold text-[#B45309] truncate flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-[#D4A359]" />
                {profile.loyaltyTier} • {profile.loyaltyPoints} Pts
              </span>
            </div>
          </div>
        </div>

        {/* Navigation Modules */}
        <div className="p-3 flex-1">
          <div className="text-[10px] font-bold uppercase tracking-wider text-stone-500 px-2 mb-2">
            Account Workspace
          </div>
          <nav className="space-y-1">
            {[
              { id: 'overview', label: 'Dashboard Overview', icon: Award },
              { id: 'orders', label: 'Order History & Tracking', icon: ShoppingBag, badge: '1 Active' },
              { id: 'addresses', label: 'Saved UK Addresses', icon: MapPin, badge: `${addresses.length}` },
              { id: 'payments', label: 'Payments & VAT Invoicing', icon: CreditCard },
              { id: 'preferences', label: 'Grocery Preferences', icon: Sliders },
              { id: 'profile', label: 'Personal Details & Vouchers', icon: User, badge: `${vouchers.length} Deals` },
            ].map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveTab(item.id as AccountTab)}
                  className={`w-full flex items-center gap-3 h-11 px-3 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#F5D103] text-[#18181B] shadow-xs'
                      : 'text-[#18181B] hover:bg-stone-50 hover:text-[#B45309]'
                  }`}
                >
                  <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-[#B45309]' : 'text-stone-500'}`} />
                  <span className="truncate flex-1 text-left">{item.label}</span>
                  {item.badge && (
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        isActive
                          ? 'bg-[#18181B] text-[#F5D103]'
                          : 'bg-amber-100 text-[#B45309]'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="border-t border-stone-200/70 p-3 space-y-2 mt-auto">
          <button
            type="button"
            onClick={() => goToHome()}
            className="w-full flex items-center justify-between p-2.5 rounded-xl bg-white border border-stone-200 text-[#18181B] hover:bg-stone-50 hover:text-[#B45309] text-xs font-semibold transition-all cursor-pointer shadow-2xs"
          >
            <div className="flex items-center gap-2">
              <Store className="w-4 h-4 text-[#B45309]" />
              <span>Back to Storefront</span>
            </div>
            <ExternalLink className="w-3.5 h-3.5 text-stone-500" />
          </button>
        </div>
      </aside>

      {/* 2. Main Profile Workspace */}
      <div className="flex-1 flex flex-col min-w-0 bg-[#F8FAFC]">
        {/* Topbar */}
        <header className="sticky top-14 sm:top-16 z-20 bg-[#F8FAFC]/95 backdrop-blur-md border-b border-stone-200 px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-stone-500">
            <span className="font-semibold text-[#18181B]">Customer Profile</span>
            <ChevronRight className="w-3 h-3 text-stone-400" />
            <span className="capitalize font-bold text-[#B45309]">{activeTab}</span>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => goToShop()}
              className="h-9 rounded-xl border-stone-200 text-xs font-bold text-[#B45309] hover:bg-amber-100 shadow-2xs cursor-pointer"
            >
              <ShoppingBag className="w-3.5 h-3.5 mr-1.5" />
              <span>Browse Aisle Catalogue</span>
            </Button>
          </div>
        </header>

        {/* Content Pane - Natural Full Flow */}
        <div className="p-4 sm:p-6 lg:p-8 space-y-8 w-full">
          {/* TAB 1: OVERVIEW DASHBOARD */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Header Greeting Banner with Bionis Loyalty Score Ring */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center bg-white border border-stone-200 rounded-3xl p-6 sm:p-8 shadow-xs">
                <div className="lg:col-span-8 space-y-3">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 border border-amber-200/60 text-xs font-bold text-[#B45309]">
                    <Sparkles className="w-3.5 h-3.5 text-[#D4A359]" />
                    <span>Hertfordshire Local Member since {profile.memberSince}</span>
                  </div>
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-[#18181B] tracking-tight">
                    Welcome back, {profile.firstName}
                  </h1>
                  <p className="text-xs sm:text-sm text-stone-500 max-w-xl leading-relaxed">
                    Track live deliveries, manage saved Hatfield delivery addresses, customize fresh produce ripeness preferences, and access exclusive organic household discounts.
                  </p>
                </div>

                {/* Bionis Loyalty Donut Ring */}
                <div className="lg:col-span-4 flex items-center justify-center p-4 bg-stone-50 rounded-2xl border border-stone-200">
                  <div className="flex items-center gap-5">
                    <div className="relative w-20 h-20 shrink-0 flex items-center justify-center">
                      <PieChart width={80} height={80}>
                        <Pie
                          data={[
                            { name: 'Current Points', value: profile.loyaltyPoints },
                            { name: 'Points to VIP', value: 2000 - profile.loyaltyPoints },
                          ]}
                          cx={40}
                          cy={40}
                          innerRadius={28}
                          outerRadius={38}
                          startAngle={90}
                          endAngle={-270}
                          dataKey="value"
                          stroke="none"
                        >
                          <Cell fill="#F5D103" />
                          <Cell fill="#E2E8F0" />
                        </Pie>
                      </PieChart>
                      <div className="absolute inset-0 flex items-center justify-center font-bold text-xs text-[#B45309]">
                        71%
                      </div>
                    </div>
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-stone-500 block">
                        Varam Club Points
                      </span>
                      <span className="text-sm font-extrabold text-[#18181B]">
                        {profile.loyaltyPoints} / 2,000 Pts
                      </span>
                      <span className="text-[11px] text-[#B45309] block font-semibold">
                        580 pts to Platinum VIP
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Stat Metric Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { label: 'Completed Deliveries', value: '14 Orders', sub: '100% on-time delivery', icon: ShoppingBag },
                  { label: 'Cumulative Savings', value: '£38.40', sub: 'with Member pricing', icon: Sparkles },
                  { label: 'Carbon Offset', value: '14.2 kg CO₂', sub: 'via local Hertfordshire drop', icon: ShieldCheck },
                  { label: 'Active Delivery', value: '1 Package', sub: 'arriving this afternoon', icon: Truck },
                ].map((stat) => {
                  const Icon = stat.icon;
                  return (
                    <div key={stat.label} className="bg-white border border-stone-200 rounded-2xl p-5 shadow-2xs">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-semibold text-stone-500">{stat.label}</span>
                        <div className="w-8 h-8 rounded-xl bg-amber-100 text-[#B45309] flex items-center justify-center">
                          <Icon className="w-4 h-4" />
                        </div>
                      </div>
                      <div className="text-xl font-extrabold text-[#18181B] mb-1">{stat.value}</div>
                      <span className="text-xs text-[#B45309] font-medium">{stat.sub}</span>
                    </div>
                  );
                })}
              </div>

              {/* Active Delivery Live Tracking Card */}
              <div className="bg-white border-2 border-[#F5D103]/60 rounded-3xl p-6 sm:p-7 shadow-xs space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-stone-200">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-[#B45309] block mb-1">
                      Active Live Delivery • Order #{activeOrder.id}
                    </span>
                    <h3 className="text-xl font-extrabold text-[#18181B]">
                      Out for Delivery — Estimated {activeOrder.estimatedDelivery}
                    </h3>
                  </div>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-[#B45309] text-xs font-bold">
                    <span className="w-2 h-2 rounded-full bg-[#F5D103] animate-pulse" />
                    LIVE VAN DISPATCH
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                  <div className="p-3 bg-[#F8FAFC] rounded-xl border border-stone-200">
                    <span className="text-stone-500 block mb-0.5">Assigned Vehicle</span>
                    <strong className="text-[#18181B] block text-sm">{activeOrder.courierVan}</strong>
                    <span className="text-[11px] text-stone-500">Chilled storage active (3.2°C)</span>
                  </div>
                  <div className="p-3 bg-[#F8FAFC] rounded-xl border border-stone-200">
                    <span className="text-stone-500 block mb-0.5">Assigned Courier</span>
                    <strong className="text-[#18181B] block text-sm">{activeOrder.driverName}</strong>
                    <span className="text-[11px] text-stone-500">Hatfield delivery specialist</span>
                  </div>
                  <div className="p-3 bg-[#F8FAFC] rounded-xl border border-stone-200">
                    <span className="text-stone-500 block mb-0.5">Delivery Address</span>
                    <strong className="text-[#18181B] block truncate">{activeOrder.deliveryAddress}</strong>
                    <span className="text-[11px] text-[#B45309] font-semibold">Contactless doorstep delivery</span>
                  </div>
                </div>

                {/* Tracking Progress Bar */}
                <div className="pt-2">
                  <div className="flex items-center justify-between text-xs font-bold text-[#18181B] mb-2">
                    <span className="text-[#B45309]">1. Quality Checked</span>
                    <span className="text-[#B45309]">2. Chilled Packing</span>
                    <span className="text-[#B45309] font-extrabold">3. Out on Road (Van #04)</span>
                    <span className="text-stone-400">4. Arrived</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-stone-50 overflow-hidden">
                    <div className="h-full bg-[#F5D103] rounded-full w-[75%]" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: ORDER HISTORY & INVOICES */}
          {activeTab === 'orders' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-extrabold text-[#18181B]">Your Order History</h2>
                  <p className="text-xs text-stone-500">Full breakdown of past orders, item receipts, and one-click reordering</p>
                </div>
              </div>

              <div className="space-y-4">
                {[activeOrder, ...pastOrders].map((order) => (
                  <div key={order.id} className="bg-white border border-stone-200 rounded-2xl p-5 shadow-2xs space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-stone-200">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-sm text-[#18181B]">Order #{order.id}</span>
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-[#B45309]">
                            {order.status}
                          </span>
                        </div>
                        <span className="text-xs text-stone-500">{order.date} • Delivered to {order.deliveryAddress}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setSelectedInvoiceOrder(order)}
                          className="h-8 rounded-xl border-stone-200 text-xs font-semibold text-[#B45309] hover:bg-amber-100"
                        >
                          <FileText className="w-3.5 h-3.5 mr-1" />
                          View Receipt
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => handleReorderItems(order)}
                          className="h-8 rounded-xl bg-[#F5D103] hover:bg-[#E5A800] text-[#18181B] text-xs font-bold"
                        >
                          <RefreshCw className="w-3.5 h-3.5 mr-1" />
                          Reorder
                        </Button>
                      </div>
                    </div>

                    {/* Order items row */}
                    <div className="flex flex-wrap gap-3">
                      {order.items.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-2 p-1.5 rounded-xl bg-stone-50 border border-stone-200 text-xs">
                          <img src={item.product.image} alt={item.product.name} className="w-8 h-8 rounded-lg object-cover" />
                          <span className="font-semibold text-[#18181B]">{item.product.name}</span>
                          <span className="text-stone-500">×{item.quantity}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-stone-200 text-xs">
                      <span className="text-stone-500">Payment via: <strong>{order.paymentMethod}</strong></span>
                      <span className="font-extrabold text-sm text-[#18181B]">Total: £{order.total.toFixed(2)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: SAVED UK ADDRESSES */}
          {activeTab === 'addresses' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-extrabold text-[#18181B]">Saved UK Delivery Destinations</h2>
                  <p className="text-xs text-stone-500">Manage household and office delivery drop-off addresses</p>
                </div>
                <Button
                  onClick={() => setIsAddingAddress(true)}
                  className="bg-[#F5D103] hover:bg-[#E5A800] text-[#18181B] rounded-xl text-xs font-bold gap-1"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New Address</span>
                </Button>
              </div>

              {/* Add Address Form */}
              <AnimatePresence>
                {isAddingAddress && (
                  <motion.form
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    onSubmit={handleAddAddress}
                    className="p-5 rounded-2xl bg-white border border-stone-200 shadow-sm space-y-4 text-xs"
                  >
                    <div className="flex items-center justify-between pb-2 border-b border-stone-200">
                      <h4 className="font-bold text-sm text-[#18181B]">New UK Address Details</h4>
                      <button type="button" onClick={() => setIsAddingAddress(false)}>
                        <X className="w-4 h-4 text-stone-400" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="font-bold text-[#18181B] block mb-1">Address Nickname</label>
                        <input
                          type="text"
                          required
                          value={newAddressDraft.label}
                          onChange={(e) => setNewAddressDraft({ ...newAddressDraft, label: e.target.value })}
                          className="w-full p-2.5 rounded-xl border border-stone-200 bg-[#F8FAFC]"
                          placeholder="e.g. Hatfield Home"
                        />
                      </div>
                      <div>
                        <label className="font-bold text-[#18181B] block mb-1">UK Postcode</label>
                        <input
                          type="text"
                          required
                          value={newAddressDraft.postcode}
                          onChange={(e) => setNewAddressDraft({ ...newAddressDraft, postcode: e.target.value })}
                          className="w-full p-2.5 rounded-xl border border-stone-200 bg-[#F8FAFC]"
                          placeholder="e.g. AL10 9AB"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="font-bold text-[#18181B] block mb-1">Street Address</label>
                      <input
                        type="text"
                        required
                        value={newAddressDraft.street}
                        onChange={(e) => setNewAddressDraft({ ...newAddressDraft, street: e.target.value })}
                        className="w-full p-2.5 rounded-xl border border-stone-200 bg-[#F8FAFC]"
                        placeholder="House number, street name"
                      />
                    </div>

                    <div className="flex justify-end gap-2 pt-2">
                      <Button variant="outline" size="sm" onClick={() => setIsAddingAddress(false)}>
                        Cancel
                      </Button>
                      <Button type="submit" size="sm" className="bg-[#F5D103] hover:bg-[#E5A800] text-[#18181B] font-bold">
                        Save Address
                      </Button>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>

              {/* Addresses List */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {addresses.map((addr) => (
                  <div key={addr.id} className="p-5 rounded-2xl bg-white border border-stone-200 shadow-2xs space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-sm text-[#18181B]">{addr.label}</span>
                      {addr.isDefault && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-[#B45309]">
                          Default
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-stone-500 space-y-0.5">
                      <p className="font-semibold text-[#18181B]">{addr.fullName}</p>
                      <p>{addr.street}</p>
                      <p>{addr.city}, {addr.postcode}</p>
                      <p>{addr.country}</p>
                    </div>
                    {addr.notes && (
                      <p className="text-[11px] text-[#B45309] font-medium bg-amber-100 p-2 rounded-lg">
                        Note: {addr.notes}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: PAYMENTS & VAT INVOICING */}
          {activeTab === 'payments' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-extrabold text-[#18181B]">Payment Methods &amp; Invoicing</h2>
                  <p className="text-xs text-stone-500">Secure payment details and UK VAT 0% zero-rated grocery receipts</p>
                </div>
                <Button
                  onClick={() => setIsAddingCard(true)}
                  className="bg-[#F5D103] hover:bg-[#E5A800] text-[#18181B] rounded-xl text-xs font-bold gap-1"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Card</span>
                </Button>
              </div>

              {/* Saved Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {savedCards.map((card) => (
                  <div key={card.id} className="p-5 rounded-2xl bg-white border border-stone-200 shadow-2xs space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <CreditCard className="w-5 h-5 text-[#B45309]" />
                        <span className="font-bold text-sm text-[#18181B]">{card.type}</span>
                      </div>
                      {card.isDefault && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-[#B45309]">
                          Default
                        </span>
                      )}
                    </div>
                    <div className="font-mono text-base font-bold text-[#18181B] tracking-widest">
                      •••• •••• •••• {card.last4}
                    </div>
                    <div className="flex items-center justify-between text-xs text-stone-500">
                      <span>{card.holder}</span>
                      <span>Expires {card.expiry}</span>
                    </div>
                  </div>
                ))}

                <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200 flex items-center justify-between">
                  <div className="space-y-1">
                    <strong className="text-sm text-[#18181B] block">Apple Pay &amp; Google Pay</strong>
                    <p className="text-xs text-stone-500">Express 1-click biometric checkout enabled on this device</p>
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-100 text-[#B45309]">
                    Active
                  </span>
                </div>
              </div>

              {/* UK VAT Invoicing Guidance */}
              <div className="p-5 rounded-2xl bg-white border border-stone-200 text-xs text-stone-500 space-y-2">
                <h4 className="font-bold text-sm text-[#18181B]">UK VAT 0% Zero-Rated Food Policy</h4>
                <p>
                  Under HMRC UK Value Added Tax guidelines, staple uncooked groceries (fresh produce, flours, lentils, dairy, and grains) are zero-rated (0% VAT). Printable receipts with HMRC compliant itemized invoicing are automatically generated for each order.
                </p>
              </div>
            </div>
          )}

          {/* TAB 5: GROCERY PREFERENCES */}
          {activeTab === 'preferences' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-extrabold text-[#18181B]">Grocery &amp; Delivery Preferences</h2>
                <p className="text-xs text-stone-500">Custom rules for substitutions, produce ripeness, and driver instructions</p>
              </div>

              <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-2xs space-y-6 text-xs">
                {/* Out of stock rule */}
                <div className="pb-5 border-b border-stone-200 space-y-2">
                  <span className="font-bold text-sm text-[#18181B] block">Out-of-Stock Substitution Rules</span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    <label
                      onClick={() => setPreferences({ ...preferences, substitutePolicy: 'smart' })}
                      className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                        preferences.substitutePolicy === 'smart'
                          ? 'border-[#F5D103] bg-amber-100/60'
                          : 'border-stone-200 bg-[#F8FAFC]'
                      }`}
                    >
                      <strong className="text-[#18181B] block">Smart Substitute (Recommended)</strong>
                      <span className="text-stone-500">Replace with equal or higher value organic brand automatically.</span>
                    </label>
                    <label
                      onClick={() => setPreferences({ ...preferences, substitutePolicy: 'strict' })}
                      className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                        preferences.substitutePolicy === 'strict'
                          ? 'border-[#F5D103] bg-amber-100/60'
                          : 'border-stone-200 bg-[#F8FAFC]'
                      }`}
                    >
                      <strong className="text-[#18181B] block">Strictly No Substitutes</strong>
                      <span className="text-stone-500">Refund the item immediately if the exact brand is out of stock.</span>
                    </label>
                  </div>
                </div>

                {/* Ripeness preference */}
                <div className="pb-5 border-b border-stone-200 space-y-2">
                  <span className="font-bold text-sm text-[#18181B] block">Produce Ripeness Preference</span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    <label
                      onClick={() => setPreferences({ ...preferences, ripeness: 'ready' })}
                      className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                        preferences.ripeness === 'ready'
                          ? 'border-[#F5D103] bg-amber-100/60'
                          : 'border-stone-200 bg-[#F8FAFC]'
                      }`}
                    >
                      <strong className="text-[#18181B] block">Ready to Eat</strong>
                      <span className="text-stone-500">Selected fully ripe for dining tonight.</span>
                    </label>
                    <label
                      onClick={() => setPreferences({ ...preferences, ripeness: 'shelf_life' })}
                      className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                        preferences.ripeness === 'shelf_life'
                          ? 'border-[#F5D103] bg-amber-100/60'
                          : 'border-stone-200 bg-[#F8FAFC]'
                      }`}
                    >
                      <strong className="text-[#18181B] block">Longer Shelf Life</strong>
                      <span className="text-stone-500">Selected slightly firm to ripen throughout the week.</span>
                    </label>
                  </div>
                </div>

                {/* Notification toggles */}
                <div className="space-y-3">
                  <span className="font-bold text-sm text-[#18181B] block">Delivery Courier Guidelines</span>
                  {[
                    { key: 'doorstepBell', title: 'Ring Doorbell on Arrival', desc: 'Notify immediately when box is on porch' },
                    { key: 'ecoPackaging', title: 'Zero Plastic Eco-Crates', desc: 'Receive deliveries in returnable jute produce bags' },
                    { key: 'smsAlerts', title: 'SMS Live Van ETA Updates', desc: 'Receive real-time 15-minute delivery window ping' },
                  ].map((rule) => {
                    const isChecked = preferences[rule.key as keyof typeof preferences];
                    return (
                      <div
                        key={rule.key}
                        onClick={() => {
                          setPreferences({ ...preferences, [rule.key]: !isChecked });
                          showToast('Delivery preference saved');
                        }}
                        className="flex items-center justify-between p-3 rounded-xl bg-[#F8FAFC] border border-stone-200 cursor-pointer hover:border-[#F5D103]"
                      >
                        <div>
                          <strong className="text-[#18181B] block">{rule.title}</strong>
                          <span className="text-stone-500">{rule.desc}</span>
                        </div>
                        <div className={`w-10 h-6 rounded-full flex items-center p-0.5 transition-colors ${isChecked ? 'bg-[#F5D103]' : 'bg-stone-300'}`}>
                          <div className={`w-5 h-5 rounded-full bg-white transition-transform ${isChecked ? 'translate-x-4' : 'translate-x-0'}`} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: PERSONAL DETAILS & VOUCHERS */}
          {activeTab === 'profile' && (
            <div className="space-y-6">
              {/* Profile Details Form */}
              <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-2xs space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-stone-200">
                  <div>
                    <h3 className="font-bold text-base text-[#18181B]">Personal Details</h3>
                    <p className="text-xs text-stone-500">Account credentials and contact numbers for delivery drivers</p>
                  </div>
                  {!isEditingProfile ? (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setIsEditingProfile(true)}
                      className="border-stone-200 text-xs font-bold text-[#B45309]"
                    >
                      <Edit3 className="w-3.5 h-3.5 mr-1" />
                      Edit Details
                    </Button>
                  ) : (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setIsEditingProfile(false)}
                      className="text-xs font-bold"
                    >
                      Cancel
                    </Button>
                  )}
                </div>

                <form onSubmit={handleSaveProfile} className="space-y-3 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="font-bold text-[#18181B] block mb-1">First Name</label>
                      <input
                        type="text"
                        disabled={!isEditingProfile}
                        value={isEditingProfile ? draftProfile.firstName : profile.firstName}
                        onChange={(e) => setDraftProfile({ ...draftProfile, firstName: e.target.value })}
                        className="w-full p-2.5 rounded-xl border border-stone-200 bg-[#F8FAFC] disabled:opacity-75 font-semibold text-[#18181B]"
                      />
                    </div>
                    <div>
                      <label className="font-bold text-[#18181B] block mb-1">Last Name</label>
                      <input
                        type="text"
                        disabled={!isEditingProfile}
                        value={isEditingProfile ? draftProfile.lastName : profile.lastName}
                        onChange={(e) => setDraftProfile({ ...draftProfile, lastName: e.target.value })}
                        className="w-full p-2.5 rounded-xl border border-stone-200 bg-[#F8FAFC] disabled:opacity-75 font-semibold text-[#18181B]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="font-bold text-[#18181B] block mb-1">Email Address</label>
                      <input
                        type="email"
                        disabled={!isEditingProfile}
                        value={isEditingProfile ? draftProfile.email : profile.email}
                        onChange={(e) => setDraftProfile({ ...draftProfile, email: e.target.value })}
                        className="w-full p-2.5 rounded-xl border border-stone-200 bg-[#F8FAFC] disabled:opacity-75 font-semibold text-[#18181B]"
                      />
                    </div>
                    <div>
                      <label className="font-bold text-[#18181B] block mb-1">Mobile Phone (for driver)</label>
                      <input
                        type="tel"
                        disabled={!isEditingProfile}
                        value={isEditingProfile ? draftProfile.phone : profile.phone}
                        onChange={(e) => setDraftProfile({ ...draftProfile, phone: e.target.value })}
                        className="w-full p-2.5 rounded-xl border border-stone-200 bg-[#F8FAFC] disabled:opacity-75 font-semibold text-[#18181B]"
                      />
                    </div>
                  </div>

                  {isEditingProfile && (
                    <div className="pt-2 flex justify-end">
                      <Button type="submit" size="sm" className="bg-[#F5D103] hover:bg-[#E5A800] text-[#18181B] font-bold">
                        Save Changes
                      </Button>
                    </div>
                  )}
                </form>
              </div>

              {/* Active Vouchers Wallet */}
              <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-2xs space-y-4">
                <div>
                  <h3 className="font-bold text-base text-[#18181B]">Active Household Vouchers &amp; Promo Codes</h3>
                  <p className="text-xs text-stone-500">Apply directly to your basket with one click</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {vouchers.map((v) => (
                    <div key={v.code} className="p-4 rounded-xl bg-[#F8FAFC] border border-stone-200 flex flex-col justify-between space-y-3">
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-mono font-bold text-xs text-[#B45309]">{v.code}</span>
                          <span className="text-[10px] font-bold text-[#B45309] bg-amber-100 px-2 py-0.5 rounded-full">
                            {v.discount}
                          </span>
                        </div>
                        <p className="font-semibold text-xs text-[#18181B]">{v.title}</p>
                        <span className="text-[11px] text-stone-500 block mt-1">{v.expires}</span>
                      </div>
                      <Button
                        size="sm"
                        onClick={() => handleCopyCode(v.code)}
                        className="w-full bg-[#F5D103] hover:bg-[#E5A800] text-[#18181B] text-xs font-bold gap-1 rounded-xl"
                      >
                        {copiedCode === v.code ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copiedCode === v.code ? 'Applied!' : 'Apply Code'}</span>
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* RECEIPT / INVOICE MODAL */}
      <AnimatePresence>
        {selectedInvoiceOrder && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl max-w-lg w-full p-6 border border-stone-200 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between pb-3 border-b border-stone-200">
                <div>
                  <h3 className="font-bold text-base text-[#18181B]">Receipt &amp; Tax Invoice</h3>
                  <span className="text-xs text-stone-500">HMRC Zero-Rated Food Compliant</span>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedInvoiceOrder(null)}
                  className="p-1 rounded-full hover:bg-stone-100 cursor-pointer"
                >
                  <X className="w-5 h-5 text-stone-500" />
                </button>
              </div>

              <div className="space-y-3 text-xs">
                <div className="flex justify-between text-stone-500">
                  <span>Order Identifier:</span>
                  <strong className="text-[#18181B]">#{selectedInvoiceOrder.id}</strong>
                </div>
                <div className="flex justify-between text-stone-500">
                  <span>Order Date:</span>
                  <strong className="text-[#18181B]">{selectedInvoiceOrder.date}</strong>
                </div>
                <div className="flex justify-between text-stone-500">
                  <span>Delivery Address:</span>
                  <strong className="text-[#18181B] max-w-[220px] text-right truncate">
                    {selectedInvoiceOrder.deliveryAddress}
                  </strong>
                </div>

                <div className="pt-2 border-t border-stone-200 space-y-2">
                  <span className="font-bold text-[#18181B] block">Purchased Items:</span>
                  {selectedInvoiceOrder.items.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center py-1 border-b border-stone-100">
                      <div>
                        <span className="font-medium text-[#18181B]">{item.product.name}</span>
                        <span className="text-stone-500 ml-1.5">×{item.quantity}</span>
                      </div>
                      <span className="font-bold text-[#18181B]">£{(item.product.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-2 space-y-1">
                  <div className="flex justify-between text-stone-500">
                    <span>Zero-Rated Food VAT (0%):</span>
                    <span>£0.00</span>
                  </div>
                  <div className="flex justify-between text-stone-500">
                    <span>Same-day Hertfordshire Delivery:</span>
                    <span className="text-[#B45309] font-bold">FREE</span>
                  </div>
                  <div className="flex justify-between text-sm font-extrabold text-[#18181B] pt-2 border-t border-stone-200">
                    <span>Total Paid:</span>
                    <span>£{selectedInvoiceOrder.total.toFixed(2)}</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-stone-200">
                  <Button
                    onClick={() => window.print?.()}
                    className="w-full bg-[#F5D103] hover:bg-[#E5A800] text-[#18181B] text-xs font-bold rounded-xl gap-1.5"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>Print Receipt</span>
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        )}

        {/* ADD CARD MODAL */}
        {isAddingCard && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl max-w-md w-full p-6 border border-stone-200 shadow-2xl space-y-4"
            >
              <div className="flex items-center justify-between pb-3 border-b border-stone-200">
                <h3 className="font-bold text-base text-[#18181B]">Add Payment Card</h3>
                <button
                  type="button"
                  onClick={() => setIsAddingCard(false)}
                  className="p-1 rounded-full hover:bg-stone-100 cursor-pointer"
                >
                  <X className="w-5 h-5 text-stone-500" />
                </button>
              </div>

              <form onSubmit={handleAddCard} className="space-y-3 text-xs">
                <div>
                  <label className="font-bold text-[#18181B] mb-1 block">Cardholder Name</label>
                  <input
                    type="text"
                    required
                    value={newCardDraft.holder}
                    onChange={(e) => setNewCardDraft({ ...newCardDraft, holder: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-stone-200 bg-[#F8FAFC] focus:outline-none focus:border-[#F5D103]"
                  />
                </div>
                <div>
                  <label className="font-bold text-[#18181B] mb-1 block">Card Number</label>
                  <input
                    type="text"
                    required
                    placeholder="4532 •••• •••• 8842"
                    value={newCardDraft.cardNumber}
                    onChange={(e) => setNewCardDraft({ ...newCardDraft, cardNumber: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-stone-200 bg-[#F8FAFC] focus:outline-none focus:border-[#F5D103]"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold text-[#18181B] mb-1 block">Expiry Date</label>
                    <input
                      type="text"
                      placeholder="MM/YY"
                      value={newCardDraft.expiry}
                      onChange={(e) => setNewCardDraft({ ...newCardDraft, expiry: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-stone-200 bg-[#F8FAFC] focus:outline-none focus:border-[#F5D103]"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-[#18181B] mb-1 block">Card Type</label>
                    <select
                      value={newCardDraft.type}
                      onChange={(e) => setNewCardDraft({ ...newCardDraft, type: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-stone-200 bg-[#F8FAFC] focus:outline-none focus:border-[#F5D103]"
                    >
                      <option value="Visa Debit">Visa Debit</option>
                      <option value="Mastercard">Mastercard</option>
                      <option value="American Express">American Express</option>
                    </select>
                  </div>
                </div>

                <div className="pt-3 border-t border-stone-200 flex gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsAddingCard(false)}
                    className="flex-1 rounded-xl text-xs"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="flex-1 bg-[#F5D103] hover:bg-[#E5A800] text-[#18181B] rounded-xl text-xs font-bold"
                  >
                    Save Card
                  </Button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
