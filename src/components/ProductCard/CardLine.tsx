import React from 'react';

import { NavLink, useNavigate } from 'react-router-dom';
import { addToCart } from '@store/slices/cartSlice';
import { useDispatch, useSelector } from 'react-redux';
import { ComparisonIcon, FavoriteIcon } from '../../helpers/Icons';

import noImg from "../../assets/images/no-image.png";
import { CatalogItem } from '@types/Product/CatalogItem';
import PriceDisplay from './PriceDisplay';

type CardLineProps = {
  product: CatalogItem;
}

const CardLine: React.FC<CardLineProps> = ({ product }) => {

  const cart = useSelector((state) => state?.cart);
  const favorite = useSelector((state) => state?.favorite);
  const comparison = useSelector((state) => state?.comparison);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isProductInCart = cart?.cart?.some((el) => el?.id === product?.id);
  const isProductInFavorite = favorite?.favorite?.some(
    (el) => el?.id === product?.id
  );
  const isProductInComparison = comparison?.comparison?.some(
    (el) => el?.id === product?.id
  );

  const handleToggleFavorite = (event: React.MouseEvent<SVGElement>) => {
    event.preventDefault();
    dispatch(toggleFavorite(product));
  };

  const handleToggleComparison = (event: React.MouseEvent<SVGElement>) => {
    event.preventDefault();
    dispatch(toggleComparison(product));
  };

  const handleToggleAddToCart = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    dispatch(addToCart(product));
  };

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
          <div className='flex items-center py-1 mt-1 lg:mt-0'>
              <PriceDisplay price={product?.price}/>
          </div>
          <div className='flex justify-end items-center space-x-2'>
            <FavoriteIcon
              className='transition-all duration-500 hover:scale-110 cursor-pointer'
              favorite={isProductInFavorite ? 'true' : 'false'}
              onClick={handleToggleFavorite}
            />
            <ComparisonIcon
              className='cursor-pointer w-6 h-6 rounded-full bg-colSuperLight flex items-center justify-center transition-all duration-200 hover:scale-110'
              comparison={isProductInComparison.toString()}
              onClick={handleToggleComparison}
            />
          </div>
        </div>
        <div className='flex justify-between space-x-3 pt-3 lg:pt-5'>
          {isProductInCart ? (
            <button
              onClick={() => navigate('/shopping-cart')}
              className='bg-colGreen text-white rounded-md p-2 mm:p-1.5 lg:p-2 font-semibold sm:max-w-[180px] ml-auto w-full text-sm mm:text-xs md:text-sm'
            >
              Перейти в корзину
            </button>
          ) : (
            <button
              onClick={handleToggleAddToCart}
              className='bg-colGreen text-white rounded-md p-2 mm:p-1.5 lg:p-2 font-semibold sm:max-w-[164px] ml-auto w-full text-sm mm:text-xs md:text-sm'
            >
              В корзину
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CardLine;
