
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { apiService } from '@/services/api';
import { Meal } from '@/types';
import { useToast } from '@/hooks/use-toast';

export const useMeals = () => {
  return useQuery({
    queryKey: ['meals'],
    queryFn: apiService.getMeals,
  });
};

export const useSearchMeals = (searchTerm: string) => {
  return useQuery({
    queryKey: ['meals', 'search', searchTerm],
    queryFn: () => apiService.searchMeals(searchTerm),
    enabled: !!searchTerm.trim(),
  });
};

export const useCreateMeal = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: apiService.createMeal,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['meals'] });
      toast({
        title: "Success",
        description: "Meal created successfully!",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to create meal. Please try again.",
        variant: "destructive",
      });
    },
  });
};

export const useUpdateMeal = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: ({ id, meal }: { id: string; meal: Partial<Meal> }) =>
      apiService.updateMeal(id, meal),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['meals'] });
      toast({
        title: "Success",
        description: "Meal updated successfully!",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update meal. Please try again.",
        variant: "destructive",
      });
    },
  });
};

export const useDeleteMeal = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: apiService.deleteMeal,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['meals'] });
      toast({
        title: "Success",
        description: "Meal deleted successfully!",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to delete meal. Please try again.",
        variant: "destructive",
      });
    },
  });
};
