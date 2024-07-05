// src/components/ProductCard.js
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, changeQuantity, removeFromCart } from '../redux/slices/cartSlice';
import { addToFavorite, removeFromFavorite } from '../redux/slices/favoriteSlice';
import { addToComparison, removeFromComparison } from '../redux/slices/comparisonSlice';
import { ComparisonIcon, FavoriteIcon } from '../helpers/Icons';
import noImg from '../assets/images/no-image.png';
import { AddOutlined, RemoveOutlined } from '@mui/icons-material';
import { getTokenFromCookies } from '../helpers/cookies/cookies';
import FavoriteButton from '../helpers/FavoriteButton/FavoriteButton';
import ComparisonButton from '../helpers/ComparisonButton/ComparisonButton';
import AddToCartButton from '../helpers/AddToCartButton/AddToCartButton';
import { useGetUserCartQuery } from '../redux/api/cartEndpoints';

const ProductCard = ({ product, recommended }) => {
  const token = getTokenFromCookies();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { cart } = useSelector((state) => state.cart);
  const { data: cartData } = useGetUserCartQuery(undefined, { skip: !token });

  const productInCart = token ? cartData?.data?.find((el) => el.id === product.id) : cart.find((el) => el.id === product.id);


  const handleAddToCart = (e) => {
    e.preventDefault();
    dispatch(addToCart(product));
  };

  const handleRemoveFromCart = (e) => {
    e.preventDefault();
    dispatch(removeFromCart(product));
  };

  console.log("product");
  console.log(product);
  return (
    <NavLink
      to={product.slug ? `/catalog/${product.category.slug}/${product.slug}` : ''}
      // className={`${setLoading || removeLoading && 'opacity-50 cursor-not-allowed'} overflow-hidden group duration-500`}
      className={`${false && 'opacity-50 cursor-not-allowed'} overflow-hidden group duration-500`}
    >
      <div>
        <div className='group h-[170px] mm:h-[220px] rounded-md mm:rounded-xl overflow-hidden relative bg-gray-100'>
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
      <div className='lining-nums proportional-nums mt-2 flex flex-col gap-1'>
        <div className='flex items-center justify-between gap-1'>
          <h3 className='text-xs sm:text-sm font-normal text-colText'>
            {product?.brand?.name}
          </h3>
          <span className='flex items-center gap-1'>
            <p className='text-xs sm:text-sm font-semibold'>
              {product?.price?.discount
                ? product?.price?.discount
                : product?.price?.default}
            </p>
            <p className='text-[8px] sm:text-[10px] text-colText'>
              {product?.price?.currency}
            </p>
          </span>
        </div>
        <div className='flex items-center justify-between gap-1'>
          <p className='text-xs sm:text-sm text-colText'>{product.name}</p>
          <span className='line-through text-[8px] sm:text-[10px] text-colText'>
            {product?.price && product?.price?.discount && `${product?.price?.default}  ${product?.price?.currency}`}
          </span>
        </div>
        {!productInCart && (
          <AddToCartButton product={product}>
          {({ isInCart, handleAddToCartClick }) => (
            <button
            onClick={handleAddToCartClick}
            className='transition-all text-xs xs:text-sm sm:text-base duration-200 bg-colGreen text-white rounded-md p-2 mt-1 font-semibold w-full'
            >
              В корзину
            </button>
          )}
        </AddToCartButton>
        )}
        {/* {product.quantity > 0 ? (
          isProductInCart ? (
            <div className='h-8 grid grid-cols-3 items-center'>
              <button
                className='w-8 h-8 bg-colSuperLight rounded-l-md flex items-center justify-center'
                onClick={() => dispatch(changeQuantity({ id: product.id, quantity: productInCart.quantity - 1 }))}
              >
                <RemoveOutlined className='text-colBlack' />
              </button>
              <p className='h-8 text-xs text-colBlack bg-colLight rounded-md flex items-center justify-center'>
                {productInCart.quantity}
              </p>
              <button
                className='w-8 h-8 bg-colSuperLight rounded-r-md flex items-center justify-center'
                onClick={() => dispatch(changeQuantity({ id: product.id, quantity: productInCart.quantity + 1 }))}
              >
                <AddOutlined className='text-colBlack' />
              </button>
            </div>
          ) : (
            <button
              className='h-8 w-full bg-colLight rounded-md text-xs text-colDarkGray hover:text-colBlack'
              onClick={handleAddToCart}
            >
              В корзину
            </button>
          )
        ) : (
          <button className='h-8 w-full bg-red-200 rounded-md text-xs text-colDarkGray cursor-not-allowed'>
            Нет в наличии
          </button>
        )} */}
      </div>
    </NavLink>
  );
};

export default ProductCard;
