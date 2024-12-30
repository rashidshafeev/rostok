import React, { useRef } from 'react';

import { AddOutlined, RemoveOutlined } from '@mui/icons-material';
import { useDrag, useDrop } from 'react-dnd';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';

import {
  useGetUserCartQuery,
  addToCart,
  changeQuantity,
  QuantityControl,
  AddToCartButton,
} from '@/features/cart';
import { ComparisonButton } from '@/features/comparison/ui/controls/ComparisonButton';
import { FavoriteButton } from '@/features/favorite/ui/controls/FavoriteButton';
import { getTokenFromCookies } from '@/shared/lib';
import { ComparisonIcon, DeleteIcon, FavoriteIcon } from '@/shared/ui/icons';
import { LoadingSmall } from '@/shared/ui/Loader';

const ComparisonProductCard = ({ product, index, moveProduct }) => {
  const token = getTokenFromCookies();

  const { cart } = useSelector((state) => state.cart);
  const { data: cartData } = useGetUserCartQuery(undefined, { skip: !token });

  const productInCart = token
    ? cartData?.data?.find((el) => el.id === product.id)
    : cart.find((el) => el.id === product.id);

  const ItemTypes = {
    CARD: 'card',
  };

  const ref = React.useRef(null);

  const [, drop] = useDrop({
    accept: ItemTypes.CARD,
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleX =
        (hoverBoundingRect.right - hoverBoundingRect.left) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientX = clientOffset.x - hoverBoundingRect.left;

      if (dragIndex < hoverIndex && hoverClientX < hoverMiddleX) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientX > hoverMiddleX) {
        return;
      }

      moveProduct(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.CARD,
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  return (
    <NavLink
      ref={ref}
      style={{ opacity: isDragging ? 0.5 : 1 }}
      to={`/catalog/${product?.category?.slug}/${product?.slug}`}
      className="overflow-hidden group box-border pr-4 mb-2"
    >
      <div className="flex gap-2 ">
        <div className="basis-1/2">
          <div className="rounded-md mm:rounded-xl overflow-hidden relative bg-gray-100">
            {product?.files?.length > 0 ? (
              <img
                className="w-[80px] h-[80px] object-contain m-auto"
                src={product?.files[0]?.medium || noImg}
                onError={(e) => {
                  e.target.onError = null;
                  e.target.src = noImg;
                }}
                alt="*"
              />
            ) : null}
            <div className="absolute top-2 w-full px-2 z-10 flex justify-between items-start">
              {product?.tags?.length > 0 ? (
                <span
                  style={{ color: product?.tags[0]?.text_color }}
                  className={`bg-[${product?.tags[0]?.background_color}] py-[3px] lg:py-1 px-1.5 lg:px-2 uppercase text-[8px] lg:text-xs font-semibold lg:font-bold rounded-xl`}
                >
                  {product?.tags[0]?.text}
                </span>
              ) : null}
            </div>
          </div>
          <div className="flex gap-5 items-center justify-center mt-4">
            <FavoriteButton product={product}>
              {({ isInFavorite, handleFavoriteClick }) => (
                <FavoriteIcon
                  favorite={isInFavorite ? 'true' : 'false'}
                  className="transition-all duration-300 hover:scale-110  cursor-pointer"
                  onClick={handleFavoriteClick}
                />
              )}
            </FavoriteButton>
            <ComparisonButton product={product}>
              {({ isInComparison, handleComparisonClick }) => (
                <DeleteIcon
                  className="transition-all duration-300 hover:scale-110 cursor-pointer"
                  onClick={handleComparisonClick}
                  comparison={isInComparison ? 'true' : 'false'}
                />
              )}
            </ComparisonButton>
          </div>
        </div>
        <div className="lining-nums proportional-nums  basis-1/2  ">
          <div className="flex items-end pb-1 h-8">
            <span className="text-colBlack mr-1 font-bold line-clamp-1 break-all whitespace-nowrap text-sm mm:text-base">
              {product?.price ? (
                `${
                  product?.price?.discount
                    ? product?.price?.discount?.price
                    : product?.price?.default
                }  ${product?.price?.currency}`
              ) : (
                <p className="font-semibold text-sm mm:text-base">
                  Цена не указана
                </p>
              )}
            </span>
            <span className="text-[8px] mm:text-xs line-through mr-2 whitespace-nowrap mb-[2px]">
              {product?.price?.discount ? `${product?.price?.discount}` : null}
            </span>
            {product?.price?.discount ? (
              <span className="px-2 py-[2px] font-semibold rounded-3xl text-[8px] mm:text-xs bg-[#F04438] text-white line-clamp-1 break-all whitespace-nowrap">
                {`${product?.price?.discount?.percent} %`}
              </span>
            ) : null}
          </div>

          <div className="h-[50px] mt-1">
            <h5 className="font-medium text-sm leading-[120%] text-colBlack line-clamp-3">
              {`${product?.groupName} ${product?.name}` || 'Не указано'}
            </h5>
          </div>

          {!productInCart ? (
            <AddToCartButton product={product}>
              {({
                handleAddToCartClick,
                isLoading,
                isSuccess,
                buttonText,
                disabled,
              }) => (
                <button
                  disabled={disabled || isLoading}
                  onClick={handleAddToCartClick}
                  className={` transition-all flex justify-center items-center min-h-10 xs:text-sm sm:text-base duration-200 ${
                    disabled ? 'bg-colGray ' : 'bg-colGreen cursor-pointer'
                  }  text-white rounded-md p-2 font-semibold w-full ${
                    isLoading && !disabled ? 'cursor-wait' : ''
                  }`}
                >
                  {isLoading && !isSuccess ? (
                    <LoadingSmall extraStyle="white" />
                  ) : (
                    buttonText
                  )}
                </button>
              )}
            </AddToCartButton>
          ) : null}
          {productInCart ? (
            <QuantityControl product={productInCart} />
          ) : null}
        </div>
      </div>
    </NavLink>
  );
};

export default ComparisonProductCard;
