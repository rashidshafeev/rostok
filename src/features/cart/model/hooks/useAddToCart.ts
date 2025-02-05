// src/features/cart/model/hooks/useAddToCart.ts
import { useMemo, useState } from 'react';

import { useDispatch } from 'react-redux';
import { toast } from 'sonner';

import { useGetCartItemPriceMutation } from '@/entities/price';
import { useAuth } from '@/entities/user';
import { useSendCartMutation } from '@/features/cart';

import { addToCart, removeFromCart } from '../cartSlice';

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
  const [localLoading, setLocalLoading] = useState(false);
  const dispatch = useDispatch();
  const { isAuthenticated } = useAuth();
  const [sendCart, { isLoading: sendCartLoading }] = useSendCartMutation();
  const [getItemPrice, { isLoading: priceLoading }] =
    useGetCartItemPriceMutation();

  const handleAddToCartClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    setLocalLoading(true);

    try {
      // Get price first to ensure consistent data
      const priceResponse = await getItemPrice({
        item_id: product.id,
        quantity: 1,
      });

      if ('data' in priceResponse) {
        const newProduct = {
          ...product,
          price: priceResponse.data.data.price,
        };

        // Optimistically update local state
        dispatch(addToCart(newProduct));
        console.log('isA',isAuthenticated)

        // If logged in, sync with server
        if (isAuthenticated) {

          const result = await sendCart({
            id: product.id,
            quantity: 1,
            selected: false,
          });

          if ('error' in result) {
            // Revert optimistic update on error
            dispatch(removeFromCart(newProduct));
            toast.error('Failed to add product to cart');
          }
        }
      }
    } catch (error) {
      toast.error('Failed to add product to cart');
    } finally {
      setLocalLoading(false);
    }
  };

  // Determine button state based on product availability and loading states
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
      disabled: disabled || localLoading,
      loading: localLoading,
    };
  }, [product?.availability, localLoading]);

  return {
    handleAddToCartClick,
    buttonState,
  };
};
