import { Box, Modal } from '@mui/material';

const AllFiltersModal = ({ open, setOpen }) => {
  if (!open) return null;

  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
    >
      <Box className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[90%] lining-nums proportional-nums bg-white outline-none rounded-lg border-none p-6 overflow-hidden'>
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
              <div className='h-[1200px]'></div>
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
