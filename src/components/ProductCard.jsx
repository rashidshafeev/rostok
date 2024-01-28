import { NavLink, useNavigate } from 'react-router-dom';
import { useOutletContext } from 'react-router-dom';
import favorite from '../assets/icons/favorite.svg';
import noImg from '../assets/images/no-image.png';

const ProductCard = ({ product, furniture, recommended }) => {
  const navigate = useNavigate();
  const [cartProducts, addToCart] = useOutletContext();
  console.log('cartProducts', cartProducts);

  const isProductInCart = cartProducts?.some((el) => el?.id === product?.id);

  return (
    <div className='overflow-hidden relative group'>
      <NavLink to='#'>
        <div className='h-[220px] rounded-xl overflow-hidden relative bg-gray-50'>
          <img
            className='w-full h-full object-cover'
            src={product?.img}
            onError={(e) => {
              e.target.onError = null;
              e.target.src = noImg;
            }}
            alt='*'
          />
          <div className='absolute top-2 w-full px-2 z-10 flex justify-between items-start'>
            <span
              className={`${
                product?.type === 'hit'
                  ? 'bg-[#F57C1F]'
                  : product?.type === 'new'
                  ? 'bg-[#15765B]'
                  : 'bg-[#F04438]'
              } py-1 px-2 uppercase text-xs font-bold text-white rounded-xl`}
            >
              {product?.type === 'hit'
                ? 'Хит'
                : product?.type === 'new'
                ? 'Новинки'
                : 'Распродажа'}
            </span>
            <div className='flex justify-center items-center bg-gray-100 w-7 sm:w-8 h-7 sm:h-8 min-w-[28px] sm:min-w-[32px] rounded-full cursor-pointer'>
              <img className='w-4 sm:w-5' src={favorite} alt='*' />
            </div>
          </div>
        </div>
      </NavLink>
      <div className='lining-nums proportional-nums'>
        {!recommended && (
          <p className='text-[10px] text-colDarkGray pt-[6px] pb-[2px]'>
            Артикуль: {product?.article}
          </p>
        )}
        <NavLink
          to='#'
          className={`${
            recommended ? 'h-10 mt-2 line-clamp-2' : 'line-clamp-3 h-[60px]'
          } font-medium text-sm  break-all hover:underline`}
        >
          {product?.title}
        </NavLink>
        <div className='flex items-center py-1'>
          <span className='text-colBlack font-bold mr-2'>
            {product?.cost} ₽
          </span>
          <span className='px-2 py-[2px] font-semibold rounded-3xl text-xs bg-[#F04438] text-white'>
            30%
          </span>
        </div>
        {isProductInCart ? (
          <button
            onClick={() => navigate('/shopping-cart')}
            className={`${
              recommended || furniture
                ? ''
                : 'group-hover:opacity-100 opacity-0'
            } bg-colGreen text-white rounded-md p-2 mt-1 font-semibold w-full`}
          >
            Перейти в корзину
          </button>
        ) : (
          <button
            onClick={() => addToCart(product)}
            className={`${
              recommended || furniture
                ? ''
                : 'group-hover:opacity-100 opacity-0'
            } bg-colGreen text-white rounded-md p-2 mt-1 font-semibold w-full`}
          >
            В корзину
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
