import React, { useState, useMemo } from 'react';
import {
  ShoppingBag,
  Package,
  Layers,
  Users,
  BarChart3,
  ShieldCheck,
  AlertTriangle,
  Search,
  Plus,
  TrendingUp,
  Truck,
  CheckCircle2,
  X,
  Mail,
  MessageSquare,
  Phone,
  Printer,
  RefreshCw,
  Edit3,
  Store,
  DollarSign,
  Send,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { useNavigation } from '../context/NavigationContext';
import { products as initialProductsData } from '../data/products';
import { categories as initialCategoriesData } from '../data/categories';
import {
  initialOrders,
  initialCustomers,
  initialStaff,
  initialInventory,
  initialSuppliers,
  weeklyRevenueData,
  categorySalesDistribution,
  type AdminOrder,
  type AdminCustomer,
  type AdminStaff,
  type AdminInventoryItem,
  type AdminSupplier,
} from '../data/adminMockData';

type AdminTab =
  | 'overview'
  | 'orders'
  | 'products'
  | 'inventory'
  | 'customers'
  | 'staff';

export const AdminPortalPage: React.FC = () => {
  const { goToHome } = useNavigation();
  const { showToast } = useCart();

  // Active Admin Tab
  const [activeTab, setActiveTab] = useState<AdminTab>('overview');

  // Role Simulator (Test Interface as Different Staff Personas)
  const [currentRole, setCurrentRole] = useState<'Store Manager' | 'Dispatch Lead' | 'Warehouse Picker' | 'Customer Support'>('Store Manager');

  // Master State
  const [orders, setOrders] = useState<AdminOrder[]>(initialOrders);
  const [customers, setCustomers] = useState<AdminCustomer[]>(initialCustomers);
  const [inventory, setInventory] = useState<AdminInventoryItem[]>(initialInventory);
  const [staffList, setStaffList] = useState<AdminStaff[]>(initialStaff);
  const [suppliers] = useState<AdminSupplier[]>(initialSuppliers);
  const [productsList, setProductsList] = useState(initialProductsData);
  const [categoriesList, setCategoriesList] = useState(initialCategoriesData);

  // Time Range Filter for Analytics
  const [analyticsTimeRange, setAnalyticsTimeRange] = useState<'today' | '7days' | 'month' | 'year'>('7days');

  // Search & Filters State
  const [orderSearchQuery, setOrderSearchQuery] = useState('');
  const [orderStatusFilter, setOrderStatusFilter] = useState<'all' | 'pending' | 'packing' | 'in_transit' | 'delivered' | 'cancelled'>('all');

  const [productSearchQuery, setProductSearchQuery] = useState('');
  const [productCategoryFilter, setProductCategoryFilter] = useState<string>('all');

  const [customerSearchQuery, setCustomerSearchQuery] = useState('');
  const [customerStatusFilter, setCustomerStatusFilter] = useState<'all' | 'active' | 'vip' | 'flagged'>('all');

  const [inventoryFilter, setInventoryFilter] = useState<'all' | 'low_stock' | 'out_of_stock'>('all');

  // Modal Dialog States
  const [selectedOrderForDetail, setSelectedOrderForDetail] = useState<AdminOrder | null>(null);
  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);
  const [editingProductId, setEditingProductId] = useState<string | null>(null);

  const [isCreatePOModalOpen, setIsCreatePOModalOpen] = useState(false);
  const [selectedInventoryItemForPO, setSelectedInventoryItemForPO] = useState<AdminInventoryItem | null>(null);

  const [isMessageCustomerModalOpen, setIsMessageCustomerModalOpen] = useState(false);
  const [selectedCustomerForMessage, setSelectedCustomerForMessage] = useState<AdminCustomer | null>(null);

  const [isInviteStaffModalOpen, setIsInviteStaffModalOpen] = useState(false);
  const [isManageCategoriesOpen, setIsManageCategoriesOpen] = useState(false);

  // Forms Draft State
  const [newProductDraft, setNewProductDraft] = useState({
    name: '',
    category: 'vegetables',
    categoryLabel: 'Vegetables & Fruits',
    price: 3.50,
    originalPrice: 4.20,
    unit: '500 g',
    image: '/product-spinach.jpg',
    inStock: true,
    isOrganic: true,
    badge: 'FRESH PICK',
  });

  const [newPODraft, setNewPODraft] = useState({
    supplierId: 'SUP-01',
    quantity: 50,
    deliveryDate: 'Tomorrow, 08:00 AM',
    notes: 'Urgent weekend restock order',
  });

  const [messageDraft, setMessageDraft] = useState({
    channel: 'whatsapp' as 'whatsapp' | 'sms' | 'email',
    template: 'eta_update',
    subject: 'Your Varam Foods Delivery Update',
    body: 'Hello! Your fresh grocery order is packed and will arrive in our temperature-controlled van shortly.',
  });

  const [inviteStaffDraft, setInviteStaffDraft] = useState({
    name: '',
    email: '',
    role: 'Warehouse Picker' as 'Store Manager' | 'Dispatch Lead' | 'Warehouse Picker' | 'Customer Support',
  });

  // Critical Low Stock Count
  const lowStockCount = useMemo(() => {
    return inventory.filter((item) => item.status !== 'in_stock').length;
  }, [inventory]);

  // Filtered Orders
  const filteredOrders = useMemo(() => {
    return orders.filter((o) => {
      const matchesSearch =
        o.id.toLowerCase().includes(orderSearchQuery.toLowerCase()) ||
        o.customerName.toLowerCase().includes(orderSearchQuery.toLowerCase()) ||
        o.customerPostcode.toLowerCase().includes(orderSearchQuery.toLowerCase());
      const matchesStatus = orderStatusFilter === 'all' || o.status === orderStatusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [orders, orderSearchQuery, orderStatusFilter]);

  // Filtered Products
  const filteredProducts = useMemo(() => {
    return productsList.filter((p) => {
      const matchesSearch =
        p.name.toLowerCase().includes(productSearchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(productSearchQuery.toLowerCase());
      const matchesCategory = productCategoryFilter === 'all' || p.category === productCategoryFilter;
      return matchesSearch && matchesCategory;
    });
  }, [productsList, productSearchQuery, productCategoryFilter]);

  // Filtered Customers
  const filteredCustomers = useMemo(() => {
    return customers.filter((c) => {
      const matchesSearch =
        c.name.toLowerCase().includes(customerSearchQuery.toLowerCase()) ||
        c.email.toLowerCase().includes(customerSearchQuery.toLowerCase()) ||
        c.postcode.toLowerCase().includes(customerSearchQuery.toLowerCase());
      const matchesStatus = customerStatusFilter === 'all' || c.status === customerStatusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [customers, customerSearchQuery, customerStatusFilter]);

  // Filtered Inventory
  const filteredInventory = useMemo(() => {
    return inventory.filter((item) => {
      if (inventoryFilter === 'low_stock') return item.status === 'low_stock';
      if (inventoryFilter === 'out_of_stock') return item.status === 'out_of_stock';
      return true;
    });
  }, [inventory, inventoryFilter]);

  // Handlers
  const handleUpdateOrderStatus = (orderId: string, newStatus: AdminOrder['status']) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
    );
    showToast(`Order #${orderId} status changed to "${newStatus.replace('_', ' ').toUpperCase()}"`);
  };

  const handleAssignDriver = (orderId: string, van: string, driver: string) => {
    setOrders((prev) =>
      prev.map((o) =>
        o.id === orderId
          ? { ...o, assignedVan: van, assignedDriver: driver, status: 'in_transit' }
          : o
      )
    );
    showToast(`Order #${orderId} assigned to driver ${driver} (${van})`);
  };

  const handleToggleProductStock = (productId: string) => {
    setProductsList((prev) =>
      prev.map((p) => (p.id === productId ? { ...p, inStock: !p.inStock } : p))
    );
    showToast('Product stock status updated');
  };

  const handleQuickRestock = (itemId: string, addCount: number) => {
    setInventory((prev) =>
      prev.map((item) => {
        if (item.id === itemId) {
          const updatedStock = item.currentStock + addCount;
          const updatedStatus =
            updatedStock === 0
              ? 'out_of_stock'
              : updatedStock <= item.reorderPoint
                ? 'low_stock'
                : 'in_stock';
          return {
            ...item,
            currentStock: updatedStock,
            status: updatedStatus,
            lastRestocked: 'Just now (Quick Add)',
          };
        }
        return item;
      })
    );
    showToast(`Added +${addCount} units to inventory`);
  };

  const handleCreatePOSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedInventoryItemForPO) return;

    handleQuickRestock(selectedInventoryItemForPO.id, newPODraft.quantity);
    setIsCreatePOModalOpen(false);
    showToast(
      `Purchase Order created! Sent to supplier for ${newPODraft.quantity} units of ${selectedInventoryItemForPO.name}`
    );
  };

  const handleToggleCustomerStatus = (customerId: string) => {
    setCustomers((prev) =>
      prev.map((c) => {
        if (c.id === customerId) {
          const nextStatus: AdminCustomer['status'] =
            c.status === 'active' ? 'vip' : c.status === 'vip' ? 'flagged' : 'active';
          return { ...c, status: nextStatus };
        }
        return c;
      })
    );
    showToast('Customer tier updated');
  };

  const handleAddCategory = () => {
    const newName = prompt('Enter new department name:');
    if (!newName || !newName.trim()) return;
    const cleanName = newName.trim();
    const newId = cleanName.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    setCategoriesList((prev) => [
      ...prev,
      {
        id: newId,
        name: cleanName,
        itemCount: '0 Items',
        image: '/product-spinach.jpg',
        accentBg: 'bg-emerald-50',
        subcategories: ['General Staples'],
      },
    ]);
    showToast(`Department "${cleanName}" added to taxonomy`);
  };

  const handleAddProductSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (editingProductId) {
      setProductsList((prev) =>
        prev.map((p) =>
          p.id === editingProductId
            ? {
              ...p,
              name: newProductDraft.name,
              price: Number(newProductDraft.price),
              originalPrice: Number(newProductDraft.originalPrice),
              category: newProductDraft.category,
              categoryLabel: newProductDraft.categoryLabel,
              unit: newProductDraft.unit,
              badge: newProductDraft.badge,
              inStock: newProductDraft.inStock,
              isOrganic: newProductDraft.isOrganic,
            }
            : p
        )
      );
      setEditingProductId(null);
      setIsAddProductModalOpen(false);
      showToast(`Product "${newProductDraft.name}" updated successfully!`);
      return;
    }

    const newProduct = {
      id: `prod-${Date.now()}`,
      name: newProductDraft.name,
      price: Number(newProductDraft.price),
      originalPrice: Number(newProductDraft.originalPrice),
      image: newProductDraft.image,
      category: newProductDraft.category,
      categoryLabel: newProductDraft.categoryLabel,
      rating: 4.8,
      reviewsCount: 1,
      badge: newProductDraft.badge,
      inStock: newProductDraft.inStock,
      unit: newProductDraft.unit,
      isOrganic: newProductDraft.isOrganic,
      description: 'Handpicked fresh grocery item sourced from approved suppliers.',
    };

    setProductsList((prev) => [newProduct, ...prev]);

    // Also add to inventory catalog
    setInventory((prev) => [
      {
        id: `INV-${Date.now()}`,
        sku: `VRM-${newProductDraft.name.slice(0, 3).toUpperCase()}-NEW`,
        name: newProductDraft.name,
        category: newProductDraft.categoryLabel,
        currentStock: 40,
        reorderPoint: 15,
        optimalStock: 80,
        unitCost: Number((newProductDraft.price * 0.65).toFixed(2)),
        retailPrice: Number(newProductDraft.price),
        supplier: 'Hertfordshire Organic Growers',
        status: 'in_stock',
        lastRestocked: 'Today',
        unit: newProductDraft.unit,
      },
      ...prev,
    ]);

    setIsAddProductModalOpen(false);
    showToast(`Product "${newProductDraft.name}" added to catalogue and inventory!`);
    setNewProductDraft({
      name: '',
      category: 'vegetables',
      categoryLabel: 'Vegetables & Fruits',
      price: 3.50,
      originalPrice: 4.20,
      unit: '500 g',
      image: '/product-spinach.jpg',
      inStock: true,
      isOrganic: true,
      badge: 'FRESH PICK',
    });
  };

  const handleSendMessageSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCustomerForMessage) return;
    setIsMessageCustomerModalOpen(false);
    showToast(
      `Message dispatched via ${messageDraft.channel.toUpperCase()} to ${selectedCustomerForMessage.name} (${selectedCustomerForMessage.phone})`
    );
  };

  const handleInviteStaffSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newStaff: AdminStaff = {
      id: `STAFF-0${staffList.length + 1}`,
      name: inviteStaffDraft.name,
      email: inviteStaffDraft.email,
      role: inviteStaffDraft.role,
      permissions:
        inviteStaffDraft.role === 'Store Manager'
          ? ['full_access', 'financials', 'user_management']
          : inviteStaffDraft.role === 'Dispatch Lead'
            ? ['orders_dispatch', 'fleet_management']
            : inviteStaffDraft.role === 'Warehouse Picker'
              ? ['inventory_read', 'barcode_picking']
              : ['customer_messaging', 'order_status'],
      status: 'active',
      lastActive: 'Invitation sent (Pending 2FA)',
    };

    setStaffList((prev) => [...prev, newStaff]);
    setIsInviteStaffModalOpen(false);
    showToast(`Staff invite sent to ${inviteStaffDraft.email} as "${inviteStaffDraft.role}"`);
    setInviteStaffDraft({ name: '', email: '', role: 'Warehouse Picker' });
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#18181B] font-sans antialiased">
      {/* ========================================================================= */}
      {/* 1. TOP GLOBAL ADMIN CONTROL BAR                                           */}
      {/* ========================================================================= */}
      <header className="sticky top-0 z-40 bg-[#18181B] text-white border-b border-stone-800 shadow-md">
        <div className="w-full px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-4">
          {/* Logo & Portal Identifier */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#F5D103] text-[#18181B] flex items-center justify-center font-extrabold text-base shadow-sm shrink-0">
              VF
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold tracking-tight text-sm sm:text-base">
                  Varam Foods
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-stone-800 text-[#F5D103] border border-stone-700 tracking-wider uppercase">
                  Admin Hub
                </span>
              </div>
              <span className="text-[11px] text-stone-400 hidden sm:inline-block">
                Hertfordshire Central Operations Portal
              </span>
            </div>
          </div>

          {/* Quick Stat Pill & Low Stock Alert */}
          <div className="hidden lg:flex items-center gap-3 text-xs">
            {lowStockCount > 0 && (
              <button
                type="button"
                onClick={() => {
                  setActiveTab('inventory');
                  setInventoryFilter('low_stock');
                }}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 hover:bg-amber-500/25 transition-colors cursor-pointer"
              >
                <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                <span>{lowStockCount} Inventory Alerts</span>
              </button>
            )}

            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>4 Delivery Vans Active</span>
            </div>
          </div>

          {/* Controls: Role Simulator & View Public Store */}
          <div className="flex items-center gap-2.5">
            {/* Role Switcher (Simulate role-based access) */}
            <div className="relative flex items-center gap-1.5 bg-stone-900 border border-stone-700/80 rounded-xl px-2.5 py-1.5 text-xs">
              <ShieldCheck className="w-3.5 h-3.5 text-[#F5D103]" />
              <span className="text-stone-400 hidden sm:inline">Role:</span>
              <select
                aria-label="Staff Role Simulator"
                value={currentRole}
                onChange={(e) => {
                  const newRole = e.target.value as any;
                  setCurrentRole(newRole);
                  showToast(`Switched active view to "${newRole}" permissions`);
                }}
                className="bg-transparent text-white font-semibold text-xs focus:outline-none cursor-pointer pr-1"
              >
                <option value="Store Manager" className="bg-stone-900 text-white">Store Manager (Super)</option>
                <option value="Dispatch Lead" className="bg-stone-900 text-white">Dispatch Lead</option>
                <option value="Warehouse Picker" className="bg-stone-900 text-white">Warehouse Picker</option>
                <option value="Customer Support" className="bg-stone-900 text-white">Customer Support</option>
              </select>
            </div>

            {/* Link back to Customer Store */}
            <button
              type="button"
              onClick={goToHome}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white text-[#18181B] hover:bg-stone-100 text-xs font-bold transition-colors cursor-pointer shadow-xs"
              title="Return to customer homepage"
            >
              <Store className="w-3.5 h-3.5 text-[#18181B]" />
              <span className="hidden sm:inline">View Public Store</span>
            </button>
          </div>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* 2. MAIN ADMIN WORKSPACE WITH LEFT NAVIGATION                              */}
      {/* ========================================================================= */}
      <div className="w-full flex min-h-[calc(100vh-65px)]">
        {/* Navigation Sidebar */}
        <aside className="w-64 bg-white border-r border-stone-200 p-4 shrink-0 hidden md:flex flex-col justify-between">
          <div className="space-y-6">
            <div>
              <div className="text-[11px] font-extrabold text-stone-400 uppercase tracking-wider px-3 mb-2">
                Operations Menu
              </div>
              <nav className="space-y-1">
                {[
                  { id: 'overview', label: 'Sales & Analytics', icon: BarChart3, badge: 'Live' },
                  { id: 'orders', label: 'Order Management', icon: ShoppingBag, badge: `${orders.filter(o => o.status !== 'delivered' && o.status !== 'cancelled').length}` },
                  { id: 'products', label: 'Product & Categories', icon: Layers },
                  { id: 'inventory', label: 'Inventory & Restock', icon: Package, badge: lowStockCount > 0 ? `${lowStockCount} Alert` : undefined, alert: lowStockCount > 0 },
                  { id: 'customers', label: 'Customer Relations', icon: Users, badge: `${customers.length}` },
                  { id: 'staff', label: 'Staff & Roles', icon: ShieldCheck, badge: `${staffList.length}` },
                ].map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setActiveTab(tab.id as AdminTab)}
                      className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${isActive
                          ? 'bg-[#F5D103] text-[#18181B] shadow-xs'
                          : 'text-stone-600 hover:text-black hover:bg-stone-100'
                        }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className={`w-4 h-4 ${isActive ? 'text-[#F5D103]' : 'text-stone-400'}`} />
                        <span>{tab.label}</span>
                      </div>
                      {tab.badge && (
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${isActive
                              ? 'bg-white/20 text-white'
                              : tab.alert
                                ? 'bg-amber-100 text-amber-800 font-extrabold'
                                : 'bg-stone-100 text-stone-600'
                            }`}
                        >
                          {tab.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* Quick System Summary */}
            <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200 text-xs">
              <div className="flex items-center justify-between mb-1">
                <span className="font-bold text-stone-700">Dispatch Fleet</span>
                <span className="text-[10px] text-emerald-700 font-bold">100% Operational</span>
              </div>
              <p className="text-[11px] text-stone-500 mb-2">
                Hertfordshire Hub: Hatfield, St Albans, Hertford, Welwyn.
              </p>
              <div className="w-full bg-stone-200 h-1.5 rounded-full overflow-hidden">
                <div className="bg-emerald-600 h-full w-[94%]" />
              </div>
            </div>
          </div>

          {/* Active Session Info */}
          <div className="pt-4 border-t border-stone-100 px-3 flex items-center justify-between text-xs">
            <div>
              <span className="font-bold block text-stone-800">Rohan Mehra</span>
              <span className="text-[11px] text-stone-500">{currentRole}</span>
            </div>
            <div className="w-2 h-2 rounded-full bg-emerald-500" title="Connected to Hub" />
          </div>
        </aside>

        {/* Mobile Tab Scrollbar */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-stone-200 p-2 flex items-center justify-around overflow-x-auto">
          {[
            { id: 'overview', label: 'Analytics', icon: BarChart3 },
            { id: 'orders', label: 'Orders', icon: ShoppingBag },
            { id: 'products', label: 'Products', icon: Layers },
            { id: 'inventory', label: 'Inventory', icon: Package },
            { id: 'customers', label: 'Customers', icon: Users },
            { id: 'staff', label: 'Staff', icon: ShieldCheck },
          ].map((t) => {
            const Icon = t.icon;
            const isActive = activeTab === t.id;
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => setActiveTab(t.id as AdminTab)}
                className={`flex flex-col items-center gap-1 p-2 rounded-lg text-[10px] font-bold ${isActive ? 'text-[#18181B]' : 'text-stone-400'
                  }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-[#B45309]' : 'text-stone-400'}`} />
                <span>{t.label}</span>
              </button>
            );
          })}
        </div>

        {/* Main Content Pane */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto w-full pb-24 md:pb-12">
          {/* ======================================================================= */}
          {/* TAB 1: SALES REPORTS & ANALYTICS DASHBOARD                              */}
          {/* ======================================================================= */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Header Title & Time Filter */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-[#18181B] tracking-tight">
                    Sales Reports &amp; Analytics
                  </h1>
                  <p className="text-xs sm:text-sm text-stone-500 mt-0.5">
                    Live gross merchandise value, average order value, and delivery fulfillment metrics.
                  </p>
                </div>

                <div className="flex items-center gap-2 bg-white border border-stone-200 rounded-xl p-1 text-xs">
                  {[
                    { id: 'today', label: 'Today' },
                    { id: '7days', label: 'Last 7 Days' },
                    { id: 'month', label: 'This Month' },
                    { id: 'year', label: 'Year to Date' },
                  ].map((range) => (
                    <button
                      key={range.id}
                      type="button"
                      onClick={() => setAnalyticsTimeRange(range.id as any)}
                      className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${analyticsTimeRange === range.id
                          ? 'bg-[#18181B] text-white shadow-2xs'
                          : 'text-stone-600 hover:text-black'
                        }`}
                    >
                      {range.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* 4 Key Executive Performance Tiles */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white border border-stone-200 rounded-2xl p-5 shadow-2xs">
                  <div className="flex items-center justify-between text-xs text-stone-500 mb-2">
                    <span className="font-bold">Total Gross Revenue</span>
                    <span className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
                      <DollarSign className="w-4 h-4" />
                    </span>
                  </div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-[#18181B] tracking-tight">
                    £40,190.00
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-emerald-700 font-bold mt-2">
                    <TrendingUp className="w-3.5 h-3.5" />
                    <span>+14.8% vs previous period</span>
                  </div>
                </div>

                <div className="bg-white border border-stone-200 rounded-2xl p-5 shadow-2xs">
                  <div className="flex items-center justify-between text-xs text-stone-500 mb-2">
                    <span className="font-bold">Total Completed Orders</span>
                    <span className="w-8 h-8 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center font-bold">
                      <ShoppingBag className="w-4 h-4" />
                    </span>
                  </div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-[#18181B] tracking-tight">
                    1,047 orders
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-emerald-700 font-bold mt-2">
                    <TrendingUp className="w-3.5 h-3.5" />
                    <span>+8.2% order volume</span>
                  </div>
                </div>

                <div className="bg-white border border-stone-200 rounded-2xl p-5 shadow-2xs">
                  <div className="flex items-center justify-between text-xs text-stone-500 mb-2">
                    <span className="font-bold">Average Order Value (AOV)</span>
                    <span className="w-8 h-8 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center font-bold">
                      <BarChart3 className="w-4 h-4" />
                    </span>
                  </div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-[#18181B] tracking-tight">
                    £38.38
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-stone-500 font-medium mt-2">
                    <span>Target: £35.00+ threshold</span>
                  </div>
                </div>

                <div className="bg-white border border-stone-200 rounded-2xl p-5 shadow-2xs">
                  <div className="flex items-center justify-between text-xs text-stone-500 mb-2">
                    <span className="font-bold">On-Time Dispatch Rate</span>
                    <span className="w-8 h-8 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center font-bold">
                      <CheckCircle2 className="w-4 h-4" />
                    </span>
                  </div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-[#18181B] tracking-tight">
                    99.1%
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-emerald-700 font-bold mt-2">
                    <span>Average transit: 42 mins</span>
                  </div>
                </div>
              </div>

              {/* Visual Interactive Bar Chart & Category Share */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Revenue Weekly Bar Graph */}
                <div className="lg:col-span-8 bg-white border border-stone-200 rounded-2xl p-6 shadow-2xs">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h2 className="font-bold text-base text-[#18181B]">
                        Daily Revenue &amp; Orders Trend
                      </h2>
                      <p className="text-xs text-stone-500">
                        Peak delivery days: Friday through Sunday
                      </p>
                    </div>
                    <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-stone-100 text-stone-700">
                      Hertfordshire Hub
                    </span>
                  </div>

                  {/* High Performance CSS/SVG Chart */}
                  <div className="h-64 flex items-end gap-3 sm:gap-6 pt-6 pb-2 border-b border-stone-200">
                    {weeklyRevenueData.map((d) => {
                      const maxRev = 9000;
                      const heightPercent = Math.round((d.revenue / maxRev) * 100);
                      return (
                        <div key={d.day} className="flex-1 flex flex-col items-center h-full justify-end group">
                          {/* Floating Value on Hover */}
                          <div className="opacity-0 group-hover:opacity-100 transition-opacity text-[11px] font-bold text-stone-800 mb-1 bg-stone-100 px-1.5 py-0.5 rounded shadow-2xs whitespace-nowrap">
                            £{d.revenue} ({d.orders} ord)
                          </div>
                          <div
                            style={{ height: `${heightPercent}%` }}
                            className="w-full max-w-[42px] bg-[#18181B] group-hover:bg-[#F5D103] transition-all rounded-t-xl"
                          />
                          <span className="text-xs font-bold text-stone-600 mt-2.5">{d.day}</span>
                        </div>
                      );
                    })}
                  </div>

                  <div className="flex items-center justify-between text-xs text-stone-500 pt-3">
                    <span>Mon - Sun weekly revenue performance</span>
                    <span className="font-bold text-[#18181B]">Weekly Total: £39,890.00</span>
                  </div>
                </div>

                {/* Category Revenue Share */}
                <div className="lg:col-span-4 bg-white border border-stone-200 rounded-2xl p-6 shadow-2xs flex flex-col justify-between">
                  <div>
                    <h2 className="font-bold text-base text-[#18181B] mb-1">
                      Department Revenue Share
                    </h2>
                    <p className="text-xs text-stone-500 mb-5">
                      Distribution by category gross volume
                    </p>

                    <div className="space-y-3.5">
                      {categorySalesDistribution.map((cat) => (
                        <div key={cat.name} className="space-y-1">
                          <div className="flex items-center justify-between text-xs font-semibold">
                            <span className="text-[#18181B]">{cat.name}</span>
                            <span className="text-stone-500">
                              £{cat.revenue.toLocaleString()} ({cat.percentage}%)
                            </span>
                          </div>
                          <div className="w-full bg-stone-100 h-2 rounded-full overflow-hidden">
                            <div
                              style={{ width: `${cat.percentage}%`, backgroundColor: cat.color }}
                              className="h-full rounded-full"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-stone-100 text-xs text-stone-500">
                    Highest velocity aisle: <strong>Vegetables &amp; Fruits</strong>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ======================================================================= */}
          {/* TAB 2: COMPLETE ORDER MANAGEMENT SYSTEM                                 */}
          {/* ======================================================================= */}
          {activeTab === 'orders' && (
            <div className="space-y-6">
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-[#18181B] tracking-tight">
                    Order Dispatch &amp; Management
                  </h1>
                  <p className="text-xs sm:text-sm text-stone-500 mt-0.5">
                    Real-time order pipeline, route assignments, status workflows, and packing slips.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      showToast('Orders reloaded from dispatch database');
                    }}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-stone-200 bg-white hover:bg-stone-50 text-xs font-bold text-stone-700 transition-colors cursor-pointer"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Refresh Queue</span>
                  </button>
                </div>
              </div>

              {/* Filters & Search Row */}
              <div className="bg-white border border-stone-200 rounded-2xl p-4 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="relative flex-1 max-w-md">
                  <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search by Order ID (VF-...), customer, or postcode..."
                    value={orderSearchQuery}
                    onChange={(e) => setOrderSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 rounded-xl border border-stone-200 text-xs focus:outline-none focus:border-stone-800"
                  />
                </div>

                {/* Status Pills */}
                <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none text-xs">
                  {[
                    { id: 'all', label: 'All Orders' },
                    { id: 'pending', label: 'Pending' },
                    { id: 'packing', label: 'Packing' },
                    { id: 'in_transit', label: 'In Transit' },
                    { id: 'delivered', label: 'Delivered' },
                    { id: 'cancelled', label: 'Cancelled' },
                  ].map((s) => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => setOrderStatusFilter(s.id as any)}
                      className={`px-3 py-1.5 rounded-lg font-bold whitespace-nowrap transition-colors cursor-pointer ${orderStatusFilter === s.id
                          ? 'bg-[#18181B] text-white'
                          : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
                        }`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Orders Table */}
              <div className="bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-2xs">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-stone-50 border-b border-stone-200 text-stone-500 font-extrabold uppercase tracking-wider text-[11px]">
                      <tr>
                        <th className="py-3.5 px-4">Order ID</th>
                        <th className="py-3.5 px-4">Customer &amp; Postcode</th>
                        <th className="py-3.5 px-4">Items</th>
                        <th className="py-3.5 px-4">Total</th>
                        <th className="py-3.5 px-4">Status Workflow</th>
                        <th className="py-3.5 px-4">Assigned Van &amp; Driver</th>
                        <th className="py-3.5 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-100">
                      {filteredOrders.length === 0 ? (
                        <tr>
                          <td colSpan={7} className="py-8 text-center text-stone-400">
                            No orders match the selected filters.
                          </td>
                        </tr>
                      ) : (
                        filteredOrders.map((o) => (
                          <tr key={o.id} className="hover:bg-stone-50/70 transition-colors">
                            {/* Order ID & Time */}
                            <td className="py-3.5 px-4 font-mono font-bold text-[#18181B]">
                              <div>{o.id}</div>
                              <span className="text-[10px] text-stone-400 font-normal">{o.date} • {o.time}</span>
                            </td>

                            {/* Customer */}
                            <td className="py-3.5 px-4">
                              <div className="font-bold text-[#18181B]">{o.customerName}</div>
                              <div className="text-[11px] text-stone-500">{o.customerPostcode}</div>
                            </td>

                            {/* Items count */}
                            <td className="py-3.5 px-4 font-semibold text-stone-700">
                              {o.items.reduce((sum, item) => sum + item.quantity, 0)} items
                            </td>

                            {/* Total Amount */}
                            <td className="py-3.5 px-4 font-bold text-[#18181B]">
                              £{o.total.toFixed(2)}
                            </td>

                            {/* Status dropdown */}
                            <td className="py-3.5 px-4">
                              <select
                                aria-label="Update Order Status"
                                value={o.status}
                                onChange={(e) => handleUpdateOrderStatus(o.id, e.target.value as any)}
                                className={`px-2.5 py-1 rounded-lg text-[11px] font-bold focus:outline-none cursor-pointer border ${o.status === 'delivered'
                                    ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                                    : o.status === 'in_transit'
                                      ? 'bg-blue-50 text-blue-800 border-blue-200'
                                      : o.status === 'packing'
                                        ? 'bg-amber-50 text-amber-800 border-amber-200'
                                        : o.status === 'cancelled'
                                          ? 'bg-rose-50 text-rose-800 border-rose-200'
                                          : 'bg-stone-100 text-stone-800 border-stone-200'
                                  }`}
                              >
                                <option value="pending">Pending</option>
                                <option value="packing">Packing</option>
                                <option value="in_transit">In Transit</option>
                                <option value="delivered">Delivered</option>
                                <option value="cancelled">Cancelled</option>
                              </select>
                            </td>

                            {/* Fleet & Driver */}
                            <td className="py-3.5 px-4">
                              <div className="font-semibold text-stone-800 flex items-center gap-1.5">
                                <Truck className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                                <span className="truncate max-w-[140px]">{o.assignedVan}</span>
                              </div>
                              <div className="text-[10px] text-stone-500">{o.assignedDriver}</div>
                            </td>

                            {/* Actions */}
                            <td className="py-3.5 px-4 text-right">
                              <button
                                type="button"
                                onClick={() => setSelectedOrderForDetail(o)}
                                className="px-3 py-1.5 rounded-lg bg-[#18181B] text-white hover:bg-stone-800 font-bold text-xs transition-colors cursor-pointer"
                              >
                                View Order
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ======================================================================= */}
          {/* TAB 3: PRODUCT & CATEGORY MANAGEMENT                                    */}
          {/* ======================================================================= */}
          {activeTab === 'products' && (
            <div className="space-y-6">
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-[#18181B] tracking-tight">
                    Product &amp; Category Management
                  </h1>
                  <p className="text-xs sm:text-sm text-stone-500 mt-0.5">
                    Maintain catalog SKU records, pricing tiers, departments, and stock visibility.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setIsManageCategoriesOpen(!isManageCategoriesOpen)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-stone-200 bg-white hover:bg-stone-50 text-xs font-bold text-stone-800 transition-colors cursor-pointer"
                  >
                    <Layers className="w-3.5 h-3.5" />
                    <span>{isManageCategoriesOpen ? 'View Products' : 'Categories (12)'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setIsAddProductModalOpen(true)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#18181B] text-white hover:bg-stone-800 text-xs font-bold transition-colors cursor-pointer shadow-2xs"
                  >
                    <Plus className="w-3.5 h-3.5 text-[#F5D103]" />
                    <span>Add New Product</span>
                  </button>
                </div>
              </div>

              {/* View Mode A: Categories Manager */}
              {isManageCategoriesOpen ? (
                <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-2xs space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-stone-100">
                    <div>
                      <h2 className="font-bold text-base text-[#18181B]">
                        Active Departments &amp; Category Taxonomy
                      </h2>
                      <span className="text-xs text-stone-500">{categoriesList.length} Primary Collections</span>
                    </div>
                    <button
                      type="button"
                      onClick={handleAddCategory}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold transition-colors cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Department</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {categoriesList.map((cat) => (
                      <div
                        key={cat.id}
                        className="p-4 rounded-xl border border-stone-200 flex items-center justify-between gap-3 hover:border-stone-400 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <img
                            src={cat.image}
                            alt={cat.name}
                            className="w-12 h-12 object-cover rounded-xl bg-stone-100 shrink-0"
                          />
                          <div>
                            <div className="font-bold text-xs text-[#18181B]">{cat.name}</div>
                            <div className="text-[11px] text-stone-500">{cat.itemCount}</div>
                            <div className="text-[10px] text-stone-400 truncate max-w-[150px]">
                              {cat.subcategories && cat.subcategories.length > 0 ? cat.subcategories.join(', ') : 'All Aisles'}
                            </div>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => showToast(`Category "${cat.name}" editor opened`)}
                          className="p-1.5 rounded-lg hover:bg-stone-100 text-stone-500 hover:text-black cursor-pointer"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                /* View Mode B: Products Table */
                <>
                  <div className="bg-white border border-stone-200 rounded-2xl p-4 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="relative flex-1 max-w-md">
                      <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        placeholder="Search products by title, SKU, brand..."
                        value={productSearchQuery}
                        onChange={(e) => setProductSearchQuery(e.target.value)}
                        className="w-full pl-9 pr-4 py-2 rounded-xl border border-stone-200 text-xs focus:outline-none focus:border-stone-800"
                      />
                    </div>

                    <div className="flex items-center gap-2">
                      <select
                        aria-label="Filter Products by Department"
                        value={productCategoryFilter}
                        onChange={(e) => setProductCategoryFilter(e.target.value)}
                        className="px-3 py-2 rounded-xl border border-stone-200 bg-white text-xs font-semibold text-stone-700 focus:outline-none cursor-pointer"
                      >
                        <option value="all">All Departments</option>
                        <option value="vegetables">Vegetables &amp; Fruits</option>
                        <option value="oils">Edible Oils &amp; Ghee</option>
                        <option value="rice">Rice &amp; Grains</option>
                        <option value="bakery">Bakery &amp; Dairy</option>
                        <option value="pantry">Pantry Staples</option>
                      </select>
                    </div>
                  </div>

                  <div className="bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-2xs">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs">
                        <thead className="bg-stone-50 border-b border-stone-200 text-stone-500 font-extrabold uppercase tracking-wider text-[11px]">
                          <tr>
                            <th className="py-3.5 px-4">Item</th>
                            <th className="py-3.5 px-4">Department</th>
                            <th className="py-3.5 px-4">Unit Measure</th>
                            <th className="py-3.5 px-4">Retail Price</th>
                            <th className="py-3.5 px-4">Stock Status</th>
                            <th className="py-3.5 px-4 text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-stone-100">
                          {filteredProducts.map((p) => (
                            <tr key={p.id} className="hover:bg-stone-50/70 transition-colors">
                              <td className="py-3.5 px-4">
                                <div className="flex items-center gap-3">
                                  <img
                                    src={p.image}
                                    alt={p.name}
                                    className="w-9 h-9 object-cover rounded-lg bg-stone-100 shrink-0"
                                  />
                                  <div>
                                    <span className="font-bold text-[#18181B] block">{p.name}</span>
                                    {p.badge && (
                                      <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-1.5 py-0.2 rounded">
                                        {p.badge}
                                      </span>
                                    )}
                                  </div>
                                </div>
                              </td>

                              <td className="py-3.5 px-4 text-stone-600 font-medium">
                                {p.categoryLabel}
                              </td>

                              <td className="py-3.5 px-4 text-stone-500 font-mono">
                                {p.unit || '1 unit'}
                              </td>

                              <td className="py-3.5 px-4 font-bold text-[#18181B]">
                                £{p.price.toFixed(2)}
                              </td>

                              <td className="py-3.5 px-4">
                                <button
                                  type="button"
                                  onClick={() => handleToggleProductStock(p.id)}
                                  className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold border transition-colors cursor-pointer ${p.inStock
                                      ? 'bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100'
                                      : 'bg-rose-50 text-rose-800 border-rose-200 hover:bg-rose-100'
                                    }`}
                                >
                                  <span className={`w-1.5 h-1.5 rounded-full ${p.inStock ? 'bg-emerald-500' : 'bg-rose-500'}`} />
                                  <span>{p.inStock ? 'In Stock' : 'Out of Stock'}</span>
                                </button>
                              </td>

                              <td className="py-3.5 px-4 text-right">
                                <button
                                  type="button"
                                  onClick={() => {
                                    setEditingProductId(p.id);
                                    setNewProductDraft({
                                      name: p.name,
                                      category: p.category,
                                      categoryLabel: p.categoryLabel || 'Grocery',
                                      price: p.price,
                                      originalPrice: p.originalPrice || p.price,
                                      unit: p.unit || '500 g',
                                      image: p.image,
                                      inStock: p.inStock ?? true,
                                      isOrganic: Boolean(p.badge?.toLowerCase().includes('organic')),
                                      badge: p.badge || '',
                                    });
                                    setIsAddProductModalOpen(true);
                                  }}
                                  className="p-1.5 rounded-lg border border-stone-200 hover:bg-stone-50 text-stone-600 hover:text-black cursor-pointer inline-flex items-center gap-1"
                                >
                                  <Edit3 className="w-3.5 h-3.5" />
                                  <span>Edit</span>
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </>
              )}
            </div>
          )}

          {/* ======================================================================= */}
          {/* TAB 4: INVENTORY ALERTS & RESTOCK MANAGEMENT                            */}
          {/* ======================================================================= */}
          {activeTab === 'inventory' && (
            <div className="space-y-6">
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-[#18181B] tracking-tight">
                    Inventory &amp; Restock Management
                  </h1>
                  <p className="text-xs sm:text-sm text-stone-500 mt-0.5">
                    Automated reorder thresholds, low stock alerts, supplier purchase orders, and stock batch adding.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      if (inventory[0]) {
                        setSelectedInventoryItemForPO(inventory[0]);
                        setIsCreatePOModalOpen(true);
                      }
                    }}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#18181B] text-white hover:bg-stone-800 text-xs font-bold transition-colors cursor-pointer shadow-2xs"
                  >
                    <Plus className="w-3.5 h-3.5 text-[#F5D103]" />
                    <span>Create Purchase Order</span>
                  </button>
                </div>
              </div>

              {/* Critical Alert Banner if Low Stock exists */}
              {lowStockCount > 0 && (
                <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-800 flex items-center justify-center font-bold shrink-0">
                      <AlertTriangle className="w-5 h-5 text-amber-700" />
                    </div>
                    <div>
                      <h3 className="font-bold text-sm text-amber-900">
                        {lowStockCount} Products Below Reorder Point
                      </h3>
                      <p className="text-xs text-amber-800/80">
                        Immediate restock required to avoid fulfillment shortages for weekend delivery windows.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setInventoryFilter('low_stock')}
                      className="px-3.5 py-1.5 rounded-lg bg-amber-500 text-black font-extrabold text-xs hover:bg-amber-400 transition-colors cursor-pointer"
                    >
                      Filter Alert Items
                    </button>
                    <button
                      type="button"
                      onClick={() => setInventoryFilter('all')}
                      className="px-3.5 py-1.5 rounded-lg bg-white border border-amber-300 text-amber-900 font-bold text-xs hover:bg-amber-50 transition-colors cursor-pointer"
                    >
                      Show All
                    </button>
                  </div>
                </div>
              )}

              {/* Inventory Table */}
              <div className="bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-2xs">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-stone-50 border-b border-stone-200 text-stone-500 font-extrabold uppercase tracking-wider text-[11px]">
                      <tr>
                        <th className="py-3.5 px-4">SKU &amp; Product</th>
                        <th className="py-3.5 px-4">Category</th>
                        <th className="py-3.5 px-4">Stock Level</th>
                        <th className="py-3.5 px-4">Threshold</th>
                        <th className="py-3.5 px-4">Supplier</th>
                        <th className="py-3.5 px-4">Status</th>
                        <th className="py-3.5 px-4 text-right">Quick Restock</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-100">
                      {filteredInventory.map((item) => (
                        <tr key={item.id} className="hover:bg-stone-50/70 transition-colors">
                          <td className="py-3.5 px-4">
                            <span className="font-mono text-[10px] text-stone-400 block">{item.sku}</span>
                            <span className="font-bold text-[#18181B]">{item.name}</span>
                          </td>

                          <td className="py-3.5 px-4 text-stone-600 font-medium">
                            {item.category}
                          </td>

                          <td className="py-3.5 px-4">
                            <span className="font-extrabold text-sm text-[#18181B]">{item.currentStock}</span>
                            <span className="text-[10px] text-stone-400 block">/ {item.optimalStock} target</span>
                          </td>

                          <td className="py-3.5 px-4 font-semibold text-stone-500">
                            Min {item.reorderPoint}
                          </td>

                          <td className="py-3.5 px-4 text-stone-700 font-medium">
                            {item.supplier}
                          </td>

                          <td className="py-3.5 px-4">
                            <span
                              className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${item.status === 'in_stock'
                                  ? 'bg-emerald-50 text-emerald-800'
                                  : item.status === 'low_stock'
                                    ? 'bg-amber-100 text-amber-800'
                                    : 'bg-rose-100 text-rose-800'
                                }`}
                            >
                              {item.status.replace('_', ' ').toUpperCase()}
                            </span>
                          </td>

                          {/* Quick Restock Action Buttons */}
                          <td className="py-3.5 px-4 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              <button
                                type="button"
                                onClick={() => handleQuickRestock(item.id, 25)}
                                className="px-2 py-1 rounded bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold text-[11px] cursor-pointer"
                                title="Add +25 stock"
                              >
                                +25
                              </button>
                              <button
                                type="button"
                                onClick={() => handleQuickRestock(item.id, 50)}
                                className="px-2 py-1 rounded bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold text-[11px] cursor-pointer"
                                title="Add +50 stock"
                              >
                                +50
                              </button>
                              <button
                                type="button"
                                onClick={() => {
                                  setSelectedInventoryItemForPO(item);
                                  setIsCreatePOModalOpen(true);
                                }}
                                className="px-2.5 py-1 rounded bg-[#18181B] text-white hover:bg-stone-800 font-bold text-[11px] cursor-pointer"
                              >
                                PO
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Verified Suppliers Directory */}
              <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-2xs">
                <div className="flex items-center justify-between pb-3 border-b border-stone-100 mb-4">
                  <h3 className="font-bold text-base text-[#18181B]">
                    Approved Regional Suppliers &amp; Lead Times
                  </h3>
                  <span className="text-xs text-stone-500">4 Active Suppliers</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {suppliers.map((s) => (
                    <div key={s.id} className="p-4 rounded-xl border border-stone-200 bg-stone-50/60">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-xs text-[#18181B]">{s.name}</span>
                        <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 rounded">
                          ★ {s.rating}
                        </span>
                      </div>
                      <div className="text-[11px] text-stone-500 mb-2">{s.category}</div>
                      <div className="text-[11px] text-stone-700">
                        Lead Time: <strong>{s.leadTimeDays} day(s)</strong>
                      </div>
                      <div className="text-[11px] text-stone-500 mt-0.5">{s.contactPerson} • {s.phone}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ======================================================================= */}
          {/* TAB 5: CUSTOMER MANAGEMENT & COMMUNICATION                              */}
          {/* ======================================================================= */}
          {activeTab === 'customers' && (
            <div className="space-y-6">
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-[#18181B] tracking-tight">
                    Customer Database &amp; Communication
                  </h1>
                  <p className="text-xs sm:text-sm text-stone-500 mt-0.5">
                    Customer lifetime values, household preferences, and multi-channel messaging (WhatsApp, SMS, Email).
                  </p>
                </div>
              </div>

              {/* Filters */}
              <div className="bg-white border border-stone-200 rounded-2xl p-4 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="relative flex-1 max-w-md">
                  <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search by name, email, UK postcode..."
                    value={customerSearchQuery}
                    onChange={(e) => setCustomerSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 rounded-xl border border-stone-200 text-xs focus:outline-none focus:border-stone-800"
                  />
                </div>

                <div className="flex items-center gap-1.5 text-xs">
                  {['all', 'active', 'vip', 'flagged'].map((st) => (
                    <button
                      key={st}
                      type="button"
                      onClick={() => setCustomerStatusFilter(st as any)}
                      className={`px-3 py-1.5 rounded-lg font-bold capitalize transition-colors cursor-pointer ${customerStatusFilter === st
                          ? 'bg-[#18181B] text-white'
                          : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
                        }`}
                    >
                      {st === 'all' ? 'All Customers' : st}
                    </button>
                  ))}
                </div>
              </div>

              {/* Customers Table */}
              <div className="bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-2xs">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-stone-50 border-b border-stone-200 text-stone-500 font-extrabold uppercase tracking-wider text-[11px]">
                      <tr>
                        <th className="py-3.5 px-4">Customer Name</th>
                        <th className="py-3.5 px-4">Contact Info</th>
                        <th className="py-3.5 px-4">Address &amp; Postcode</th>
                        <th className="py-3.5 px-4">Orders Count</th>
                        <th className="py-3.5 px-4">Lifetime Spend</th>
                        <th className="py-3.5 px-4">Tier Status</th>
                        <th className="py-3.5 px-4 text-right">Message</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-100">
                      {filteredCustomers.map((c) => (
                        <tr key={c.id} className="hover:bg-stone-50/70 transition-colors">
                          <td className="py-3.5 px-4">
                            <span className="font-bold text-[#18181B] block">{c.name}</span>
                            <span className="text-[10px] text-stone-400 font-mono">{c.id}</span>
                          </td>

                          <td className="py-3.5 px-4">
                            <div className="text-stone-800 font-medium">{c.phone}</div>
                            <div className="text-[11px] text-stone-500">{c.email}</div>
                          </td>

                          <td className="py-3.5 px-4">
                            <div className="font-medium text-stone-800">{c.address}</div>
                            <span className="text-[10px] font-bold text-stone-500">{c.postcode}</span>
                          </td>

                          <td className="py-3.5 px-4 font-bold text-stone-800">
                            {c.ordersCount} orders
                          </td>

                          <td className="py-3.5 px-4 font-extrabold text-[#18181B]">
                            £{c.totalSpent.toFixed(2)}
                          </td>

                          <td className="py-3.5 px-4">
                            <button
                              type="button"
                              onClick={() => handleToggleCustomerStatus(c.id)}
                              title="Click to cycle status tier (Active -> VIP -> Flagged)"
                              className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold cursor-pointer transition-transform hover:scale-105 ${c.status === 'vip'
                                  ? 'bg-amber-100 text-amber-900 border border-amber-300'
                                  : c.status === 'flagged'
                                    ? 'bg-rose-100 text-rose-800'
                                    : 'bg-emerald-50 text-emerald-800'
                                }`}
                            >
                              {c.status.toUpperCase()}
                            </button>
                          </td>

                          <td className="py-3.5 px-4 text-right">
                            <button
                              type="button"
                              onClick={() => {
                                setSelectedCustomerForMessage(c);
                                setIsMessageCustomerModalOpen(true);
                              }}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#18181B] text-white hover:bg-stone-800 text-xs font-bold transition-colors cursor-pointer"
                            >
                              <MessageSquare className="w-3.5 h-3.5 text-[#F5D103]" />
                              <span>Communicate</span>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ======================================================================= */}
          {/* TAB 6: STAFF ACCOUNTS WITH ROLE-BASED ACCESS                            */}
          {/* ======================================================================= */}
          {activeTab === 'staff' && (
            <div className="space-y-6">
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-[#18181B] tracking-tight">
                    Staff Accounts &amp; Access Control
                  </h1>
                  <p className="text-xs sm:text-sm text-stone-500 mt-0.5">
                    Role-based permissions (Store Manager, Dispatcher, Picker, Support Agent) and security logs.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setIsInviteStaffModalOpen(true)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#18181B] text-white hover:bg-stone-800 text-xs font-bold transition-colors cursor-pointer shadow-2xs"
                >
                  <Plus className="w-3.5 h-3.5 text-[#F5D103]" />
                  <span>Invite Staff Member</span>
                </button>
              </div>

              {/* Staff Directory Table */}
              <div className="bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-2xs">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-stone-50 border-b border-stone-200 text-stone-500 font-extrabold uppercase tracking-wider text-[11px]">
                      <tr>
                        <th className="py-3.5 px-4">Staff Member</th>
                        <th className="py-3.5 px-4">System Role</th>
                        <th className="py-3.5 px-4">Permissions Scope</th>
                        <th className="py-3.5 px-4">Status</th>
                        <th className="py-3.5 px-4">Last Activity</th>
                        <th className="py-3.5 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-100">
                      {staffList.map((member) => (
                        <tr key={member.id} className="hover:bg-stone-50/70 transition-colors">
                          <td className="py-3.5 px-4">
                            <div className="font-bold text-[#18181B]">{member.name}</div>
                            <div className="text-[11px] text-stone-500">{member.email}</div>
                          </td>

                          <td className="py-3.5 px-4">
                            <span className="font-bold text-xs text-[#18181B] block">{member.role}</span>
                            <span className="text-[10px] text-stone-400 font-mono">{member.id}</span>
                          </td>

                          <td className="py-3.5 px-4">
                            <div className="flex flex-wrap gap-1">
                              {member.permissions.map((p) => (
                                <span
                                  key={p}
                                  className="px-2 py-0.5 rounded bg-stone-100 text-stone-600 text-[10px] font-mono"
                                >
                                  {p}
                                </span>
                              ))}
                            </div>
                          </td>

                          <td className="py-3.5 px-4">
                            <span
                              className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${member.status === 'active'
                                  ? 'bg-emerald-50 text-emerald-800'
                                  : 'bg-stone-100 text-stone-600'
                                }`}
                            >
                              {member.status.toUpperCase()}
                            </span>
                          </td>

                          <td className="py-3.5 px-4 text-stone-600">
                            {member.lastActive}
                          </td>

                          <td className="py-3.5 px-4 text-right">
                            <button
                              type="button"
                              onClick={() => {
                                setCurrentRole(member.role);
                                showToast(`Switched active view to "${member.role}"`);
                              }}
                              className="px-3 py-1 rounded-lg border border-stone-200 hover:bg-stone-100 text-stone-700 font-bold text-xs cursor-pointer"
                            >
                              Assume Role
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Roles & Permissions Reference Card */}
              <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-2xs">
                <h3 className="font-bold text-base text-[#18181B] mb-2">
                  Role-Based Security Matrix (UK GDPR &amp; Operational Standards)
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-xs mt-4">
                  <div className="p-3.5 rounded-xl border border-stone-200 bg-stone-50/60">
                    <span className="font-bold block text-stone-900 mb-1">Store Manager</span>
                    <p className="text-[11px] text-stone-500">
                      Full administrative access across financial reports, staff invites, VAT settings, pricing changes, and data export.
                    </p>
                  </div>
                  <div className="p-3.5 rounded-xl border border-stone-200 bg-stone-50/60">
                    <span className="font-bold block text-stone-900 mb-1">Dispatch Lead</span>
                    <p className="text-[11px] text-stone-500">
                      Fleet van assignment, route optimization, driver check-in, order fulfillment statuses, and courier communications.
                    </p>
                  </div>
                  <div className="p-3.5 rounded-xl border border-stone-200 bg-stone-50/60">
                    <span className="font-bold block text-stone-900 mb-1">Warehouse Picker</span>
                    <p className="text-[11px] text-stone-500">
                      Packing queue, item barcode confirmation, fresh produce inspection, and smart substitution decisions.
                    </p>
                  </div>
                  <div className="p-3.5 rounded-xl border border-stone-200 bg-stone-50/60">
                    <span className="font-bold block text-stone-900 mb-1">Customer Support</span>
                    <p className="text-[11px] text-stone-500">
                      Customer messaging, delivery delay alerts, ticket resolution, refund processing, and household notes.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* ========================================================================= */}
      {/* 3. ORDER DETAIL & DISPATCH MODAL                                          */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {selectedOrderForDetail && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-7 border border-stone-200 shadow-2xl max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between pb-4 border-b border-stone-100">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-extrabold text-base text-[#18181B]">
                      Order #{selectedOrderForDetail.id}
                    </span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-stone-100 text-stone-700">
                      {selectedOrderForDetail.paymentMethod}
                    </span>
                  </div>
                  <p className="text-xs text-stone-500">
                    Placed on {selectedOrderForDetail.date} at {selectedOrderForDetail.time}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedOrderForDetail(null)}
                  className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 flex items-center justify-center cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Customer & Address Details */}
              <div className="py-4 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs border-b border-stone-100">
                <div>
                  <span className="text-stone-400 font-bold block mb-1">Recipient Customer</span>
                  <div className="font-bold text-[#18181B]">{selectedOrderForDetail.customerName}</div>
                  <div className="text-stone-600">{selectedOrderForDetail.customerEmail}</div>
                  <div className="text-stone-600">{selectedOrderForDetail.customerPhone}</div>
                </div>

                <div>
                  <span className="text-stone-400 font-bold block mb-1">Delivery Destination</span>
                  <div className="font-bold text-[#18181B]">{selectedOrderForDetail.address}</div>
                  {selectedOrderForDetail.notes && (
                    <div className="mt-1.5 p-2 rounded bg-amber-50 text-amber-900 border border-amber-200 text-[11px]">
                      <strong>Note:</strong> {selectedOrderForDetail.notes}
                    </div>
                  )}
                </div>
              </div>

              {/* Line Items */}
              <div className="py-4 border-b border-stone-100">
                <span className="text-xs font-bold text-stone-700 block mb-2.5">
                  Ordered Produce &amp; Groceries ({selectedOrderForDetail.items.length})
                </span>

                <div className="space-y-2">
                  {selectedOrderForDetail.items.map((item) => (
                    <div
                      key={item.productId}
                      className="flex items-center justify-between p-2 rounded-xl bg-stone-50 text-xs"
                    >
                      <div className="flex items-center gap-2.5">
                        <img
                          src={item.image}
                          alt={item.productName}
                          className="w-8 h-8 rounded object-cover bg-white shrink-0"
                        />
                        <div>
                          <span className="font-bold text-[#18181B] block">{item.productName}</span>
                          <span className="text-[11px] text-stone-500">{item.unit} • £{item.price.toFixed(2)} each</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="font-bold text-stone-700 block">Qty: {item.quantity}</span>
                        <span className="font-extrabold text-[#18181B]">
                          £{(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Courier Van & Driver Assignment Controls */}
              <div className="py-4 border-b border-stone-100 space-y-3 text-xs">
                <span className="font-bold text-stone-700 block">Fleet Dispatch Assignment</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-stone-500 mb-1">Select Delivery Van</label>
                    <select
                      aria-label="Assign Delivery Van"
                      value={selectedOrderForDetail.assignedVan}
                      onChange={(e) =>
                        handleAssignDriver(
                          selectedOrderForDetail.id,
                          e.target.value,
                          e.target.value.includes('#04')
                            ? 'David M.'
                            : e.target.value.includes('#02')
                              ? 'Sarah T.'
                              : 'Mark Jenkins'
                        )
                      }
                      className="w-full px-3 py-2 rounded-xl border border-stone-200 bg-white font-semibold cursor-pointer"
                    >
                      <option value="Van #04 (Hatfield Express)">Van #04 (Hatfield Express)</option>
                      <option value="Van #02 (St Albans Chilled)">Van #02 (St Albans Chilled)</option>
                      <option value="Van #01 (Welwyn Hub)">Van #01 (Welwyn Hub)</option>
                      <option value="Unassigned">Unassigned</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-stone-500 mb-1">Workflow Status</label>
                    <select
                      aria-label="Workflow Status"
                      value={selectedOrderForDetail.status}
                      onChange={(e) =>
                        handleUpdateOrderStatus(selectedOrderForDetail.id, e.target.value as any)
                      }
                      className="w-full px-3 py-2 rounded-xl border border-stone-200 bg-white font-semibold cursor-pointer"
                    >
                      <option value="pending">Pending</option>
                      <option value="packing">Packing</option>
                      <option value="in_transit">In Transit</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Financial Total */}
              <div className="py-4 flex items-center justify-between text-xs">
                <div>
                  <span className="text-stone-500">Gross Total:</span>
                  <span className="text-base font-extrabold text-[#18181B] ml-2">
                    £{selectedOrderForDetail.total.toFixed(2)}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      window.print?.();
                    }}
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-stone-200 hover:bg-stone-50 font-bold text-stone-700 cursor-pointer"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>Print Packing Slip</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      handleUpdateOrderStatus(selectedOrderForDetail.id, 'delivered');
                      setSelectedOrderForDetail(null);
                    }}
                    className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold cursor-pointer"
                  >
                    Mark as Delivered
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ========================================================================= */}
      {/* 4. ADD NEW PRODUCT MODAL                                                  */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {isAddProductModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              className="bg-white rounded-2xl max-w-xl w-full p-6 sm:p-7 border border-stone-200 shadow-2xl max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between pb-3 border-b border-stone-100 mb-4">
                <h3 className="font-extrabold text-base text-[#18181B]">
                  {editingProductId ? 'Edit Grocery Product' : 'Add New Grocery Product'}
                </h3>
                <button
                  type="button"
                  onClick={() => setIsAddProductModalOpen(false)}
                  className="text-stone-400 hover:text-black cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleAddProductSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="block font-bold text-stone-700 mb-1">Product Title</label>
                  <input
                    type="text"
                    placeholder="e.g. Organic Heritage Red Onions"
                    value={newProductDraft.name}
                    onChange={(e) => setNewProductDraft({ ...newProductDraft, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 focus:outline-none focus:border-stone-800"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-stone-700 mb-1">Department</label>
                    <select
                      aria-label="Product Department"
                      value={newProductDraft.category}
                      onChange={(e) => {
                        const catId = e.target.value;
                        const label =
                          catId === 'vegetables'
                            ? 'Vegetables & Fruits'
                            : catId === 'oils'
                              ? 'Edible Oils & Ghee'
                              : catId === 'rice'
                                ? 'Rice & Grains'
                                : 'Pantry Staples';
                        setNewProductDraft({ ...newProductDraft, category: catId, categoryLabel: label });
                      }}
                      className="w-full px-3 py-2 rounded-xl border border-stone-200 bg-white font-semibold cursor-pointer"
                    >
                      <option value="vegetables">Vegetables &amp; Fruits</option>
                      <option value="oils">Edible Oils &amp; Ghee</option>
                      <option value="rice">Rice &amp; Grains</option>
                      <option value="pantry">Pantry Staples</option>
                      <option value="bakery">Bakery &amp; Dairy</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold text-stone-700 mb-1">Unit Weight / Measure</label>
                    <input
                      type="text"
                      placeholder="e.g. 500 g, 1 kg, 1 L"
                      value={newProductDraft.unit}
                      onChange={(e) => setNewProductDraft({ ...newProductDraft, unit: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl border border-stone-200 focus:outline-none focus:border-stone-800"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-stone-700 mb-1">Retail Selling Price (£)</label>
                    <input
                      type="number"
                      step="0.01"
                      placeholder="3.50"
                      value={newProductDraft.price}
                      onChange={(e) => setNewProductDraft({ ...newProductDraft, price: Number(e.target.value) })}
                      className="w-full px-3.5 py-2 rounded-xl border border-stone-200 focus:outline-none focus:border-stone-800"
                      required
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-stone-700 mb-1">Original RRP (£)</label>
                    <input
                      type="number"
                      step="0.01"
                      placeholder="4.20"
                      value={newProductDraft.originalPrice}
                      onChange={(e) => setNewProductDraft({ ...newProductDraft, originalPrice: Number(e.target.value) })}
                      className="w-full px-3.5 py-2 rounded-xl border border-stone-200 focus:outline-none focus:border-stone-800"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-stone-700 mb-1">Marketing Tag Badge</label>
                    <input
                      type="text"
                      placeholder="e.g. ORGANIC, COLD PRESSED"
                      value={newProductDraft.badge}
                      onChange={(e) => setNewProductDraft({ ...newProductDraft, badge: e.target.value.toUpperCase() })}
                      className="w-full px-3.5 py-2 rounded-xl border border-stone-200 focus:outline-none focus:border-stone-800"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-stone-700 mb-1">Catalog Photo URL</label>
                    <input
                      type="text"
                      placeholder="/product-spinach.jpg"
                      value={newProductDraft.image}
                      onChange={(e) => setNewProductDraft({ ...newProductDraft, image: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl border border-stone-200 focus:outline-none focus:border-stone-800"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-4 pt-2">
                  <label className="flex items-center gap-2 cursor-pointer font-semibold">
                    <input
                      type="checkbox"
                      checked={newProductDraft.isOrganic}
                      onChange={(e) => setNewProductDraft({ ...newProductDraft, isOrganic: e.target.checked })}
                      className="rounded border-stone-300 text-stone-900"
                    />
                    <span>Certified Organic Produce</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer font-semibold">
                    <input
                      type="checkbox"
                      checked={newProductDraft.inStock}
                      onChange={(e) => setNewProductDraft({ ...newProductDraft, inStock: e.target.checked })}
                      className="rounded border-stone-300 text-stone-900"
                    />
                    <span>Available in Stock Immediately</span>
                  </label>
                </div>

                <div className="flex items-center justify-end gap-2 pt-4 border-t border-stone-100">
                  <button
                    type="button"
                    onClick={() => setIsAddProductModalOpen(false)}
                    className="px-4 py-2 rounded-xl border border-stone-200 text-stone-700 font-bold hover:bg-stone-50 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-[#18181B] text-white font-bold hover:bg-stone-800 cursor-pointer shadow-xs"
                  >
                    {editingProductId ? 'Update Product' : 'Save & Publish Product'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ========================================================================= */}
      {/* 5. CREATE PURCHASE ORDER / RESTOCK MODAL                                 */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {isCreatePOModalOpen && selectedInventoryItemForPO && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-7 border border-stone-200 shadow-2xl max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between pb-3 border-b border-stone-100 mb-4">
                <div>
                  <h3 className="font-extrabold text-base text-[#18181B]">
                    Create Purchase Order (PO)
                  </h3>
                  <p className="text-xs text-stone-500">
                    Restock {selectedInventoryItemForPO.name} ({selectedInventoryItemForPO.sku})
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsCreatePOModalOpen(false)}
                  className="text-stone-400 hover:text-black cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleCreatePOSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="block font-bold text-stone-700 mb-1">Select Supplier</label>
                  <select
                    aria-label="Select Supplier"
                    value={newPODraft.supplierId}
                    onChange={(e) => setNewPODraft({ ...newPODraft, supplierId: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-stone-200 bg-white font-semibold cursor-pointer"
                  >
                    {suppliers.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.name} ({s.category} • Lead: {s.leadTimeDays}d)
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-stone-700 mb-1">Restock Batch Quantity</label>
                    <input
                      type="number"
                      min={1}
                      value={newPODraft.quantity}
                      onChange={(e) => setNewPODraft({ ...newPODraft, quantity: Number(e.target.value) })}
                      className="w-full px-3.5 py-2 rounded-xl border border-stone-200 font-bold focus:outline-none focus:border-stone-800"
                      required
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-stone-700 mb-1">Estimated Unit Cost</label>
                    <div className="px-3.5 py-2 rounded-xl bg-stone-50 border border-stone-200 font-bold text-stone-800">
                      £{selectedInventoryItemForPO.unitCost.toFixed(2)} / unit
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-stone-700 mb-1">Requested Hub Delivery Date</label>
                  <input
                    type="text"
                    value={newPODraft.deliveryDate}
                    onChange={(e) => setNewPODraft({ ...newPODraft, deliveryDate: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-stone-200 focus:outline-none focus:border-stone-800"
                  />
                </div>

                <div>
                  <label className="block font-bold text-stone-700 mb-1">Supplier PO Notes</label>
                  <input
                    type="text"
                    value={newPODraft.notes}
                    onChange={(e) => setNewPODraft({ ...newPODraft, notes: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-stone-200 focus:outline-none focus:border-stone-800"
                  />
                </div>

                <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 text-[11px] text-stone-600 flex justify-between">
                  <span>Total Purchase Estimate:</span>
                  <strong className="text-stone-900 text-xs">
                    £{(selectedInventoryItemForPO.unitCost * newPODraft.quantity).toFixed(2)}
                  </strong>
                </div>

                <div className="flex items-center justify-end gap-2 pt-3 border-t border-stone-100">
                  <button
                    type="button"
                    onClick={() => setIsCreatePOModalOpen(false)}
                    className="px-4 py-2 rounded-xl border border-stone-200 text-stone-700 font-bold hover:bg-stone-50 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-[#18181B] text-white font-bold hover:bg-stone-800 cursor-pointer shadow-xs"
                  >
                    Confirm &amp; Transmit PO
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ========================================================================= */}
      {/* 6. CUSTOMER MESSAGING & COMMUNICATION MODAL                               */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {isMessageCustomerModalOpen && selectedCustomerForMessage && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-7 border border-stone-200 shadow-2xl max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between pb-3 border-b border-stone-100 mb-4">
                <div>
                  <h3 className="font-extrabold text-base text-[#18181B]">
                    Send Direct Customer Message
                  </h3>
                  <p className="text-xs text-stone-500">
                    To: {selectedCustomerForMessage.name} ({selectedCustomerForMessage.phone})
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsMessageCustomerModalOpen(false)}
                  className="text-stone-400 hover:text-black cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleSendMessageSubmit} className="space-y-4 text-xs">
                {/* Channel Switcher */}
                <div>
                  <label className="block font-bold text-stone-700 mb-1.5">Dispatch Channel</label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'whatsapp', label: 'WhatsApp', icon: MessageSquare },
                      { id: 'sms', label: 'SMS Text', icon: Phone },
                      { id: 'email', label: 'Email', icon: Mail },
                    ].map((ch) => {
                      const Icon = ch.icon;
                      const isSel = messageDraft.channel === ch.id;
                      return (
                        <button
                          key={ch.id}
                          type="button"
                          onClick={() => setMessageDraft({ ...messageDraft, channel: ch.id as any })}
                          className={`flex items-center justify-center gap-1.5 py-2 rounded-xl font-bold border transition-colors cursor-pointer ${isSel
                              ? 'bg-[#18181B] text-white border-[#18181B]'
                              : 'bg-stone-50 hover:bg-stone-100 text-stone-700 border-stone-200'
                            }`}
                        >
                          <Icon className="w-3.5 h-3.5" />
                          <span>{ch.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Template Selector */}
                <div>
                  <label className="block font-bold text-stone-700 mb-1">Message Template</label>
                  <select
                    aria-label="Message Template"
                    value={messageDraft.template}
                    onChange={(e) => {
                      const val = e.target.value;
                      let subject = 'Varam Foods Update';
                      let body = '';
                      if (val === 'eta_update') {
                        subject = 'Delivery Van ETA Update — Varam Foods';
                        body = `Hello ${selectedCustomerForMessage.name}, our Hatfield delivery van is approximately 3 stops away and will arrive between 6:00 PM – 7:00 PM. Thank you!`;
                      } else if (val === 'sub_query') {
                        subject = 'Out-of-Stock Substitution Check';
                        body = `Hello ${selectedCustomerForMessage.name}, one item in your order is currently unavailable. May we substitute with our organic equivalent at no extra charge?`;
                      } else {
                        subject = 'Special VIP Offer from Varam Foods';
                        body = `Hello ${selectedCustomerForMessage.name}, enjoy 20% off your next grocery delivery with code VARAM20. Valid this weekend only!`;
                      }
                      setMessageDraft({ ...messageDraft, template: val, subject, body });
                    }}
                    className="w-full px-3 py-2 rounded-xl border border-stone-200 bg-white font-semibold cursor-pointer"
                  >
                    <option value="eta_update">Delivery ETA Update</option>
                    <option value="sub_query">Substitution Permission Query</option>
                    <option value="vip_offer">VIP Customer Loyalty Offer</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-stone-700 mb-1">Subject Header</label>
                  <input
                    type="text"
                    value={messageDraft.subject}
                    onChange={(e) => setMessageDraft({ ...messageDraft, subject: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-stone-200 focus:outline-none focus:border-stone-800"
                    required
                  />
                </div>

                <div>
                  <label className="block font-bold text-stone-700 mb-1">Message Content</label>
                  <textarea
                    rows={4}
                    value={messageDraft.body}
                    onChange={(e) => setMessageDraft({ ...messageDraft, body: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-stone-200 focus:outline-none focus:border-stone-800"
                    required
                  />
                </div>

                <div className="flex items-center justify-end gap-2 pt-3 border-t border-stone-100">
                  <button
                    type="button"
                    onClick={() => setIsMessageCustomerModalOpen(false)}
                    className="px-4 py-2 rounded-xl border border-stone-200 text-stone-700 font-bold hover:bg-stone-50 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl bg-[#18181B] text-white font-bold hover:bg-stone-800 cursor-pointer shadow-xs"
                  >
                    <Send className="w-3.5 h-3.5 text-[#F5D103]" />
                    <span>Send Message</span>
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ========================================================================= */}
      {/* 7. INVITE STAFF MODAL                                                     */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {isInviteStaffModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              className="bg-white rounded-2xl max-w-md w-full p-6 sm:p-7 border border-stone-200 shadow-2xl"
            >
              <div className="flex items-center justify-between pb-3 border-b border-stone-100 mb-4">
                <h3 className="font-extrabold text-base text-[#18181B]">Invite New Staff Member</h3>
                <button
                  type="button"
                  onClick={() => setIsInviteStaffModalOpen(false)}
                  className="text-stone-400 hover:text-black cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleInviteStaffSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="block font-bold text-stone-700 mb-1">Full Legal Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Maya Davies"
                    value={inviteStaffDraft.name}
                    onChange={(e) => setInviteStaffDraft({ ...inviteStaffDraft, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 focus:outline-none focus:border-stone-800"
                    required
                  />
                </div>

                <div>
                  <label className="block font-bold text-stone-700 mb-1">Company Email</label>
                  <input
                    type="email"
                    placeholder="maya.davies@varamfoods.co.uk"
                    value={inviteStaffDraft.email}
                    onChange={(e) => setInviteStaffDraft({ ...inviteStaffDraft, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 focus:outline-none focus:border-stone-800"
                    required
                  />
                </div>

                <div>
                  <label className="block font-bold text-stone-700 mb-1">Assigned Operational Role</label>
                  <select
                    aria-label="Assigned Operational Role"
                    value={inviteStaffDraft.role}
                    onChange={(e) => setInviteStaffDraft({ ...inviteStaffDraft, role: e.target.value as any })}
                    className="w-full px-3 py-2.5 rounded-xl border border-stone-200 bg-white font-semibold cursor-pointer"
                  >
                    <option value="Warehouse Picker">Warehouse Picker (Packing Queue &amp; Barcodes)</option>
                    <option value="Dispatch Lead">Dispatch Lead (Fleet &amp; Van Routing)</option>
                    <option value="Customer Support">Customer Support (Messaging &amp; Inquiries)</option>
                    <option value="Store Manager">Store Manager (Super Administrator)</option>
                  </select>
                </div>

                <div className="flex items-center justify-end gap-2 pt-3 border-t border-stone-100">
                  <button
                    type="button"
                    onClick={() => setIsInviteStaffModalOpen(false)}
                    className="px-4 py-2 rounded-xl border border-stone-200 text-stone-700 font-bold hover:bg-stone-50 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-[#18181B] text-white font-bold hover:bg-stone-800 cursor-pointer shadow-xs"
                  >
                    Send Invitation
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
