import { NavLink } from 'react-router-dom';

import { AddToCartButton, QuantityControl } from '@/features/cart';
import { ComparisonButton } from '@/features/comparison';
import { FavoriteButton } from '@/features/favorite';
import noImg from '@/shared/assets/images/no-image.png';
import { useProductCard } from '@/widgets/product-card';

import { PriceDisplay } from './PriceDisplay';

import type { Product } from '@/entities/product';

type ProductCardLineSmallProps = {
  product: Product;
};

export const ProductCardLineSmall: React.FC<ProductCardLineSmallProps> = ({
  product,
  showChangeQuantity = true,
}) => {
  const { cart } = useSelector((state: RootState) => state.cart);
  const navigate = useNavigate();

  const productInCart = cart.find((el) => el.id === product.id);

  console.log(product, showChangeQuantity);
  return (
    <div className="mm:flex justify-between relative w-full">
      <div className="flex justify-between mm:pr-4 basis-1/2 w-full">
        <div className="flex pr-2 mm:pr-0 ">
          <NavLink
            to={`/catalog/${product?.category?.slug}/${product?.slug}`}
            className="min-w-[80px] w-20 h-20 bg-gray-100 rounded-lg overflow-hidden"
          >
            <img
              src={product?.files[0]?.medium || noImg}
              className="w-full h-full object-contain"
              onError={(e) => {
                e.target.onError = null;
                e.target.src = noImg;
              }}
              alt="*"
            />
          </NavLink>
          <div className="pl-5 basis-10/12">
            <div className="space-y-1 pt-1">
              <div>
                <NavLink
                  to={`/catalog/${product?.category?.slug}/${product?.slug}`}
                  className="font-bold text-sm  break-all hover:underline line-clamp-1 pb-1"
                >
                  {product?.groupName + " " + product?.name || "Не указано"}
                </NavLink>
                <p className="font-medium text-xs text-colDarkGray leading-4  break-all line-clamp-2">
                  {product?.description || "Не указано"}
                </p>
              </div>
              <ProductAttributesDisplay product={product} />
            </div>
          </div>
        </div>
        {/* <div className='px-2 min-w-[98px] text-right md:text-center'>
          {product?.tags?.length > 0 && (
            <span
              style={{ color: product?.tags[0]?.text_color }}
              className={`bg-[${product?.tags[0]?.background_color}] py-[3px] lg:py-1 px-1.5 lg:px-2 uppercase text-[8px] lg:text-xs font-semibold lg:font-bold rounded-xl`}
            >
              {product?.tags[0]?.text}
            </span>
          )}
        </div> */}
      </div>
      <div className=" basis-1/2 grow">
        <div className="flex justify-around items-center basis-1/2">
          <div className="basis-1/4">
            <PriceDisplay price={product?.price} alignment="center" />
          </div>
          <div className="  font-bold text-colBlack basis-1/4">
            {product?.quantity} шт.
          </div>
        </div>

        <div className="lg:max-w-xs w-full">
          <div className="flex justify-between items-center">
            <PriceDisplay price={productPrice} />

            <div className="flex items-center space-x-2">
              <FavoriteButton product={product} />
              <ComparisonButton product={product} />
            </div>
          </div>

          <div className="flex justify-between space-x-3 pt-3 lg:pt-5">
            {!productInCart ? (
              <AddToCartButton
                product={product}
                className="transition-all flex justify-center items-center min-h-10 text-white rounded-md p-2 font-semibold w-full duration-200"
              />
            ) : (
              <QuantityControl
                product={productInCart}
                enableRemove
                className="w-full"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};