import { Outlet } from 'react-router-dom';
import { Footer, Header } from '..';
// import Breadcrumbs from '../../helpers/BreadCrumbs/BreadCrumbs';
import { useEffect, useState } from 'react';
import CatalogModal from '../../helpers/CModal/CatalogModal';
import { useDispatch } from 'react-redux';

const Layout = () => {
  const [cartProducts, setCartProducts] = useState([]);
  const [showCatalog, setShowCatalog] = useState(false);

  //   useEffect(() => {
  //  console.log('layout')

  //     const updateCartProducts = () => {
  //       const cartData = localStorage.getItem('cart');
  //       const cartArray = cartData ? JSON.parse(cartData) : [];
  //       setCartProducts(cartArray);
  //     };

  //     updateCartProducts();
  //   }, []);
  const dispatch = useDispatch();

  useEffect(() => {
    // dispatch()
  }, [dispatch]);

  const addToCart = (product) => {
    const cartData = localStorage.getItem('cart');
    const cartArray = cartData ? JSON.parse(cartData) : [];

    cartArray.push(product);

    setCartProducts(cartArray);
    localStorage.setItem('cart', JSON.stringify(cartArray));
  };

  const removeFromCart = (id) => {
    var cartData = localStorage.getItem('cart');
    var cartArray = cartData ? JSON.parse(cartData) : [];
    var updatedCart = cartArray?.filter((product) => product?.id !== id);

    localStorage.setItem('cart', JSON.stringify(updatedCart));
    setCartProducts(updatedCart);
  };

  const removeAllCart = (selectedItemIds) => {
    var cartData = localStorage.getItem('cart');
    var cartArray = cartData ? JSON.parse(cartData) : [];

    var updatedCart = cartArray?.filter(
      (product) => !selectedItemIds.includes(product?.id)
    );

    localStorage.setItem('cart', JSON.stringify(updatedCart));
    setCartProducts(updatedCart);
  };

  return (
    <>
      <Header
        cartProducts={cartProducts}
        showCatalog={showCatalog}
        setShowCatalog={setShowCatalog}
      />
      <CatalogModal showCatalog={showCatalog} setShowCatalog={setShowCatalog} />
      <Outlet
        context={[cartProducts, addToCart, removeFromCart, removeAllCart]}
      />
      <Footer />
    </>
  );
};

export default Layout;
