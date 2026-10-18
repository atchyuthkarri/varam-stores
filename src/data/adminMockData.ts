export interface AdminOrderItem {
  productId: string;
  productName: string;
  quantity: number;
  price: number;
  unit: string;
  image: string;
}

export interface AdminOrder {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  customerPostcode: string;
  address: string;
  date: string;
  time: string;
  status: 'pending' | 'packing' | 'in_transit' | 'delivered' | 'cancelled';
  total: number;
  paymentStatus: 'paid' | 'pending' | 'refunded';
  paymentMethod: string;
  assignedVan: string;
  assignedDriver: string;
  items: AdminOrderItem[];
  notes?: string;
  isSubstituteAllowed: boolean;
}

export interface AdminCustomer {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  postcode: string;
  ordersCount: number;
  totalSpent: number;
  lastOrderDate: string;
  status: 'active' | 'vip' | 'flagged';
  loyaltyCoins: number;
  notes?: string;
}

export interface AdminStaff {
  id: string;
  name: string;
  email: string;
  role: 'Store Manager' | 'Dispatch Lead' | 'Warehouse Picker' | 'Customer Support';
  permissions: string[];
  status: 'active' | 'on_break' | 'offline';
  lastActive: string;
}

export interface AdminInventoryItem {
  id: string;
  sku: string;
  name: string;
  category: string;
  currentStock: number;
  reorderPoint: number;
  optimalStock: number;
  unitCost: number;
  retailPrice: number;
  supplier: string;
  status: 'in_stock' | 'low_stock' | 'out_of_stock';
  lastRestocked: string;
  unit: string;
}

export interface AdminSupplier {
  id: string;
  name: string;
  category: string;
  leadTimeDays: number;
  contactPerson: string;
  email: string;
  phone: string;
  rating: number;
  activeOrders: number;
}

