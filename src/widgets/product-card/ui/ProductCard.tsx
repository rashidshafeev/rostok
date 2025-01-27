// src/widgets/product-card/ui/ProductCard/ProductCard.tsx
import { NavLink } from 'react-router-dom';

import { AddToCartButton, QuantityControl } from '@/features/cart';
import { useProductCard } from '@/widgets/product-card';

import { PreviewGallery } from './PreviewGallery';
import { PriceDisplay } from './PriceDisplay';

import type { Product } from '@/entities/product';

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const { productInCart, productPrice } = useProductCard(product);

  return (
    <NavLink
      to={
        product.slug ? `/catalog/${product.category.slug}/${product.slug}` : ''
      }
      className="overflow-hidden group duration-500 flex flex-col justify-between items-stretch"
    >
      <div>
        <PreviewGallery product={product} />
      </div>

      <div className="lining-nums proportional-nums mt-2 flex h-[160px] mm:h-[140px] flex-col gap-1">
        <div className="flex flex-col justify-between gap-1 h-full mb-1">
          <p className="text-sm text-colText font-medium line-clamp-2">
            {product.fullName}
          </p>
          <PriceDisplay price={productPrice} />
        </div>

        {!productInCart ? (
          <AddToCartButton product={product}/>
        ) : (
          <div className="flex justify-between gap-2">
            <QuantityControl product={productInCart} enableRemove />
          </div>
        )}
      </div>
    </NavLink>
  );
};
