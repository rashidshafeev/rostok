// src/components/ProductCard.js
import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import AddToCartButton from "@helpers/AddToCartButton/AddToCartButton";
import ChangeQuantityGroup from "@helpers/ChangeQuantityButton/ChangeQuantityGroup";
import { LoadingSmall } from "@helpers/Loader/Loader";
import PreviewGallery from "./PreviewGallery";
import PriceDisplay from "./PriceDisplay";
import { RootState } from "@/redux/store";
import { Product } from "@customTypes/Product/Product";

type ProductCardProps = {
  product: Product
}

const ProductCard : React.FC<ProductCardProps> = ({ product }) => {

  const { cart } = useSelector((state : RootState) => state.cart);

  const productInCart = cart?.find((el) => el.id === product.id);

  return (
    <NavLink
      to={
        product.slug ? `/catalog/${product.category.slug}/${product.slug}` : ""
      }
      
      className={`${
        false && "opacity-50 cursor-not-allowed"
      } overflow-hidden group duration-500 flex flex-col justify-between items-stretch `}
    >
      <div>
        <PreviewGallery product={product} />
      </div>
      <div className="lining-nums proportional-nums mt-2 flex h-[160px] mm:h-[140px] flex-col gap-1">
        <div className="flex flex-col justify-between gap-1 h-full mb-1">
          {/* <p className="text-xs text-colDarkGray line-clamp-2">
            Код товара: {product.sku}
          </p> */}
          <p className="text-sm text-colText font-medium line-clamp-2">
            {product.fullName}
          </p>
           <PriceDisplay price={product?.price} />
        </div>

        {!productInCart && (
          <AddToCartButton product={product}>
            {({ handleAddToCartClick, isLoading, isSuccess }) => (
              <button
                disabled={isLoading}
                onClick={handleAddToCartClick}
                className={`${
                  isLoading ? "cursor-wait" : "cursor-pointer"
                } transition-all flex justify-center items-center min-h-10 xs:text-sm sm:text-base duration-200 bg-colGreen text-white rounded-md p-2 font-semibold w-full`}
              >
                {isLoading && !isSuccess ? (
                  <LoadingSmall extraStyle={"white"} />
                ) : (
                  "В корзину"
                )}
              </button>
            )}
          </AddToCartButton>
        )}
        {productInCart && (
          <div className="flex justify-between gap-2">
            <ChangeQuantityGroup product={productInCart} enableRemove={true} />
          </div>
        )}
      </div>
    </NavLink>
  );
};

export default ProductCard;
