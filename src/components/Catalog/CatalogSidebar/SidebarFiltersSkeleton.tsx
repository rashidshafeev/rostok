import React from 'react';

import { Skeleton } from '@mui/material';

function SidebarFiltersSkeleton() {
  return (
    <div className="flex flex-col gap-2 mt-5">
      <Skeleton variant="text" sx={{ fontSize: '1.5rem' }} width={90} />
      <Skeleton variant="rounded" height={15} width={180} />

      <div className="flex gap-2 ">
        <Skeleton variant="rounded" height={40} width={85} />

        <Skeleton variant="rounded" height={40} width={85} />
      </div>

      <div className="mt-4 flex flex-col gap-2">
        <Skeleton variant="text" sx={{ fontSize: '1.5rem' }} width={100} />
        <div className="flex gap-2">
          <Skeleton variant="rounded" width={30} height={30} />
          <Skeleton variant="text" width={90} sx={{ fontSize: '1rem' }} />
        </div>
        <div className="flex gap-2">
          <Skeleton variant="rounded" width={30} height={30} />
          <Skeleton variant="text" width={110} sx={{ fontSize: '1rem' }} />
        </div>
        <div className="flex gap-2">
          <Skeleton variant="rounded" width={30} height={30} />
          <Skeleton variant="text" width={80} sx={{ fontSize: '1rem' }} />
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-2">
        <Skeleton variant="text" sx={{ fontSize: '1.5rem' }} width={140} />
        <div className="flex gap-2">
          <Skeleton variant="rounded" width={30} height={30} />
          <Skeleton variant="text" width={90} sx={{ fontSize: '1rem' }} />
        </div>
        <div className="flex gap-2">
          <Skeleton variant="rounded" width={30} height={30} />
          <Skeleton variant="text" width={110} sx={{ fontSize: '1rem' }} />
        </div>
        <div className="flex gap-2">
          <Skeleton variant="rounded" width={30} height={30} />
          <Skeleton variant="text" width={80} sx={{ fontSize: '1rem' }} />
        </div>
        <div className="flex gap-2">
          <Skeleton variant="rounded" width={30} height={30} />
          <Skeleton variant="text" width={150} sx={{ fontSize: '1rem' }} />
        </div>
      </div>
    </div>
  );
}

export default SidebarFiltersSkeleton;
