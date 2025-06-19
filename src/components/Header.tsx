
import React from 'react';
import { Button } from '@/components/ui/button';

const Header = () => {
  return (
    <header className="w-full bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <span className="text-2xl font-bold text-orange-500">🍽️ FoodRecipe</span>
          </div>
          <nav className="hidden md:flex space-x-8">
            <a href="#" className="text-gray-700 hover:text-orange-500 transition-colors">Home</a>
            <a href="#" className="text-gray-700 hover:text-orange-500 transition-colors">Menu</a>
            <a href="#" className="text-gray-700 hover:text-orange-500 transition-colors">About</a>
            <a href="#" className="text-gray-700 hover:text-orange-500 transition-colors">Contact</a>
          </nav>
          <Button className="bg-orange-500 hover:bg-orange-600 text-white">
            Login
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
