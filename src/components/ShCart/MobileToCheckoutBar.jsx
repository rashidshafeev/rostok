import React from 'react'
import { NavLink } from 'react-router-dom'
import plural from 'plural-ru'


function MobileToCheckoutBar({ selected, quantity }) {
    return (
        <div className='lg:hidden z-10 fixed bottom-[72px] w-full bg-white'>

            <div className='flex justify-between px-5 py-3'>
                <div className='flex justify-between w-full'>

                    <div className='flex flex-col justify-between items-center basis-1/3'>
                        <span className='text-xl font-semibold text-colBlack'>
                            40 000 ₽
                        </span>
                        <span className='text-sm text-colBlack'>
                            {quantity} {plural(quantity, 'товар', 'товара', 'товаров')}
                        </span>
                    </div>
                    <NavLink to='../checkout' className={`text-white font-semibold ${selected?.length === 0 ? 'bg-colGray' : 'bg-colGreen'} rounded w-full h-[50px] flex justify-center items-center`}>
                        Перейти к оформлению
                    </NavLink>

                </div>





            </div>


        </div>
    )
}

export default MobileToCheckoutBar