// src/pages/ShoppingCart.js
import React, { useEffect, useRef, useState } from "react";
import { ShCartDetail, ShLastViews } from "../../components";
import ErrorEmpty from "../../helpers/Errors/ErrorEmpty";
import { scrollToTop } from "../../helpers/scrollToTop/scrollToTop";
import { useSelector } from "react-redux";
import CustomBreadcrumbs from "../../helpers/Breadcrumbs/CustomBreadcrumbs";
import { shoppingCart } from "../../constants/breadcrumbs";
import { getTokenFromCookies } from "../../helpers/cookies/cookies";
import { useGetUserCartQuery } from "../../redux/api/cartEndpoints";
import ShoppingCartOrderInfo from "../../components/ShCart/ShoppingCartOrderInfo";
import shareIcon from "../../assets/icons/share.svg";
import docIcon from "../../assets/icons/download-pdf.svg";
import CSearchField from "../../helpers/CustomInputs/CSearchField";
import { useIntersection } from "react-use";
import MobileToCheckoutBar from "../../components/ShCart/MobileToCheckoutBar";
import { CartProduct, LocalCartState } from "@customTypes/Store/Cart/CartState";
import { transformServerCartToLocalCart } from "@utils/transfromData";
import { RootState } from "@store/store";

const ShoppingCart = () => {
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
  
  const selected : CartProduct[] = cart?.cart?.filter(
    (item) => item.selected === true || item.selected.toString() === "1"
  );

  useEffect(() => {
    scrollToTop();
  }, []);

  const [filteredCart, setFilteredCart] = useState<CartProduct[]>([]);

  const handleFilter = (event) => {
    const filterValue = event.target.value;

    let filteredCart = cart?.cart?.filter(
    // let filteredCart = cart?.data?.filter(
      (product) =>
        product.name.toLowerCase().includes(filterValue.toLowerCase()) ||
        product.groupName.toLowerCase().includes(filterValue.toLowerCase()) ||
        product.sku.toString().includes(filterValue)
    );

    setFilteredCart(filteredCart);
  };

  useEffect(() => {
    setFilteredCart(cart?.cart);
  }, [cart]);

  const orderInfo = useRef(null);
  const orderInfoVisible = useIntersection(orderInfo, {
    root: null,
    rootMargin: "0px",
    threshold: 1,
  });

  return (
    <div className="content pb-6 lining-nums proportional-nums">
      <CustomBreadcrumbs breadcrumbs={shoppingCart} />
      <h1 className="block text-2xl md:text-[40px] font-semibold text-colBlack">
        Корзина
      </h1>
      {cart?.cart?.length > 0 && (
      // {cart?.data?.length > 0 && (
        <>
          <div className="hidden lg:flex justify-between items-end">
            <div className="flex max-w-[460px] w-full pt-3">
              <CSearchField
                label="Введите наименование или код товара"
                name="search"
                type="search"
                handleChange={handleFilter}
              />
            </div>
            <div className="flex justify-end items-center space-x-4 ">
              <div className="flex cursor-pointer">
                <img src={shareIcon} alt="*" />
                <span className="text-xs font-medium text-colBlack pl-2">
                  Поделиться
                </span>
              </div>
              <div className="flex cursor-pointer">
                <img src={docIcon} alt="*" />
                <span className="text-xs font-medium text-colBlack pl-2">
                  Скачать PDF заказа
                </span>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-10 py-5">
            <div className="lg:basis-[calc(70%-20px)] basis-full">
              <ShCartDetail
                cart={cart}
                isLoading={isLoading}
                filteredCart={filteredCart}
                selected={selected}
              />
            </div>

            <div
              ref={orderInfo}
              className="lg:basis-[calc(30%-20px)] basis-full"
            >
              <ShoppingCartOrderInfo cart={cart} selected={selected} />
            </div>
          </div>

          {orderInfoVisible && orderInfoVisible.intersectionRatio < 1 && (
            <MobileToCheckoutBar
              selected={selected}
              quantity={cart?.selectedQuantity}
            />
          )}
        </>
      )}
      {cart?.cart?.length === 0 && (
        <ErrorEmpty
          title="Корзина пуста!"
          desc="Воспользуйтесь поиском, чтобы найти всё, что нужно."
          height="230px"
        />
      )}
      <ShLastViews />
    </div>
  );
};

export default ShoppingCart;
