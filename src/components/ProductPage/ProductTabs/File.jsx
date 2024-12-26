import React, { useState } from 'react'

import downloaddoc from '@/shared/assets/icons/doc-download.svg';
import pdficon from '@/shared/assets/icons/pdf-file-icon.png'

function File({ name }) {
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => {
        setIsHovered(true);
    };
    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    return (
        <div className='flex justify-center items-center cursor-pointer'
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}>
            <div className=''>
                <img src={pdficon} alt="" />
            </div>
            <div className=''>
                {name}</div>
            <div className={isHovered ? 'visible' : 'invisible'}>
                <img className='ml-10' src={downloaddoc} alt="" />
            </div>
        </div>
    )
}

export default File