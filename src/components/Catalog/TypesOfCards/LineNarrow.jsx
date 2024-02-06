import { NavLink, useNavigate, useOutletContext } from 'react-router-dom';
import noImg from '../../../assets/images/no-image.png';
import { ComparisonIcon, FavoriteIcon } from '../../../helpers/Icons';
import { AddOutlined, RemoveOutlined } from '@mui/icons-material';

const LineNarrow = ({ product, furniture, recommended }) => {
  const navigate = useNavigate();
  const [cartProducts, addToCart] = useOutletContext();

  const isProductInCart = cartProducts?.some((el) => el?.id === product?.id);

  return (
    <div className='flex justify-between'>
      <div className='flex justify-between pr-4 max-w-[780px] w-full'>
        <div className='flex'>
          <div className='min-w-[80px] w-20 h-20 bg-gray-100 rounded-lg overflow-hidden'>
            <img
              src={product?.files[0]?.large || noImg}
              className='w-full h-full object-contain'
              onError={(e) => {
                e.target.onError = null;
                e.target.src = noImg;
              }}
              alt='*'
            />
          </div>
          <div className='pl-5 max-w-md'>
            <div className='space-y-2 pt-1'>
              <div>
                <NavLink
                  to='#'
                  className='font-bold text-sm  break-all hover:underline line-clamp-3 pb-1'
                >
                  {product?.name || 'Не указано'}
                </NavLink>
                <p className='font-medium text-xs text-colDarkGray leading-4  break-all line-clamp-4'>
                  {product?.description || 'Не указано'}
                </p>
              </div>
              <p className='text-xs text-colDarkGray flex items-center space-x-2'>
                <span>Артикуль:</span>
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
        <div className='px-2'>
          {product?.tags?.length > 0 ? (
            <span
              style={{ color: product?.tags[0]?.text_color }}
              className={`bg-[${product?.tags[0]?.background_color}] py-1 px-2 uppercase text-xs font-bold rounded-xl`}
            >
              {product?.tags[0]?.text}
            </span>
          ) : (
            <span></span>
          )}
        </div>
      </div>
      <div className='max-w-xs w-full'>
        <div className='flex justify-between items-center'>
          <div className='flex items-center py-1'>
            <span className='text-colBlack font-bold mr-1 line-clamp-1 break-all whitespace-nowrap'>
              {product?.price
                ? `${
                    product?.price?.discount
                      ? product?.price?.discount?.price
                      : product?.price?.default
                  }  ${product?.price?.currency}`
                : 'Не указано'}
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
          <div className='flex justify-end items-center space-x-2'>
            <FavoriteIcon className='cursor-pointer' />
            <ComparisonIcon className='cursor-pointer' />
          </div>
        </div>
        <div className='flex justify-between space-x-3 pt-5'>
          <div className='flex items-center space-x-3'>
            <span className='w-10 h-10 min-w-[40px] rounded-full flex justify-center items-center bg-colSuperLight cursor-pointer'>
              <RemoveOutlined className='text-colGreen' />
            </span>
            <span className='text-colGreen font-semibold'>10</span>
            <span className='w-10 h-10 min-w-[40px] rounded-full flex justify-center items-center bg-colSuperLight cursor-pointer'>
              <AddOutlined className='text-colGreen' />
            </span>
          </div>
          {isProductInCart ? (
            <button
              onClick={() => navigate('/shopping-cart')}
              className={`${
                recommended || furniture
                  ? ''
                  : 'group-hover:opacity-100 opacity-0'
              } bg-colGreen text-white rounded-md p-2 font-semibold w-full text-sm`}
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
              } bg-colGreen text-white rounded-md p-2 font-semibold w-full text-sm`}
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
