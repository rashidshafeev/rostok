import { NavLink, useNavigate } from 'react-router-dom';
import noImg from '../assets/images/no-image.png';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../redux/slices/cartSlice';
import { toggleFavorite } from '../redux/slices/favoriteSlice';
import { ComparisonIcon, FavoriteIcon } from '../helpers/Icons';
import { toggleComparison } from '../redux/slices/comparisonSlice';

const ProductCard = ({ product, recommended }) => {
  const cart = useSelector((state) => state?.cart);
  const favorite = useSelector((state) => state?.favorite);
  const comparison = useSelector((state) => state?.comparison);

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

  const isProductInCart = cart?.cart?.some((el) => el?.id === product?.id);
  const isProductInFavorite = favorite?.favorite?.some(
    (el) => el?.id === product?.id
  );
  const isProductInComparison = comparison?.comparison?.some(
    (el) => el?.id === product?.id
  );

  return (
    <NavLink
      to={`/catalog/${product?.category?.slug}/${product?.slug}`}
      className='overflow-hidden group'
    >
      <div>
        <div className='group h-[170px] mm:h-[220px] rounded-md mm:rounded-xl overflow-hidden relative bg-gray-100'>
          {product?.files?.length > 0 && (
            <img
              className='w-full h-full object-cover'
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
                className={`bg-[${product?.tags[0]?.background_color}] py-1 px-2 uppercase text-xs font-bold rounded-xl`}
              >
                {product?.tags[0]?.text}
              </span>
            )}
            <FavoriteIcon
              className='transition-all duration-500 hover:scale-110 absolute right-2'
              favorite={isProductInFavorite ? 'true' : 'false'}
              onClick={handleToggleFavorite}
            />
          </div>
          <ComparisonIcon
            className='group-hover:opacity-100 mm:opacity-0 w-6 h-6 rounded-full bg-colSuperLight flex items-center justify-center transition-all duration-200 hover:scale-110 absolute bottom-2 right-2'
            comparison={isProductInComparison.toString()}
            onClick={handleToggleComparison}
          />
        </div>
      </div>
      <div className='lining-nums proportional-nums'>
        {!recommended && (
          <p className='text-[10px] text-colDarkGray pt-[6px] line-clamp-1 break-all'>
            Артикул: {product?.sku || 'Не указано'}
          </p>
        )}
        <div className='h-[50px] mt-1'>
          <h5 className='font-medium text-sm leading-[120%] text-colBlack line-clamp-3'>
            {product?.name || 'Не указано'}
          </h5>
        </div>
        <div className='flex items-end pb-1 h-8'>
          <span className='text-colBlack mr-1 font-bold line-clamp-1 break-all whitespace-nowrap text-sm mm:text-base'>
            {product?.price ? (
              `${
                product?.price?.discount
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
            {product?.price &&
              `${product?.price?.discount && product?.price?.default}`}
          </span>
          {product?.price?.discount && (
            <span className='px-2 py-[2px] font-semibold rounded-3xl text-[8px] mm:text-xs bg-[#F04438] text-white line-clamp-1 break-all whitespace-nowrap'>
              {`${product?.price?.discount?.percent} %`}
            </span>
          )}
        </div>
        {isProductInCart ? (
          <button
            onClick={(e) => {
              e.preventDefault();
              navigate('/shopping-cart');
            }}
            className='transition-all text-xs xs:text-sm sm:text-base duration-200 group-hover:opacity-100 lg:opacity-0 bg-colGreen text-white rounded-md p-2 mt-1 font-semibold w-full'
          >
            Перейти в корзину
          </button>
        ) : (
          <button
            onClick={(e) => {
              e.preventDefault();
              dispatch(addToCart(product));
            }}
            className='transition-all text-xs xs:text-sm sm:text-base duration-200 group-hover:opacity-100 lg:opacity-0 bg-colGreen text-white rounded-md p-2 mt-1 font-semibold w-full'
          >
            В корзину
          </button>
        )}
      </div>
    </NavLink>
  );
};

export default ProductCard;
