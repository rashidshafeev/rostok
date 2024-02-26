import React from 'react'

import search from '../../assets/icons/search.svg';

function SearchBar() {
  return (
    <form
          onSubmit={(e) => e.preventDefault()}
          className='max-w-[780px] w-full border-colGreen border rounded-md flex justify-between'
        >
          <input
            className='w-full h-10 outline-none rounded-md bg-white px-3'
            type='search'
            placeholder='Поиск по сайту'
          />
          <button className='bg-colGreen w-14'>
            <img className='mx-auto' src={search} alt='*' />
          </button>
        </form>
  )
}

export default SearchBar