export const initialOrders: AdminOrder[] = [
  {
    id: 'VF-10948',
    customerName: 'Priya Sharma',
    customerEmail: 'priya.sharma@gmail.com',
    customerPhone: '+44 7700 900112',
    customerPostcode: 'AL10 9TN',
    address: '14 Parkside Walk, Hatfield, AL10 9TN',
    date: '18 Oct 2026',
    time: '09:45 AM',
    status: 'in_transit',
    total: 48.75,
    paymentStatus: 'paid',
    paymentMethod: 'Apple Pay',
    assignedVan: 'Van #04 (Hatfield Express)',
    assignedDriver: 'David M.',
    isSubstituteAllowed: true,
    notes: 'Please leave in garden storage box if not answering doorbell.',
    items: [
      {
        productId: 'prod-basmati-rice',
        productName: 'Basmati Rice Aged 5kg',
        quantity: 1,
        price: 6.99,
        unit: '5 kg',
        image: '/product-rice.jpg',
      },
      {
        productId: 'prod-sunflower-oil',
        productName: 'Pure Sunflower Oil 1L',
        quantity: 2,
        price: 2.20,
        unit: '1 L',
        image: '/product-oil.jpg',
      },
      {
        productId: 'prod-fresh-spinach',
        productName: 'Fresh Baby Spinach',
        quantity: 3,
        price: 1.10,
        unit: '250 g',
        image: '/product-spinach.jpg',
      },
      {
        productId: 'prod-chicken-breast',
        productName: 'Prime British Chicken Breast',
        quantity: 2,
        price: 4.50,
        unit: '500 g',
        image: '/product-chicken.jpg',
      },
      {
        productId: 'prod-california-almonds',
        productName: 'California Premium Almonds',
        quantity: 1,
        price: 3.80,
        unit: '250 g',
        image: '/product-almonds.jpg',
      },
    ],
  },
  {
    id: 'VF-10947',
    customerName: 'Robert Campbell',
    customerEmail: 'r.campbell@outlook.com',
    customerPhone: '+44 7800 892110',
    customerPostcode: 'AL1 3EG',
    address: '82 St Peter Street, St Albans, AL1 3EG',
    date: '18 Oct 2026',
    time: '09:12 AM',
    status: 'packing',
    total: 35.60,
    paymentStatus: 'paid',
    paymentMethod: 'Visa Debit (•••• 4242)',
    assignedVan: 'Van #02 (St Albans Chilled)',
    assignedDriver: 'Sarah T.',
    isSubstituteAllowed: true,
    notes: 'Gate code is 1842. Ring bell on front pillar.',
    items: [
      {
        productId: 'prod-fresh-spinach',
        productName: 'Fresh Baby Spinach',
        quantity: 2,
        price: 1.10,
        unit: '250 g',
        image: '/product-spinach.jpg',
      },
      {
        productId: 'prod-sunflower-oil',
        productName: 'Pure Sunflower Oil 1L',
        quantity: 1,
        price: 2.20,
        unit: '1 L',
        image: '/product-oil.jpg',
      },
      {
        productId: 'prod-california-almonds',
        productName: 'California Premium Almonds',
        quantity: 2,
        price: 3.80,
        unit: '250 g',
        image: '/product-almonds.jpg',
      },
    ],
  },
  {
    id: 'VF-10946',
    customerName: 'Ananya Patel',
    customerEmail: 'ananya.p@patelholdings.co.uk',
    customerPhone: '+44 7911 349021',
    customerPostcode: 'SG14 1HP',
    address: 'Unit 9, Mill Road, Hertford, SG14 1HP',
    date: '18 Oct 2026',
    time: '08:30 AM',
    status: 'pending',
    total: 82.30,
    paymentStatus: 'paid',
    paymentMethod: 'Mastercard (•••• 8821)',
    assignedVan: 'Unassigned',
    assignedDriver: 'Unassigned',
    isSubstituteAllowed: false,
    notes: 'Strictly no substitutes on cold-pressed sesame oil.',
    items: [
      {
        productId: 'prod-basmati-rice',
        productName: 'Basmati Rice Aged 5kg',
        quantity: 3,
        price: 6.99,
        unit: '5 kg',
        image: '/product-rice.jpg',
      },
      {
        productId: 'prod-sunflower-oil',
        productName: 'Pure Sunflower Oil 1L',
        quantity: 4,
        price: 2.20,
        unit: '1 L',
        image: '/product-oil.jpg',
      },
      {
        productId: 'prod-chicken-breast',
        productName: 'Prime British Chicken Breast',
        quantity: 4,
        price: 4.50,
        unit: '500 g',
        image: '/product-chicken.jpg',
      },
    ],
  },
  {
    id: 'VF-10945',
    customerName: 'George Edwards',
    customerEmail: 'george.edwards@gmail.com',
    customerPhone: '+44 7500 128941',
    customerPostcode: 'AL8 6PQ',
    address: '27 Digswell Road, Welwyn Garden City, AL8 6PQ',
    date: '17 Oct 2026',
    time: '18:40 PM',
    status: 'delivered',
    total: 29.90,
    paymentStatus: 'paid',
    paymentMethod: 'Google Pay',
    assignedVan: 'Van #01 (Welwyn Hub)',
    assignedDriver: 'Mark Jenkins',
    isSubstituteAllowed: true,
    items: [
      {
        productId: 'prod-fresh-spinach',
        productName: 'Fresh Baby Spinach',
        quantity: 2,
        price: 1.10,
        unit: '250 g',
        image: '/product-spinach.jpg',
      },
      {
        productId: 'prod-california-almonds',
        productName: 'California Premium Almonds',
        quantity: 1,
        price: 3.80,
        unit: '250 g',
        image: '/product-almonds.jpg',
      },
    ],
  },
  {
    id: 'VF-10944',
    customerName: 'Kavita Nair',
    customerEmail: 'kavita.nair@hotmail.com',
    customerPhone: '+44 7722 901844',
    customerPostcode: 'AL10 9NE',
    address: 'Flat 4B, Roe Green Close, Hatfield, AL10 9NE',
    date: '17 Oct 2026',
    time: '16:15 PM',
    status: 'delivered',
    total: 54.10,
    paymentStatus: 'paid',
    paymentMethod: 'Apple Pay',
    assignedVan: 'Van #04 (Hatfield Express)',
    assignedDriver: 'David M.',
    isSubstituteAllowed: true,
    items: [
      {
        productId: 'prod-basmati-rice',
        productName: 'Basmati Rice Aged 5kg',
        quantity: 2,
        price: 6.99,
        unit: '5 kg',
        image: '/product-rice.jpg',
      },
      {
        productId: 'prod-chicken-breast',
        productName: 'Prime British Chicken Breast',
        quantity: 3,
        price: 4.50,
        unit: '500 g',
        image: '/product-chicken.jpg',
      },
    ],
  },
  {
    id: 'VF-10943',
    customerName: 'Simon Wright',
    customerEmail: 'simon.wright@btinternet.com',
    customerPhone: '+44 7900 661230',
    customerPostcode: 'SG13 7AB',
    address: '15 Castle Street, Hertford, SG13 7AB',
    date: '16 Oct 2026',
    time: '14:20 PM',
    status: 'cancelled',
    total: 22.40,
    paymentStatus: 'refunded',
    paymentMethod: 'Visa Debit (•••• 1092)',
    assignedVan: 'Van #02 (St Albans Chilled)',
    assignedDriver: 'Sarah T.',
    isSubstituteAllowed: false,
    notes: 'Customer requested cancellation before dispatch. Refund issued.',
    items: [
      {
        productId: 'prod-sunflower-oil',
        productName: 'Pure Sunflower Oil 1L',
        quantity: 2,
        price: 2.20,
        unit: '1 L',
        image: '/product-oil.jpg',
      },
    ],
  },
];

