import { NavLink, useNavigate } from 'react-router-dom';
import { useOutletContext } from 'react-router-dom';
import noImg from '../assets/images/no-image.png';
import { FavoriteIcon } from '../helpers/Icons';

const ProductCard = ({ product, furniture, recommended }) => {
  const navigate = useNavigate();
  const [cartProducts, addToCart] = useOutletContext();

  const isProductInCart = cartProducts?.some((el) => el?.id === product?.id);

  return (
    <div className='overflow-hidden relative group'>
      <NavLink to='#'>
        <div className='h-[220px] rounded-xl overflow-hidden relative bg-gray-50'>
          <img
            className='w-full h-full object-cover'
            src={product?.files[0]?.medium || noImg}
            onError={(e) => {
              e.target.onError = null;
              e.target.src = noImg;
            }}
            alt='*'
          />
          <div className='absolute top-2 w-full px-2 z-10 flex justify-between items-start'>
            {product?.tags?.length > 0 && (
              <span
                style={{ color: product?.tags[0]?.text_color }}
                className={`bg-[${product?.tags[0]?.background_color}] py-1 px-2 uppercase text-xs font-bold rounded-xl`}
              >
                {product?.tags[0]?.text}
              </span>
            )}
            <FavoriteIcon onClick={() => alert('В процессе разработки')} />
          </div>
        </div>
      </NavLink>
      <div className='lining-nums proportional-nums'>
        {!recommended && (
          <p className='text-[10px] text-colDarkGray pt-[6px] pb-[2px] line-clamp-1 break-all'>
            Артикул: {product?.sku || 'Не указано'}
          </p>
        )}
        <NavLink to='#' className={`hover:underline h-10 mt-1`}>
          <h5 className='font-medium text-sm text-colBlack line-clamp-3 h-[60px]'>
            {product?.name || 'Не указано'}
          </h5>
        </NavLink>
        <div className='flex items-center py-1 h-8'>
          <span className='text-colBlack font-bold mr-1 line-clamp-1 break-all whitespace-nowrap'>
            {product?.price ? (
              `${
                product?.price?.discount
                  ? product?.price?.discount?.price
                  : product?.price?.default
              }  ${product?.price?.currency}`
            ) : (
              <p className='font-semibold text-sm'>Цена не указана</p>
            )}
          </span>
          <span className='text-xs line-through mr-2'>
            {product?.price &&
              `${product?.price?.discount ? product?.price?.default : ''}`}
          </span>
          {product?.price?.discount && (
            <span className='px-2 py-[2px] font-semibold rounded-3xl text-xs bg-[#F04438] text-white line-clamp-1 break-all whitespace-nowrap'>
              {`${product?.price?.discount?.percent} %`}
            </span>
          )}
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
