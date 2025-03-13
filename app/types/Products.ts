export type productType = {
  id: string;
  name: string;
  image: string[];
  description: string;
  category: string;
  price: number;
  discountPercent?: number;
  ratings: number;
  reviewsCount: number;
};

export type cartType = {
  user_id: string;
  id: string;
  name: string;
  image: string[];
  description: string;
  category: string;
  price: number;
  discountPercent?: number;
  ratings: number;
  reviewsCount: number;
  count: number;
};
