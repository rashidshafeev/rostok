import React, { useEffect, useRef, useState } from 'react';

import arrow from '@/shared/assets/icons/arrow-black.svg';

const MobileSortControls = ({ sort, setSort }) => {
  const [isOpenSelect, setIsOpenSelect] = useState(false);

  const selectRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsOpenSelect(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSetSort = (sortBy, sortOrder) => {
    setSort({
      sortBy: sortBy,
      sortOrder: sortOrder,
    });
  };

  const listCaption = (sort) => {
    const captions = {
      popularity: 'По популярности',
      price: 'По цене',
      rating: 'По рейтингу',
      discount: 'По скидке',
    };

    return captions[sort?.sortBy] || 'Сортировка';
  };

  return (
    <div ref={selectRef} className="relative ll:hidden min-w-[128px]">
      <div
        onClick={() => setIsOpenSelect(!isOpenSelect)}
        className="flex items-center space-x-2"
      >
        <span className="whitespace-nowrap text-colBlack font-medium text-xs">
          {listCaption(sort)}
        </span>
        <img src={arrow} alt="*" />
      </div>
      <ul
        className={`${
          isOpenSelect ? 'block' : 'hidden'
        } absolute top-full left-0 bg-white shadow-lg p-2 space-y-1 z-[99]`}
      >
        <li
          onClick={() => {
            handleSetSort('popularity', 'desc', 'По популярности');
            setIsOpenSelect(false);
          }}
          className="whitespace-nowrap text-colBlack font-medium cursor-pointer text-xs border-b pb-1"
        >
          По популярности
        </li>
        <li
          onClick={() => {
            handleSetSort('price', 'asc', 'Сначала дешёвые');
            setIsOpenSelect(false);
          }}
          className="whitespace-nowrap text-colBlack font-medium cursor-pointer text-xs border-b py-1"
        >
          Сначала дешёвые
        </li>
        <li
          onClick={() => {
            handleSetSort('price', 'desc', 'Сначала дорогие');
            setIsOpenSelect(false);
          }}
          className="whitespace-nowrap text-colBlack font-medium cursor-pointer text-xs border-b py-1"
        >
          Сначала дорогие
        </li>
        <li
          onClick={() => {
            handleSetSort('rating', 'desc', 'Высокий рейтинг');
            setIsOpenSelect(false);
          }}
          className="whitespace-nowrap text-colBlack font-medium cursor-pointer text-xs border-b py-1"
        >
          Высокий рейтинг
        </li>
        <li
          onClick={() => {
            handleSetSort('discount', 'desc', 'По размеру скидки');
            setIsOpenSelect(false);
          }}
          className="whitespace-nowrap text-colBlack font-medium cursor-pointer text-xs"
        >
          По размеру скидки
        </li>
      </ul>
    </div>
  );
};

export default MobileSortControls;
