import { useRemoveFromCart } from '@/features/cart';
import { DeleteIcon } from '@/shared/ui/icons';

import type { Product } from '@/entities/product';

interface RemoveFromCartButtonProps {
  product: Product;
  withConfirmation?: boolean;
  className?: string;
}

export const RemoveFromCartButton = ({
  product,
  withConfirmation = false,
  className = '',
}: RemoveFromCartButtonProps) => {
  const { handleRemove, isLoading } = useRemoveFromCart(product, {
    withConfirmation,
  });

  return (
    <button
      onClick={handleRemove}
      disabled={isLoading}
      className={`transition-all duration-300 hover:scale-110 ${
        isLoading ? 'cursor-wait' : 'cursor-pointer'
      } ${className}`}
    >
      <DeleteIcon />
    </button>
  );
};
