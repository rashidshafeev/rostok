// src/components/ProductCard.js
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import AddToCartButton from "../../helpers/AddToCartButton/AddToCartButton";
import ChangeQuantityGroup from "../../helpers/ChangeQuantityButton/ChangeQuantityGroup";
import { LoadingSmall } from "../../helpers/Loader/Loader";
import PreviewGallery from "./PreviewGallery";

const ProductCard = ({ product }) => {

  const { cart } = useSelector((state) => state.cart);

  const productInCart = cart.find((el) => el.id === product.id);

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
      <div className="lining-nums proportional-nums mt-2 flex h-[140px] mm:h-[140px] flex-col gap-1">
        <div className="flex flex-col justify-between gap-1 h-full mb-1">
          <p className="text-xs text-colDarkGray line-clamp-2">
            Артикул: {product.sku}
          </p>
          <p className="text-sm text-colText font-medium line-clamp-2">
            {product.fullName}
          </p>
          <div className="flex items-center">
            <div className="flex items-center gap-1 mr-1">
              <p className="text-lg font-bold whitespace-nowrap">
                {product?.price
                  ? product?.price?.discount
                    ? product?.price?.discount?.price +
                      " " +
                      product?.price?.currency
                    : product?.price?.default + " " + product?.price?.currency
                  : "Цена не указана"}
              </p>
            </div>
            {product?.price && product?.price?.discount && (
              <div className="flex items-center">
                <span className="line-through decoration-colDarkGray text-[8px] sm:text-[12px] text-colDarkGray whitespace-nowrap">
                  {`${product?.price?.default}  ${product?.price?.currency}`}
                </span>
                <span className="ml-2 bg-[#F04438] text-[10px] mm:text-xs font-medium text-white whitespace-nowrap px-[6px] py-[2px] rounded-xl">
                  {product?.price?.discount?.percent} %
                </span>
              </div>
            )}
          </div>
        </div>

        {!productInCart && (
          <AddToCartButton product={product}>
            {({ handleAddToCartClick, isLoading, isSuccess }) => (
              <button
                disabled={isLoading}
                onClick={handleAddToCartClick}
                className={`${
                  isLoading ? "cursor-wait" : "cursor-pointer"
                } transition-all text-xs flex justify-center min-h-10 xs:text-sm sm:text-base duration-200 bg-colGreen text-white rounded-md p-2 font-semibold w-full`}
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
