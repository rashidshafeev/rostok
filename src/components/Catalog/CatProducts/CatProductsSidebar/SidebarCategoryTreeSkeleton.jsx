import { Skeleton } from '@mui/material'
import React from 'react'

function SidebarCategoryTreeSkeleton() {
  return (
    <div className='flex flex-col'>
        <Skeleton variant='text' width={120} sx={{ fontSize: '1.5rem'}} />
        <Skeleton variant='text' width={140} sx={{ fontSize: '1.5rem'}} />
        <Skeleton variant='text' width={110} sx={{ fontSize: '1.5rem'}} />
        <Skeleton variant='text' width={120} sx={{ fontSize: '1.5rem'}} />
    </div>
  )
}

export default SidebarCategoryTreeSkeleton