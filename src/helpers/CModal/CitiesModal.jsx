import { Box, Modal } from '@mui/material';
import { Loading } from '../Loader/Loader';
import search from '@assets/icons/search.svg';
import { useEffect, useState } from 'react';
import ErrorEmpty from '../Errors/ErrorEmpty';
import { useGetCitiesAndRegionsQuery } from '@api/orderEndpoints';

const CitiesModal = ({ open, setOpen, city, setCity }) => {
  const { isLoading, isError, data: locations } = useGetCitiesAndRegionsQuery();
  const [regionID, setRegionID] = useState(null);
  const [cities, setCities] = useState([]);
  const [regions, setRegions] = useState([]);

  const handleFilterByRegion = (regionId) => {
    const filteredCities = locations?.cities?.filter(
      (city) => city?.region_id === regionId
    );
    setCities(filteredCities);
  };

  const handleCitySearch = (e) => {
    e.preventDefault();
    const value = e.target.value;
    if (value) {
      const normalizedQuery = value.toLowerCase();
      const filteredCities = locations?.cities?.filter((city) =>
        city?.name ? city.name.toLowerCase().includes(normalizedQuery) : false
      );
      const filteredRegions = locations?.regions?.filter((region) =>
        region?.name
          ? region.name.toLowerCase().includes(normalizedQuery)
          : false
      );
      setCities(filteredCities);
      setRegions(filteredRegions);
    }
  };

  useEffect(() => {
    setCities(locations?.cities);
    setRegions(locations?.regions);
  }, [isLoading]);

  if (!open) return null;

  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
    >
      <Box className='absolute mm:top-1/2 mm:left-1/2 mm:-translate-x-1/2 mm:-translate-y-1/2 lining-nums proportional-nums bg-white rounded-lg border-none outline-none p-3 mm:p-8 max-w-[1180px] w-full mm:w-[95%] xl:w-full h-full mm:h-[600px] overflow-hidden'>
        <span
          onClick={() => setOpen(false)}
          className='absolute top-0 right-0 text-4xl text-colGray font-light cursor-pointer pr-4'
        >
          &times;
        </span>
        <h2 className='text-2xl text-colBlack pb-5 font-bold mm:text-left pt-6 text-center'>
          Выберите ваш город
        </h2>
        <form
          onSubmit={(e) => handleCitySearch(e)}
          className='max-w-[580px] w-full border-colGreen border rounded-md flex justify-between'
        >
          <input
            className='w-full h-10 outline-none rounded-l-md bg-white px-3 border-none'
            type='search'
            onChange={(e) => handleCitySearch(e)}
            placeholder='Название города или области'
          />
          <div className='bg-colGreen w-14 flex justify-center items-center'>
            <img className='mx-auto' src={search} alt='*' />
          </div>
        </form>
        {isLoading ? (
          <div className='h-[430px]'>
            <Loading />
          </div>
        ) : isError ? (
          <ErrorEmpty
            title='Что-то пошло не так!'
            desc='Произошла ошибка! Пожалуйста, повторите попытку еще раз.'
            height='420px'
          />
        ) : (
          <div className='flex mt-8'>
            <ul className='hidden md:block w-[220px] h-[430px] space-y-2 overflow-y-scroll scrollable pr-2'>
              {regions?.length > 0 ? (
                <>
                  {regions?.map((el) => (
                    <li
                      className={`${
                        regionID === el?.id && 'bg-colSuperLight'
                      } cursor-pointer font-semibold text-colBlack px-2 py-[5px] rounded leading-[120%]`}
                      onClick={() => {
                        setRegionID(el?.id);
                        handleFilterByRegion(el?.id);
                      }}
                      key={el?.id}
                    >
                      {el?.name}
                    </li>
                  ))}
                </>
              ) : (
                <div className='text-center h-[430px] flex flex-col justify-center items-center'>
                  <h3 className='font-semibold text-lg'>Список пуст!</h3>
                  <p className='text-sm leading-[115%] pt-2'>
                    Ничего не найдено для указанного региона.
                  </p>
                </div>
              )}
            </ul>
            <div className='w-full h-screen mm:h-[430px] md:px-4 overflow-y-scroll scrollable'>
              {cities?.length > 0 ? (
                <ul className='flex flex-wrap'>
                  {cities?.map((el) => (
                    <li
                      className={`${
                        city?.id === el?.id && 'text-colGreen'
                      } w-2/4 lg:w-2/6 xl:w-1/4 text-sm leading-[120%] cursor-pointer hover:text-colGreen duration-200 p-2 my-1 md:my-5`}
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
              ) : (
                <ErrorEmpty
                  title='Список пуст!'
                  desc='К сожалению, по вашему запросу ничего не нашли.'
                  height='420px'
                />
              )}
            </div>
          </div>
        )}
      </Box>
    </Modal>
  );
};

export default CitiesModal;
