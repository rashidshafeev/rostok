import React, { useEffect, useRef, useState } from 'react';

import { useLoaderData, useParams } from 'react-router-dom';
import { useIntersection, useWindowSize } from 'react-use';

import { useGetProductQuery } from '@/entities/product/api/productApi';
import useAddToRecentItems from '@/features/recent-items/lib/hooks/useAddToRecentItems';
import { scrollToTop } from '@/shared/lib/scrollToTop';
import ProductPageDesktop from '@components/ProductPage/ProductPageDesktop';
import ProductPageMobile from '@components/ProductPage/ProductPageMobile';
import { useModificationAttributesManager } from '@hooks/useModificationAttributesManager';

import type { Product } from '@/entities/product/Product';

const ProductPage = () => {
  const { productId } = useParams();

  const { data, isLoading, isSuccess } = useGetProductQuery(productId);
  const group = data?.data;

  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);

  const { attributesList, handleChangeAttribute } =
    useModificationAttributesManager(group, setCurrentProduct);

  const { width } = useWindowSize();

  useEffect(() => {
    scrollToTop();
  }, []);

  useAddToRecentItems(currentProduct);

  if (width > 991 && isSuccess) {
    return (
      <ProductPageDesktop
        group={group}
        currentProduct={currentProduct}
        attributesList={attributesList}
        handleChangeAttribute={handleChangeAttribute}
      />
    );
  } else if (width <= 991 && isSuccess) {
    return (
      <ProductPageMobile
        group={group}
        currentProduct={currentProduct}
        attributesList={attributesList}
        handleChangeAttribute={handleChangeAttribute}
      />
    );
  }
};

export default ProductPage;
