import React from 'react';

import type { SortingParams } from '@/types/ServerData/Catalog';

import { OrderBy, SortOrder } from '@/types/ServerData/Catalog';

interface SortControlsProps {
  sort: SortingParams;
  setSort: (sort: SortingParams) => void;
}

function SortControls({ sort, setSort }: SortControlsProps) {
  const handleSetSort = (orderBy: OrderBy, sortOrder: SortOrder) => {
    setSort({
      orderBy,
      sortOrder,
    });
  };

  return (
    <div className="hidden ll:flex space-x-3 xl:pb-5">
      <span
        onClick={() => handleSetSort(OrderBy.popularity, SortOrder.desc)}
        className={`text-sm font-medium cursor-pointer ${
          sort?.orderBy === OrderBy.popularity &&
          sort?.sortOrder === SortOrder.desc &&
          'text-colGreen'
        }`}
      >
        По популярности
      </span>
      <span
        onClick={() => handleSetSort(OrderBy.price, SortOrder.asc)}
        className={`text-sm font-medium cursor-pointer ${
          sort?.orderBy === OrderBy.price &&
          sort?.sortOrder === SortOrder.asc &&
          'text-colGreen'
        }`}
      >
        Сначала дешёвые
      </span>
      <span
        onClick={() => handleSetSort(OrderBy.price, SortOrder.desc)}
        className={`text-sm font-medium cursor-pointer ${
          sort?.orderBy === OrderBy.price &&
          sort?.sortOrder === SortOrder.desc &&
          'text-colGreen'
        }`}
      >
        Сначала дорогие
      </span>
      <span
        onClick={() => handleSetSort(OrderBy.discount, SortOrder.desc)}
        className={`text-sm font-medium cursor-pointer ${
          sort?.orderBy === OrderBy.discount &&
          sort?.sortOrder === SortOrder.desc &&
          'text-colGreen'
        }`}
      >
        По размеру скидки
      </span>
      <span
        onClick={() => handleSetSort(OrderBy.rating, SortOrder.desc)}
        className={`text-sm font-medium cursor-pointer ${
          sort?.orderBy === OrderBy.rating &&
          sort?.sortOrder === SortOrder.desc &&
          'text-colGreen'
        }`}
      >
        По рейтингу
      </span>
    </div>
  );
}

export default SortControls;
