import React from 'react';

function SortControls({ sort, setSort }) {
  const handleSetSort = (sortBy, sortOrder) => {
    setSort({
      sortBy: sortBy,
      sortOrder: sortOrder,
    });
  };

  return (
    <div className="hidden ll:flex space-x-3 xl:pb-5">
      <span
        onClick={() => {
          handleSetSort('popularity', 'desc');
        }}
        className={`text-sm font-medium cursor-pointer ${
          sort?.sortBy === 'popularity' &&
          sort?.sortOrder === 'desc' &&
          'text-colGreen'
        }`}
      >
        По популярности
      </span>
      <span
        onClick={() => {
          handleSetSort('price', 'asc');
        }}
        className={`text-sm font-medium cursor-pointer ${
          sort?.sortBy === 'price' &&
          sort?.sortOrder === 'asc' &&
          'text-colGreen'
        }`}
      >
        Сначала дешёвые
      </span>
      <span
        onClick={() => {
          handleSetSort('price', 'desc');
        }}
        className={`text-sm font-medium cursor-pointer ${
          sort?.sortBy === 'price' &&
          sort?.sortOrder === 'desc' &&
          'text-colGreen'
        }`}
      >
        Сначала дорогие
      </span>
      <span
        onClick={() => {
          handleSetSort('rating', 'desc');
        }}
        className={`text-sm font-medium cursor-pointer ${
          sort?.sortBy === 'rating' &&
          sort?.sortOrder === 'desc' &&
          'text-colGreen'
        }`}
      >
        Высокий рейтинг
      </span>
      <span
        onClick={() => {
          handleSetSort('discount', 'desc');
        }}
        className={`text-sm font-medium cursor-pointer ${
          sort?.sortBy === 'discount' &&
          sort?.sortOrder === 'desc' &&
          'text-colGreen'
        }`}
      >
        По размеру скидки
      </span>
    </div>
  );
}

export default SortControls;
