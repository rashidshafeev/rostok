import { Skeleton } from '@mui/material'
import React from 'react'
function CardLineSkeleton() {
  return (
    <div className='flex h-[180px] gap-5'>
        <div className='min-w-[280px] h-full'> <Skeleton variant="rounded" height={180}/></div>
        
        <div className='flex flex-col w-full'>
            <Skeleton variant="rounded" height={180}/>

        </div>
    </div>
  )
}

export default CardLineSkeleton