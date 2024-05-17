import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { addToCart, changeQuantity } from '../../../redux/slices/cartSlice';
import { AddOutlined, RemoveOutlined } from '@mui/icons-material';

function MobileAddToCartBar({ product }) {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const cart = useSelector(state => state?.cart)
    const productInCart = cart?.cart?.find((el) => el?.id === product?.id);



    return (
        <div className='lg:hidden z-10 fixed bottom-[72px] w-full bg-white lining-nums proportional-nums'>

            <div className='flex justify-between px-5 py-3'>
                {productInCart && <div className='flex justify-between w-full'>

                    <div className='flex  justify-center items-center space-x-3 basis-1/3'>
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
                        <button className='py-3 flex justify-center text-colGreen font-semibold bg-white border-colGreen border rounded cursor-pointer basis-2/3'
                            onClick={(e) => {
                                e.preventDefault();
                                navigate('/shopping-cart');
                            }}>Перейти в корзину</button>

                </div>}

                {!productInCart && <div className='flex gap-3 w-full'>
                <div className='flex flex-col items-start basis-1/3'>
                        <div className='text-lg font-medium'>14 528 ₽</div>
                        <div className='text-colGray text-sm line-through	'>19 080</div>
                    </div>
                    <button className='py-3 flex justify-center text-white font-semibold bg-colGreen w-full rounded cursor-pointer basis-2/3'
                        onClick={() => { dispatch(addToCart(product)) }}>Добавить в корзину</button>


                    {/* <button className='py-3 flex justify-center text-colGreen font-semibold bg-white border-colGreen border w-full rounded cursor-pointer'>Купить в 1 клик</button> */}

                </div>}

              
                    

            </div>


        </div>
    )
}

export default MobileAddToCartBar