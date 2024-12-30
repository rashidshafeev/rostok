import { useAddToCart } from '@/features/cart';
import { LoadingSmall } from '@/shared/ui/Loader';

import type { Product } from '@/entities/product';

interface AddToCartButtonProps {
  product: Product;
  className?: string;
  variant?: 'primary' | 'secondary';
}

export const AddToCartButton = ({
  product,
  className = '',
  variant = 'primary',
}: AddToCartButtonProps) => {
  const { handleAddToCartClick, buttonState } = useAddToCart(product);

  return (
    <button
      onClick={handleAddToCartClick}
      disabled={buttonState.disabled || buttonState.loading}
      className={`
        flex justify-center items-center min-h-10 
        ${buttonState.disabled ? 'bg-colGray' : 'bg-colGreen cursor-pointer'}
        text-white rounded-md p-2 font-semibold w-full
        ${buttonState.loading ? 'cursor-wait' : ''}
        ${className}
      `}
    >
      {buttonState.loading ? <LoadingSmall /> : buttonState.text}
    </button>
  );
};
