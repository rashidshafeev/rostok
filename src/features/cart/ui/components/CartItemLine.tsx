import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { QuantityControl, RemoveFromCartButton } from '@/features/cart';
import { FavoriteButton } from '@/features/favorite';
import noImg from '@/shared/assets/images/no-image.png';
import { CCheckBoxField } from '@/shared/ui/inputs';
import { FavoriteIcon, DeleteIcon } from '@/shared/ui/icons';
import { PriceDisplay } from '@/widgets/product-card';

import { SelectCartItemButton } from './SelectCartItemButton';

import type { CartProduct } from '@/features/cart/model/types';

type CartItemLineProps = {
  product: CartProduct;
  isSelected: boolean;
};

export const CartItemLine = ({
  product,
  isSelected,
}: CartItemLineProps): JSX.Element => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <div className="flex justify-between items-center border-t border-b border-[#EBEBEB] pt-2 pb-4">
      <div className="max-w-[480px] pr-8 w-full flex space-x-4">
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
              ? `${product?.price?.total}${product?.price?.currency?.symbol || ''}`
              : 'Цена не указана'}
          </div>
        </div>
        <div className="flex space-x-2">
          <FavoriteButton product={product} />
          <RemoveFromCartButton product={product} withConfirmation={true} />
        </div>
      </div>
    </div>
  );
};
