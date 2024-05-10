import { Box, Checkbox, FormControlLabel, Modal } from '@mui/material';
import { useState } from 'react';
import { ArrowIcon } from '../Icons';
import { Loading } from '../Loader/Loader';
import ErrorEmpty from '../Errors/ErrorEmpty';
import { fetchAllCategoryProducts } from '../../api/catalog';

const SearchFiltersModal = ({
  open,
  setOpen,
  filters,
  filterLoading,
  setProducts,
  searchQuery,
}) => {
  const [accordion, setAccordion] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedValues, setSelectedValues] = useState({});

  const toggleValue = (filterId, valueId) => {
    setSelectedValues((prevState) => ({
      ...prevState,
      [filterId]: prevState[filterId]
        ? prevState[filterId].includes(valueId)
          ? prevState[filterId].filter((id) => id !== valueId)
          : [...prevState[filterId], valueId]
        : [valueId],
    }));
  };

  const toggleAccordion = (id) => {
    setAccordion(accordion === id ? null : id);
  };

  const onSubmit = async () => {
    setIsLoading(true);
    const { success, data } = await fetchAllCategoryProducts(
      '',
      selectedValues,
      '',
      searchQuery
    );
    if (success) {
      setProducts(data);
      setIsLoading(false);
      setOpen(false);
    }
    setOpen(false);
    setIsLoading(false);
  };

  if (!open) return null;

  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
    >
      <Box className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full mm:w-[95%] lg:w-[85%] h-full mm:h-[95%] lg:h-[90%] lining-nums proportional-nums bg-white outline-none rounded-lg border-none p-3 md:p-6 overflow-hidden'>
        <div className='flex flex-col justify-between h-full'>
          <div className='h-[90%]'>
            <div className='flex justify-between items-center'>
              <h2 className='text-colBlack text-xl lg:text-3xl font-semibold'>
                Все фильтры
              </h2>
              <span
                onClick={() => setOpen(false)}
                className='text-4xl lg:text-5xl text-colGray font-light cursor-pointer pr-2'
              >
                &times;
              </span>
            </div>
            {isLoading || filterLoading ? (
              <Loading />
            ) : filters?.dynamics?.length > 0 ||
              filters?.basics?.brands?.length > 0 ||
              filters?.basics?.tags?.length > 0 ? (
              <div className='mt-2 pr-3 md:border-t md:border-b border-[#EBEBEB] overflow-y-scroll overflow-hidden h-[calc(100vh_-_136px)] md:h-[calc(100vh_-_205px)] lg:h-[92%]'>
                <div className='pt-5'>
                  <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8'>
                    {filters?.dynamics?.map((el) => (
                      <div className='border-b md:border-b-0 pb-3' key={el?.id}>
                        <div
                          className='flex justify-between items-center cursor-pointer'
                          onClick={() => toggleAccordion(el?.id)}
                        >
                          <span className='text-colBlack font-semibold'>
                            {el?.name}
                          </span>
                          <ArrowIcon
                            className={`!m-0 !w-4 !h-4 ${
                              accordion === el?.id
                                ? 'rotate-[0deg]'
                                : 'rotate-[180deg]'
                            }`}
                          />
                        </div>
                        {accordion === el?.id && el?.values?.length > 0 && (
                          <div
                            className={`${
                              el?.values?.length > 10 &&
                              'h-[274px] overflow-hidden overflow-y-scroll scrollable'
                            } `}
                          >
                            {el?.values?.map((val) => (
                              <div key={val?.id}>
                                <FormControlLabel
                                  style={{ margin: 0 }}
                                  control={
                                    <Checkbox
                                      style={{
                                        color: '#15765B',
                                        padding: '2px 3px',
                                      }}
                                      checked={
                                        selectedValues[el?.id]?.includes(
                                          val?.id
                                        ) || false
                                      }
                                      onChange={() =>
                                        toggleValue(el?.id, val?.id)
                                      }
                                    />
                                  }
                                  label={
                                    <div className='flex space-x-2 items-center'>
                                      {el?.type === 'color' && (
                                        <span
                                          style={{
                                            backgroundColor: val?.color,
                                          }}
                                          className='w-5 h-5 min-w-[20px] rounded-full border border-colGray'
                                        ></span>
                                      )}
                                      <p className='text-sm font-medium text-colBlack'>
                                        {val?.text}
                                      </p>
                                    </div>
                                  }
                                />
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <ErrorEmpty
                title='Список пуст!'
                desc='К сожалению, для этой категории нет фильтров.'
                height='420px'
              />
            )}
          </div>
          <div className='flex space-x-3 h-10'>
            <span
              onClick={() => setSelectedValues({})}
              className='bg-white text-colGreen border border-colGreen rounded-md py-2 px-4 font-semibold w-max text-sm'
            >
              Сбросить
            </span>
            <button
              onClick={onSubmit}
              className='bg-colGreen text-white rounded-md py-2 px-4 font-semibold w-max text-sm'
            >
              Применить
            </button>
          </div>
        </div>
      </Box>
    </Modal>
  );
};

export default SearchFiltersModal;
