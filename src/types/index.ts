
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

export interface MealFormData {
  foodName: string;
  foodRating: string;
  foodImageUrl: string;
  restaurantName: string;
  restaurantLogoUrl: string;
  restaurantStatus: 'Open Now' | 'Closed';
}

export interface FormErrors {
  'food-name-error'?: string;
  'food-rating-error'?: string;
  'food-image-error'?: string;
  'restaurant-name-error'?: string;
  'restaurant-logo-error'?: string;
  'restaurant-status-error'?: string;
}
