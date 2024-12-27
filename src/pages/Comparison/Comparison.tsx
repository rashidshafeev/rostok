import React, { useEffect, useState } from 'react';

import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useSelector } from 'react-redux';

import ComDetail from '@/components/Comparison/ComparisonDetail';
import { useGetComparisonQuery } from '@/redux/api/comparisonEndpoints';
import { getTokenFromCookies } from '@/shared/lib';
import { scrollToTop } from '@/shared/lib/scrollToTop';
import { Breadcrumbs } from '@/widgets/Breadcrumbs';
import CategorySwitcher from '@components/common/CategorySwitcher';
import ErrorEmpty from '@helpers/Errors/ErrorEmpty';

import type { RootState } from '@store/store';

interface ErrorEmptyProps {
  title: string;
  desc: string;
  height: string;
  hideBtn?: boolean;
}

const Comparison = () => {
  const token = getTokenFromCookies();
  const { comparison: localComparison, categories: localCategories } =
    useSelector((state: RootState) => state.comparison);
  const {
    data: serverComparison,
    isLoading,
    isSuccess,
    error,
  } = useGetComparisonQuery(undefined, { skip: !token });
  const comparisonData =
    token && isSuccess ? serverComparison?.data : localComparison;
  const categories =
    token && isSuccess ? serverComparison?.category_chain : localCategories;

  const [selectedFilter, setSelectedFilter] = useState('');

  useEffect(() => {
    if (comparisonData?.length > 0 && categories?.length > 0) {
      setSelectedFilter(
        String(categories[0]?.chain[categories[0]?.chain?.length - 1]?.id)
      );
    }
  }, [comparisonData, categories]);

  const filteredComparison = selectedFilter
    ? comparisonData?.filter(
        (item) => item.category.id === parseInt(selectedFilter, 10)
      )
    : comparisonData;

  useEffect(() => {
    scrollToTop();
  }, []);

  const handleCategoryChange = (id: string | number) => {
    setSelectedFilter(String(id));
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="pb-6 content">
        <Breadcrumbs />
        <h1 className="block text-2xl md:text-[40px] font-semibold text-colBlack pb-5">
          Сравнение товаров
        </h1>
        {categories?.length > 0 ? (
          <CategorySwitcher
            categories={categories}
            selectedCategory={selectedFilter}
            onCategoryChange={handleCategoryChange}
          />
        ) : null}
        {comparisonData?.length > 0 ? (
          <ComDetail comparison={filteredComparison} />
        ) : null}
        {comparisonData?.length === 0 ? (
          <ErrorEmpty
            title="Еще не готовы к покупке?"
            desc="Добавляйте понравившийся товар в сравнение, чтобы сравнить его с аналогами."
            height="420px"
          />
        ) : null}
      </div>
    </DndProvider>
  );
};

export default Comparison;
