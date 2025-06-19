
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Meal } from '@/types';

interface MealFormData {
  foodName: string;
  foodRating: string;
  foodPrice: string;
  foodImageUrl: string;
  restaurantName: string;
  restaurantLogoUrl: string;
  restaurantStatus: 'Open Now' | 'Closed';
}

interface FormErrors {
  'food-name-error'?: string;
  'food-rating-error'?: string;
  'food-price-error'?: string;
  'food-image-error'?: string;
  'restaurant-name-error'?: string;
  'restaurant-logo-error'?: string;
  'restaurant-status-error'?: string;
}

interface MealModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (meal: Partial<Meal>) => void;
  meal?: Meal | null;
  mode: 'add' | 'edit';
}

const MealModal = ({ isOpen, onClose, onSave, meal, mode }: MealModalProps) => {
  const [formData, setFormData] = useState<MealFormData>({
    foodName: '',
    foodRating: '',
    foodPrice: '',
    foodImageUrl: '',
    restaurantName: '',
    restaurantLogoUrl: '',
    restaurantStatus: 'Open Now'
  });

  const [errors, setErrors] = useState<FormErrors>({});

  useEffect(() => {
    if (meal && mode === 'edit') {
      setFormData({
        foodName: meal.name,
        foodRating: meal.rating.toString(),
        foodPrice: meal.price.toString(),
        foodImageUrl: meal.imageUrl,
        restaurantName: meal.restaurant.name,
        restaurantLogoUrl: meal.restaurant.logoUrl,
        restaurantStatus: meal.restaurant.status
      });
    } else {
      setFormData({
        foodName: '',
        foodRating: '',
        foodPrice: '',
        foodImageUrl: '',
        restaurantName: '',
        restaurantLogoUrl: '',
        restaurantStatus: 'Open Now'
      });
    }
    setErrors({});
  }, [meal, mode, isOpen]);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.foodName.trim()) {
      newErrors['food-name-error'] = 'Food Name is required';
    }

    if (!formData.foodRating) {
      newErrors['food-rating-error'] = 'Food Rating must be a number';
    } else if (isNaN(Number(formData.foodRating)) || Number(formData.foodRating) < 0 || Number(formData.foodRating) > 5) {
      newErrors['food-rating-error'] = 'Food Rating must be a number between 0 and 5';
    }

    if (!formData.foodPrice) {
      newErrors['food-price-error'] = 'Food Price is required';
    } else if (isNaN(Number(formData.foodPrice)) || Number(formData.foodPrice) < 0) {
      newErrors['food-price-error'] = 'Food Price must be a positive number';
    }

    if (!formData.foodImageUrl.trim()) {
      newErrors['food-image-error'] = 'Food Image URL is required';
    }

    if (!formData.restaurantName.trim()) {
      newErrors['restaurant-name-error'] = 'Restaurant Name is required';
    }

    if (!formData.restaurantLogoUrl.trim()) {
      newErrors['restaurant-logo-error'] = 'Restaurant Logo URL is required';
    }

    if (formData.restaurantStatus !== 'Open Now' && formData.restaurantStatus !== 'Closed') {
      newErrors['restaurant-status-error'] = "Restaurant Status must be 'Open Now' or 'Closed'";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const mealData: Partial<Meal> = {
      id: meal?.id || Date.now().toString(),
      name: formData.foodName,
      rating: Number(formData.foodRating),
      price: Number(formData.foodPrice),
      imageUrl: formData.foodImageUrl,
      restaurant: {
        id: meal?.restaurant.id || Date.now().toString(),
        name: formData.restaurantName,
        logoUrl: formData.restaurantLogoUrl,
        status: formData.restaurantStatus
      }
    };

    onSave(mealData);
    onClose();
  };

  const handleInputChange = (field: keyof MealFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    const errorField = `${field.replace(/([A-Z])/g, '-$1').toLowerCase()}-error` as keyof FormErrors;
    if (errors[errorField]) {
      setErrors(prev => ({ ...prev, [errorField]: undefined }));
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md mx-auto max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="text-orange-500">
            {mode === 'add' ? 'Add a meal' : 'Edit Meal'}
          </DialogTitle>
        </DialogHeader>
        
        <ScrollArea className="h-full max-h-[70vh] pr-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="food_name">Food Name</Label>
              <Input
                id="food_name"
                name="food_name"
                value={formData.foodName}
                onChange={(e) => handleInputChange('foodName', e.target.value)}
                placeholder="Enter food name"
                className={errors['food-name-error'] ? 'border-red-500' : ''}
              />
              {errors['food-name-error'] && (
                <div id="food-name-error" className="text-red-500 text-sm mt-1">
                  {errors['food-name-error']}
                </div>
              )}
            </div>

            <div>
              <Label htmlFor="food_rating">Food Rating</Label>
              <Input
                id="food_rating"
                name="food_rating"
                type="number"
                min="0"
                max="5"
                step="0.1"
                value={formData.foodRating}
                onChange={(e) => handleInputChange('foodRating', e.target.value)}
                placeholder="Enter rating (0-5)"
                className={errors['food-rating-error'] ? 'border-red-500' : ''}
              />
              {errors['food-rating-error'] && (
                <div id="food-rating-error" className="text-red-500 text-sm mt-1">
                  {errors['food-rating-error']}
                </div>
              )}
            </div>

            <div>
              <Label htmlFor="food_price">Food Price</Label>
              <Input
                id="food_price"
                name="food_price"
                type="number"
                min="0"
                step="0.01"
                value={formData.foodPrice}
                onChange={(e) => handleInputChange('foodPrice', e.target.value)}
                placeholder="Enter price"
                className={errors['food-price-error'] ? 'border-red-500' : ''}
              />
              {errors['food-price-error'] && (
                <div id="food-price-error" className="text-red-500 text-sm mt-1">
                  {errors['food-price-error']}
                </div>
              )}
            </div>

            <div>
              <Label htmlFor="food_image">Food Image URL</Label>
              <Input
                id="food_image"
                name="food_image"
                value={formData.foodImageUrl}
                onChange={(e) => handleInputChange('foodImageUrl', e.target.value)}
                placeholder="Enter image URL"
                className={errors['food-image-error'] ? 'border-red-500' : ''}
              />
              {errors['food-image-error'] && (
                <div id="food-image-error" className="text-red-500 text-sm mt-1">
                  {errors['food-image-error']}
                </div>
              )}
            </div>

            <div>
              <Label htmlFor="restaurant_name">Restaurant Name</Label>
              <Input
                id="restaurant_name"
                name="restaurant_name"
                value={formData.restaurantName}
                onChange={(e) => handleInputChange('restaurantName', e.target.value)}
                placeholder="Enter restaurant name"
                className={errors['restaurant-name-error'] ? 'border-red-500' : ''}
              />
              {errors['restaurant-name-error'] && (
                <div id="restaurant-name-error" className="text-red-500 text-sm mt-1">
                  {errors['restaurant-name-error']}
                </div>
              )}
            </div>

            <div>
              <Label htmlFor="restaurant_logo">Restaurant Logo URL</Label>
              <Input
                id="restaurant_logo"
                name="restaurant_logo"
                value={formData.restaurantLogoUrl}
                onChange={(e) => handleInputChange('restaurantLogoUrl', e.target.value)}
                placeholder="Enter logo URL"
                className={errors['restaurant-logo-error'] ? 'border-red-500' : ''}
              />
              {errors['restaurant-logo-error'] && (
                <div id="restaurant-logo-error" className="text-red-500 text-sm mt-1">
                  {errors['restaurant-logo-error']}
                </div>
              )}
            </div>

            <div>
              <Label htmlFor="restaurant_status">Restaurant Status</Label>
              <Select
                value={formData.restaurantStatus}
                onValueChange={(value: 'Open Now' | 'Closed') => handleInputChange('restaurantStatus', value)}
              >
                <SelectTrigger className={errors['restaurant-status-error'] ? 'border-red-500' : ''}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="Open Now">Open Now</SelectItem>
                  <SelectItem value="Closed">Closed</SelectItem>
                </SelectContent>
              </Select>
              {errors['restaurant-status-error'] && (
                <div id="restaurant-status-error" className="text-red-500 text-sm mt-1">
                  {errors['restaurant-status-error']}
                </div>
              )}
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                type="submit"
                className="flex-1 bg-orange-500 hover:bg-orange-600 text-white shadow-lg hover:shadow-xl transition-shadow"
              >
                Save
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="flex-1 shadow-md hover:shadow-lg transition-shadow"
              >
                Cancel
              </Button>
            </div>
          </form>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default MealModal;
