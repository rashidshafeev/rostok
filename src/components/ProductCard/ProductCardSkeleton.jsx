import React from 'react'
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';

function ProductCardSkeleton() {
  return (
    <div className='w-[220px] h-[340px] flex flex-col'>
        <Skeleton variant='rounded' height={220} />
        <div className='mt-2 flex flex-col gap-1'>
        <Skeleton variant='rounded' height={20} />
        <Skeleton variant='rounded' height={20} />
        <Skeleton variant='rounded' height={20} />
        <Skeleton variant='rounded' height={40} />
        </div>
        
    </div>
  )
}

export default ProductCardSkeleton