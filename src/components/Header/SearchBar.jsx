import { useEffect, useState } from 'react';
import search from '../../assets/icons/search.svg';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useGetVariantsMutation } from '../../redux/api/api';

function SearchBar({ setShowCatalog }) {

  const [getVariants, { data, error, isLoading }] = useGetVariantsMutation();

  const [isFocused, setIsFocused] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
 
  const handleFocus = () => {
    setIsFocused(true);
    setShowCatalog(false)
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const fastSearch = async () => {
    if (searchTerm.length === 0) {
      setResults([]);
      return
    }

    try {
      const response = await getVariants({
        search: searchTerm,
      });
      setResults(response.data.data);
    } catch (error) {
      // Handle the error
    }
  };

  useEffect(() => {
    fastSearch()
  }, [searchTerm])

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
    <>
    <div className='w-full '>
    {isFocused && (
            <div
              className="fixed h-[100vh] w-[100vw] left-0 top-0 bg-black bg-opacity-50 z-5"
              onClick={() => setIsFocused(false)}
            ></div>
          )}
    <div className='flex justify-between z-30 bg-white relative rounded p-2'>
        <form
          onSubmit={(e) => handleSearchSubmit(e)}
          className={`max-w-[780px] z-20 w-full border-colGreen border rounded-md flex justify-between`}
        >
          <input
            className='w-full h-[34px] mm:h-10 outline-none rounded-l-md  bg-white px-3 border-none'
            type='search'
            defaultValue={searchQuery}
            placeholder='Поиск по сайту'
            onFocus={handleFocus}
            // onBlur={handleBlur}
            onChange={(e) => setSearchTerm(e.target.value)}
            value={searchTerm}
          />
          <button type='submit' className='bg-colGreen w-14'>
            <img className='mx-auto' src={search} alt='*' />
          </button>
          
        </form>


          {isFocused && results && <div className='absolute bg-white w-full h-full box-content bottom-0 right-0 rounded'>
            <div className='relative min-w-full min-h-full bg-white rounded bottom-0'>

            </div>
            <div className='relative min-w-full min-h-0 bg-white rounded bottom-0 mt-2'>
              {results.map((result, index) => (

                <li onClick={(e) => { e.stopPropagation() }} key={index} className="p-2 hover:bg-gray-200">
                  <NavLink to={`/catalog/${result.category.slug}/${result.slug}`} onClick={handleBlur}>
                    {result.groupName} {result.name}
                  </NavLink>
                </li>

              ))}
            </div>
          </div>}
        
      </div>
      
    </div>
      
      
    </>
  );
}

export default SearchBar;
