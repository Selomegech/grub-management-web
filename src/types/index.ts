
export interface Restaurant {
  id: string;
  name: string;
  logoUrl: string;
  status: 'Open Now' | 'Closed';
}

export interface Meal {
  id: string;
  name: string;
  price: number;
  rating: number;
  imageUrl: string;
  restaurant: Restaurant;
}
