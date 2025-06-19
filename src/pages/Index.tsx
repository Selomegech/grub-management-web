
import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import MealCard from '@/components/MealCard';
import MealModal from '@/components/MealModal';
import DeleteMealModal from '@/components/DeleteMealModal';
import Footer from '@/components/Footer';
import { Meal } from '@/types';
import { useMeals, useSearchMeals, useCreateMeal, useUpdateMeal, useDeleteMeal } from '@/hooks/useMeals';

const Index = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedMeal, setSelectedMeal] = useState<Meal | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const mealsRef = useRef<HTMLElement>(null);

  // API hooks
  const { data: meals = [], isLoading, error } = useMeals();
  const { data: searchResults = [] } = useSearchMeals(searchTerm);
  const createMealMutation = useCreateMeal();
  const updateMealMutation = useUpdateMeal();
  const deleteMealMutation = useDeleteMeal();

  // Use search results if searching, otherwise use all meals
  const displayMeals = searchTerm.trim() ? searchResults : meals;
  const featuredMeals = displayMeals.slice(0, 8);

  const handleAddMeal = (newMeal: Partial<Meal>) => {
    createMealMutation.mutate(newMeal);
  };

  const handleEditMeal = (meal: Meal) => {
    setSelectedMeal(meal);
    setIsEditModalOpen(true);
  };

  const handleUpdateMeal = (updatedMeal: Partial<Meal>) => {
    if (selectedMeal) {
      updateMealMutation.mutate({ 
        id: selectedMeal.id, 
        meal: updatedMeal 
      });
    }
    setSelectedMeal(null);
  };

  const handleDeleteMeal = (meal: Meal) => {
    setSelectedMeal(meal);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (selectedMeal) {
      deleteMealMutation.mutate(selectedMeal.id);
    }
    setSelectedMeal(null);
    setIsDeleteModalOpen(false);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Search is handled automatically by the useSearchMeals hook
  };

  const handleHeroSearch = (searchQuery: string) => {
    setSearchTerm(searchQuery);
  };

  const scrollToMeals = () => {
    mealsRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Something went wrong</h2>
          <p className="text-gray-600">Failed to load meals. Please try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onAddMeal={() => setIsAddModalOpen(true)} />
      <Hero onSearch={handleHeroSearch} onScrollToMeals={scrollToMeals} />
      
      <section ref={mealsRef} className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <h2 className="text-3xl font-bold text-gray-800">Featured Meals</h2>
              
              {/* Search Bar */}
              <form onSubmit={handleSearch} className="flex gap-2 w-full md:w-auto">
                <div className="relative flex-1 md:w-80">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    id="search-bar"
                    type="text"
                    placeholder="Search meals..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </form>
            </div>
          </div>
          
          {isLoading ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">Loading meals...</p>
            </div>
          ) : featuredMeals.length === 0 ? (
            <div className="empty-state-message text-center py-12">
              <p className="text-gray-500 text-lg">
                {searchTerm.trim() ? 'No meals found matching your search' : 'No items available'}
              </p>
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
          
          {featuredMeals.length > 0 && displayMeals.length > 8 && (
            <div className="text-center mt-12">
              <Button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 shadow-lg hover:shadow-xl transition-shadow">
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
