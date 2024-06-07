import React, { useRef } from 'react'
import { toggleFavorite } from '../../redux/slices/favoriteSlice';
import { toggleComparison } from '../../redux/slices/comparisonSlice';
import { addToCart, changeQuantity } from '../../redux/slices/cartSlice';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { ComparisonIcon, DeleteIcon, FavoriteIcon } from '../../helpers/Icons';
import { AddOutlined, RemoveOutlined } from '@mui/icons-material';

function ComparisonProductCard({ sticky, product }) {



  const cart = useSelector((state) => state?.cart);
  const favorite = useSelector((state) => state?.favorite);
  const comparison = useSelector((state) => state?.comparison);

  const productInCart = cart?.cart?.find((el) => el?.id === product?.id);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleToggleFavorite = (event) => {
    event.preventDefault();
    dispatch(toggleFavorite(product));
  };

  const handleToggleComparison = (event) => {
    event.preventDefault();
    dispatch(toggleComparison(product));
  };


  const isProductInCart = cart?.cart?.some(
    (el) => el?.id === product?.id
  );
  const isProductInFavorite = favorite?.favorite?.some(
    (el) => el?.id === product?.id
  );
  const isProductInComparison = comparison?.comparison?.some(
    (el) => el?.id === product?.id
  );



  return (
    <NavLink
      to={`/catalog/${product?.category?.slug}/${product?.slug}`}
      className='overflow-hidden group box-border pr-4 mb-2'
    >
      <div className="flex gap-2 ">
        <div className='basis-1/2'>
          <div className='rounded-md mm:rounded-xl overflow-hidden relative bg-gray-100'>
            {product?.files?.length > 0 && (
              <img
                className='w-[80px] h-[80px] object-contain m-auto'
                src={product?.files[0]?.medium || noImg}
                onError={(e) => {
                  e.target.onError = null;
                  e.target.src = noImg;
                }}
                alt='*'
              />
            )}
            <div className='absolute top-2 w-full px-2 z-10 flex justify-between items-start'>
              {product?.tags?.length > 0 && (
                <span
                  style={{ color: product?.tags[0]?.text_color }}
                  className={`bg-[${product?.tags[0]?.background_color}] py-[3px] lg:py-1 px-1.5 lg:px-2 uppercase text-[8px] lg:text-xs font-semibold lg:font-bold rounded-xl`}
                >
                  {product?.tags[0]?.text}
                </span>
              )}
            </div>
          </div>
          <div className='flex gap-5 items-center justify-center mt-4'>
            <FavoriteIcon favorite={favorite?.favorite?.some((el) => el?.id === product?.id) ? "true" : "false"} className='transition-all duration-300 hover:scale-110  cursor-pointer' onClick={handleToggleFavorite} />
            <DeleteIcon className='transition-all duration-300 hover:scale-110 cursor-pointer' onClick={handleToggleComparison} />
          </div>
        </div>
        <div className='lining-nums proportional-nums  basis-1/2  '>
          <div className='flex items-end pb-1 h-8'>
            <span className='text-colBlack mr-1 font-bold line-clamp-1 break-all whitespace-nowrap text-sm mm:text-base'>
              {product?.price ? (
                `${product?.price?.discount
                  ? product?.price?.discount?.price
                  : product?.price?.default
                }  ${product?.price?.currency}`
              ) : (
                <p className='font-semibold text-sm mm:text-base'>
                  Цена не указана
                </p>
              )}
            </span>
            <span className='text-[8px] mm:text-xs line-through mr-2 whitespace-nowrap mb-[2px]'>
              {product?.price?.discount && `${product?.price?.discount}`}
            </span>
            {product?.price?.discount && (
              <span className='px-2 py-[2px] font-semibold rounded-3xl text-[8px] mm:text-xs bg-[#F04438] text-white line-clamp-1 break-all whitespace-nowrap'>
                {`${product?.price?.discount?.percent} %`}
              </span>
            )}

          </div>


          <div className='h-[50px] mt-1'>
            <h5 className='font-medium text-sm leading-[120%] text-colBlack line-clamp-3'>
              {`${product?.groupName} ${product?.name}` || 'Не указано'}
            </h5>
          </div>

          {isProductInCart ? (
            <div className='flex justify-center w-full'>

              <div className='flex  justify-center items-center gap-3 basis-1/3'>
                <span className='w-10 h-10 min-w-[40px] rounded-full flex justify-center items-center bg-colSuperLight'
                  onClick={() => { dispatch(changeQuantity({ product, quantity: -1 })) }}>
                  <RemoveOutlined className='text-colGreen cursor-pointer' />
                </span>
                <span className='font-semibold'>{productInCart.quantity}</span>
                <span className='w-10 h-10 min-w-[40px] rounded-full flex justify-center items-center bg-colSuperLight'
                  onClick={(e) => {
                    e.preventDefault()
                    dispatch(changeQuantity({ product, quantity: 1 }))
                  }}>
                  <AddOutlined className='text-colGreen cursor-pointer' />
                </span>
              </div>

            </div>
          ) : (
            <button
              onClick={(e) => {
                e.preventDefault();
                dispatch(addToCart(product));
              }}
              className='transition-all text-xs xs:text-sm sm:text-base duration-200 bg-colGreen text-white rounded-md p-2 mt-1 font-semibold w-full'
            >
              В корзину
            </button>
          )}
        </div>

      </div>

    </NavLink>
  )
}

export default ComparisonProductCard