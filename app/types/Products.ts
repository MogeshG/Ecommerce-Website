export type productType = {
  id: number;
  name: string;
  image: string[];
  description: string;
  category: string;
  price: number;
  discountPercent?: number;
  ratings: number;
  reviewsCount: number;
};
