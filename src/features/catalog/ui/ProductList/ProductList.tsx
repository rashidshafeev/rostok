// src/features/catalog/ui/ProductList/ProductList.tsx

import { memo } from 'react';

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
  view: 'tile' | 'line' | 'lineNarrow';
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
        <div className={viewStyles[view]}>
          {Array.from({ length: skeletonCounts[view] }).map((_, index) => {
            switch (view) {
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
      <div className={`${viewStyles[view]} ${className}`}>
        {products.map((product) => {
          switch (view) {
            case 'tile':
              return <ProductCard key={product.id} product={product} />;
            case 'line':
              return <ProductCardLine key={product.id} product={product} />;
            case 'lineNarrow':
              return (
                <ProductCardLineSmall key={product.id} product={product} />
              );
          }
        })}
      </div>
    );
  }
);

ProductList.displayName = 'ProductList';
