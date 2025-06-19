
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, MapPin } from 'lucide-react';

interface HeroProps {
  onSearch: (searchTerm: string) => void;
  onScrollToMeals: () => void;
}

const Hero = ({ onSearch, onScrollToMeals }: HeroProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState('');

  const handleSearch = () => {
    onSearch(searchQuery);
    onScrollToMeals();
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <section className="bg-gradient-to-r from-orange-400 to-orange-500 py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="text-white">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Are you starving?
            </h1>
            <p className="text-xl mb-8 opacity-90">
              Within a few clicks, find meals that are accessible near you
            </p>
            
            <div className="bg-white rounded-lg p-4 shadow-lg">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    id="search-bar"
                    placeholder="Search for food or restaurant"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="pl-10 border-0 focus:ring-0 text-gray-700"
                  />
                </div>
                <div className="flex-1 relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    placeholder="Enter your location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="pl-10 border-0 focus:ring-0 text-gray-700"
                  />
                </div>
                <Button 
                  onClick={handleSearch}
                  className="bg-orange-500 hover:bg-orange-600 text-white px-8 shadow-lg hover:shadow-xl transition-shadow"
                >
                  Find Food
                </Button>
              </div>
            </div>
          </div>
          
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              <div className="w-80 h-80 bg-white rounded-full shadow-2xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=400&h=400&fit=crop"
                  alt="Delicious food bowl"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
