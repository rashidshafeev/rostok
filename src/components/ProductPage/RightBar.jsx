import React from 'react'

import checkicon from '../../assets/icons/check-icon.svg';
import stallicon from '../../assets/icons/stall-icon.svg';
import truckicon from '../../assets/icons/truck-icon.svg';
import boxicon from '../../assets/icons/box-icon.svg';
import { useDispatch, useSelector } from 'react-redux';
import { AddOutlined, RemoveOutlined } from '@mui/icons-material';
import { addToCart, changeQuantity } from '../../redux/slices/cartSlice';
import { NavLink } from 'react-router-dom';

function RightBar({ product }) {
    
    const dispatch = useDispatch();
    const cart = useSelector(state => state?.cart)
    const productInCart = cart?.cart?.find((el) => el?.id === product?.id);


    return (
        <>
                <div className='shadow-[1px_1px_34px_0_rgba(0,0,0,0.1)] p-5 rounded-xl flex flex-col gap-8 mb-5'>

                    {productInCart && <div className='flex justify-between'>
                        <div className='flex flex-col items-start'>
                            <div className='text-lg font-medium'>14 528 ₽</div>
                            <div className='text-colGray text-sm line-through	'>19 080</div>
                        </div>

                        <div className='flex items-center space-x-3'>
                            <span className='w-10 h-10 min-w-[40px] rounded-full flex justify-center items-center bg-colSuperLight'
                                onClick={() => { dispatch(changeQuantity({ product, quantity: -1 })) }}>
                                <RemoveOutlined className='text-colGreen cursor-pointer' />
                            </span>
                            <span className='font-semibold'>{productInCart.quantity}</span>
                            <span className='w-10 h-10 min-w-[40px] rounded-full flex justify-center items-center bg-colSuperLight'
                                onClick={() => { dispatch(changeQuantity({ product, quantity: 1 })) }}>
                                <AddOutlined className='text-colGreen cursor-pointer' />
                            </span>
                        </div>
                    </div>}

                    {!productInCart && <div className='flex flex-col gap-3'>

                        <button className='py-3 flex justify-center text-white font-semibold bg-colGreen w-full rounded cursor-pointer'
                            onClick={() => { dispatch(addToCart(product)) }}>Добавить в корзину</button>


                        <button className='py-3 flex justify-center text-colGreen font-semibold bg-white border-colGreen border w-full rounded cursor-pointer'>Купить в 1 клик</button>

                    </div>}

                    {productInCart &&
                        <NavLink
                            to="/shopping-cart"
                        >
                            <button
                            className='py-3 flex justify-center text-colGreen font-semibold bg-white border-colGreen border w-full rounded cursor-pointer'>
                                Перейти в корзину</button>

                        </NavLink>}


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