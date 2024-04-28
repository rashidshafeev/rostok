import { useState } from 'react';
import search from '../../assets/icons/search.svg';
import { useNavigate } from 'react-router-dom';

function SearchBar() {
  const [value, setValue] = useState('');
  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
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
