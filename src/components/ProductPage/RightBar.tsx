import React, { useState } from "react";

import checkicon from "@assets/icons/check-icon.svg";
import stallicon from "@assets/icons/stall-icon.svg";
import truckicon from "@assets/icons/truck-icon.svg";
import boxicon from "@assets/icons/box-icon.svg";
import { useDispatch, useSelector } from "react-redux";
import { AddOutlined, RemoveOutlined } from "@mui/icons-material";
import { addToCart, changeQuantity } from "@store/slices/cartSlice";
import { NavLink } from "react-router-dom";
import FastOrderModal from "@helpers/CModal/FastOrderModal";
import AddToCartButton from "@helpers/AddToCartButton/AddToCartButton";
import ChangeQuantityGroup from "@helpers/ChangeQuantityButton/ChangeQuantityGroup";
import { LoadingSmall } from "@helpers/Loader/Loader";
import { getTokenFromCookies } from "@helpers/cookies/cookies";
import { useGetUserCartQuery } from "@api/cartEndpoints";
import { Product } from "@customTypes/Product/Product";
import PriceDisplay from "../ProductCard/PriceDisplay";
import { LocalCartState } from "@customTypes/Store/Cart/CartState";
import { transformServerCartToLocalCart } from "@utils/transfromData";
import { RootState } from "@store/store";
import { DeliveryInfo } from "./DeliveryInfo";
import { useModal } from "@context/ModalContext";

type RightBarProps = {
  product: Product;
}

const RightBar: React.FC<RightBarProps> = ({ product }) => {
  const { showModal, hideModal, modalContent, isModalVisible } = useModal();

  const token = getTokenFromCookies();

  const localCart : LocalCartState = useSelector((state: RootState) => state.cart);

  // Fetching cart data from the server if the user is logged in
  const {
    data: serverCart,
    isLoading,
    isSuccess,
    error,
  } = useGetUserCartQuery(undefined, { skip: !token });

  const cart : LocalCartState = token && isSuccess ? transformServerCartToLocalCart(serverCart) : localCart;

  const productInCart = cart.cart?.find((el) => el.id === product?.id);
    
  return (
    <>
      <div className="shadow-[1px_1px_34px_0_rgba(0,0,0,0.1)] p-5 rounded-xl flex flex-col gap-8 mb-5">
        <div className="flex gap-2 justify-between grow">
            <div>
            <p className="text-xl font-bold whitespace-nowrap break-words">
            {productInCart?.price?.total && `${productInCart?.price?.total} ${productInCart?.price?.currency?.symbol}`}
          </p>
            </div>
            {product?.price?.base && !productInCart && <PriceDisplay price={product?.price} />}
            {productInCart?.price?.base && <PriceDisplay price={productInCart?.price} />}
        </div>
        {!productInCart && (
          <div className="flex flex-col gap-3">
            <AddToCartButton product={product}>
              {({ handleAddToCartClick, isLoading, isSuccess, disabled }) => (
                <button
                  disabled={disabled || isLoading}
                  onClick={handleAddToCartClick}
                  className={`py-3 flex justify-center text-white font-semibold w-full rounded transition-all duration-200 ${
                    disabled ? "bg-colGray" : "bg-colGreen cursor-pointer"
                  } ${isLoading && !disabled ? "cursor-wait" : ""} lining-nums proportional-nums`}
                >
                  {isLoading && !isSuccess ? (
                    <LoadingSmall extraStyle={"white"} />
                  ) : (
                    "Добавить в корзину"
                  )}
                </button>
              )}
            </AddToCartButton>

            <button
              onClick={() => showModal({ type: 'fastOrder', product })}
              className="py-3 flex justify-center text-colGreen font-semibold bg-white border-colGreen border w-full rounded cursor-pointer"
            >
              Купить в 1 клик
            </button>
            {modalContent?.type === 'fastOrder' && (
              <FastOrderModal
                open={isModalVisible}
                handleClose={hideModal}
                product={modalContent.product}
              />
            )}
          </div>
        )}

        {productInCart && (
          <div className="flex flex-col gap-3">
          <div className="h-[48px] flex  justify-between items-center grow">
            <ChangeQuantityGroup
              product={productInCart}
              enableRemove={true}
            />
          </div>
          <NavLink to="/shopping-cart">
            <button className="py-3 flex justify-center text-colGreen font-semibold bg-white border-colGreen border w-full rounded cursor-pointer">
              Перейти в корзину
            </button>
          </NavLink>
          </div>
          
        )}

        <div className="flex justify-center text-colGreen font-semibold underline underline-offset-8 cursor-pointer">
          Узнать цену для юрлиц
        </div>
      </div>
      <DeliveryInfo product={product} />

      
    </>
  );
}

export default RightBar;
