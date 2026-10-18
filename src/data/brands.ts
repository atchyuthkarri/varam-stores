export interface BrandItem {
  id: string;
  name: string;
  slug: string;
  group: 'A-B' | 'C-E' | 'F-H' | 'I-K' | 'L-O' | 'P-R' | 'S-U' | 'V-Z' | '0-9';
  isPopular?: boolean;
}

export interface BrandGroup {
  group: 'A-B' | 'C-E' | 'F-H' | 'I-K' | 'L-O' | 'P-R' | 'S-U' | 'V-Z' | '0-9';
  brands: BrandItem[];
}

export const brandGroups: BrandGroup[] = [
  {
    group: 'A-B',
    brands: [
      { id: 'a2b', name: 'A2B', slug: 'a2b', group: 'A-B', isPopular: true },
      { id: 'aachi', name: 'Aachi', slug: 'aachi', group: 'A-B', isPopular: true },
      { id: 'aashirvaad', name: 'Aashirvaad', slug: 'aashirvaad', group: 'A-B', isPopular: true },
      { id: 'ajmi', name: 'Ajmi', slug: 'ajmi', group: 'A-B' },
      { id: 'ajwa', name: 'Ajwa', slug: 'ajwa', group: 'A-B' },
      { id: 'anil', name: 'Anil', slug: 'anil', group: 'A-B' },
      { id: 'annapoorna', name: 'Annapoorna', slug: 'annapoorna-masalas', group: 'A-B' },
      { id: 'ashoka', name: 'Ashoka', slug: 'ashoka', group: 'A-B' },
      { id: 'ayumi', name: 'Ayumi', slug: 'ayumi', group: 'A-B' },
      { id: 'bambino', name: 'Bambino', slug: 'bambino', group: 'A-B' },
      { id: 'balaji-wafers', name: 'Balaji Wafers', slug: 'balaji-wafers', group: 'A-B' },
      { id: 'brahmins', name: 'Brahmins', slug: 'brahmins', group: 'A-B' },
      { id: 'britannia', name: 'Britannia', slug: 'britannia', group: 'A-B', isPopular: true },
      { id: 'brooke-bond', name: 'Brooke Bond', slug: 'brooke-bond', group: 'A-B', isPopular: true },
      { id: 'bru', name: 'Bru', slug: 'bru', group: 'A-B', isPopular: true },
      { id: 'btm', name: 'BTM', slug: 'btm', group: 'A-B' },
    ],
  },
  {
    group: 'C-E',
    brands: [
      { id: 'cct', name: 'CCT', slug: 'cct', group: 'C-E' },
      { id: 'chozha', name: 'Chozha', slug: 'chozha', group: 'C-E' },
      { id: 'ceylon-fish', name: 'Ceylon Fish', slug: 'ceylon-dry-fried-fish', group: 'C-E' },
      { id: 'chings', name: 'Chings', slug: 'chings', group: 'C-E' },
      { id: 'comco', name: 'Comco', slug: 'comco', group: 'C-E' },
      { id: 'daawat', name: 'Daawat', slug: 'daawat', group: 'C-E', isPopular: true },
      { id: 'dabur', name: 'Dabur', slug: 'dabur', group: 'C-E', isPopular: true },
      { id: 'daily-delight', name: 'Daily Delight', slug: 'daily-delight', group: 'C-E' },
      { id: 'deepam', name: 'Deepam', slug: 'deepam', group: 'C-E' },
      { id: 'diamond', name: 'Diamond', slug: 'diamond', group: 'C-E' },
      { id: 'diamond-foods', name: 'Diamond Foods', slug: 'diamond-foods', group: 'C-E' },
      { id: 'double-horse', name: 'Double Horse', slug: 'double-horse', group: 'C-E', isPopular: true },
      { id: 'dr-nature', name: 'Dr. Nature', slug: 'dr-nature', group: 'C-E' },
      { id: 'eastern', name: 'Eastern', slug: 'eastern', group: 'C-E', isPopular: true },
      { id: 'elakkia', name: 'Elakkia', slug: 'elakkia', group: 'C-E' },
      { id: 'elephant-house', name: 'Elephant House', slug: 'elephant-house', group: 'C-E' },
      { id: 'elite', name: 'Elite', slug: 'elite', group: 'C-E' },
      { id: 'everest', name: 'Everest', slug: 'everest', group: 'C-E', isPopular: true },
    ],
  },
  {
    group: 'F-H',
    brands: [
      { id: 'fortune', name: 'Fortune', slug: 'fortune', group: 'F-H', isPopular: true },
      { id: 'fudco', name: 'Fudco', slug: 'fudco', group: 'F-H' },
      { id: 'the-grand-sweet', name: 'The Grand Sweet & Snacks', slug: 'the-grand-sweet-snacks', group: 'F-H', isPopular: true },
      { id: 'grb', name: 'GRB', slug: 'grb', group: 'F-H', isPopular: true },
      { id: 'haldirams', name: 'Haldirams', slug: 'haldirams', group: 'F-H', isPopular: true },
      { id: 'heera', name: 'Heera', slug: 'heera', group: 'F-H', isPopular: true },
      { id: 'himalaya', name: 'Himalaya', slug: 'himalaya', group: 'F-H' },
    ],
  },
  {
    group: 'I-K',
    brands: [
      { id: 'idhayam', name: 'Idhayam', slug: 'idhayam', group: 'I-K', isPopular: true },
      { id: 'indu-sri', name: 'Indu Sri', slug: 'indu-sri', group: 'I-K' },
      { id: 'india-gate', name: 'India Gate', slug: 'india-gate', group: 'I-K', isPopular: true },
      { id: 'jaimin', name: 'Jaimin', slug: 'jaimin-products', group: 'I-K' },
      { id: 'karachi', name: 'Karachi Bakery', slug: 'karachi-biscuits', group: 'I-K', isPopular: true },
      { id: 'kera-bites', name: 'Kera Bites', slug: 'kera-bites', group: 'I-K' },
      { id: 'kissan', name: 'Kissan', slug: 'kissan', group: 'I-K', isPopular: true },
      { id: 'kurkure', name: 'Kurkure', slug: 'kurkure-lays', group: 'I-K', isPopular: true },
      { id: 'kwality', name: 'Kwality', slug: 'kwality', group: 'I-K' },
    ],
  },
  {
    group: 'L-O',
    brands: [
      { id: 'laila', name: 'Laila', slug: 'laila', group: 'L-O' },
      { id: 'laxmi-narayan', name: 'Laxmi Narayan', slug: 'laxmi-narayan', group: 'L-O' },
      { id: 'lays', name: 'Lays', slug: 'lays', group: 'L-O' },
      { id: 'maggi', name: 'Maggi', slug: 'maggi', group: 'L-O', isPopular: true },
      { id: 'malabar-choice', name: 'Malabar Choice', slug: 'malabar-choice', group: 'L-O' },
      { id: 'maliban', name: 'Maliban', slug: 'maliban', group: 'L-O' },
      { id: 'md', name: 'MD', slug: 'md', group: 'L-O' },
      { id: 'mdh', name: 'MDH', slug: 'mdh-masala-offers', group: 'L-O', isPopular: true },
      { id: 'mehar', name: 'Mehar', slug: 'mehar', group: 'L-O' },
      { id: 'mtr', name: 'MTR', slug: 'mtr', group: 'L-O', isPopular: true },
      { id: 'narasus', name: 'Narasus', slug: 'narasus', group: 'L-O', isPopular: true },
      { id: 'native-food-store', name: 'Native Food Store', slug: 'native-food-store', group: 'L-O' },
      { id: 'natures', name: 'Natures', slug: 'natures', group: 'L-O' },
      { id: 'neptune', name: 'Neptune', slug: 'neptune', group: 'L-O' },
      { id: 'niru', name: 'Niru', slug: 'niru', group: 'L-O' },
    ],
  },
  {
    group: 'P-R',
    brands: [
      { id: 'parachute', name: 'Parachute', slug: 'parachute', group: 'P-R', isPopular: true },
      { id: 'parle', name: 'Parle', slug: 'parle', group: 'P-R', isPopular: true },
      { id: 'patanjali', name: 'Patanjali', slug: 'patanjali', group: 'P-R', isPopular: true },
      { id: 'pavizham', name: 'Pavizham', slug: 'pavizham', group: 'P-R' },
      { id: 'periyar', name: 'Periyar', slug: 'periyar', group: 'P-R' },
      { id: 'pillsbury', name: 'Pillsbury', slug: 'pillsbury-atta', group: 'P-R', isPopular: true },
      { id: 'prestige', name: 'Prestige', slug: 'prestige-items', group: 'P-R' },
      { id: 'priya', name: 'Priya', slug: 'priya', group: 'P-R', isPopular: true },
    ],
  },
  {
    group: 'S-U',
    brands: [
      { id: 'sakthi', name: 'Sakthi', slug: 'sakthi', group: 'S-U', isPopular: true },
      { id: 'samayal', name: 'Samayal', slug: 'samayal', group: 'S-U' },
      { id: 'shana', name: 'Shana', slug: 'shana', group: 'S-U', isPopular: true },
      { id: 'shankar', name: 'Shankar', slug: 'shankar', group: 'S-U' },
      { id: 'shree-krishna', name: 'Shree Krishna', slug: 'shree-krishna', group: 'S-U' },
      { id: 'sri-annam', name: 'Sri Annam', slug: 'sri-annam', group: 'S-U' },
      { id: 'sri-durga', name: 'Sri Durga', slug: 'sri-durga', group: 'S-U' },
      { id: 'sunfeast', name: 'Sunfeast', slug: 'sunfeast', group: 'S-U', isPopular: true },
      { id: 'suryaa', name: 'Suryaa', slug: 'suryaa', group: 'S-U' },
      { id: 'swad-of-kerala', name: 'Swad Of Kerala', slug: 'swad-of-kerala', group: 'S-U' },
      { id: 'taj-frozen', name: 'Taj Frozen', slug: 'taj', group: 'S-U' },
      { id: 'taj-mahal', name: 'Taj Mahal', slug: 'taj-mahal', group: 'S-U', isPopular: true },
      { id: 'tilda', name: 'Tilda', slug: 'tilda', group: 'S-U', isPopular: true },
      { id: 'top-ramen', name: 'Top Ramen', slug: 'top-ramen', group: 'S-U' },
      { id: 'trophy', name: 'Trophy', slug: 'trophy', group: 'S-U' },
      { id: 'udhaiyam', name: 'Udhaiyam', slug: 'udhaiyam', group: 'S-U', isPopular: true },
      { id: 'ultra', name: 'Ultra', slug: 'ultra', group: 'S-U' },
    ],
  },
  {
    group: 'V-Z',
    brands: [
      { id: 'vatika', name: 'Vatika', slug: 'vatika', group: 'V-Z', isPopular: true },
      { id: 'viswas', name: 'Viswas', slug: 'viswas', group: 'V-Z' },
      { id: 'yippee', name: 'Yippee', slug: 'yippee', group: 'V-Z', isPopular: true },
    ],
  },
  {
    group: '0-9',
    brands: [
      { id: '777', name: '777', slug: '777', group: '0-9', isPopular: true },
    ],
  },
];