export const initialCustomers: AdminCustomer[] = [
  {
    id: 'CUST-001',
    name: 'Priya Sharma',
    email: 'priya.sharma@gmail.com',
    phone: '+44 7700 900112',
    address: '14 Parkside Walk, Hatfield',
    postcode: 'AL10 9TN',
    ordersCount: 28,
    totalSpent: 1240.50,
    lastOrderDate: 'Today (18 Oct 2026)',
    status: 'vip',
    loyaltyCoins: 620,
    notes: 'Prefers organic produce only. Regular weekly Thursday orders.',
  },
  {
    id: 'CUST-002',
    name: 'Arjun Kumar',
    email: 'arjun.kumar@varamfoods.co.uk',
    phone: '+44 7700 900821',
    address: '42 Manor Road, Hatfield',
    postcode: 'AL10 9TN',
    ordersCount: 16,
    totalSpent: 685.20,
    lastOrderDate: '18 Oct 2026',
    status: 'active',
    loyaltyCoins: 350,
    notes: 'Gate code 4920. Smart substitutions enabled.',
  },
  {
    id: 'CUST-003',
    name: 'Ananya Patel',
    email: 'ananya.p@patelholdings.co.uk',
    phone: '+44 7911 349021',
    address: 'Unit 9, Mill Road, Hertford',
    postcode: 'SG14 1HP',
    ordersCount: 42,
    totalSpent: 2890.00,
    lastOrderDate: '18 Oct 2026',
    status: 'vip',
    loyaltyCoins: 1450,
    notes: 'Commercial catering account. Bulk 20kg flour and 5L oils.',
  },
  {
    id: 'CUST-004',
    name: 'Robert Campbell',
    email: 'r.campbell@outlook.com',
    phone: '+44 7800 892110',
    address: '82 St Peter Street, St Albans',
    postcode: 'AL1 3EG',
    ordersCount: 7,
    totalSpent: 260.40,
    lastOrderDate: '18 Oct 2026',
    status: 'active',
    loyaltyCoins: 130,
    notes: 'Evening delivery slot only (after 6pm).',
  },
  {
    id: 'CUST-005',
    name: 'George Edwards',
    email: 'george.edwards@gmail.com',
    phone: '+44 7500 128941',
    address: '27 Digswell Road, Welwyn Garden City',
    postcode: 'AL8 6PQ',
    ordersCount: 12,
    totalSpent: 410.80,
    lastOrderDate: '17 Oct 2026',
    status: 'active',
    loyaltyCoins: 205,
    notes: 'Leave in porch if not answering doorbell.',
  },
  {
    id: 'CUST-006',
    name: 'Simon Wright',
    email: 'simon.wright@btinternet.com',
    phone: '+44 7900 661230',
    address: '15 Castle Street, Hertford',
    postcode: 'SG13 7AB',
    ordersCount: 3,
    totalSpent: 84.10,
    lastOrderDate: '16 Oct 2026',
    status: 'flagged',
    loyaltyCoins: 40,
    notes: 'Multiple disputed delivery cancellations. Support review flagged.',
  },
];

