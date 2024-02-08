import { Box, Modal } from '@mui/material';
import { allFilters } from '../../constants/data';
import { useState } from 'react';
import { ArrowIcon } from '../Icons';

const AllFiltersModal = ({ open, setOpen }) => {
  const [accordion, setAccordion] = useState(null);

  const toggleAccordion = (id) => {
    setAccordion(accordion === id ? null : id);
  };

  if (!open) return null;

  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
    >
      <Box className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85%] h-[90%] lining-nums proportional-nums bg-white outline-none rounded-lg border-none p-6 overflow-hidden'>
        <div className='flex flex-col justify-between h-full'>
          <div className='h-[90%]'>
            <div className='flex justify-between items-center'>
              <h2 className='text-colBlack text-3xl font-semibold'>
                Все фильтры
              </h2>
              <span
                onClick={() => setOpen(false)}
                className='text-5xl text-colGray font-light cursor-pointer pr-2'
              >
                &times;
              </span>
            </div>
            <div className='mt-2 border-t border-b border-[#EBEBEB] overflow-y-scroll overflow-hidden h-[93%]'>
              <div className='h-[1200px] pt-5'>
                <div className='grid grid-cols-3 gap-8'>
                  {allFilters?.map((el) => (
                    <div
                      key={el?.id}
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
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className='flex space-x-3 h-10'>
            <button className='bg-white text-colGreen border border-colGreen rounded-md py-2 px-4 font-semibold w-max text-sm'>
              Сбросить
            </button>
            <button className='bg-colGreen text-white rounded-md py-2 px-4 font-semibold w-max text-sm'>
              Применить фильтр
            </button>
          </div>
        </div>
      </Box>
    </Modal>
  );
};

export default AllFiltersModal;
