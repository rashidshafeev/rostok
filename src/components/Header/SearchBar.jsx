import { useState } from 'react';
import search from '../../assets/icons/search.svg';
import { useLocation, useNavigate } from 'react-router-dom';

function SearchBar({ setShowCatalog }) {
  const [value, setValue] = useState('');

  const navigate = useNavigate();
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get('search');

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setShowCatalog(false);
    navigate(`/search-results?search=${value}`);
  };

  return (
    <form
      onSubmit={(e) => handleSearchSubmit(e)}
      className='max-w-[780px] w-full border-colGreen border rounded-md flex justify-between'
    >
      <input
        className='w-full h-[34px] mm:h-10 outline-none rounded-l-md bg-white px-3 border-none'
        type='search'
        defaultValue={searchQuery}
        placeholder='Поиск по сайту'
        onChange={(e) => setValue(e.target.value)}
      />
      <button type='submit' className='bg-colGreen w-14'>
        <img className='mx-auto' src={search} alt='*' />
      </button>
    </form>
  );
}

export default SearchBar;
