import { AddOutlined, RemoveOutlined } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate, useOutletContext } from 'react-router-dom';

import { QuantityControl, RemoveFromCartButton } from '@/features/cart';
import {
  addToCart,
  changeQuantity,
  removeFromCart,
  selectItem,
} from '@/features/cart/model/cartSlice';
import { FavoriteButton } from '@/features/favorite';
import noImg from '@/shared/assets/images/no-image.png';
import { CCheckBoxField } from '@/shared/ui';
import { FavoriteIcon, DeleteIcon } from '@/shared/ui/icons';
import { PriceDisplay } from '@/widgets/product-card';

import { SelectCartItemButton } from './SelectCartItemButton';
// import { toggleFavorite } from '@store/slices/favoriteSlice';

export const CartItemLine = ({ cart }) => {
  const navigate = useNavigate();

  return (
    <>
      {cart?.map((product, index) => (
        <div
          key={index}
          className="flex justify-between items-center border-t border-b border-[#EBEBEB] pt-2 pb-4"
        >
          <div className="max-w-[480px] pr-8 w-full flex space-x-4">
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
                className="cursor-pointer min-w-[56px] w-14 h-14 overflow-hidden bg-gray-100 rounded-md"
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
              <span
                to="#"
                onClick={(e) => {
                  e.preventDefault();
                  navigate(`/catalog/category/${product.slug}`);
                }}
                className="font-semibold cursor-pointer text-colBlack leading-5 hover:underline line-clamp-1 break-all mt-1"
              >
                {`${product?.groupName} ${product?.name}`}
              </span>
              <div className="space-y-1 pt-1">
                <p className="text-xs text-colDarkGray flex items-center space-x-2">
                  <span>Код товара:</span>
                  <span>{product?.sku}</span>
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between space-x-5 pt-3">
            <PriceDisplay price={product?.price} />
            <div className="flex items-center justify-between">
              <QuantityControl product={product} />
            </div>
            <div className="flex items-center text-colBlack font-bold">
              <div>
                {product?.price?.total
                  ? product?.price?.total
                  : 'Цена не указана'}
                <span className="pl-1">
                  {product?.price?.total && product?.price?.currency
                    ? product?.price?.currency?.symbol
                    : ''}
                </span>
              </div>
            </div>
            <div className="flex space-x-2">
              <FavoriteButton product={product}>
                {({ isInFavorite, handleFavoriteClick }) => (
                  <FavoriteIcon
                    onClick={handleFavoriteClick}
                    favorite={isInFavorite ? 'true' : 'false'}
                    className="transition-all duration-300 hover:scale-110 cursor-pointer"
                  />
                )}
              </FavoriteButton>
              <RemoveFromCartButton product={product} withConfirmation={true}>
                {({ handleRemoveFromCartClick }) => (
                  <DeleteIcon
                    className="transition-all duration-300 hover:scale-110  cursor-pointer"
                    onClick={handleRemoveFromCartClick}
                  />
                )}
              </RemoveFromCartButton>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};