export const initialStaff: AdminStaff[] = [
  {
    id: 'STAFF-01',
    name: 'Rohan Mehra',
    email: 'rohan.mehra@varamfoods.co.uk',
    role: 'Store Manager',
    permissions: ['full_access', 'financials', 'user_management', 'pricing', 'inventory'],
    status: 'active',
    lastActive: 'Now (Active Session)',
  },
  {
    id: 'STAFF-02',
    name: 'David Miller',
    email: 'david.miller@varamfoods.co.uk',
    role: 'Dispatch Lead',
    permissions: ['orders_dispatch', 'fleet_management', 'courier_routing', 'driver_chat'],
    status: 'active',
    lastActive: '12 mins ago (Van #04 Route)',
  },
  {
    id: 'STAFF-03',
    name: 'Aisha Begum',
    email: 'aisha.begum@varamfoods.co.uk',
    role: 'Warehouse Picker',
    permissions: ['inventory_read', 'barcode_picking', 'packing_queue'],
    status: 'active',
    lastActive: '4 mins ago (Hub Aisle 3)',
  },
  {
    id: 'STAFF-04',
    name: 'James Thornton',
    email: 'james.t@varamfoods.co.uk',
    role: 'Customer Support',
    permissions: ['customer_messaging', 'order_status', 'refund_requests'],
    status: 'active',
    lastActive: '25 mins ago (Support Desk)',
  },
  {
    id: 'STAFF-05',
    name: 'Sarah Townsend',
    email: 'sarah.townsend@varamfoods.co.uk',
    role: 'Dispatch Lead',
    permissions: ['orders_dispatch', 'fleet_management', 'courier_routing'],
    status: 'on_break',
    lastActive: '45 mins ago',
  },
];

export const initialInventory: AdminInventoryItem[] = [
  {
    id: 'INV-01',
    sku: 'VRM-RCE-05K',
    name: 'Basmati Rice Aged 5kg',
    category: 'Rice & Millets',
    currentStock: 142,
    reorderPoint: 40,
    optimalStock: 200,
    unitCost: 4.80,
    retailPrice: 6.99,
    supplier: 'India Gate UK Ltd',
    status: 'in_stock',
    lastRestocked: '14 Oct 2026',
    unit: '5 kg bag',
  },
  {
    id: 'INV-02',
    sku: 'VRM-OIL-01L',
    name: 'Pure Sunflower Oil 1L',
    category: 'Edible Oils & Ghee',
    currentStock: 18,
    reorderPoint: 35,
    optimalStock: 120,
    unitCost: 1.45,
    retailPrice: 2.20,
    supplier: 'Fortune Foods UK',
    status: 'low_stock',
    lastRestocked: '05 Oct 2026',
    unit: '1 L bottle',
  },
  {
    id: 'INV-03',
    sku: 'VRM-VEG-SPN',
    name: 'Fresh Baby Spinach 250g',
    category: 'Vegetables & Fruits',
    currentStock: 24,
    reorderPoint: 20,
    optimalStock: 90,
    unitCost: 0.65,
    retailPrice: 1.10,
    supplier: 'Hertfordshire Organic Growers',
    status: 'in_stock',
    lastRestocked: '18 Oct 2026 (Daily Fresh)',
    unit: '250 g pack',
  },
  {
    id: 'INV-04',
    sku: 'VRM-MT-CHK',
    name: 'Prime British Chicken Breast 500g',
    category: 'Meat & Poultry',
    currentStock: 8,
    reorderPoint: 25,
    optimalStock: 80,
    unitCost: 3.10,
    retailPrice: 4.50,
    supplier: 'East Anglian Poultry Farms',
    status: 'low_stock',
    lastRestocked: '17 Oct 2026',
    unit: '500 g tray',
  },
  {
    id: 'INV-05',
    sku: 'VRM-NUT-ALM',
    name: 'California Premium Almonds 250g',
    category: 'Sweets & Snacks',
    currentStock: 64,
    reorderPoint: 30,
    optimalStock: 100,
    unitCost: 2.40,
    retailPrice: 3.80,
    supplier: 'Natco Wholesale UK',
    status: 'in_stock',
    lastRestocked: '10 Oct 2026',
    unit: '250 g pouch',
  },
  {
    id: 'INV-06',
    sku: 'VRM-GHE-500',
    name: 'Pure Desi Cow Ghee 500ml',
    category: 'Edible Oils & Ghee',
    currentStock: 3,
    reorderPoint: 20,
    optimalStock: 60,
    unitCost: 4.20,
    retailPrice: 6.49,
    supplier: 'GRB Dairy Products UK',
    status: 'out_of_stock',
    lastRestocked: '28 Sep 2026',
    unit: '500 ml jar',
  },
  {
    id: 'INV-07',
    sku: 'VRM-ATA-10K',
    name: 'Aashirvaad Shudh Chakki Atta 10kg',
    category: 'Atta & Flours',
    currentStock: 88,
    reorderPoint: 30,
    optimalStock: 150,
    unitCost: 8.90,
    retailPrice: 12.99,
    supplier: 'ITC UK Imports',
    status: 'in_stock',
    lastRestocked: '12 Oct 2026',
    unit: '10 kg sack',
  },
];

