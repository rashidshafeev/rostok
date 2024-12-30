// src/widgets/product-card/model/hooks/useProductCard.ts
import { useCart } from '@/features/cart';

import type { Product } from '@/entities/product';

export const useProductCard = (product: Product) => {
  const { cart } = useCart();

  const productInCart = cart?.cart?.find((item) => item.id === product.id);
  const productPrice = productInCart?.price || product.price;

  return {
    productInCart,
    productPrice,
  };
};
