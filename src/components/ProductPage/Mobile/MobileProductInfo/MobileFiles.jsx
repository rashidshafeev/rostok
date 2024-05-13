import React from 'react'
import File from '../../ProductTabs/File';

function MobileFiles({ product }) {
  return (
    <>
            <h3 className='text-2xl mt-5 font-semibold'>Файлы для скачивания</h3>
            {
                product?.files ? (<div className='flex gap-10 flex-wrap'>
                <File name="Информация по уходу"></File>
                <File name="Информация по уходу"></File>
                <File name="Информация по уходу"></File>
                
     

            </div>):(
                <div className='text-2xl mt-5 '>У данного товара нет файлов для скачивания</div> 
            )
            }
            
        </>
  )
}

export default MobileFiles