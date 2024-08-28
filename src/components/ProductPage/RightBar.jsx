import React, { useState } from "react";

import checkicon from "../../assets/icons/check-icon.svg";
import stallicon from "../../assets/icons/stall-icon.svg";
import truckicon from "../../assets/icons/truck-icon.svg";
import boxicon from "../../assets/icons/box-icon.svg";
import { useDispatch, useSelector } from "react-redux";
import { AddOutlined, RemoveOutlined } from "@mui/icons-material";
import { addToCart, changeQuantity } from "../../redux/slices/cartSlice";
import { NavLink } from "react-router-dom";
import FastOrderModal from "../../helpers/CModal/FastOrderModal";
import AddToCartButton from "../../helpers/AddToCartButton/AddToCartButton";
import ChangeQuantityGroup from "../../helpers/ChangeQuantityButton/ChangeQuantityGroup";
import { LoadingSmall } from "../../helpers/Loader/Loader";
import { getTokenFromCookies } from "../../helpers/cookies/cookies";
import { useGetUserCartQuery } from "../../redux/api/cartEndpoints";

function RightBar({ product }) {
  const [fastOrderModal, setFastOrderModal] = useState(false);

  const handleCloseFastOrderModal = () => {
    setFastOrderModal(false);
  };

  const token = getTokenFromCookies();

  const { cart } = useSelector((state) => state.cart);
  const { data: cartData } = useGetUserCartQuery(undefined, { skip: !token });

  const productInCart = token
    ? cartData?.data?.find((el) => el.id === product.id)
    : cart.find((el) => el.id === product.id);
console.log(productInCart)
  return (
    <>
      <div className="shadow-[1px_1px_34px_0_rgba(0,0,0,0.1)] p-5 rounded-xl flex flex-col gap-8 mb-5">
        <div className="flex gap-2 justify-between grow">
            <div>
              {product?.price
                ? product?.price?.discount
                  ? product?.price?.discount?.price +
                    " " +
                    product?.price?.currency
                  : product?.price?.default + " " + product?.price?.currency
                : "Цена не указана"}
                {product?.price && product?.price?.discount && (
              <div className="flex items-center">
                <span className="line-through text-[8px] sm:text-[10px] text-colText whitespace-nowrap">
                  {`${product?.price?.default}  ${product?.price?.currency}`}
                </span>
                <span className="ml-2 bg-[#F04438] text-[10px] mm:text-xs font-medium text-white whitespace-nowrap px-1 py-[1px] rounded-xl">
                  {product?.price?.discount?.percent} %
                </span>
              </div>
            )}
            </div>

            {/* <div className="text-lg font-medium">14 528 ₽</div>
              <div className="text-colGray text-sm line-through	">19 080</div> */}
            {productInCart?.price && <div>{productInCart?.quantity * product?.price?.discount?.price} {productInCart?.price?.currency}</div>}
        </div>
        {productInCart && (
          <div className="flex  justify-between">
            <div className="items-center grow">
              <ChangeQuantityGroup
                product={productInCart}
                enableRemove={true}
              />
            </div>
          </div>
        )}

        {!productInCart && (
          <div className="flex flex-col gap-3">
            <AddToCartButton product={product}>
              {({ handleAddToCartClick, isLoading, isSuccess }) => (
                <button
                  disabled={isLoading}
                  className={`${
                    isLoading ? "cursor-wait" : "cursor-pointer"
                  } py-3 flex justify-center text-white font-semibold bg-colGreen w-full rounded cursor-pointer`}
                  onClick={handleAddToCartClick}
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
              onClick={() => setFastOrderModal(true)}
              className="py-3 flex justify-center text-colGreen font-semibold bg-white border-colGreen border w-full rounded cursor-pointer"
            >
              Купить в 1 клик
            </button>
            <FastOrderModal
              open={fastOrderModal}
              handleClose={handleCloseFastOrderModal}
              product={product}
            />
          </div>
        )}

        {productInCart && (
          <NavLink to="/shopping-cart">
            <button className="py-3 flex justify-center text-colGreen font-semibold bg-white border-colGreen border w-full rounded cursor-pointer">
              Перейти в корзину
            </button>
          </NavLink>
        )}

        <div className="flex justify-center text-colGreen font-semibold underline underline-offset-8 cursor-pointer">
          Узнать цену для юрлиц
        </div>
      </div>

      <div className="flex flex-col gap-4 px-5">
        <div className="flex">
          <img className="w-5 mr-2 " src={checkicon} alt="*" />
          <div className="text-sm">В вашем городе 20 шт.</div>
        </div>

        <div className="flex">
          <img className="w-5 mr-2" src={stallicon} alt="*" />
          <div className="text-colGreen font-semibold underline underline-offset-8 cursor-pointer mr-2 text-sm">
            Самовывоз:
          </div>
          <div className="text-sm"> сегодня, из 1 магазина</div>
        </div>
        <div className="flex">
          <img className="w-5 mr-2" src={truckicon} alt="*" />
          <div className="text-colGreen font-semibold underline underline-offset-8 cursor-pointer mr-2 text-sm">
            Доставка:
          </div>
          <div className="text-sm">25 октября</div>
        </div>
        <div className="flex">
          <img className="w-5 mr-2" src={boxicon} alt="*" />
          <div className="text-colGreen font-semibold underline underline-offset-8 cursor-pointer mr-2 text-sm">
            Транспортная компания:
          </div>
          <div className="text-sm">25 октября</div>
        </div>
      </div>
    </>
  );
}

export default RightBar;
