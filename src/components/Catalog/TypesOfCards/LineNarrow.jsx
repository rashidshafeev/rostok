import { NavLink, useNavigate } from 'react-router-dom';
import noImg from '../../../assets/images/no-image.png';
import { ComparisonIcon, FavoriteIcon } from '../../../helpers/Icons';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../../redux/slices/cartSlice';
import { toggleComparison } from '../../../redux/slices/comparisonSlice';
import { toggleFavorite } from '../../../redux/slices/favoriteSlice';

const LineNarrow = ({ product }) => {
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

  const handleToggleFavorite = (event) => {
    event.preventDefault();
    dispatch(toggleFavorite(product));
  };

  const handleToggleComparison = (event) => {
    event.preventDefault();
    dispatch(toggleComparison(product));
  };

  const handleToggleAddToCart = (event) => {
    event.preventDefault();
    dispatch(addToCart(product));
  };

  return (
    <div className='mm:flex justify-between relative'>
      <div className='flex justify-between mm:pr-4 max-w-[780px] w-full'>
        <div className='flex pr-2 mm:pr-0'>
          <NavLink
            to={product?.slug}
            className='min-w-[80px] w-20 h-20 bg-gray-100 rounded-lg overflow-hidden'
          >
            <img
              src={product?.files[0]?.large || noImg}
              className='w-full h-full object-contain'
              onError={(e) => {
                e.target.onError = null;
                e.target.src = noImg;
              }}
              alt='*'
            />
          </NavLink>
          <div className='pl-5 max-w-md'>
            <div className='space-y-2 pt-1'>
              <div>
                <NavLink
                  to={product?.slug}
                  className='font-bold text-sm  break-all hover:underline line-clamp-3 pb-1'
                >
                  {product?.groupName || 'Не указано'}
                </NavLink>
                <p className='font-medium text-xs text-colDarkGray leading-4  break-all line-clamp-3 mm:line-clamp-4'>
                  {product?.description || 'Не указано'}
                </p>
              </div>
              <p className='text-xs text-colDarkGray flex items-center space-x-2'>
                <span>Артикул:</span>
                <span>3433434434</span>
              </p>
              <p className='text-xs text-colDarkGray flex items-center space-x-2'>
                <span>Цвет:</span>
                <span className='w-3 h-3 min-w-[12px] bg-black rounded-full'></span>
                <span>Чёрный</span>
              </p>
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
          <div
            className={`${
              product?.tags?.length > 0 ? 'top-[28px]' : 'top-0'
            } flex items-center py-1 mm:static absolute right-0`}
          >
            <span className='text-colBlack text-xs lg:text-base font-semibold lg:font-bold mr-1 line-clamp-1 break-all whitespace-nowrap'>
              {product?.price
                ? `${
                    product?.price?.discount
                      ? product?.price?.discount?.price
                      : product?.price?.default
                  }  ${product?.price?.currency}`
                : 'Цена не указана'}
            </span>
            {product?.price && (
              <span className='text-xs line-through mr-2'>
                {product?.price?.discount && product?.price?.default}
              </span>
            )}
            {product?.price?.discount && (
              <span className='px-2 py-[2px] font-semibold rounded-3xl text-xs bg-[#F04438] text-white line-clamp-1 break-all whitespace-nowrap'>
                {`${product?.price?.discount?.percent} %`}
              </span>
            )}
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
        <div className='flex justify-between space-x-3 pt-2 mm:pt-5'>
          {isProductInCart ? (
            <button
              onClick={() => navigate('/shopping-cart')}
              className='bg-colGreen text-white rounded-md p-2 mm:p-1.5 md:p-2 font-semibold sm:max-w-[180px] ml-auto w-full text-sm mm:text-xs md:text-sm'
            >
              Перейти в корзину
            </button>
          ) : (
            <button
              onClick={handleToggleAddToCart}
              className='bg-colGreen text-white rounded-md p-2 mm:p-1.5 md:p-2 font-semibold sm:max-w-[164px] ml-auto w-full text-sm mm:text-xs md:text-sm'
            >
              В корзину
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default LineNarrow;
