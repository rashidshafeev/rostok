// src/helpers/SelectCartItemButton/SelectCartItemButton.jsx

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectItem, unselectItem } from '../../redux/slices/cartSlice';
import { getTokenFromCookies } from '../cookies/cookies';
import { useGetUserCartQuery, useSendCartMutation  } from '../../redux/api/cartEndpoints';
const SelectCartItemButton = ({ product, children }) => {
    const dispatch = useDispatch();
    const token = getTokenFromCookies();
    const { cart } = useSelector((state) => state.cart);

    // Fetching cart from the server if the user is logged in
    const { data: serverCart } = useGetUserCartQuery(undefined, { skip: !token });
    

    const [sendCart, { isLoading }] = useSendCartMutation()

    const isSelected = token
        ? serverCart?.data?.some((item) => item.id === product.id && item.selected === "1")
        : cart.some((item) => item.id === product.id && (item.selected.toString() === "1" || item.selected === true));

    const handleSelectClick = (e) => {
        e.preventDefault();
        e.stopPropagation();

        if (isSelected) {
            token ? sendCart({ id: product.id, quantity: product.quantity, selected: 0 }) : dispatch(unselectItem(product));
        } else {
            token ? sendCart({ id: product.id, quantity: product.quantity, selected: 1 }) : dispatch(selectItem(product));
        }
    };

    return children({ isLoading, isSelected, handleSelectClick });
};

export default SelectCartItemButton;