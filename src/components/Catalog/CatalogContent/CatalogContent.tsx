import { useState, useRef, useEffect } from 'react';

import { useParams } from 'react-router-dom';

import { CustomPagination } from '@/features/catalog/CustomPagination';
import filterIcon from '@/shared/assets/icons/filter.svg';
import {
  CardLineSkeleton,
  ProductCardLineSmallSkeleton,
  ProductCardSkeleton,
  ProductCard,
  ProductCardLine,
  ProductCardLineSmall,
} from '@/widgets/product-card';
import ErrorEmpty from '@helpers/Errors/ErrorEmpty';

import CardTypeControls from './CardTypeControls';
import MobileSortControls from './MobileSortControls';
import SortControls from './SortControls';

const CatProdContent = ({
  // filters,
  setFiltersModalOpen,
  products,
  getVariantsIsLoading,
  page,
  handlePagination,
  sort,
  setSort,
}) => {
  const cardView = localStorage.getItem('cardView');

  const [cardType, setTypeCard] = useState(cardView ? cardView : 'tile');

  const [activeSort, setActiveSort] = useState(
    window.innerWidth > 1024
      ? null
      : { orderBy: 'popularity', sortOrder: 'desc', name: 'По популярности' }
  );

  const { categoryId } = useParams();

  return (
    <div className="w-full">
      <div className="sticky ll:static top-[76px] ll:top-auto flex justify-between items-center pb-3 xl:pb-0 bg-white z-10">
        <SortControls sort={sort} setSort={setSort} />
        <CardTypeControls cardType={cardType} setTypeCard={setTypeCard} />

        <MobileSortControls sort={sort} setSort={setSort} />
        <button
          onClick={() => setFiltersModalOpen(true)}
          className="flex md:hidden items-center outline-none bg-transparent"
        >
          <img src={filterIcon} alt="*" />
          <span className="text-colBlack text-xs font-medium">Фильтры</span>
        </button>
      </div>

      {cardType === 'tile' ? (
        <div className="grid grid-cols-2 mm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 ll:grid-cols-4 gap-3 gap-y-6 xl:grid-cols-5">
          {getVariantsIsLoading
            ? Array.from({ length: 40 }).map((_, index) => (
                <ProductCardSkeleton key={index} />
              ))
            : null}
          {!getVariantsIsLoading && products?.data
            ? products?.data?.map((el) => (
                <ProductCard key={el?.id} product={el} />
              ))
            : null}
        </div>
      ) : null}
      {cardType === 'line' ? (
        <div className="space-y-4">
          {getVariantsIsLoading
            ? Array.from({ length: 20 }).map((_, index) => (
                <ProductCardLineSkeleton key={index} />
              ))
            : null}
          {!getVariantsIsLoading && products?.data
            ? products?.data?.map((el) => (
                <ProductCardLine key={el?.id} product={el} />
              ))
            : null}
        </div>
      ) : null}
      {cardType === 'lineNarrow' ? (
        <div className="space-y-4">
          {getVariantsIsLoading
            ? Array.from({ length: 20 }).map((_, index) => (
                <ProductCardLineSmallSkeleton key={index} />
              ))
            : null}
          {!getVariantsIsLoading && products?.data
            ? products?.data?.map((el) => (
                <ProductCardLineSmall key={el?.id} product={el} />
              ))
            : null}
        </div>
      ) : null}
      {!getVariantsIsLoading && !(products?.data?.length === 0) ? (
        <ErrorEmpty
          title="Список пуст!"
          desc="К сожалению, по вашему запросу ничего не нашли."
          height="420px"
        />
      ) : null}
      {products?.count > 20 ? (
        <CustomPagination
          page={page}
          count={products?.count}
          handlePagination={handlePagination}
        />
      ) : null}
    </div>
  );
};

export default CatProdContent;
