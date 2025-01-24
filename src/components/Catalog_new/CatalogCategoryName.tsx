import type React from 'react';

import { useParams } from 'react-router-dom';

import { useGetCategoryTreeQuery } from '@/entities/product/api/productApi';

const CatalogCategoryName: React.FC = () => {
  const { categoryId } = useParams();

  const {
    data: categoryTree,
    isLoading: categoryTreeIsLoading,
    isSuccess: categoryTreeIsSuccess,
  } = useGetCategoryTreeQuery(categoryId);

  if (categoryTreeIsLoading) {
    return null;
  }

  return (
    <div className="flex gap-3">
      <h3 className="font-semibold text-xl mm:text-2xl lg:text-4xl text-colBlack pb-5">
        {categoryTreeIsSuccess ? categoryTree?.category?.name : null}
      </h3>
      <span className="text-colDarkGray">
        {categoryTree?.category?.product_count}
      </span>
    </div>
  );
};

export default CatalogCategoryName;
