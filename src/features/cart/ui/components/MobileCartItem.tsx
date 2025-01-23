import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { QuantityControl, RemoveFromCartButton } from '@/features/cart';
import { FavoriteButton } from '@/features/favorite';
import noImg from '@/shared/assets/images/no-image.png';
import { DeleteIcon, FavoriteIcon } from '@/shared/ui/icons';
import { CCheckBoxField } from '@/shared/ui/inputs';
import { PriceDisplay } from '@/widgets/product-card';

import { SelectCartItemButton } from './SelectCartItemButton';

import type { CartProduct } from '@/features/cart/model/types';

type MobileCartItemProps = {
  product: CartProduct;
  isSelected: boolean;
};

export const MobileCartItem = ({
  product,
  isSelected,
}: MobileCartItemProps): JSX.Element => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const firstTag =
    Array.isArray(product.tags) && product.tags.length > 0
      ? product.tags[0]
      : null;

  return (
    <div className="flex flex-col border-t border-b border-[#EBEBEB] pt-2 pb-4">
      <div className="flex space-x-4">
        <div className="flex items-start">
          <SelectCartItemButton product={product}>
            {({ isLoading, handleSelectClick }) => (
              <CCheckBoxField
                checked={isSelected}
                onChange={handleSelectClick}
                isLoading={isLoading}
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
            {product?.name}
          </span>
          <div className="space-y-1 pt-1">
            <p className="text-xs text-colDarkGray flex items-center space-x-2">
              {product?.price?.discount
                ? `${product?.price?.discount?.price} ${product?.price?.currency?.symbol}/${product?.price?.unit}`
                : product?.price?.default
                  ? `${product?.price?.default} ${product?.price?.currency?.symbol}/${product?.price?.unit}`
                  : 'Не указано'}
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
          <RemoveFromCartButton product={product} />
        </div>
        <div className="flex items-center text-colBlack font-bold">
          <PriceDisplay price={product?.price} />
        </div>
        <div className="flex items-center space-x-3">
          <QuantityControl product={product} />
        </div>
      </div>
    </div>
  );
};
