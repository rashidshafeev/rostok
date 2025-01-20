import { useMemo } from 'react';

import { useDispatch } from 'react-redux';
import { toast } from 'sonner';

import { useGetCartItemPriceMutation } from '@/entities/price';
import { useSendCartMutation, addToCart } from '@/features/cart';
import { getTokenFromCookies } from '@/shared/lib';

import type { Product } from '@/entities/product';

interface UseAddToCartReturn {
  handleAddToCartClick: (e: React.MouseEvent) => Promise<void>;
  buttonState: {
    text: string;
    disabled: boolean;
    loading: boolean;
  };
}

export const useAddToCart = (product: Product): UseAddToCartReturn => {
  const dispatch = useDispatch();
  const token = getTokenFromCookies();

  const [sendCart, { isLoading: sendCartLoading }] = useSendCartMutation();
  const [getItemPrice, { isLoading: priceLoading }] =
    useGetCartItemPriceMutation();

  const handleAddToCartClick = async (e: React.MouseEvent) => {
    e.preventDefault();

    try {
      if (token) {
        const result = await sendCart({
          id: product.id,
          quantity: 1,
          selected: 0,
        });
        if ('error' in result) {
          toast.error('Failed to add product to cart');
          return;
        }
      }

      const price = await getItemPrice({ item_id: product.id });
      if ('data' in price) {
        const newProduct = { ...product, price: price.data.data.price };
        dispatch(addToCart(newProduct));
      }
    } catch (error) {
      toast.error('Failed to add product to cart');
    }
  };

  // Determine button state based on product availability
  const buttonState = useMemo(() => {
    let text = 'В корзину';
    let disabled = false;

    if (product?.availability) {
      if (product.availability.stock === 0) {
        if (product.availability.preorder === null) {
          disabled = true;
          text = 'Нет в наличии';
        } else {
          text = product.availability.preorder.formatted;
        }
      }
    } else {
      disabled = true;
      text = 'Нет в наличии';
    }

    return {
      text,
      disabled,
      loading: sendCartLoading || priceLoading,
    };
  }, [product?.availability, sendCartLoading, priceLoading]);

  return {
    handleAddToCartClick,
    buttonState,
  };
};
