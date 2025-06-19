
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, Edit, Trash2 } from 'lucide-react';
import { Meal } from '@/types';

interface MealCardProps {
  meal: Meal;
  onEdit: (meal: Meal) => void;
  onDelete: (meal: Meal) => void;
}

const MealCard = ({ meal, onEdit, onDelete }: MealCardProps) => {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="relative">
        <img
          src={meal.imageUrl}
          alt={meal.name}
          className="w-full h-48 object-cover"
        />
        {meal.isNew && (
          <Badge className="absolute top-3 left-3 bg-orange-500 text-white">
            NEW
          </Badge>
        )}
        <div className="absolute top-3 right-3 flex gap-2">
          <Button
            size="sm"
            variant="outline"
            className="bg-white/90 hover:bg-white"
            onClick={() => onEdit(meal)}
          >
            <Edit className="w-4 h-4" />
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="bg-white/90 hover:bg-white text-red-500 hover:text-red-600"
            onClick={() => onDelete(meal)}
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-semibold text-gray-800">{meal.name}</h3>
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="restaurant-rating text-sm font-medium">{meal.rating}</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between mb-3">
          <span className="restaurant-name text-gray-600 text-sm">{meal.restaurant.name}</span>
          <span className="restaurant-price text-orange-500 font-bold">${meal.price}</span>
        </div>
        
        <div className="flex items-center justify-between">
          <span className={`restaurant-status text-xs px-2 py-1 rounded-full ${
            meal.restaurant.status === 'Open Now' 
              ? 'bg-green-100 text-green-800' 
              : 'bg-red-100 text-red-800'
          }`}>
            {meal.restaurant.status}
          </span>
          <img
            src={meal.restaurant.logoUrl}
            alt={meal.restaurant.name}
            className="w-8 h-8 rounded-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default MealCard;
