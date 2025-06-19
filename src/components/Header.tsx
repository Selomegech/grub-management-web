
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
            <img 
              src="/lovable-uploads/4ec8d4f9-4b38-4a72-b9df-11dd961e0acd.png" 
              alt="FoodWagen" 
              className="h-8"
            />
          </div>
          <Button 
            onClick={onAddMeal}
            className="bg-orange-500 hover:bg-orange-600 text-white shadow-lg hover:shadow-xl transition-shadow"
          >
            Add Meal
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
