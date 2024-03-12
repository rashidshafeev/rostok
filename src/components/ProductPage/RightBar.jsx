import React from 'react'

import minusbutton from '../../assets/icons/minus-button.svg';
import plusbutton from '../../assets/icons/plus-button.svg';

import checkicon from '../../assets/icons/check-icon.svg';
import stallicon from '../../assets/icons/stall-icon.svg';
import truckicon from '../../assets/icons/truck-icon.svg';
import boxicon from '../../assets/icons/box-icon.svg';

function RightBar() {
    return (
        <>
            <div className='shadow-[1px_1px_34px_0_rgba(0,0,0,0.1)] p-5 rounded-xl flex flex-col gap-8 mb-5'>

                <div className='flex justify-between'>
                    <div className='flex flex-col items-start'>
                        <div className='text-lg font-medium'>14 528 ₽</div>
                        <div className='text-colGray text-sm line-through	'>19 080</div>
                    </div>
                    <div className='flex justify-center items-center'>
                        <div className='bg-colSuperLight w-8 h-8 rounded-full flex'>
                            <img className='mx-auto w-5' src={minusbutton} alt='*' />
                        </div>
                        <div className='mx-2.5'>1</div>
                        <div className='bg-colSuperLight w-8 h-8 rounded-full flex'>
                            <img className='mx-auto w-5' src={plusbutton} alt='*' />
                        </div>
                    </div>
                </div>

                <div className='flex flex-col gap-3'>

                    <div className='py-3 flex justify-center text-white font-semibold bg-colGreen w-full rounded cursor-pointer'>Добавить в корзину</div>
                    <div className='py-3 flex justify-center text-colGreen font-semibold bg-white border-colGreen border w-full rounded cursor-pointer'>Купить в 1 клик</div>

                </div>

                <div className='flex justify-center text-colGreen font-semibold underline underline-offset-8 cursor-pointer'>
                    Узнать цену для юрлиц
                </div>

            </div>

            <div className='flex flex-col gap-4 px-5'>

                <div className='flex'>
                    <img className='w-5 mr-2 ' src={checkicon} alt='*' />
                    <div className='text-sm'>В вашем городе 20 шт.</div>
                </div>

                <div className='flex'>
                    <img className='w-5 mr-2' src={stallicon} alt='*' />
                    <div className='text-colGreen font-semibold underline underline-offset-8 cursor-pointer mr-2 text-sm'>Самовывоз:</div>
                    <div className='text-sm'> сегодня, из 1 магазина</div>
                </div>
                <div className='flex'>
                    <img className='w-5 mr-2' src={truckicon} alt='*' />
                    <div className='text-colGreen font-semibold underline underline-offset-8 cursor-pointer mr-2 text-sm'  >Доставка:</div>
                    <div className='text-sm'>25 октября</div>
                </div>
                <div className='flex'>
                    <img className='w-5 mr-2' src={boxicon} alt='*' />
                    <div className='text-colGreen font-semibold underline underline-offset-8 cursor-pointer mr-2 text-sm'>Транспортная компания:</div>
                    <div className='text-sm'>25 октября</div>
                </div>

            </div>
        </>
    )
}

export default RightBar