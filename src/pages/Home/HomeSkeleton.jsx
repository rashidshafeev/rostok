import { Skeleton } from '@mui/material'
import React from 'react'
import BlockWithProductsSkeleton from '@components/Home/BlockWithProductsSkeleton'
function HomeSkeleton() {
  return (
    <div className='content flex flex-col gap-10 '>
        <Skeleton variant='rounded' className='mt-5' height={480} />
        <BlockWithProductsSkeleton />
        <Skeleton variant='rounded'  height={200} />
        <BlockWithProductsSkeleton />
        <BlockWithProductsSkeleton />
    </div>
  )
}

export default HomeSkeleton