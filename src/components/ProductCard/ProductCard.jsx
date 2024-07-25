// src/components/ProductCard.js
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ComparisonIcon, FavoriteIcon } from '../../helpers/Icons';
import noImg from '../../assets/images/no-image.png';
import { getTokenFromCookies } from '../../helpers/cookies/cookies';
import FavoriteButton from '../../helpers/FavoriteButton/FavoriteButton';
import ComparisonButton from '../../helpers/ComparisonButton/ComparisonButton';
import AddToCartButton from '../../helpers/AddToCartButton/AddToCartButton';
import { useGetUserCartQuery } from '../../redux/api/cartEndpoints';
import ChangeQuantityGroup from '../../helpers/ChangeQuantityButton/ChangeQuantityGroup';
import { LoadingSmall } from '../../helpers/Loader/Loader';
import { CircularProgress } from '@mui/material';

const ProductCard = ({ product }) => {
  const token = getTokenFromCookies();

  const { cart } = useSelector((state) => state.cart);
  const { data: cartData } = useGetUserCartQuery(undefined, { skip: !token });

  const productInCart = token
    ? cartData?.data?.find((el) => el.id === product.id)
    : cart.find((el) => el.id === product.id);

  return (
    <NavLink
      to={
        product.slug ? `/catalog/${product.category.slug}/${product.slug}` : ''
      }
      // className={`${setLoading || removeLoading && 'opacity-50 cursor-not-allowed'} overflow-hidden group duration-500`}
      className={`${
        false && 'opacity-50 cursor-not-allowed'
      } overflow-hidden group duration-500 flex flex-col justify-between items-stretch `}
    >
      <div>
        <div className='group h-[170px] mm:h-[220px] rounded-md mm:rounded-xl overflow-hidden relative bg-gray-200'>
          {product?.files?.length > 0 && (
            <img
              className='w-full h-full object-contain'
              src={product.files[0].medium || noImg}
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
                style={{ color: product.tags[0].text_color }}
                className={`bg-[${product.tags[0].background_color}] py-[3px] lg:py-1 px-1.5 lg:px-2 uppercase text-[8px] lg:text-xs font-semibold lg:font-bold rounded-xl`}
              >
                {product.tags[0].text}
              </span>
            )}
            <FavoriteButton product={product}>
              {({ isInFavorite, handleFavoriteClick }) => (
                <FavoriteIcon
                  onClick={handleFavoriteClick}
                  className='transition-all duration-500 hover:scale-110 absolute right-2'
                  favorite={isInFavorite ? 'true' : 'false'}
                />
              )}
            </FavoriteButton>
          </div>
          <ComparisonButton product={product}>
            {({ isInComparison, handleComparisonClick }) => (
              <ComparisonIcon
                onClick={handleComparisonClick}
                className='group-hover:opacity-100 lg:opacity-0 w-6 h-6 rounded-full bg-colSuperLight flex items-center justify-center transition-all duration-200 hover:scale-110 absolute bottom-2 right-2'
                comparison={isInComparison ? 'true' : 'false'}
              />
            )}
          </ComparisonButton>
        </div>
      </div>
      <div className='lining-nums proportional-nums mt-2 flex h-[98px] mm:h-[112px] flex-col gap-1'>
        <div className='flex flex-col justify-between gap-1 h-full mb-1'>
          <div className='flex justify-end items-center'>
            <div className='flex items-center gap-1 mr-1'>
              <p className='text-xs sm:text-sm font-semibold whitespace-nowrap'>
                {product?.price
                  ? product?.price?.discount
                    ? product?.price?.discount?.price +
                      ' ' +
                      product?.price?.currency
                    : product?.price?.default + ' ' + product?.price?.currency
                  : 'Цена не указана'}
              </p>
            </div>
            {product?.price && product?.price?.discount && (
              <div className='flex items-center'>
                <span className='line-through text-[8px] sm:text-[10px] text-colText whitespace-nowrap'>
                  {`${product?.price?.default}  ${product?.price?.currency}`}
                </span>
                <span className='ml-2 bg-[#F04438] text-[10px] mm:text-xs font-medium text-white whitespace-nowrap px-1 py-[1px] rounded-xl'>
                  {product?.price?.discount?.percent} %
                </span>
              </div>
            )}
          </div>
          <p className='text-xs sm:text-sm text-colText line-clamp-2'>
            {product.fullName}
          </p>
        </div>
        {!productInCart && (
          <AddToCartButton product={product}>
            {({ handleAddToCartClick, isLoading }) => (
              <button
                disabled={isLoading}
                onClick={handleAddToCartClick}
                className='transition-all text-xs text-center min-h-10 xs:text-sm sm:text-base duration-200 bg-colGreen text-white rounded-md p-2 font-semibold w-full'
              >
                {isLoading ? <LoadingSmall extraStyle={'white'}/> : 'В корзину'}
              </button>
            )}
          </AddToCartButton>
        )}
        {productInCart && (
          <ChangeQuantityGroup product={productInCart} enableRemove={true} />
        )}
      </div>
    </NavLink>
  );
};

export default ProductCard;
