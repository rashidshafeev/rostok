import { NavLink } from 'react-router-dom';

import { AddToCartButton, QuantityControl } from '@/features/cart';
import { ComparisonButton } from '@/features/comparison';
import { FavoriteButton } from '@/features/favorite';
import noImg from '@/shared/assets/images/no-image.png';
import { useProductCard } from '@/widgets/product-card';

import { PriceDisplay } from './PriceDisplay';

import type { Product } from '@/entities/product';

interface ProductCardLineProps {
  product: Product;
}

export const ProductCardLine = ({ product }: ProductCardLineProps) => {
  const { productInCart, productPrice } = useProductCard(product);

  return (
    <div className="lg:flex justify-between">
      <div className="mm:flex lg:pr-4 lg:max-w-[800px] w-full">
        <NavLink to={`/catalog/${product?.category?.slug}/${product?.slug}`}>
          <div className="mm:max-w-[180px] min-w-[180px] w-full h-[180px] mm:h-[180px] overflow-hidden rounded-xl relative bg-gray-100">
            <img
              src={product?.files[0]?.medium || noImg}
              className="w-full h-full object-contain"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.onerror = null;
                target.src = noImg;
              }}
              alt={product.name}
            />
            {product?.tags?.length > 0 ? (
              <div className="absolute top-2 w-full px-2 z-10">
                <span
                  style={{
                    color: product.tags[0].text_color,
                    backgroundColor: product.tags[0].background_color,
                  }}
                  className="py-[3px] lg:py-1 px-1.5 lg:px-2 uppercase text-[8px] lg:text-xs font-semibold lg:font-bold rounded-xl"
                >
                  {product.tags[0].text}
                </span>
              </div>
            ) : null}
          </div>
        </NavLink>

        <div className="mm:pl-5 pt-2 mm:pt-0">
          <NavLink
            to={`/catalog/${product?.category?.slug}/${product?.slug}`}
            className="font-bold text-sm break-all hover:underline line-clamp-3 pb-1"
          >
            {product?.groupName} {product?.name}
          </NavLink>

          <p className="font-medium text-xs text-colDarkGray leading-4 break-all line-clamp-4 pb-1">
            {product?.description}
          </p>

          <div className="space-y-1">
            <p className="text-xs text-colDarkGray flex items-center space-x-2">
              <span>Код товара:</span>
              <span>{product?.sku}</span>
            </p>
            {product.attributes?.map((attribute, index) => (
              <p
                key={index}
                className="text-xs text-colDarkGray flex items-center space-x-1"
              >
                <span>{attribute.name}:</span>
                <span className="font-semibold">
                  {attribute.color ? (
                    <div
                      style={{ backgroundColor: attribute.color }}
                      className="min-w-[12px] w-3 h-3 rounded-full"
                    />
                  ) : (
                    attribute.text
                  )}
                </span>
              </p>
            ))}
          </div>
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
  );
};
