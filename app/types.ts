export interface Product {
  id: string;
  name: string;
  category: string;
  type: string;
  pricePKR: number;
  image: string;
  rating?: number;
  isNew?: boolean;
  desc?: string;
  discountPercent?: number;
}
