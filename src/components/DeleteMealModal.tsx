
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Meal } from '@/types';

interface DeleteMealModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  meal: Meal | null;
}

const DeleteMealModal = ({ isOpen, onClose, onConfirm, meal }: DeleteMealModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md mx-auto">
        <DialogHeader>
          <DialogTitle className="text-orange-500">Delete Meal</DialogTitle>
        </DialogHeader>
        
        <div className="py-4">
          <p className="text-gray-600">
            Are you sure you want to delete "{meal?.name}"? This action cannot be undone.
          </p>
        </div>

        <div className="flex gap-3">
          <Button
            onClick={onConfirm}
            className="flex-1 bg-red-500 hover:bg-red-600 text-white"
          >
            Delete
          </Button>
          <Button
            variant="outline"
            onClick={onClose}
            className="flex-1"
          >
            Cancel
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteMealModal;
