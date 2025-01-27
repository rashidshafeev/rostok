import { Button } from '@/shared/ui';
import { useAddToCart } from '@/features/cart';

import type { Product } from '@/entities/product';
import type { ButtonProps } from '@/shared/ui/button';

type AddToCartButtonProps = {
  product: Product;
} & Omit<ButtonProps, 'onClick' | 'disabled' | 'isLoading' | 'children'>;

export const AddToCartButton = ({
  product,
  className = '',
  variant = 'primary',
  size = 'md',
  fullWidth = true,
  asChild = false,
  ...props
}: AddToCartButtonProps) => {
  const { handleAddToCartClick, buttonState } = useAddToCart(product);

  return (
    <Button
      onClick={handleAddToCartClick}
      disabled={buttonState.disabled}
      isLoading={buttonState.loading}
      variant={variant}
      size={size}
      fullWidth={fullWidth}
      asChild={asChild}
      className={className}
      {...props}
    >
      {buttonState.text}
    </Button>
  );
};
