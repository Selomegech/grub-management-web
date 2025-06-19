
import { Meal } from '@/types';

const API_BASE_URL = 'https://6852821e0594059b23cdd834.mockapi.io/Food';

export interface ApiMeal {
  createdAt: string;
  name: string;
  avatar: string;
  rating: string;
  open: boolean;
  logo: string;
  id: string;
  price?: string;
}

// Transform API response to our Meal interface
const transformApiMeal = (apiMeal: ApiMeal): Meal => ({
  id: apiMeal.id,
  name: apiMeal.name,
  price: apiMeal.price ? parseFloat(apiMeal.price) : Math.floor(Math.random() * 20) + 5,
  rating: parseFloat(apiMeal.rating),
  imageUrl: apiMeal.avatar,
  restaurant: {
    id: apiMeal.id,
    name: `Restaurant ${apiMeal.id}`,
    logoUrl: apiMeal.logo,
    status: apiMeal.open ? 'Open Now' : 'Closed'
  }
});

// Transform our Meal interface to API format
const transformMealToApi = (meal: Partial<Meal>): Partial<ApiMeal> => ({
  name: meal.name,
  avatar: meal.imageUrl,
  rating: meal.rating?.toString(),
  open: meal.restaurant?.status === 'Open Now',
  logo: meal.restaurant?.logoUrl,
  price: meal.price?.toString()
});

export const apiService = {
  // Get all meals
  getMeals: async (): Promise<Meal[]> => {
    const response = await fetch(API_BASE_URL);
    if (!response.ok) {
      throw new Error('Failed to fetch meals');
    }
    const data: ApiMeal[] = await response.json();
    return data.map(transformApiMeal);
  },

  // Search meals by name
  searchMeals: async (searchTerm: string): Promise<Meal[]> => {
    const response = await fetch(`${API_BASE_URL}?name=${encodeURIComponent(searchTerm)}`);
    if (!response.ok) {
      throw new Error('Failed to search meals');
    }
    const data: ApiMeal[] = await response.json();
    return data.map(transformApiMeal);
  },

  // Create new meal
  createMeal: async (meal: Partial<Meal>): Promise<Meal> => {
    const response = await fetch(API_BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(transformMealToApi(meal)),
    });
    if (!response.ok) {
      throw new Error('Failed to create meal');
    }
    const data: ApiMeal = await response.json();
    return transformApiMeal(data);
  },

  // Update meal
  updateMeal: async (id: string, meal: Partial<Meal>): Promise<Meal> => {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(transformMealToApi(meal)),
    });
    if (!response.ok) {
      throw new Error('Failed to update meal');
    }
    const data: ApiMeal = await response.json();
    return transformApiMeal(data);
  },

  // Delete meal
  deleteMeal: async (id: string): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete meal');
    }
  },
};
