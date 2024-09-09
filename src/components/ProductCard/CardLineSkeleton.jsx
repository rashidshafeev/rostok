import { Skeleton } from '@mui/material'
import React from 'react'
function CardLineSkeleton() {
  return (
    <div className='flex flex-wrap h-[180px] gap-5'>
        <div className='min-w-[280px] h-full'> <Skeleton variant="rounded" height={180}/></div>
        
        <div className='flex flex-col basis-5/12'>
            <Skeleton variant="text" sx={{ fontSize: '1.5rem' }} width={240}/>
            <Skeleton variant="text" sx={{ fontSize: '1rem' }} width={300}/>
            <Skeleton variant="text" sx={{ fontSize: '1rem' }} width={260}/>
            <Skeleton variant="text" sx={{ fontSize: '1rem' }} width={200}/>
            <Skeleton variant="text" sx={{ fontSize: '0.75rem' }} width={120}/>
            <Skeleton variant="text" sx={{ fontSize: '0.75rem' }} width={150}/>
            <Skeleton variant="text" sx={{ fontSize: '0.75rem' }} width={100}/>

        </div>
        {/* <div className='flex gap-2 basis-4/12'>
        <Skeleton variant="text" height={40} width={180}/>
        <Skeleton variant="rounded" height={40} width={180}/>
        </div> */}
    </div>
  )
}

export default CardLineSkeleton