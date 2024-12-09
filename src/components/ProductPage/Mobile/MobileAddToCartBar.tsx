import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { addToCart, changeQuantity } from '@store/slices/cartSlice';
import { AddOutlined, RemoveOutlined } from '@mui/icons-material';
import PriceDisplay from '@/components/ProductCard/PriceDisplay';
import AddToCartButton from '@/helpers/AddToCartButton/AddToCartButton';
import { LoadingSmall } from '@/helpers/Loader/Loader';
import ChangeQuantityGroup from '@/helpers/ChangeQuantityButton/ChangeQuantityGroup';

function MobileAddToCartBar({ product }) {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const cart = useSelector(state => state?.cart)
    const productInCart = cart?.cart?.find((el) => el?.id === product?.id);



    return (
        <div className='lg:hidden z-10 fixed bottom-[72px] w-full bg-white lining-nums proportional-nums'>

            <div className='flex justify-between gap-2 px-5 py-3'>
                {productInCart && <div className='flex  gap-2 justify-between w-full'>

                    <ChangeQuantityGroup
              product={productInCart}
              enableRemove={true}
            />
                        <button className='py-3 flex justify-center text-colGreen font-semibold bg-white border-colGreen border rounded cursor-pointer basis-2/3'
                            onClick={(e) => {
                                e.preventDefault();
                                navigate('/shopping-cart');
                            }}>Перейти в корзину</button>

                </div>}

                {!productInCart && <div className='flex gap-3 w-full'>
                <div className='flex flex-col items-start basis-1/3'>
                <div className="flex gap-2 justify-between grow">
            <div>
            
            <p className="text-xl font-bold whitespace-nowrap break-words">
            {productInCart?.price?.base && `${productInCart?.price?.total} ${productInCart?.price?.currency?.symbol}`}
          </p>
            </div>
            {product?.price?.base && !productInCart && <PriceDisplay price={product?.price} />}
            {productInCart?.price?.base && <PriceDisplay price={productInCart?.price} />}

            
        </div>
                    </div>
                    <AddToCartButton product={product}>
              {({ handleAddToCartClick, isLoading, isSuccess }) => (
                <button
                  disabled={isLoading}
                  className={`${
                    isLoading ? "cursor-wait" : "cursor-pointer"
                  } py-3 flex justify-center text-white font-semibold bg-colGreen w-full rounded cursor-pointer`}
                  onClick={handleAddToCartClick}
                >
                  {isLoading && !isSuccess ? (
                    <LoadingSmall extraStyle={"white"} />
                  ) : (
                    "Добавить в корзину"
                  )}
                </button>
              )}
            </AddToCartButton>

                  

                </div>}

              
                    

            </div>


        </div>
    )
}

export default MobileAddToCartBar