import { ExpandMore } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';

import { QuantityControl, RemoveFromCartButton } from '@/features/cart';
import { FavoriteButton } from '@/features/favorite';
import noImg from '@/shared/assets/images/no-image.png';
import { CCheckBoxField } from '@/shared/ui/inputs';
import { DeleteIcon, FavoriteIcon } from '@/shared/ui/icons';
import { PreviewGallery, PriceDisplay } from '@/widgets/product-card';

import { SelectCartItemButton } from './SelectCartItemButton';

import type { CartProduct } from '@/features/cart/model/types';

type CartItemProps = {
  product: CartProduct;
  isSelected: boolean;
};

export const CartItem = ({
  product,
  isSelected,
}: CartItemProps): JSX.Element => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const firstTag = Array.isArray(product.tags) && product.tags.length > 0 
    ? product.tags[0] 
    : null;

  return (
    <div className="flex border-t border-b border-[#EBEBEB] pt-2 pb-4">
      <div className="w-1/2 flex space-x-4">
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
          <NavLink to={`/catalog/${product?.category?.slug}/${product?.slug}`}>
            <div>
              <PreviewGallery product={product} />
            </div>
          </NavLink>
        </div>
        <div className="pr-3">
          {firstTag && (
            <span
              style={{ color: firstTag.text_color }}
              className={`bg-[${firstTag.background_color}] py-1 px-2 uppercase text-xs font-bold rounded-xl`}
            >
              {firstTag.text}
            </span>
          )}
          <NavLink to={`/catalog/${product?.category?.slug}/${product?.slug}`}>
            <span className="font-semibold cursor-pointer text-colBlack leading-5 hover:underline line-clamp-3 break-all mt-1">
              {`${product?.groupName} ${product?.name}`}
            </span>
          </NavLink>

          <div className="space-y-1 pt-1">
            <p className="text-xs text-colDarkGray flex items-center space-x-2">
              <span>Код товара:</span>
              <span>{product?.sku}</span>
            </p>
            <div className="flex gap-x-2 flex-wrap">
              {product.attributes?.map((attribute, index) => (
                <p
                  key={index}
                  className="text-xs text-colDarkGray flex items-center space-x-1"
                >
                  <span>{attribute?.name}:</span>
                  <span className="font-semibold">
                    {attribute.color ? (
                      <div
                        style={{ backgroundColor: `${attribute.color}` }}
                        className="w-3 h-3 rounded-full border"
                      ></div>
                    ) : (
                      attribute.text
                    )}
                  </span>
                </p>
              ))}
            </div>
          </div>
          <div className="flex pt-2">
            <button className="flex items-center outline-none">
              <span className="text-sm font-semibold text-colBlack">
                С этим товаром покупают
              </span>
              <ExpandMore />
            </button>
            <div className="flex space-x-2 pl-5">
              <FavoriteButton product={product} />
              <RemoveFromCartButton product={product} withConfirmation={true} />
            </div>
          </div>
        </div>
      </div>
      <div className="w-1/2">
        <div className="grid grid-cols-3 items-center gap-4 pt-[27px]">
          <div className="text-center">
            <QuantityControl product={product} />
          </div>
          <div className="text-center font-bold text-colBlack">
            {product?.price?.total
              ? `${product?.price?.total}${product?.price?.currency?.symbol || ''}`
              : 'Цена не указана'}
          </div>
        </div>
      </div>
    </div>
  );
};
