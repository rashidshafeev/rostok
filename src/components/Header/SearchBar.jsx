import { useEffect, useState } from "react";
import search from "../../assets/icons/search.svg";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useGetSuggestionsMutation } from "../../redux/api/cartEndpoints";

import noImg from '../../assets/images/no-image.png';
function SearchBar({ setShowCatalog }) {
  const [getSuggestions, { data, error, isLoading }] =
    useGetSuggestionsMutation();

  const [isFocused, setIsFocused] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);

  const handleFocus = () => {
    setIsFocused(true);
    setShowCatalog(false);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const fastSearch = async () => {
    if (searchTerm.length === 0) {
      setResults([]);
      return;
    }
    try {
      const response = await getSuggestions({
        text: searchTerm,
      });
      setResults(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      // Handle the error
    }
  };

  useEffect(() => {
    fastSearch();
  }, [searchTerm]);

  // const [value, setValue] = useState('');

  const navigate = useNavigate();
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get("search");

  useEffect(() => {
    if (location.pathname === "/search-results") {
      setSearchTerm(searchParams.get("search"));
    }
  }, [location]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setShowCatalog(false);
    handleBlur();
    e.target.blur();
    navigate(`/search-results?search=${searchTerm}`);
  };

  return (
    <>
      <div className="w-full  ">
        {isFocused && (
          <div
            className="fixed h-[100vh] w-[100vw] left-0 top-0 bg-black bg-opacity-50 z-20"
            onClick={() => setIsFocused(false)}
          ></div>
        )}
        <div className="flex justify-between z-30 bg-white relative rounded-lg p-2">
          <form
            onSubmit={(e) => handleSearchSubmit(e)}
            className={`max-w-[780px] z-20 w-full border-colGreen border rounded-lg flex justify-between`}
          >
            <input
              className="w-full h-[34px] mm:h-10 outline-none rounded-l-md  bg-white px-3 border-none lining-nums proportional-nums"
              type="search"
              placeholder="Поиск по сайту"
              onFocus={handleFocus}
              // onBlur={handleBlur}
              onChange={(e) => {
                handleFocus();
                setSearchTerm(e.target.value);
              }}
              value={searchTerm}
            />
            <button type="submit" className="bg-colGreen rounded-r-md w-14">
              <img className="mx-auto" src={search} alt="*" />
            </button>
          </form>

          {isFocused && results && (
            <div className="absolute bg-white w-full h-full box-content bottom-0 right-0 rounded-lg ">
              <div className="relative min-w-full min-h-full bg-white rounded-lg  bottom-0"></div>
              <div
                className={`relative min-w-full min-h-0 bg-white rounded-lg bottom-0 mt-2 overflow-hidden  proportional-nums lining-nums ${
                  results.length !== 0 && "p-1"
                }`}
              >
                {/* {results?.variants && <div className=' font-semibold text-2xl px-4 pt-3'>Товары</div>} */}
                {results?.history?.map((result, index) => (
                  <li
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                    key={index}
                    className="p-2 hover:bg-gray-200"
                  >
                    <NavLink
                      to={`/search-results?search=${result.text}`}
                      onClick={handleBlur}
                    >
                      <div className=" font-bold">{result.text}</div>
                    </NavLink>
                  </li>
                ))}
                {results?.variants?.map((result, index) => (
                  <li
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                    key={index}
                    className="p-2 hover:bg-gray-200"
                  >
                    <NavLink
                      to={`/catalog/${result.categorySlug}/${result.slug}`}
                      onClick={handleBlur}
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={result.files.small || noImg}
                          alt=""
                          className="w-10 h-10 rounded-md object-contain"
                        />
                        <div>
                          <div>
                            {result.groupName} {result.name}
                          </div>
                          <div className=" text-colDarkGray text-xs">
                            {result.article}
                          </div>
                        </div>
                      </div>
                    </NavLink>
                  </li>
                ))}

                {results?.categories?.map((result, index) => (
                  <li
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                    key={index}
                    className="p-2 hover:bg-gray-200"
                  >
                    <NavLink
                      to={`/catalog/${result.slug}`}
                      onClick={handleBlur}
                    >
                      <div className="flex items-center gap-3">
                        {/* {result?.image && <img src={result?.image?.small} alt="" className='w-10 rounded-md' />} */}
                        <div>
                          <div className="text-xs text-colDarkGray">
                            {result.chain.slice(0, -1).map((cat, index) => {
                              return `${cat.name}/`;
                            })}
                            <div className="text-sm text-colBlack">
                              {result.name}
                            </div>
                          </div>
                          <div className=" text-colDarkGray text-xs">
                            Категория
                          </div>
                        </div>
                      </div>
                    </NavLink>
                  </li>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default SearchBar;
