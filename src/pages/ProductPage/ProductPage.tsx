import React, { useEffect, useRef, useState } from 'react'
import { useLoaderData, useParams } from 'react-router-dom'

import dummylogo from '@assets/images/dummy-logo.png';

import { useDispatch } from 'react-redux';

import ProductAttributesList from '@components/ProductPage/Attributes/ProductAttributesList';
import ProductTabs from '@components/ProductPage/ProductTabs/ProductTabs';
import RightBar from '@components/ProductPage/RightBar';
import CharacteristicsList from '@components/ProductPage/CharacteristicsList';
import TopControls from '@components/ProductPage/TopControls';
import ProductGallery from '@components/ProductPage/ProductGallery';
import Breadcrumbs from '../../helpers/Breadcrumbs/Breadcrumbs';
import MobileInfo from '@components/ProductPage/Mobile/MobileNameBar';
import MobileProductInfo from '@components/ProductPage/Mobile/MobileProductInfo/MobileProductInfo';
import MobileTopBar from '@components/ProductPage/Mobile/MobileTopBar';
import { useIntersection, useWindowSize } from 'react-use';
import { scrollToTop } from '../../helpers/scrollToTop/scrollToTop';
import { useGetProductQuery } from '@api/productEndpoints';
import ProductPageDesktop from '@components/ProductPage/ProductPageDesktop';
import ProductPageMobile from '@components/ProductPage/ProductPageMobile';

const ProductPage = () =>  {

  const { productId } = useParams();

  const { data, isLoading, isSuccess } = useGetProductQuery(productId)
  const group = data?.data;

  const { width } = useWindowSize();

  const dispatch = useDispatch();

  useEffect(() => {
    scrollToTop();
  }, []);


  if (width > 991 && isSuccess) {
    return <ProductPageDesktop group={group}/>
    } else if (width <= 991 && isSuccess)  {
    return <ProductPageMobile group={group}/>
  }
}


export default ProductPage