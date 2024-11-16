import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ComparisonIcon, FavoriteIcon } from '../../helpers/Icons';
import AddToCartButton from "../../helpers/AddToCartButton/AddToCartButton";
import ChangeQuantityGroup from "../../helpers/ChangeQuantityButton/ChangeQuantityGroup";
import FavoriteButton from "../../helpers/FavoriteButton/FavoriteButton";
import ComparisonButton from "../../helpers/ComparisonButton/ComparisonButton";
import { LoadingSmall } from "../../helpers/Loader/Loader";
import PriceDisplay from './PriceDisplay';
import noImg from "../../assets/images/no-image.png";
import { RootState } from '@/redux/store';
import { Product } from '@customTypes/Product/Product';

type LineNarrowProps = {
  product: Product;
}

const LineNarrow: React.FC<LineNarrowProps> = ({ product }) => {
  const { cart } = useSelector((state: RootState) => state.cart);
  const navigate = useNavigate();

  const productInCart = cart.find((el) => el.id === product.id);

  return (
    <div className='mm:flex justify-between relative'>
      <div className='flex justify-between mm:pr-4 max-w-[780px] w-full'>
        <div className='flex pr-2 mm:pr-0'>
          <NavLink
            to={`/catalog/${product?.category?.slug}/${product?.slug}`}
            className='min-w-[80px] w-20 h-20 bg-gray-100 rounded-lg overflow-hidden'
          >
            <img
              src={product?.files[0]?.medium || noImg}
              className='w-full h-full object-contain'
              onError={(e) => {
                e.target.onError = null;
                e.target.src = noImg;
              }}
              alt='*'
            />
          </NavLink>
          <div className='pl-5 basis-10/12'>
            <div className='space-y-1 pt-1'>
              <div>
                <NavLink
                  to={`/catalog/${product?.category?.slug}/${product?.slug}`}
                  className='font-bold text-sm  break-all hover:underline line-clamp-1 pb-1'
                >
                  {product?.groupName + ' ' + product?.name || 'Не указано'}
                </NavLink>
                <p className='font-medium text-xs text-colDarkGray leading-4  break-all line-clamp-2'>
                  {product?.description || 'Не указано'}
                </p>
              </div>
              <div className='flex gap-3'>
              <p className='text-xs text-colDarkGray flex items-center space-x-2'>
                <span>Код товара:</span>
                <span>{product?.sku || 'Не указано'}</span>
              </p>
              {product.attributes &&
                product?.attributes?.map((attribute, index) => (
                  <p
                    key={index}
                    className='text-xs text-colDarkGray flex items-center space-x-1'
                  >
                    <span>{attribute?.name}:</span>
                    <span className='font-semibold'>
                      {attribute?.color ? (
                        <div
                          style={{ backgroundColor: `${attribute?.color}` }}
                          className={`min-w-[12px] w-3 h-3 rounded-full`}
                        ></div>
                      ) : (
                        attribute?.text
                      )}
                    </span>
                  </p>
                ))}
                </div>
            </div>
          </div>
        </div>
        <div className='px-2 min-w-[98px] text-right md:text-center'>
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
      <div className='mm:max-w-xs w-full'>
        <div className='flex justify-between items-center'>
          <PriceDisplay price={product?.price} />
          <div className='flex justify-end items-center space-x-2'>
            <FavoriteButton product={product}>
              {({ isLoading, isInFavorite, handleFavoriteClick }) => (
                <FavoriteIcon
                  onClick={isLoading ? null : handleFavoriteClick}
                  className={`${isLoading ? "cursor-wait" : "cursor-pointer"} 
                    transition-all duration-500 hover:scale-110`}
                  favorite={isInFavorite ? "true" : "false"}
                />
              )}
            </FavoriteButton>
            <ComparisonButton product={product}>
              {({ isLoading, isInComparison, handleComparisonClick }) => (
                <ComparisonIcon
                  onClick={isLoading ? null : handleComparisonClick}
                  className={`${isLoading ? "cursor-wait" : "cursor-pointer"} 
                    w-6 h-6 rounded-full bg-colSuperLight flex items-center 
                    justify-center transition-all duration-200 hover:scale-110`}
                  comparison={isInComparison ? "true" : "false"}
                />
              )}
            </ComparisonButton>
          </div>
        </div>
        
        <div className='flex justify-between space-x-3 pt-2 mm:pt-5'>
          {!productInCart ? (
            <AddToCartButton product={product}>
              {({ handleAddToCartClick, isLoading, isSuccess }) => (
                <button
                  disabled={isLoading}
                  onClick={handleAddToCartClick}
                  className={`${isLoading ? "cursor-wait" : "cursor-pointer"}
                    bg-colGreen text-white rounded-md p-2 mm:p-1.5 md:p-2 
                    font-semibold sm:max-w-[164px] ml-auto w-full 
                    text-sm mm:text-xs md:text-sm`}
                >
                  {isLoading && !isSuccess ? (
                    <LoadingSmall extraStyle={"white"} />
                  ) : (
                    "В корзину"
                  )}
                </button>
              )}
            </AddToCartButton>
          ) : (
            <ChangeQuantityGroup product={productInCart} enableRemove={true} />
          )}
        </div>
      </div>
    </div>
  );
};

export default LineNarrow;
