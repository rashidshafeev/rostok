import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { QuantityControl, RemoveFromCartButton } from '@/features/cart';
import { FavoriteButton } from '@/features/favorite';
import noImg from '@/shared/assets/images/no-image.png';
import { DeleteIcon, FavoriteIcon } from '@/shared/ui/icons';
import { CCheckBoxField } from '@/shared/ui/inputs';
import { PriceDisplay, useProductCard } from '@/widgets/product-card';

import { SelectCartItemButton } from './SelectCartItemButton';

import type { CartProduct } from '@/features/cart/model/types';
import { useCartSelection } from '../../model/hooks/useCartSelection';

type MobileCartItemProps = {
  product: CartProduct;
  isSelected: boolean;
};

export const MobileCartItem = ({
  product,
}: MobileCartItemProps): JSX.Element => {
  const navigate = useNavigate();
  const { selectedItems, isUpdating, handleItemSelection } = useCartSelection();
  const isSelected = selectedItems.some((item) => item.id === product.id);

  const firstTag =
    Array.isArray(product.tags) && product.tags.length > 0
      ? product.tags[0]
      : null;

  return (
    <div className="flex flex-col border-t border-b border-[#EBEBEB] pt-2 pb-4">
      <div className="flex space-x-4">
        <div className="flex items-start">
        <CCheckBoxField
            checked={isSelected}
            onChange={() => handleItemSelection(product, !isSelected)}
            disabled={isUpdating}
          />
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
          {firstTag ? (
            <span
              style={{ color: firstTag.text_color }}
              className={`bg-[${firstTag.background_color}] py-1 px-2 uppercase text-xs font-bold rounded-xl`}
            >
              {firstTag.text}
            </span>
          ) : null}
          <span
            onClick={(e) => {
              e.preventDefault();
              navigate(`/catalog/category/${product.slug}`);
            }}
            className="font-semibold cursor-pointer text-colBlack leading-5 hover:underline line-clamp-3 break-all mt-1"
          >
            {product?.fullName}
          </span>
          <div className="space-y-1 pt-1">
            <p className="text-xs text-colDarkGray flex items-center space-x-2">

            <PriceDisplay price={product?.price} variant="mobile-cart" />
            </p>
          </div>
          <div className="flex pt-2">
            <p className="text-xs text-colDarkGray flex items-center space-x-2">
              <span>Цвет:</span>
              <span className="w-3 h-3 min-w-[12px] bg-black rounded-full"></span>
              <span>Чёрный</span>
            </p>
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
          <FavoriteButton product={product} />
          <RemoveFromCartButton product={product} withConfirmation={true} />
        </div>
        <div className="text-center font-bold text-colBlack">
            {product?.price?.total
              ? `${product?.price?.total}${product?.price?.currency?.symbol || ''}`
              : 'Цена не указана'}
          </div>
        <div className="flex items-center space-x-3">
          <QuantityControl product={product} />
        </div>
      </div>
    </div>
  );
};
