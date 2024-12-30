import React from 'react';

import { Skeleton } from '@mui/material';

export const ProductCardLineSmallSkeleton = () => {
  return (
    <div className="flex gap-5">
      <Skeleton variant="rounded" height={80} width={80} />
      <div>
        <Skeleton variant="text" width={220} sx={{ fontSize: '1.5rem' }} />
        <Skeleton variant="text" width={500} sx={{ fontSize: '1rem' }} />
        <div className="flex gap-3">
          <Skeleton variant="text" width={140} sx={{ fontSize: '0.75rem' }} />
          <Skeleton variant="text" width={130} sx={{ fontSize: '0.75rem' }} />
          <Skeleton variant="text" width={180} sx={{ fontSize: '0.75rem' }} />
        </div>
      </div>
    </div>
  );
};