export const allBrands: BrandItem[] = brandGroups.flatMap((g) => g.brands);

export const popularBrands: BrandItem[] = allBrands.filter((b) => b.isPopular);

export interface MarqueeBrand {
  id: string;
  name: string;
  logo: string;
  category: string;
  slug: string;
}

export const marqueeBrands: MarqueeBrand[] = [
  { id: 'haldirams', name: "Haldiram's", logo: '/brands/haldirams.webp', category: 'Namkeens & Sweets', slug: 'haldirams' },
  { id: 'aashirvaad', name: 'Aashirvaad', logo: '/brands/aashirvaad.webp', category: 'Whole Wheat Atta & Spices', slug: 'aashirvaad' },
  { id: 'aachi', name: 'Aachi', logo: '/brands/aachi.webp', category: 'Masalas & Spice Mixes', slug: 'aachi' },
  { id: 'britannia', name: 'Britannia', logo: '/brands/britannia.webp', category: 'Biscuits, Rusk & Dairy', slug: 'britannia' },
  { id: 'maggi', name: 'Maggi', logo: '/brands/maggi.webp', category: 'Noodles, Sauces & Cubes', slug: 'maggi' },
  { id: 'mtr', name: 'MTR', logo: '/brands/mtr.webp', category: 'Ready-to-Eat & Breakfast Mixes', slug: 'mtr' },
  { id: 'everest', name: 'Everest', logo: '/brands/everest.webp', category: 'Pure & Blended Spices', slug: 'everest' },
  { id: 'india-gate', name: 'India Gate', logo: '/brands/india-gate.webp', category: 'Premium Basmati Rice', slug: 'india-gate' },
  { id: 'priya', name: 'Priya', logo: '/brands/priya.webp', category: 'Traditional Pickles & Pastes', slug: 'priya' },
  { id: 'dabur', name: 'Dabur', logo: '/brands/dabur.webp', category: 'Honey, Chyawanprash & Oils', slug: 'dabur' },
  { id: 'fortune', name: 'Fortune', logo: '/brands/fortune.webp', category: 'Edible Oils & Basmati Rice', slug: 'fortune' },
  { id: 'grb', name: 'GRB', logo: '/brands/grb.webp', category: 'Pure Cow Ghee & Instant Mixes', slug: 'grb' },
  { id: 'parle', name: 'Parle', logo: '/brands/parle.webp', category: 'Biscuits, Rusks & Confectionery', slug: 'parle' },
  { id: 'patanjali', name: 'Patanjali', logo: '/brands/patanjali.webp', category: 'Ayurvedic & Natural Products', slug: 'patanjali' },
  { id: 'tilda', name: 'Tilda', logo: '/brands/tilda.webp', category: 'Pure Basmati Rice', slug: 'tilda' },
  { id: 'heera', name: 'Heera', logo: '/brands/heera.webp', category: 'Flours, Lentils & Spices', slug: 'heera' },
  { id: 'sakthi', name: 'Sakthi', logo: '/brands/sakthi.webp', category: 'South Indian Masalas', slug: 'sakthi' },
  { id: '777', name: '777 Brand', logo: '/brands/777.webp', category: 'South Indian Cooking Pastes', slug: '777' },
  { id: 'anil', name: 'Anil', logo: '/brands/anil.webp', category: 'Vermicelli, Rava & Flours', slug: 'anil' },
  { id: 'daily-delight', name: 'Daily Delight', logo: '/brands/daily-delight.webp', category: 'Frozen Indian Delicacies', slug: 'daily-delight' },
  { id: 'brahmins', name: 'Brahmins', logo: '/brands/brahmins.webp', category: 'Authentic Kerala Breakfast Mixes', slug: 'brahmins' },
  { id: 'annapoorna', name: 'Annapoorna', logo: '/brands/annapoorna.webp', category: 'Traditional Sambar & Rasam Powders', slug: 'annapoorna-masalas' },
];
