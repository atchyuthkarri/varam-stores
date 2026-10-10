export interface Product {
  id: string;
  name: string;
  category: 'fruits' | 'vegetables' | 'dairy' | 'bakery' | 'meat' | 'pantry' | 'beverages';
  categoryLabel: string;
  price: number;
  originalPrice?: number;
  unit: string;
  image: string;
  rating: number;
  reviewsCount: number;
  badge?: string;
  isOrganic?: boolean;
  origin?: string;
  description: string;
  nutrition?: {
    calories: string;
    carbs: string;
    protein: string;
    fat: string;
  };
}

export interface Category {
  id: string;
  name: string;
  itemCount: string;
  image: string;
  accentBg: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Review {
  id: string;
  name: string;
  location: string;
  avatar: string;
  rating: number;
  text: string;
  verified: boolean;
  date: string;
}
