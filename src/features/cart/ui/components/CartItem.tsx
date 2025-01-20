import { ExpandMore, AddOutlined, RemoveOutlined } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate,  } from 'react-router-dom';

import {
  addToCart,
  changeQuantity,
  removeFromCart,
  selectItem,
  QuantityControl,
  RemoveFromCartButton
} from '@/features/cart';
import { SelectCartItemButton } from './SelectCartItemButton';

import { FavoriteButton } from '@/features/favorite';
import noImg from '@/shared/assets/images/no-image.png';
import { CCheckBoxField } from '@/shared/ui/';
import { DeleteIcon, FavoriteIcon } from '@/shared/ui/icons';
import { PriceDisplay } from '@/widgets/product-card';

import type { CartProduct } from '@/features/cart/model/types';


type CartItemProps = {
  cart: CartProduct[];
};

export const CartItem = ({ cart }: CartItemProps) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <>
      {cart?.map((product, index) => (
        <div
          key={index}
          className="flex border-t border-b border-[#EBEBEB] pt-2 pb-4"
        >
          <div className="w-1/2 flex space-x-4">
            <div className="flex items-start">
              <SelectCartItemButton product={product}>
                {({ isLoading, isSelected, handleSelectClick }) => (
                  <CCheckBoxField
                    isLoading={isLoading}
                    checked={isSelected}
                    onChange={handleSelectClick}
                  />
                )}
              </SelectCartItemButton>
              <NavLink
                to={`/catalog/${product?.category?.slug}/${product?.slug}`}
              >
                <div>
        <PreviewGallery product={product} />
      </div>
              </NavLink>
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
              <NavLink
                to={`/catalog/${product?.category?.slug}/${product?.slug}`}
              >
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
                  {product.attributes
                    ? product?.attributes?.map((attribute, index) => (
                        <p
                          key={index}
                          className="text-xs text-colDarkGray flex items-center space-x-1"
                        >
                          <span>{attribute?.name}:</span>
                          <span className="font-semibold">
                            {attribute.color ? (
                              <div
                                style={{
                                  backgroundColor: `${attribute.color}`,
                                }}
                                className="w-3 h-3 rounded-full border"
                              ></div>
                            ) : (
                              attribute.text
                            )}
                          </span>
                        </p>
                      ))
                    : null}
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
                  <RemoveFromCartButton
                    product={product}
                    withConfirmation={true}
                  >
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
              </div>
            </div>
          </div>
          <div className="w-1/2">
            <div className="grid grid-cols-3 items-center gap-4 pt-[27px]">
              {/* <PriceDisplay price={product?.price} alignment="center"/> */}
              <div className="text-center">
              <QuantityControl product={productInCart}  />

              </div>
              <div className="text-center font-bold text-colBlack">
                {product?.price?.total
                  ? `${product?.price?.total}${product?.price?.currency?.symbol || ''}`
                  : 'Цена не указана'}
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};
