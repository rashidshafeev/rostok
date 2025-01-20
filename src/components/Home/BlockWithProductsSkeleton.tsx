import React from 'react';

import { Skeleton } from '@mui/material';

import { ProductCardSkeleton } from '@/widgets/product-card';

export const BlockWithProductsSkeleton = () => {
  return (
    <div className="flex flex-col gap-5">
      <Skeleton variant="rounded" height={60} width={320} />
      <div className="flex gap-2">
        {Array.from({ length: 6 }).map((_, index) => (
          <ProductCardSkeleton key={index} />
        ))}
      </div>
    </div>
  );
};
