import React from 'react'

function SortControls({ activeSort, handleBySort }) {

   


  return (
    <div className='hidden ll:flex space-x-3 xl:pb-5'>
          <span
            onClick={() => {
              handleBySort('popularity', 'desc');
            }}
            className={`text-sm font-medium cursor-pointer ${
              activeSort?.orderBy === 'popularity' &&
              activeSort?.sortOrder === 'desc' &&
              'text-colGreen'
            }`}
          >
            По популярности
          </span>
          <span
            onClick={() => {
              handleBySort('price', 'asc');
            }}
            className={`text-sm font-medium cursor-pointer ${
              activeSort?.orderBy === 'price' &&
              activeSort?.sortOrder === 'asc' &&
              'text-colGreen'
            }`}
          >
            Сначала дешёвые
          </span>
          <span
            onClick={() => {
              handleBySort('price', 'desc');
            }}
            className={`text-sm font-medium cursor-pointer ${
              activeSort?.orderBy === 'price' &&
              activeSort?.sortOrder === 'desc' &&
              'text-colGreen'
            }`}
          >
            Сначала дорогие
          </span>
          <span
            onClick={() => {
              handleBySort('rating', 'desc');
            }}
            className={`text-sm font-medium cursor-pointer ${
              activeSort?.orderBy === 'rating' &&
              activeSort?.sortOrder === 'desc' &&
              'text-colGreen'
            }`}
          >
            Высокий рейтинг
          </span>
          <span
            onClick={() => {
              handleBySort('discount', 'desc');
            }}
            className={`text-sm font-medium cursor-pointer ${
              activeSort?.orderBy === 'discount' &&
              activeSort?.sortOrder === 'desc' &&
              'text-colGreen'
            }`}
          >
            По размеру скидки
          </span>
        </div>
  )
}

export default SortControls