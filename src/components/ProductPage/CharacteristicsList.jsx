import React from 'react'

import copyicon from '../../assets/icons/copy-icon.svg';


function CharacteristicsList() {
    return (
        <>
            <div className='flex flex-col gap-[10px]'>

                <div className='flex items-end'>
                    <div className='shrink leading-none text-colDarkGray mr-1'>Артикул</div>
                    <div className='grow border-b-2 border-dotted'></div>
                    <div className='flex items-end leading-none shrink ml-1'>
                        234567890
                        <img src={copyicon} alt="" className='w-4 h-4 rounded-full cursor-pointer' />
                    </div>
                </div>

                <div className='flex items-end'>
                    <div className='shrink leading-none text-colDarkGray mr-1'>Тип</div>
                    <div className='grow border-b-2 border-dotted'></div>
                    <div className='flex items-end leading-none shrink ml-1'>
                        Кресло</div>
                </div>

                <div className='flex items-end'>
                    <div className='shrink leading-none text-colDarkGray mr-1'>Бренд</div>
                    <div className='grow border-b-2 border-dotted'></div>
                    <div className='flex items-end leading-none shrink ml-1'>
                        Boyard
                    </div>
                </div>


            </div>
            <div className='text-colGreen font-semibold underline underline-offset-8 cursor-pointer mr-2'>Смотреть все характеристики</div>
        </>
    )
}

export default CharacteristicsList