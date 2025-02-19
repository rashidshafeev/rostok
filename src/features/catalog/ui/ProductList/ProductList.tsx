// src/features/catalog/ui/ProductList/ProductList.tsx

import { memo } from 'react';
import type { CatalogViewType } from '../../model/types';
import {
  ProductCard,
  ProductCardLine,
  ProductCardLineSmall,
  ProductCardSkeleton,
  ProductCardLineSkeleton,
  ProductCardLineSmallSkeleton,
} from '@/widgets/product-card';
import type { Product } from '@/entities/product';

interface ProductListProps {
  products: Product[];
  view: CatalogViewType;
  isLoading?: boolean;
  className?: string;
}

const skeletonCounts = {
  tile: 10,
  line: 5,
  lineNarrow: 5,
};

const viewStyles = {
  tile: 'grid grid-cols-2 mm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 ll:grid-cols-4 gap-3 gap-y-6',
  line: 'space-y-4',
  lineNarrow: 'space-y-4',
};

export const ProductList = memo(
  ({ products, view, isLoading, className = '' }: ProductListProps) => {
    if (isLoading) {
      return (
        <div className={viewStyles[view.type]}>
          {Array.from({ length: skeletonCounts[view.type] }).map((_, index) => {
            switch (view.type) {
              case 'tile':
                return <ProductCardSkeleton key={index} />;
              case 'line':
                return <ProductCardLineSkeleton key={index} />;
              case 'lineNarrow':
                return <ProductCardLineSmallSkeleton key={index} />;
            }
          })}
        </div>
      );
    }

    return (
      <div className={`${viewStyles[view.type]} ${className}`}>
        {products.map((product) => {
          switch (view.type) {
            case 'tile':
              return <ProductCard key={product.id} product={product} />;
            case 'line':
              return <ProductCardLine key={product.id} product={product} />;
            case 'lineNarrow':
              return <ProductCardLineSmall key={product.id} product={product} />;
          }
        })}
      </div>
    );
  }
);

ProductList.displayName = 'ProductList';

