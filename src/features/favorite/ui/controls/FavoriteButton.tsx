import { FavoriteIcon } from '@/shared/ui/icons';

import { useFavorites } from '../../model/hooks/useFavorites';

import type { Product } from '@/entities/product';

interface FavoriteButtonProps {
  product: Product;
  className?: string;
}

export const FavoriteButton = ({
  product,
  className = '',
}: FavoriteButtonProps) => {
  const { isInFavorite, isLoading, handleFavoriteClick } =
    useFavorites(product);

  return (
    <button
      onClick={handleFavoriteClick}
      disabled={isLoading}
      className={`transition-all duration-300 hover:scale-110 ${isLoading ? 'cursor-wait' : 'cursor-pointer'} ${className}`}
    >
      <FavoriteIcon active={isInFavorite} />
    </button>
  );
};
