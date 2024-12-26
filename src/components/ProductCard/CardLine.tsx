import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import AddToCartButton from "@/helpers/AddToCartButton/AddToCartButton";
import ChangeQuantityGroup from "@/helpers/ChangeQuantityButton/ChangeQuantityGroup";
import FavoriteButton from "@/helpers/FavoriteButton/FavoriteButton";
import ComparisonButton from "@/helpers/ComparisonButton/ComparisonButton";
import { LoadingSmall } from '@/shared/ui/Loader';
import { ComparisonIcon, FavoriteIcon } from '@/shared/ui/icons';
import PriceDisplay from './PriceDisplay';
import noImg from "@/assets/images/no-image.png";
import { RootState } from '@/redux/store';
import { Product } from '@/types/Product/Product';

type CardLineProps = {
  product: Product;
}

const CardLine: React.FC<CardLineProps> = ({ product }) => {
  const { cart } = useSelector((state: RootState) => state.cart);
  const productInCart = cart.find((el) => el.id === product.id);

  return (
    <div className='lg:flex justify-between'>
      <div className='mm:flex lg:pr-4 lg:max-w-[800px] w-full'>
        <NavLink to={`/catalog/${product?.category?.slug}/${product?.slug}`}>
          <div className='mm:max-w-[180px] min-w-[180px] w-full h-[180px] mm:h-[180px] overflow-hidden rounded-xl relative bg-gray-100'>
            <img
              src={product?.files[0]?.medium || noImg}
              className='w-full h-full object-contain'
              onError={(e) => {
                const target = e.target as HTMLImageElement;
        target.onerror = null; // prevents looping
        target.src = noImg;;
              }}
              alt='*'
            />
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
        </NavLink>
        <div className='mm:pl-5 pt-2 mm:pt-0'>
          <div className='space-y-1 pt-'>
            <div>
              <NavLink
                to={`/catalog/${product?.category?.slug}/${product?.slug}`}
                className='font-bold text-sm  break-all hover:underline line-clamp-3 pb-1'
              >
                {product?.groupName + ' ' + product?.name || 'Не указано'}
              </NavLink>
              <p className='font-medium text-xs text-colDarkGray leading-4  break-all line-clamp-4 pb-1'>
                {product?.description || 'Не указано'}
              </p>
            </div>
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
      <div className='lg:max-w-xs w-full'>
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
        
        <div className='flex justify-between space-x-3 pt-3 lg:pt-5'>
          {!productInCart ? (
            <AddToCartButton product={product}>
            {({ handleAddToCartClick, isLoading, isSuccess, buttonText, disabled }) => (
              <button
                disabled={disabled || isLoading}
                onClick={handleAddToCartClick}
                className={` transition-all flex justify-center items-center min-h-10 xs:text-sm sm:text-base duration-200 ${
                  disabled  ? "bg-colGray " : "bg-colGreen cursor-pointer"
                }  text-white rounded-md p-2 font-semibold w-full ${
                  isLoading && !disabled  ? "cursor-wait" : ""
                } lining-nums proportional-nums`}
              >
                {isLoading && !isSuccess ? (
                  <LoadingSmall extraStyle={"white"} />
                ) : (
                  buttonText
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

export default CardLine;
