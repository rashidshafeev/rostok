import { ExpandMore, AddOutlined, RemoveOutlined } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate, useOutletContext } from 'react-router-dom';

import {
  addToCart,
  changeQuantity,
  removeFromCart,
  selectItem,
  QuantityControl,
  RemoveFromCartButton,
} from '@/features/cart';
import SelectCartItemButton from '@/features/cart/ui/components/SelectCartItemButton';
import { FavoriteButton } from '@/features/favorite';
import noImg from '@/shared/assets/images/no-image.png';
import { DeleteIcon, FavoriteIcon } from '@/shared/ui/icons';
import { CCheckBoxField } from '@/shared/ui/inputs';
import { PriceDisplay } from '@/widgets/product-card';


export const MobileCartItem = ({ cart, selectedItems, handleItemChange }) => {
  // eslint-disable-next-line no-unused-vars
  // const [cartProducts, addToCart, removeFromCart] = useOutletContext();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const cart = useSelector(state => state?.cart?.cart)
  const favorite = useSelector((state) => state?.favorite);

  return (
    <>
      {cart?.map((product, index) => (
        <div
          key={index}
          className="flex flex-col border-t border-b border-[#EBEBEB] pt-2 pb-4"
        >
          <div className="flex space-x-4">
            <div className="flex items-start">
              <SelectCartItemButton product={product}>
                {({ isSelected, handleSelectClick }) => (
                  <CCheckBoxField
                    checked={isSelected}
                    onChange={handleSelectClick}
                  />
                )}
              </SelectCartItemButton>
              <div
                onClick={(e) => {
                  e.preventDefault();
                  navigate(`/catalog/category/${product.slug}`);
                }}
                className="cursor-pointer min-w-[112px] w-28 h-28 overflow-hidden bg-gray-100 rounded-md"
              >
                <img
                  className="w-full h-full object-contain"
                  src={product?.files[0]?.large || noImg}
                  onError={(e) => {
                    e.target.onError = null;
                    e.target.src = noImg;
                  }}
                  alt="*"
                />
              </div>
            </div>
            <div className="pr-3">
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
                className="font-semibold cursor-pointer text-colBlack leading-5 hover:underline line-clamp-3 break-all mt-1"
              >
                {product?.name}
              </span>
              <div className="space-y-1 pt-1">
                <p className="text-xs text-colDarkGray flex items-center space-x-2">
                  {!product?.price ? 'Не указано' : null}
                  {product?.price?.discount ? (
                    <div>{`${product?.price?.discount?.price} ${product?.price?.currency}/${product?.price?.unit}`}</div>
                  ) : null}
                  {product?.price && !product?.price?.discount ? (
                    <div>{`${product?.price?.default} ${product?.price?.currency}/${product?.price?.unit}`}</div>
                  ) : null}
                </p>
                {product?.price?.discount?.price ? (
                  <p className="text-xs text-colDarkGray flex items-center space-x-2">
                    <span>{product?.price?.discount?.price}</span>
                  </p>
                ) : null}
              </div>
              <div className="flex pt-2">
                <p className="text-xs text-colDarkGray flex items-center space-x-2">
                  <span>Цвет:</span>
                  <span className="w-3 h-3 min-w-[12px] bg-black rounded-full"></span>
                  <span>Чёрный</span>
                </p>
                {/* <button className='flex items-center outline-none'>
                  <span className='text-sm font-semibold text-colBlack'>
                    С этим товаром покупают
                  </span>
                  <ExpandMore />
                </button> */}
              </div>
              <div className="flex pt-2">
                <p className="text-xs text-colDarkGray flex items-center space-x-2">
                  <span>Можно забрать</span>
                  <span className="text-colGreen">сегодня</span>
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between space-x-3 pt-[27px]">
            <div className="flex space-x-2 pl-5">
              <FavoriteButton product={product}>
                {({ isLoading, isInFavorite, handleFavoriteClick }) => (
                  <FavoriteIcon
                    onClick={handleFavoriteClick}
                    favorite={isInFavorite ? 'true' : 'false'}
                    className={`transition-all duration-300 hover:scale-110  ${
                      isLoading ? 'cursor-wait' : 'cursor-pointer'
                    }`}
                  />
                )}
              </FavoriteButton>
              <RemoveFromCartButton product={product}>
                {({ isLoading, handleRemoveFromCartClick }) => (
                  <DeleteIcon
                    className={`transition-all duration-300 hover:scale-110 ${
                      isLoading ? 'cursor-wait' : 'cursor-pointer'
                    }`}
                    onClick={handleRemoveFromCartClick}
                  />
                )}
              </RemoveFromCartButton>
            </div>
            <div className="flex items-center text-colBlack font-bold">
              <PriceDisplay price={product?.price} />
            </div>
            <div className="flex items-center space-x-3">
              <ChangeQuantityGroup product={product} />
            </div>
          </div>
        </div>
      ))}
    </>
  );
};
