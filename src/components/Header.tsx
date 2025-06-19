
import React from 'react';
import { Button } from '@/components/ui/button';

interface HeaderProps {
  onAddMeal: () => void;
}

const Header = ({ onAddMeal }: HeaderProps) => {
  return (
    <header className="w-full bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <span className="text-2xl font-bold text-orange-500">🍽️ FoodRecipe</span>
          </div>
          <Button 
            onClick={onAddMeal}
            className="bg-orange-500 hover:bg-orange-600 text-white"
          >
            Add Meal
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
