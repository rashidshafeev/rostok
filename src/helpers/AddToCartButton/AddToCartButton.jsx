import React from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '@store/slices/cartSlice';
import { getTokenFromCookies } from '@/features/auth/lib';
import { useGetCartItemPriceMutation, useSendCartMutation } from '@/redux/api/cartEndpoints';
import { toast } from 'sonner';

const AddToCartButton = ({ product, children }) => {
  const dispatch = useDispatch();
  const token = getTokenFromCookies();

  // Fetching cart from the server if the user is logged in
  const [sendCart, { isLoading, isSuccess }] = useSendCartMutation();
  const [getItemPrice] = useGetCartItemPriceMutation();

  const handleAddToCartClick = async (e) => {
    e.preventDefault();

    if (token) {
      const addedProduct = await sendCart({ id: product.id, quantity: 1, selected: 0 });
      if (addedProduct.error) {
        toast.error('Failed to add product to cart');
        return;
      }
    }
    const price = await getItemPrice({ item_id: product.id });
    const newProduct = { ...product, price: price?.data?.data.price };
    dispatch(addToCart(newProduct));
  };

  let buttonText = 'В корзину';
  let disabled = false;

  if (product?.availability) {
    if (product.availability.stock === 0 && product.availability.preorder === null) {
      disabled = true;
      buttonText = 'Нет в наличии';
    } else if (product.availability.stock === 0 && product.availability.preorder) {
      buttonText = product.availability.preorder.formatted;
    }
  } else {
    disabled = true;
    buttonText = 'Нет в наличии';
  }


  return children({ handleAddToCartClick, isLoading, isSuccess, buttonText, disabled });
};

export default AddToCartButton;
