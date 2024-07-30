import { Skeleton } from '@mui/material'
import React from 'react'
function SidebarFiltersSkeleton() {
  return (
    <div className='flex flex-col gap-2'>
        <Skeleton variant="rounded" height={30} width={90}/>
        <div className='flex gap-2 '>
            <Skeleton variant="rounded" height={40} width={90}/>
            
            <Skeleton variant="rounded" height={40} width={90}/>
        </div>
        <Skeleton variant="rounded" height={20} width={180}/>

        <div className='mt-4 flex flex-col gap-2'>
        <Skeleton variant="rounded" height={40} width={90}/>
        <div className='flex gap-2'>
            <Skeleton variant="rounded" width={30} height={30}/>
            <Skeleton variant="text" width={90} sx={{ fontSize: '1rem'}}/>
        </div>
        <div className='flex gap-2'>
            <Skeleton variant="rounded" width={30} height={30}/>
            <Skeleton variant="text" width={110} sx={{ fontSize: '1rem'}}/>
        </div>
        <div className='flex gap-2'>
            <Skeleton variant="rounded" width={30} height={30}/>
            <Skeleton variant="text" width={80} sx={{ fontSize: '1rem'}}/>
        </div>
        </div>

        <div className='mt-4 flex flex-col gap-2'>
        <Skeleton variant="rounded" height={40} width={90}/>
        <div className='flex gap-2'>
            <Skeleton variant="rounded" width={30} height={30}/>
            <Skeleton variant="text" width={90} sx={{ fontSize: '1rem'}}/>
        </div>
        <div className='flex gap-2'>
            <Skeleton variant="rounded" width={30} height={30}/>
            <Skeleton variant="text" width={110} sx={{ fontSize: '1rem'}}/>
        </div>
        <div className='flex gap-2'>
            <Skeleton variant="rounded" width={30} height={30}/>
            <Skeleton variant="text" width={80} sx={{ fontSize: '1rem'}}/>
        </div>
        <div className='flex gap-2'>
            <Skeleton variant="rounded" width={30} height={30}/>
            <Skeleton variant="text" width={150} sx={{ fontSize: '1rem'}}/>
        </div>
        </div>
        

    </div>
  )
}

export default SidebarFiltersSkeleton