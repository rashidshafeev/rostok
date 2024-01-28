import { ExpandMore, AddOutlined, RemoveOutlined } from '@mui/icons-material';
import CCheckBoxField from '../../helpers/CustomInputs/CCheckBoxField';
import noImg from '../../assets/images/no-image.png';
import { NavLink, useOutletContext } from 'react-router-dom';

const ShCartItem = ({ selectedItemIds, handleItemChange }) => {
  // eslint-disable-next-line no-unused-vars
  const [cartProducts, addToCart, removeFromCart] = useOutletContext();

  return (
    <>
      {cartProducts?.map((product, index) => (
        <div
          key={index}
          className='flex border-t border-b border-[#EBEBEB] pt-2 pb-4'
        >
          <div className='w-3/5 flex space-x-4'>
            <div className='flex items-start'>
              <CCheckBoxField
                checked={selectedItemIds.includes(product?.id)}
                onChange={() => handleItemChange(product?.id)}
              />
              <div className='min-w-[112px] w-28 h-28 overflow-hidden bg-gray-100 rounded-md'>
                <img
                  className='w-full h-full object-contain'
                  src={product?.img}
                  onError={(e) => {
                    e.target.onError = null;
                    e.target.src = noImg;
                  }}
                  alt='*'
                />
              </div>
            </div>
            <div>
              <div
                className={`${
                  product?.type === 'hit'
                    ? 'bg-[#F57C1F]'
                    : product?.type === 'new'
                    ? 'bg-[#15765B]'
                    : 'bg-[#F04438]'
                } py-[2px] px-2 uppercase text-[10px] font-bold text-white rounded-xl w-max mb-1`}
              >
                {product?.type === 'hit'
                  ? 'Хит'
                  : product?.type === 'new'
                  ? 'Новинки'
                  : 'Распродажа'}
              </div>
              <NavLink
                to='#'
                className='font-semibold text-colBlack leading-5 hover:underline'
              >
                {product?.title}
              </NavLink>
              <div className='space-y-1 pt-1'>
                <p className='text-xs text-colDarkGray flex items-center space-x-2'>
                  <span>Артикуль:</span>
                  <span>{product?.article}</span>
                </p>
                <p className='text-xs text-colDarkGray flex items-center space-x-2'>
                  <span>Цвет:</span>
                  <span>{product?.article}</span>
                </p>
                <p className='text-xs text-colDarkGray flex items-center space-x-2'>
                  <span>Артикуль:</span>
                  <span className='w-4 h-4 min-w-[16px] bg-black rounded-full'></span>
                  <span>Чёрный</span>
                </p>
              </div>
              <div className='flex pt-2'>
                <button className='flex items-center outline-none'>
                  <span className='text-sm font-semibold text-colBlack'>
                    С этим товаром покупают
                  </span>
                  <ExpandMore />
                </button>
                <div className='flex space-x-2 pl-5'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='24'
                    height='24'
                    viewBox='0 0 24 24'
                    fill='none'
                    className='cursor-pointer'
                  >
                    <rect width='24' height='24' rx='12' fill='#F5F5F5' />
                    <path
                      fillRule='evenodd'
                      clipRule='evenodd'
                      d='M9 7.5C7.62477 7.5 6.5 8.6356 6.5 10.1025C6.5 11.9987 7.86145 13.8462 9.34707 15.2778C10.0762 15.9804 10.8074 16.5563 11.3571 16.9569C11.6223 17.1501 11.8443 17.3017 12.002 17.4064C12.1595 17.3031 12.3808 17.1536 12.6452 16.9629C13.1945 16.5665 13.9252 15.9955 14.6539 15.2961C16.1372 13.872 17.5 12.0219 17.5 10.0938C17.5 8.63653 16.3761 7.5 15 7.5C14.3646 7.5 13.7355 7.90241 13.2197 8.3934C12.9711 8.63006 12.7687 8.86838 12.6284 9.04803C12.5586 9.13745 12.5049 9.2113 12.4694 9.26175C12.4516 9.28695 12.4384 9.30624 12.4301 9.31862L12.4213 9.33186L12.4199 9.33395C12.3278 9.47632 12.1696 9.5625 12 9.5625C11.8305 9.5625 11.6726 9.47666 11.5804 9.33448C11.5804 9.33437 11.5805 9.33458 11.5804 9.33448L11.5787 9.33186L11.5699 9.31862C11.5616 9.30624 11.5484 9.28695 11.5306 9.26175C11.4951 9.2113 11.4414 9.13745 11.3716 9.04803C11.2313 8.86838 11.0289 8.63006 10.7803 8.3934C10.2645 7.90241 9.63536 7.5 9 7.5ZM12 8.23528C11.856 8.06366 11.6774 7.8668 11.4697 7.6691C10.9022 7.12884 10.0313 6.5 9 6.5C7.0419 6.5 5.5 8.1144 5.5 10.1025C5.5 12.4371 7.13867 14.5384 8.65318 15.9978C9.4241 16.7407 10.193 17.3459 10.7683 17.7651C11.0564 17.975 11.297 18.139 11.4666 18.2512C11.5514 18.3073 11.6185 18.3505 11.665 18.38C11.6882 18.3947 11.7063 18.406 11.7188 18.4138L11.7334 18.4229L11.7388 18.4262C11.739 18.4263 11.7395 18.4266 12.0002 18L11.7388 18.4262C11.8979 18.5234 12.0985 18.5245 12.2582 18.4283L12.0002 18C12.2582 18.4283 12.258 18.4284 12.2582 18.4283L12.2602 18.4271L12.2643 18.4246L12.279 18.4156C12.2916 18.4079 12.3097 18.3967 12.333 18.3822C12.3795 18.353 12.4466 18.3104 12.5315 18.2549C12.7012 18.1441 12.942 17.9818 13.2303 17.7738C13.8058 17.3586 14.5751 16.7579 15.3464 16.0174C16.8629 14.5616 18.5 12.4586 18.5 10.0938C18.5 8.11347 16.9572 6.5 15 6.5C13.9687 6.5 13.0978 7.12884 12.5303 7.6691C12.3226 7.8668 12.144 8.06366 12 8.23528Z'
                      fill='#727272'
                    />
                  </svg>
                  <svg
                    onClick={() => removeFromCart(product?.id)}
                    xmlns='http://www.w3.org/2000/svg'
                    width='24'
                    height='24'
                    viewBox='0 0 24 24'
                    fill='none'
                    className='cursor-pointer'
                  >
                    <rect width='24' height='24' rx='12' fill='#F5F5F5' />
                    <path
                      d='M10.8 8.04878H13.2C13.2 7.73828 13.0736 7.4405 12.8485 7.22095C12.6235 7.00139 12.3183 6.87805 12 6.87805C11.6817 6.87805 11.3765 7.00139 11.1515 7.22095C10.9264 7.4405 10.8 7.73828 10.8 8.04878ZM9.9 8.04878C9.9 7.77973 9.95432 7.51332 10.0599 7.26475C10.1654 7.01618 10.3201 6.79032 10.5151 6.60007C10.7101 6.40983 10.9416 6.25892 11.1964 6.15595C11.4511 6.05299 11.7242 6 12 6C12.2758 6 12.5489 6.05299 12.8036 6.15595C13.0584 6.25892 13.2899 6.40983 13.4849 6.60007C13.6799 6.79032 13.8346 7.01618 13.9401 7.26475C14.0457 7.51332 14.1 7.77973 14.1 8.04878H17.55C17.6693 8.04878 17.7838 8.09503 17.8682 8.17737C17.9526 8.2597 18 8.37137 18 8.4878C18 8.60424 17.9526 8.71591 17.8682 8.79824C17.7838 8.88057 17.6693 8.92683 17.55 8.92683H16.758L16.056 16.0162C16.0022 16.5594 15.7428 17.0636 15.3286 17.4303C14.9144 17.7971 14.375 18.0002 13.8156 18H10.1844C9.62512 18.0001 9.08586 17.7969 8.67177 17.4301C8.25768 17.0634 7.99844 16.5593 7.9446 16.0162L7.242 8.92683H6.45C6.33065 8.92683 6.21619 8.88057 6.1318 8.79824C6.04741 8.71591 6 8.60424 6 8.4878C6 8.37137 6.04741 8.2597 6.1318 8.17737C6.21619 8.09503 6.33065 8.04878 6.45 8.04878H9.9ZM11.1 10.8293C11.1 10.7128 11.0526 10.6012 10.9682 10.5188C10.8838 10.4365 10.7693 10.3902 10.65 10.3902C10.5307 10.3902 10.4162 10.4365 10.3318 10.5188C10.2474 10.6012 10.2 10.7128 10.2 10.8293V15.2195C10.2 15.3359 10.2474 15.4476 10.3318 15.5299C10.4162 15.6123 10.5307 15.6585 10.65 15.6585C10.7693 15.6585 10.8838 15.6123 10.9682 15.5299C11.0526 15.4476 11.1 15.3359 11.1 15.2195V10.8293ZM13.35 10.3902C13.4693 10.3902 13.5838 10.4365 13.6682 10.5188C13.7526 10.6012 13.8 10.7128 13.8 10.8293V15.2195C13.8 15.3359 13.7526 15.4476 13.6682 15.5299C13.5838 15.6123 13.4693 15.6585 13.35 15.6585C13.2307 15.6585 13.1162 15.6123 13.0318 15.5299C12.9474 15.4476 12.9 15.3359 12.9 15.2195V10.8293C12.9 10.7128 12.9474 10.6012 13.0318 10.5188C13.1162 10.4365 13.2307 10.3902 13.35 10.3902ZM8.8404 15.9319C8.87276 16.2577 9.02835 16.5601 9.27682 16.7802C9.5253 17.0002 9.84885 17.122 10.1844 17.122H13.8156C14.1512 17.122 14.4747 17.0002 14.7232 16.7802C14.9717 16.5601 15.1272 16.2577 15.1596 15.9319L15.8544 8.92683H8.1456L8.8404 15.9319Z'
                      fill='#727272'
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <div className='w-2/5 flex items-start justify-between space-x-3 pt-[27px]'>
            <div>
              <div className='flex text-colBlack'>
                <span>{product?.cost}</span>
                <span className='pl-1'>₽/шт</span>
              </div>
              <p className='text-colGray text-xs line-through'>
                <span>6999</span>
                <span className='pl-1'>₽</span>
              </p>
            </div>
            <div className='flex items-center space-x-3'>
              <span className='w-10 h-10 min-w-[40px] rounded-full flex justify-center items-center bg-[#F5F5F5]'>
                <RemoveOutlined className='text-colGreen cursor-pointer' />
              </span>
              <span className='text-colGreen font-semibold'>10</span>
              <span className='w-10 h-10 min-w-[40px] rounded-full flex justify-center items-center bg-[#F5F5F5]'>
                <AddOutlined className='text-colGreen cursor-pointer' />
              </span>
            </div>
            <div className='flex items-center text-colBlack font-bold'>
              <span>49 999</span>
              <span className='pl-1'>₽</span>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default ShCartItem;
