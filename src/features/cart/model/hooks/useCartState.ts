import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';

import { 
  setCart, 
  addToCart, 
  removeFromCart,
  changeQuantity,
  selectItem,
  unselectItem
} from '../model/cartSlice';
import { 
  useGetUserCartQuery, 
  useSendCartMutation 
} from '../api/cartApi';
import { getTokenFromCookies } from '@/entities/user';import { transformServerCartToLocalCart } from '../lib/transformData';

import type { RootState } from '@/app/providers/store';
import type { CartProduct, LocalCartState } from '../model/types';

interface UseCartStateReturn {
  cart: LocalCartState;
  isLoading: boolean;
  isError: boolean;
  addItem: (product: CartProduct) => Promise<void>;
  removeItem: (product: CartProduct) => Promise<void>;
  updateQuantity: (product: CartProduct, quantity: number) => Promise<void>;
  toggleSelect: (product: CartProduct, selected: boolean) => Promise<void>;
  syncWithServer: () => Promise<void>;
}

export const useCartState = (): UseCartStateReturn => {
  const dispatch = useDispatch();
  const token = getTokenFromCookies();
  const localCart = useSelector((state: RootState) => state.cart);

  // Server state management
  const {
    data: serverCart,
    isLoading: isServerLoading,
    isSuccess,
    error: serverError,
    refetch
  } = useGetUserCartQuery(undefined, { 
    skip: !token,
    refetchOnMountOrArgChange: true
  });

  const [sendCart, { isLoading: isSending }] = useSendCartMutation();

  // Initialize cart from server when user logs in
  useEffect(() => {
    if (token && isSuccess && serverCart) {
      const transformedCart = transformServerCartToLocalCart(serverCart);
      dispatch(setCart(transformedCart));
    }
  }, [token, isSuccess, serverCart]);

  // Sync with server helper
  const syncWithServer = useCallback(async () => {
    if (!token) return;
    
    try {
      const items = localCart.cart.map(item => ({
        id: item.id,
        quantity: item.quantity,
        selected: item.selected ? 1 : 0
      }));
      
      await sendCart({ items });
      await refetch();
    } catch (error) {
      toast.error('Failed to sync with server');
      console.error('Sync error:', error);
    }
  }, [token, localCart, sendCart, refetch]);

  // Cart operations
  const addItem = async (product: CartProduct) => {
    dispatch(addToCart(product));
    
    if (token) {
      try {
        await sendCart({
          id: product.id,
          quantity: product.quantity,
          selected: product.selected ? 1 : 0
        });
      } catch (error) {
        toast.error('Failed to add item to cart');
        dispatch(removeFromCart(product)); // Rollback on error
      }
    }
  };

  const removeItem = async (product: CartProduct) => {
    dispatch(removeFromCart(product));

    if (token) {
      try {
        await sendCart({
          id: product.id,
          quantity: 0,
          selected: 0
        });
      } catch (error) {
        toast.error('Failed to remove item from cart');
        dispatch(addToCart(product)); // Rollback on error
      }
    }
  };

  const updateQuantity = async (product: CartProduct, newQuantity: number) => {
    const oldQuantity = product.quantity;
    
    dispatch(changeQuantity({ 
      id: product.id, 
      quantity: newQuantity,
      price: product.price 
    }));

    if (token) {
      try {
        await sendCart({
          id: product.id,
          quantity: newQuantity,
          selected: product.selected ? 1 : 0
        });
      } catch (error) {
        toast.error('Failed to update quantity');
        // Rollback on error
        dispatch(changeQuantity({ 
          id: product.id, 
          quantity: oldQuantity,
          price: product.price 
        }));
      }
    }
  };

  const toggleSelect = async (product: CartProduct, selected: boolean) => {
    dispatch(selected ? selectItem(product) : unselectItem(product));

    if (token) {
      try {
        await sendCart({
          id: product.id,
          quantity: product.quantity,
          selected: selected ? 1 : 0
        });
      } catch (error) {
        toast.error('Failed to update selection');
        // Rollback on error
        dispatch(selected ? unselectItem(product) : selectItem(product));
      }
    }
  };

  return {
    cart: token && isSuccess ? transformServerCartToLocalCart(serverCart) : localCart,
    isLoading: isServerLoading || isSending,
    isError: !!serverError,
    addItem,
    removeItem,
    updateQuantity,
    toggleSelect,
    syncWithServer
  };
};