export const initialSuppliers: AdminSupplier[] = [
  {
    id: 'SUP-01',
    name: 'Hertfordshire Organic Growers',
    category: 'Fresh Vegetables & Produce',
    leadTimeDays: 1,
    contactPerson: 'David Evans',
    email: 'orders@hertsorganic.co.uk',
    phone: '+44 1707 284910',
    rating: 4.9,
    activeOrders: 2,
  },
  {
    id: 'SUP-02',
    name: 'India Gate UK Ltd',
    category: 'Basmati Rice & Grains',
    leadTimeDays: 3,
    contactPerson: 'Rajiv Kapoor',
    email: 'commercial@indiagate.co.uk',
    phone: '+44 208 845 2000',
    rating: 4.8,
    activeOrders: 1,
  },
  {
    id: 'SUP-03',
    name: 'Natco Wholesale UK',
    category: 'Nuts, Spices & Lentils',
    leadTimeDays: 2,
    contactPerson: 'Harish Natco',
    email: 'sales@natco-foods.co.uk',
    phone: '+44 1280 825400',
    rating: 4.7,
    activeOrders: 3,
  },
  {
    id: 'SUP-04',
    name: 'East Anglian Poultry Farms',
    category: 'Fresh Chilled Meat',
    leadTimeDays: 1,
    contactPerson: 'Claire Bennett',
    email: 'dispatch@eastangliafarm.co.uk',
    phone: '+44 1603 490122',
    rating: 4.9,
    activeOrders: 1,
  },
];

export const weeklyRevenueData = [
  { day: 'Mon', revenue: 4210, orders: 112, avgOrder: 37.58 },
  { day: 'Tue', revenue: 3890, orders: 104, avgOrder: 37.40 },
  { day: 'Wed', revenue: 4650, orders: 128, avgOrder: 36.32 },
  { day: 'Thu', revenue: 5320, orders: 141, avgOrder: 37.73 },
  { day: 'Fri', revenue: 6480, orders: 168, avgOrder: 38.57 },
  { day: 'Sat', revenue: 8120, orders: 205, avgOrder: 39.60 },
  { day: 'Sun', revenue: 7420, orders: 189, avgOrder: 39.25 },
];

export const categorySalesDistribution = [
  { name: 'Vegetables & Fruits', percentage: 32, revenue: 12840, color: '#F5D103' },
  { name: 'Rice, Atta & Grains', percentage: 26, revenue: 10430, color: '#B45309' },
  { name: 'Edible Oils & Ghee', percentage: 18, revenue: 7220, color: '#F4A45D' },
  { name: 'Meat & Poultry', percentage: 14, revenue: 5610, color: '#E5A800' },
  { name: 'Sweets & Snacks', percentage: 10, revenue: 4010, color: '#18181B' },
];
