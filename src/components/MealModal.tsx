import React, { useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Meal } from '@/types';

const mealSchema = z.object({
  name: z.string().min(2, {
    message: "Meal name must be at least 2 characters.",
  }),
  price: z.string().refine((value) => {
    const num = Number(value);
    return !isNaN(num) && num > 0;
  }, {
    message: "Price must be a valid number greater than 0.",
  }),
  rating: z.string().refine((value) => {
    const num = Number(value);
    return !isNaN(num) && num >= 1 && num <= 5;
  }, {
    message: "Rating must be a number between 1 and 5.",
  }),
  imageUrl: z.string().url({
    message: "Image URL must be a valid URL.",
  }),
});

type FormData = z.infer<typeof mealSchema>;

interface MealModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (meal: Partial<Meal>) => void;
  meal?: Meal | null;
  mode: 'add' | 'edit';
  isLoading?: boolean;
}

const MealModal = ({ isOpen, onClose, onSave, meal, mode, isLoading = false }: MealModalProps) => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(mealSchema),
    defaultValues: {
      name: meal?.name || '',
      price: meal?.price?.toString() || '',
      rating: meal?.rating?.toString() || '',
      imageUrl: meal?.imageUrl || '',
    },
  });

  const onSubmit = (data: FormData) => {
    onSave(data);
    if (!isLoading) {
      reset();
      onClose();
    }
  };

  useEffect(() => {
    if (meal) {
      reset({
        name: meal.name || '',
        price: meal.price?.toString() || '',
        rating: meal.rating?.toString() || '',
        imageUrl: meal.imageUrl || '',
      });
    }
  }, [meal, reset]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md mx-auto max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{mode === 'add' ? 'Add New Meal' : 'Edit Meal'}</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Meal Name</Label>
            <Input id="name" placeholder="Enter meal name" {...register("name")} />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="price">Price</Label>
            <Input id="price" placeholder="Enter price" {...register("price")} />
            {errors.price && (
              <p className="text-sm text-red-500">{errors.price.message}</p>
            )}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="rating">Rating (1-5)</Label>
            <Input id="rating" placeholder="Enter rating" {...register("rating")} />
            {errors.rating && (
              <p className="text-sm text-red-500">{errors.rating.message}</p>
            )}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="imageUrl">Image URL</Label>
            <Input id="imageUrl" placeholder="Enter image URL" {...register("imageUrl")} />
            {errors.imageUrl && (
              <p className="text-sm text-red-500">{errors.imageUrl.message}</p>
            )}
          </div>
          
          <div className="flex justify-end space-x-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              className="bg-orange-500 hover:bg-orange-600 text-white shadow-lg hover:shadow-xl transition-shadow"
              disabled={isLoading}
            >
              {isLoading ? 'Saving...' : (mode === 'add' ? 'Add Meal' : 'Update Meal')}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default MealModal;
