import React from 'react'

import downloaddoc from '../../../assets/icons/doc-download.svg';
import pdficon from '../../../assets/icons/pdf-file-icon.png'
import File from './File';


function FilesTab() {
    return (
        <>
            <h4 className='text-xl mt-5 mb-[10px] font-semibold'>Файлы для скачивания</h4>

            <div className='flex gap-10 flex-wrap'>
                <File name="Информация по уходу"></File>
                <File name="Информация по уходу"></File>
                <File name="Информация по уходу"></File>
                
     

            </div>
        </>
    )
}

export default FilesTab