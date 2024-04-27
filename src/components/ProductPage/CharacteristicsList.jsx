import React from 'react'

import copyicon from '../../assets/icons/copy-icon.svg';


function CharacteristicsList({ current, product, setTabIndex }) {
    return (
        <>
            <div className='flex flex-col gap-[10px]'>
                <div className='flex items-end'>
                    <div className='shrink leading-none text-colDarkGray mr-1'>Артикул</div>
                    <div className='grow border-b-2 border-dotted'></div>
                    <div className='flex items-end leading-none shrink ml-1'>
                        {current?.sku}
                        <img onClick={() => {navigator.clipboard.writeText(current?.sku)}} src={copyicon} alt="" className='w-4 h-4 rounded-full cursor-pointer hover:opacity-80' />
                    </div>
                </div>
                {
                    product?.attributes?.map((attribute, index) => {
                        return (
                            <div className='flex items-end'>
                                <div className='shrink leading-none text-colDarkGray mr-1'>{attribute.name}</div>
                                <div className='grow border-b-2 border-dotted'></div>
                                <div className='flex items-end leading-none shrink ml-1'>
                                    {attribute.values[0].text}
                                </div>
                            </div>
                        )
                    })

                }
               

            </div>
            <a  href="#char">
            <div onClick={() => { setTabIndex(0)}} className='text-colGreen font-semibold underline underline-offset-8 cursor-pointer mr-2'>Смотреть все характеристики</div></a>
        </>
    )
}

export default CharacteristicsList