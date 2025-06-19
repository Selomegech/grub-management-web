import React, { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import MealCard from '@/components/MealCard';
import MealModal from '@/components/MealModal';
import DeleteMealModal from '@/components/DeleteMealModal';
import Footer from '@/components/Footer';
import { Meal } from '@/types';

const Index = () => {
  const [meals, setMeals] = useState<Meal[]>([
    {
      id: '1',
      name: 'Rice Lasagna',
      price: 12.99,
      rating: 4.5,
      imageUrl: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=400&h=300&fit=crop',
      restaurant: {
        id: '1',
        name: 'Bella Vista',
        logoUrl: 'https://images.unsplash.com/photo-1527576539890-dfa815648363?w=50&h=50&fit=crop',
        status: 'Open Now'
      }
    },
    {
      id: '2',
      name: 'Mixed Avocado Smoothie',
      price: 8.50,
      rating: 4.8,
      imageUrl: 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=400&h=300&fit=crop',
      restaurant: {
        id: '2',
        name: 'Green Garden',
        logoUrl: 'https://images.unsplash.com/photo-1500673922987-e212871fec22?w=50&h=50&fit=crop',
        status: 'Open Now'
      }
    },
    {
      id: '3',
      name: 'Pancakes',
      price: 7.25,
      rating: 4.2,
      imageUrl: 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=400&h=300&fit=crop',
      restaurant: {
        id: '3',
        name: 'Morning Cafe',
        logoUrl: 'https://images.unsplash.com/photo-1527576539890-dfa815648363?w=50&h=50&fit=crop',
        status: 'Open Now'
      }
    },
    {
      id: '4',
      name: 'Cupcake',
      price: 4.99,
      rating: 4.6,
      imageUrl: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=400&h=300&fit=crop',
      restaurant: {
        id: '4',
        name: 'Sweet Dreams',
        logoUrl: 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=50&h=50&fit=crop',
        status: 'Closed'
      }
    },
    {
      id: '5',
      name: 'Grilled Steak',
      price: 24.99,
      rating: 4.9,
      imageUrl: 'https://images.unsplash.com/photo-1500673922987-e212871fec22?w=400&h=300&fit=crop',
      restaurant: {
        id: '5',
        name: 'Prime Grill',
        logoUrl: 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=50&h=50&fit=crop',
        status: 'Open Now'
      }
    },
    {
      id: '6',
      name: 'Pasta with Potatoes',
      price: 16.75,
      rating: 4.3,
      imageUrl: 'https://images.unsplash.com/photo-1527576539890-dfa815648363?w=400&h=300&fit=crop',
      restaurant: {
        id: '6',
        name: 'Italian Corner',
        logoUrl: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=50&h=50&fit=crop',
        status: 'Open Now'
      }
    },
    {
      id: '7',
      name: 'Indian Spicy Soup',
      price: 11.50,
      rating: 4.4,
      imageUrl: 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=400&h=300&fit=crop',
      restaurant: {
        id: '7',
        name: 'Spice Palace',
        logoUrl: 'https://images.unsplash.com/photo-1500673922987-e212871fec22?w=50&h=50&fit=crop',
        status: 'Open Now'
      }
    },
    {
      id: '8',
      name: 'Indian Omelet',
      price: 9.99,
      rating: 4.1,
      imageUrl: 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=400&h=300&fit=crop',
      restaurant: {
        id: '8',
        name: 'Spice Palace',
        logoUrl: 'https://images.unsplash.com/photo-1527576539890-dfa815648363?w=50&h=50&fit=crop',
        status: 'Open Now'
      }
    }
  ]);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedMeal, setSelectedMeal] = useState<Meal | null>(null);

  const handleAddMeal = (newMeal: Partial<Meal>) => {
    const meal: Meal = {
      id: Date.now().toString(),
      name: newMeal.name!,
      price: newMeal.price || 12.99,
      rating: newMeal.rating!,
      imageUrl: newMeal.imageUrl!,
      restaurant: newMeal.restaurant!
    };
    setMeals(prev => [meal, ...prev]);
  };

  const handleEditMeal = (meal: Meal) => {
    setSelectedMeal(meal);
    setIsEditModalOpen(true);
  };

  const handleUpdateMeal = (updatedMeal: Partial<Meal>) => {
    setMeals(prev => prev.map(meal => 
      meal.id === selectedMeal?.id 
        ? { ...meal, ...updatedMeal }
        : meal
    ));
    setSelectedMeal(null);
  };

  const handleDeleteMeal = (meal: Meal) => {
    setSelectedMeal(meal);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (selectedMeal) {
      setMeals(prev => prev.filter(meal => meal.id !== selectedMeal.id));
    }
    setSelectedMeal(null);
    setIsDeleteModalOpen(false);
  };

  const featuredMeals = useMemo(() => meals.slice(0, 8), [meals]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onAddMeal={() => setIsAddModalOpen(true)} />
      <Hero />
      
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-800">Featured Meals</h2>
          </div>
          
          {featuredMeals.length === 0 ? (
            <div className="empty-state-message text-center py-12">
              <p className="text-gray-500 text-lg">No items available</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {featuredMeals.map((meal) => (
                <MealCard
                  key={meal.id}
                  meal={meal}
                  onEdit={handleEditMeal}
                  onDelete={handleDeleteMeal}
                />
              ))}
            </div>
          )}
          
          {featuredMeals.length > 0 && (
            <div className="text-center mt-12">
              <Button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3">
                View More
              </Button>
            </div>
          )}
        </div>
      </section>

      <Footer />

      <MealModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSave={handleAddMeal}
        mode="add"
      />

      <MealModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedMeal(null);
        }}
        onSave={handleUpdateMeal}
        meal={selectedMeal}
        mode="edit"
      />

      <DeleteMealModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setSelectedMeal(null);
        }}
        onConfirm={handleConfirmDelete}
        meal={selectedMeal}
      />
    </div>
  );
};

export default Index;
