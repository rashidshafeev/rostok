import React from 'react'

import downloaddoc from '@/shared/assets/icons/doc-download.svg';
import pdficon from '@/shared/assets/icons/pdf-file-icon.png'
import File from './File';


function FilesTab({product}) {
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

export default FilesTab