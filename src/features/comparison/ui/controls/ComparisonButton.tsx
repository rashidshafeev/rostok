import { useComparison } from '@/features/comparison';
import { ComparisonIcon } from '@/shared/ui/icons';

import type { Product } from '@/entities/product';

interface ComparisonButtonProps {
  product: Product;
  className?: string;
}

export const ComparisonButton = ({
  product,
  className = '',
}: ComparisonButtonProps) => {
  const { isInComparison, isLoading, handleComparisonClick } =
    useComparison(product);

  return (
    <button
      onClick={handleComparisonClick}
      disabled={isLoading}
      className={`transition-all duration-300 hover:scale-110 ${isLoading ? 'cursor-wait' : 'cursor-pointer'} ${className}`}
    >
      <ComparisonIcon comparison={isInComparison} />
    </button>
  );
};
