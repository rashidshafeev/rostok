import { Box, Modal } from '@mui/material';
import { useGetCitiesAndRegionsQuery } from '../../redux/api/api';
import { Loading } from '../Loader/Loader';
import search from '../../assets/icons/search.svg';
import { useState } from 'react';

const CitiesModal = ({ open, setOpen, city, setCity }) => {
  const { isLoading, data: locations } = useGetCitiesAndRegionsQuery();
  const [region, setRegion] = useState(null);
  const [cities, setCities] = useState(locations?.cities);
  const [searchValue, setSearchValue] = useState(null);

  const handleFilterByRegion = (regionId) => {
    const filteredCities = locations?.cities?.filter(
      (city) => city?.region_id === regionId
    );
    setCities(filteredCities);
  };

  const handleCitySearch = (e) => {
    e.preventDefault();
    if (searchValue) {
      const normalizedQuery = searchValue.toLowerCase();
      const filteredCities = locations?.cities?.filter((city) =>
        city?.name ? city.name.toLowerCase().includes(normalizedQuery) : false
      );
      setCities(filteredCities);
    }
  };

  if (!open) return null;

  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
    >
      <Box className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 lining-nums proportional-nums bg-white rounded-lg border-none outline-none p-8 max-w-[1180px] w-full h-[600px] overflow-hidden'>
        <span
          onClick={() => setOpen(false)}
          className='absolute top-0 right-0 text-4xl text-colGray font-light cursor-pointer pr-4'
        >
          &times;
        </span>
        <h2 className='text-2xl text-colBlack pb-5 font-bold'>
          Выберите ваш город
        </h2>
        <form
          onSubmit={(e) => handleCitySearch(e)}
          className='max-w-[780px] w-full border-colGreen border rounded-md flex justify-between'
        >
          <input
            className='w-full h-10 outline-none rounded-l-md bg-white px-3 border-none'
            type='search'
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder='Название города или области'
          />
          <button className='bg-colGreen w-14'>
            <img className='mx-auto' src={search} alt='*' />
          </button>
        </form>
        {isLoading ? (
          <div className='h-[430px]'>
            <Loading />
          </div>
        ) : (
          <div className='flex mt-8'>
            <ul className='w-[220px] h-[430px] space-y-2 overflow-y-scroll scrollable pr-2'>
              {locations?.regions?.map((el) => (
                <li
                  className={`${
                    region === el?.id && 'bg-colSuperLight'
                  } cursor-pointer font-semibold text-colBlack px-2 py-[5px] rounded leading-[120%]`}
                  onClick={() => {
                    setRegion(el?.id);
                    handleFilterByRegion(el?.id);
                  }}
                  key={el?.id}
                >
                  {el?.name}
                </li>
              ))}
            </ul>
            <div className='w-full h-[430px] px-4 overflow-y-scroll scrollable'>
              <ul className='flex flex-wrap'>
                {cities?.map((el) => (
                  <li
                    className={`${
                      city?.id === el?.id && 'text-colGreen'
                    } w-1/4 text-sm leading-[120%] cursor-pointer hover:text-colGreen duration-200 py-2 my-5`}
                    key={el?.id}
                    onClick={() => {
                      setCity(el);
                      setOpen(false);
                    }}
                  >
                    {el?.name}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </Box>
    </Modal>
  );
};

export default CitiesModal;
