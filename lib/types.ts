export interface Product {
  id: string;
  name: string;
  nameAr: string;
  category: string;
  price: number;
  image: string;
  seller: string;
  verified: boolean;
  rating?: number;
  purity?: string;
  weight?: string;
  badge?: string;
  description?: string;
  rarity?: string;
  edition?: string;
  endsIn?: string;
  likes?: number;
}
