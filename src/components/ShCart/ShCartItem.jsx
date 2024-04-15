import { ExpandMore, AddOutlined, RemoveOutlined } from '@mui/icons-material';
import CCheckBoxField from '../../helpers/CustomInputs/CCheckBoxField';
import noImg from '../../assets/images/no-image.png';
import { NavLink, useNavigate, useOutletContext } from 'react-router-dom';
import { DeleteIcon, FavoriteIcon } from '../../helpers/Icons';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, changeQuantity, removeFromCart, selectItem } from '../../redux/slices/cartSlice';
import { toggleFavorite } from '../../redux/slices/favoriteSlice';


const ShCartItem = ({ cart, selectedItems, handleItemChange }) => {
  // eslint-disable-next-line no-unused-vars
  // const [cartProducts, addToCart, removeFromCart] = useOutletContext();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const cart = useSelector(state => state?.cart?.cart)

  const favorite = useSelector(state => state?.favorite)
  

  return (
    <>
      {cart?.map((product, index) => (
        <div
          key={index}
          className='flex border-t border-b border-[#EBEBEB] pt-2 pb-4'
        >
          <div className='w-3/5 flex space-x-4'>
            <div className='flex items-start'>
              <CCheckBoxField
                checked={selectedItems.some(el => el?.id === product?.id)}
                onChange={() => dispatch(selectItem(product))}
              />
              <div
              onClick={(e) => {
                e.preventDefault();
                navigate(`/catalog/category/${product.slug}`);
              }}
               className='cursor-pointer min-w-[112px] w-28 h-28 overflow-hidden bg-gray-100 rounded-md'>
                <img
                  className='w-full h-full object-contain'
                  src={product?.files[0]?.large || noImg}
                  onError={(e) => {
                    e.target.onError = null;
                    e.target.src = noImg;
                  }}
                  alt='*'
                />
              </div>
            </div>
            <div className='pr-3'>
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
              <span
                // to={product.slug}
                onClick={(e) => {
                  e.preventDefault();
                  navigate(`/catalog/category/${product.slug}`);
                }}
                className='font-semibold cursor-pointer text-colBlack leading-5 hover:underline line-clamp-3 break-all mt-1'
              >
                {product?.name}
              </span>
              <div className='space-y-1 pt-1'>
                <p className='text-xs text-colDarkGray flex items-center space-x-2'>
                  <span>Артикул:</span>
                  <span>{product?.sku}</span>
                </p>
                <p className='text-xs text-colDarkGray flex items-center space-x-2'>
                  <span>Цвет:</span>
                  <span className='w-3 h-3 min-w-[12px] bg-black rounded-full'></span>
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
                  <FavoriteIcon favorite={favorite?.favorite?.some((el) => el?.id === product?.id)} className='transition-all duration-300 hover:scale-110' onClick={() => dispatch(toggleFavorite(product))} />
                  <DeleteIcon className='transition-all duration-300 hover:scale-110' onClick={() => dispatch(removeFromCart(product))} />
                </div>
              </div>
            </div>
          </div>
          <div className='w-2/5 '>
          <div className='flex items-center justify-between space-x-3 pt-[27px]'>
            <div>
              <div className='text-colBlack'>
                {product?.price
                  ? `${
                      product?.price?.discount
                        ? product?.price?.discount?.price
                        : product?.price?.default
                    }  ${product?.price?.currency} / ${product?.price?.unit}`
                  : 'Не указано'}
              </div>
              <p className='text-colGray text-xs line-through'>
                {product?.price?.discount && (
                  <span>{`${product?.price?.default} ${product?.price?.currency} / ${product?.price?.unit}`}</span>
                )}
              </p>
            </div>
            <div className='flex items-center space-x-3'>
              <span className='w-10 h-10 min-w-[40px] rounded-full flex justify-center items-center bg-colSuperLight'
              onClick={() => {product?.quantity !== 1 ? dispatch(changeQuantity({product, quantity: -1})) : dispatch(changeQuantity({product, quantity: 0}))}}>
                <RemoveOutlined className={`${product?.quantity !== 1 ? `text-colGreen` : `text-colGray`} cursor-pointer`} />
              </span>
              <span className='text-colGreen font-semibold'>{product?.quantity}</span>
              <span className='w-10 h-10 min-w-[40px] rounded-full flex justify-center items-center bg-colSuperLight'
              onClick={() => {dispatch(changeQuantity({product, quantity: 1}))}}>
                <AddOutlined className='text-colGreen cursor-pointer' />
              </span>
            </div>
            <div className='flex items-center text-colBlack font-bold'>
              <span>{product?.price ? product?.price : 'Цена не указана'}</span>
              <span className='pl-1'>₽</span>
            </div>
          </div>
          </div>
          
        </div>
      ))}
    </>
  );
};

export default ShCartItem;
