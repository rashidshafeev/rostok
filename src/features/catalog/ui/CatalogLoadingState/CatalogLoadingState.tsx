
// src/features/catalog/ui/CatalogLoadingState/CatalogLoadingState.tsx

import { memo } from 'react';
import { ProductCardSkeleton } from '@/widgets/product-card';

interface CatalogLoadingStateProps {
  view: 'tile' | 'line' | 'lineNarrow';
  className?: string;
}

const skeletonCounts = {
  tile: 12,
  line: 5,
  lineNarrow: 5
};

const viewStyles = {
  tile: 'grid grid-cols-2 mm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 ll:grid-cols-4 gap-3 gap-y-6',
  line: 'space-y-4',
  lineNarrow: 'space-y-4'
};

export const CatalogLoadingState = memo(({
  view,
  className = ''
}: CatalogLoadingStateProps) => {
  return (
    <div className={`${viewStyles[view]} ${className}`}>
      {Array.from({ length: skeletonCounts[view] }).map((_, index) => (
        <ProductCardSkeleton key={index} />
      ))}
    </div>
  );
});

CatalogLoadingState.displayName = 'CatalogLoadingState';