// src/components/ProductCard.js
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { ComparisonIcon, FavoriteIcon } from "../../helpers/Icons";
import { getTokenFromCookies } from "../../helpers/cookies/cookies";
import FavoriteButton from "../../helpers/FavoriteButton/FavoriteButton";
import ComparisonButton from "../../helpers/ComparisonButton/ComparisonButton";
import AddToCartButton from "../../helpers/AddToCartButton/AddToCartButton";
import { useGetUserCartQuery } from "../../redux/api/cartEndpoints";
import ChangeQuantityGroup from "../../helpers/ChangeQuantityButton/ChangeQuantityGroup";
import { LoadingSmall } from "../../helpers/Loader/Loader";
import PreviewGallery from "./PreviewGallery";
import { ShoppingCart } from "@mui/icons-material";
import { SvgIcon } from "@mui/material";

const ProductCard = ({ product }) => {
  // const token = getTokenFromCookies();
  const navigate = useNavigate() 

  const { cart } = useSelector((state) => state.cart);
  // const { data: cartData } = useGetUserCartQuery(undefined, { skip: !token });

  
  const productInCart = cart.find((el) => el.id === product.id);
  // const productInCart = token
  //   ? cartData?.data?.find((el) => el.id === product.id)
  //   : cart.find((el) => el.id === product.id);

  return (
    <NavLink
      to={
        product.slug ? `/catalog/${product.category.slug}/${product.slug}` : ""
      }
      // className={`${setLoading || removeLoading && 'opacity-50 cursor-not-allowed'} overflow-hidden group duration-500`}
      className={`${
        false && "opacity-50 cursor-not-allowed"
      } overflow-hidden group duration-500 flex flex-col justify-between items-stretch `}
    >
      <div>
      <PreviewGallery product={product} />

        
      </div>
      <div className="lining-nums proportional-nums mt-2 flex h-[98px] mm:h-[112px] flex-col gap-1">
        <div className="flex flex-col justify-between gap-1 h-full mb-1">
          <div className="flex justify-end items-center">
            <div className="flex items-center gap-1 mr-1">
              <p className="text-xs sm:text-sm font-semibold whitespace-nowrap">
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
                <span className="line-through text-[8px] sm:text-[10px] text-colText whitespace-nowrap">
                  {`${product?.price?.default}  ${product?.price?.currency}`}
                </span>
                <span className="ml-2 bg-[#F04438] text-[10px] mm:text-xs font-medium text-white whitespace-nowrap px-1 py-[1px] rounded-xl">
                  {product?.price?.discount?.percent} %
                </span>
              </div>
            )}
          </div>
          <p className="text-xs sm:text-sm text-colText line-clamp-2">
            {product.fullName}
          </p>
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
        {productInCart && <div className="flex justify-between gap-2">
          <ChangeQuantityGroup product={productInCart} enableRemove={true} />
          {/* <div className=" rounded-lg bg-colGreen h-10 w-10 flex justify-center items-center">
            <NavLink onClick={(e) => {
              e.stopPropagation();
              navigate("/shopping-cart");
            }}>
          <SvgIcon className="w-6 h-6 text-white" component={ShoppingCart} />

            </NavLink>

          </div> */}
</div>}
        {/* {productInCart && (
        )} */}
      </div>
    </NavLink>
  );
};

export default ProductCard;
